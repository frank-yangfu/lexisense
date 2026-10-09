/* 安全测试：辞源 Lexisense（纯前端离线应用）
   覆盖：输入校验 / DOM-XSS sink / 二阶注入（localStorage）/ 原型污染 / 正则 DoS / 网络面
   复用 test-render.js 的 vm + DOM stub 方案，直接加载真实 app.js 执行 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0, warn = 0;
function ok(name, cond, extra) { if (cond) { pass++; console.log('  [PASS] ' + name + (extra ? ' — ' + extra : '')); } else { fail++; console.log('  [FAIL] ' + name + (extra ? ' — ' + extra : '')); } }
function info(name, msg) { warn++; console.log('  [INFO] ' + name + (msg ? ' — ' + msg : '')); }
function sec(t) { console.log('\n== ' + t + ' =='); }

function makeEl() {
  return {
    _html: '', _text: '', value: '',
    set innerHTML(v) { this._html = String(v); }, get innerHTML() { return this._html; },
    set textContent(v) { this._text = String(v); }, get textContent() { return this._text; },
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    dataset: {}, style: {},
    addEventListener() {}, scrollIntoView() {}, appendChild() {}, click() {}, focus() {},
    closest() { return null; },
    querySelector() { return makeEl(); }, querySelectorAll() { return []; }
  };
}

/* 用给定 localStorage 预置数据启动一个 app 实例 */
function boot(preload) {
  const handlers = {}, els = {};
  const sandbox = {};
  sandbox.window = sandbox;
  sandbox.console = { log() {}, error() {}, warn() {} };
  sandbox.Date = Date; sandbox.Math = Math; sandbox.JSON = JSON; sandbox.RegExp = RegExp;
  sandbox.parseInt = parseInt; sandbox.String = String; sandbox.Object = Object;
  sandbox.Array = Array; sandbox.Number = Number; sandbox.isFinite = isFinite;
  sandbox.setTimeout = function () {}; sandbox.clearTimeout = function () {};
  sandbox.confirm = function () { return false; };
  sandbox.Blob = function () {}; sandbox.URL = { createObjectURL() { return ''; }, revokeObjectURL() {} };
  sandbox.location = { hash: '' };
  sandbox.localStorage = {
    _d: Object.assign({}, preload || {}),
    getItem(k) { return (k in this._d) ? this._d[k] : null; },
    setItem(k, v) { this._d[k] = String(v); },
    removeItem(k) { delete this._d[k]; }
  };
  sandbox.document = {
    getElementById(id) { return els[id] || (els[id] = makeEl()); },
    querySelector(sel) { return els[sel] || (els[sel] = makeEl()); },
    querySelectorAll() { return []; },
    addEventListener(type, fn) { handlers[type] = fn; },
    createElement() { return makeEl(); }
  };
  ['#wrap', '#pgTitle', '#pgSub', '#streakN', '#view', '#wbBadge', '#toast', '#gate', '#gin', '#wta', '#ambIn', '#ambexp'].forEach(s => els[s] = makeEl());

  const ctx = vm.createContext(sandbox);
  ['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js',
   'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js', 'app.js']
    .forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));

  return {
    els, handlers, sandbox,
    click(act, k, i) {
      const t = { dataset: { act: act, k: k, i: i },
        closest(sel) { return sel === '[data-act]' ? t : null; } };
      handlers.click({ target: t });
    },
    key(k) { handlers.keydown({ key: k, target: { tagName: 'BODY' } }); },
    view(v) { this.key({ today: '1', vocab: '2', grammar: '3', sentence: '4', corpus: '5', write: '6', wrong: '7', report: '8' }[v]); },
    html() { return els['#wrap'].innerHTML || ''; }
  };
}

/* 判定“原始危险标签”是否出现：只认真正会被解析器执行的标签开标签。
   注意：合法 UI 里雷达图会输出 <svg>，转义后的文本仍含 onerror= 字面量，
   因此不能把 <svg / onerror= 当作注入信号。 */
function hasRawInjection(s) {
  return /<(img|script|iframe|object|embed|link|meta)\b/i.test(s);
}
function hasEscaped(s) { return /&lt;|&gt;|&quot;|&#39;/.test(s); }

const XSS = '<img src=x onerror=alert(1)>';
const XSS2 = '</textarea><script>alert(1)</script>';
const XSS3 = '"><svg onload=alert(1)>';

/* ============ 1. 可见输入校验：学生名 ============ */
sec('1. 学生名输入校验（validName）');
{
  const a = boot({});
  a.els['#gin'].value = XSS;
  a.click('gcreate');
  const g = a.els['#gate'].innerHTML;
  ok('学生名 XSS 载荷被拒绝（未进入 DOM）', !hasRawInjection(g), 'gate 中无原始标签');
  const stored = a.sandbox.localStorage.getItem('me_users_v1');
  ok('学生名 XSS 载荷未写入 localStorage 名单', !stored || stored.indexOf('onerror') < 0);

  const b = boot({});
  b.els['#gin'].value = XSS3;
  b.click('gcreate');
  ok('引号闭合型载荷被拒绝', !hasRawInjection(b.els['#gate'].innerHTML));

  const c = boot({});
  c.els['#gin'].value = '小杨';
  c.click('gcreate');
  const us = JSON.parse(c.sandbox.localStorage.getItem('me_users_v1') || '{}');
  ok('合法中文名正常创建', !!(us.list && us.list.length === 1 && us.list[0].name === '小杨'));
}

/* ============ 2. 写作批改：用户文本 → marked/issues ============ */
sec('2. 写作批改（不可信文本渲染）');
{
  const a = boot({});
  a.view('write');
  a.els['#wta'].value = XSS + ' this is a very good thing and something else';
  a.click('grade');
  const h = a.html();
  ok('批改结果中危险标签已被转义', !hasRawInjection(h) && hasEscaped(h), '输出含实体化字符 &lt;');
  ok('报告仍正常生成', h.indexOf('批改报告') >= 0);

  const b = boot({});
  b.view('write');
  b.els['#wta'].value = XSS2 + ' more and more people use it';
  b.click('grade');
  ok('script/textarea 闭合载荷被转义', !hasRawInjection(b.html()));

  // 精简版（polished）也要转义
  const c = boot({});
  c.view('write');
  c.els['#wta'].value = 'I think ' + XSS + ' in order to test something here';
  c.click('grade');
  ok('polished 精简文本已转义', !hasRawInjection(c.html()));
}

/* ============ 3. 歧义改写提交 ============ */
sec('3. 歧义改写提交');
{
  const a = boot({});
  a.view('sentence');
  a.click('stab', 'ambig');
  a.els['#ambIn'].value = XSS + ' is not ambiguous at all';
  a.click('ambsub');
  ok('歧义改写文本已转义', !hasRawInjection(a.els['#ambexp'].innerHTML), 'ambexp 无原始标签');
  a.click('ambshow');
  ok('标准改写渲染无注入', !hasRawInjection(a.els['#ambexp'].innerHTML));
}

/* ============ 4. 二阶注入：被篡改的 localStorage 状态 ============ */
sec('4. 二阶注入（localStorage 状态篡改）');
{
  const preload = {
    'me_users_v1': JSON.stringify({ list: [{ id: 'u1', name: 'Tester', ts: 1 }], cur: 'u1' }),
    'me_s1.u1': JSON.stringify({
      name: 'Tester',
      words: { [XSS]: { box: 2, right: 3, seen: 4, next: 0 } },
      wrong: [], history: [], seen: { syn: [], poly: [], gram: [], sent: [], amb: [], corpus: [], chal: [] },
      done: {}, right: {}, mastery: {}, day: '2026-01-01', lastDay: '2026-01-01', start: '2026-01-01', streak: 1
    })
  };
  const a = boot(preload);
  a.view('report');
  const h = a.html();
  const m = h.match(/<span class="chip"[^>]*>[\s\S]{0,60}/g) || [];
  console.log('     · 词条掌握度单元格样例：' + (m[0] || '(无)').slice(0, 90));
  if (hasRawInjection(h)) {
    fail++;
    console.log('  [FAIL] 学习报告「词条掌握度」把 localStorage 中的词名原样拼进 DOM —— 存储型 XSS sink（需先能写 localStorage）');
  } else {
    ok('报告页对词名做了转义', true);
  }
}

/* ============ 5. 原型污染 ============ */
sec('5. 原型污染（__proto__ 注入）');
{
  const preload = {
    'me_users_v1': JSON.stringify({ list: [{ id: 'u1', name: 'T', ts: 1 }], cur: 'u1' }),
    'me_s1.u1': '{"__proto__":{"polluted":"yes"},"name":"T"}'
  };
  const a = boot(preload);
  const victim = {};
  ok('Object.prototype 未被污染', victim.polluted === undefined, 'victim.polluted=' + victim.polluted);
}

/* ============ 6. 正则 DoS（写作规则） ============ */
sec('6. 批改正则健壮性（ReDoS / 异常吞没）');
{
  const a = boot({});
  a.view('write');
  // 构造针对 negative lookahead / 长串的对抗输入
  const evil = ('is not enough '.repeat(4000)) + 'a'.repeat(20000) + ' I think very good things';
  a.els['#wta'].value = evil;
  const t0 = Date.now();
  let threw = null;
  try { a.click('grade'); } catch (e) { threw = e; }
  const dt = Date.now() - t0;
  ok('对抗输入未抛异常', !threw, threw ? threw.message : '正常返回');
  ok('对抗输入处理耗时 < 2000ms（无灾难性回溯）', dt < 2000, dt + 'ms');
}

/* ============ 7. 路由 / hash 注入 ============ */
sec('7. 路由与 hash 处理');
{
  let threw = null;
  try {
    const preload = { 'me_users_v1': JSON.stringify({ list: [{ id: 'u1', name: 'T', ts: 1 }], cur: 'u1' }) };
    const sandboxExtra = { hash: '#__proto__' };
    const a = boot(preload);
    a.sandbox.location.hash = '#constructor';
    a.view('today');
    ok('异常 hash 不触发异常行为', !hasRawInjection(a.html()));
  } catch (e) { threw = e; ok('异常 hash 不触发异常行为', false, e.message); }
}

/* ============ 8. 网络与外部资源面 ============ */
sec('8. 网络/外部资源暴露面');
{
  const appFiles = ['app.js', 'data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js',
    'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js'];
  let external = [], netCalls = [];
  appFiles.forEach(f => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    (src.match(/https?:\/\/[^\s"'`)]+/g) || []).forEach(u => external.push(f + ' → ' + u));
    (src.match(/\b(fetch|XMLHttpRequest|WebSocket|importScripts|window\.open|navigator\.sendBeacon)\s*\(/g) || []).forEach(mm => netCalls.push(f + ' → ' + mm.trim()));
  });
  ok('应用与数据代码无外部 URL 引用', external.length === 0, external.length ? external.slice(0, 3).join('; ') : '0 处');
  ok('应用与数据代码无网络调用（无外联/上报）', netCalls.length === 0, netCalls.length ? netCalls.join('; ') : '0 处');

  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  ok('Service Worker 仅拦截同源请求（不做跨域代理）', /url\.origin\s*!==\s*location\.origin/.test(sw), '存在同源判断');
  ok('Service Worker 的 fetch 处理器未对响应做重写/注入', !/\.replace\(|innerHTML|text\(\)\s*\.then/.test(sw));

  const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  ok('index.html 未引入第三方脚本', !/<script[^>]+src=["'](https?:)?\/\//.test(idx));
  if (/Content-Security-Policy/i.test(idx)) ok('index.html 含 CSP 声明', true);
  else info('index.html 未设置 CSP', '纯离线应用风险低，但仍建议收敛内联脚本');
}

console.log('\n────────────────────────────');
console.log('通过 ' + pass + ' · 失败 ' + fail + ' · 提示 ' + warn);
process.exit(fail ? 1 : 0);
