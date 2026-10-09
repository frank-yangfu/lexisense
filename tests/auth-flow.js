/* 登录系统专项测试：
   场景A 全新环境：首屏显示登录层；非法名字被拒；创建→产生进度→切学生→隔离→回切→删除
   场景B 旧版单档案数据：自动迁移为「学习者」并直接登录，不打扰老用户 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

function makeEl() {
  const cls = { _add: [], _rm: [], add(c) { this._add.push(c); }, remove(c) { this._rm.push(c); }, toggle() {}, contains() { return false; } };
  return {
    _html: '', _text: '',
    set innerHTML(v) { this._html = String(v); }, get innerHTML() { return this._html; },
    set textContent(v) { this._text = String(v); }, get textContent() { return this._text; },
    classList: cls, dataset: {}, style: {}, value: '',
    addEventListener() {}, scrollIntoView() {}, appendChild() {}, click() {}, focus() {},
    closest() { return null; }, querySelector() { return makeEl(); }, querySelectorAll() { return []; }
  };
}

function boot(seed) {
  const handlers = {}, els = {};
  const sb = {};
  sb.window = sb; sb.console = console;
  sb.Date = Date; sb.Math = Math; sb.JSON = JSON; sb.RegExp = RegExp;
  sb.parseInt = parseInt; sb.String = String; sb.Object = Object; sb.Array = Array;
  sb.setTimeout = function (f) { f && f(); return 0; };
  sb.clearTimeout = function () {};
  sb.confirm = function () { return true; };
  sb.Blob = function () {}; sb.URL = { createObjectURL() { return ''; }, revokeObjectURL() {} };
  sb.location = { hash: '' };
  sb.localStorage = { _d: Object.assign({}, seed || {}), getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } };
  sb.document = {
    getElementById(id) { return els[id] || (els[id] = makeEl()); },
    querySelector(sel) { return els[sel] || (els[sel] = makeEl()); },
    querySelectorAll() { return []; },
    addEventListener(type, fn) { handlers[type] = fn; },
    createElement() { return makeEl(); }
  };
  ['#wrap', '#pgTitle', '#pgSub', '#streakN', '#view', '#wbBadge', '#toast', '#gin', '#wta', '#whoName'].forEach(function (s) { els[s] = makeEl(); });
  els['gate'] = makeEl();
  const ctx = vm.createContext(sb);
  ['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js', 'app.js'].forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), ctx, { filename: f });
  });
  const users = () => { try { return JSON.parse(sb.localStorage.getItem('me_users_v1') || '{"list":[],"cur":null}'); } catch (e) { return { list: [], cur: null }; } };
  const stateOf = (id) => { try { return JSON.parse(sb.localStorage.getItem('me_s1.' + id) || 'null'); } catch (e) { return null; } };
  const gateVisible = () => els['gate'].innerHTML.indexOf('gcard') >= 0;
  const gateHidden = () => els['gate'].classList._add.indexOf('hide') >= 0;
  const click = (act, k) => {
    const t = { dataset: { act: act, k: k || '' }, closest(sel) { return sel === '[data-act]' ? t : null; } };
    handlers.click({ target: t });
  };
  const key = (k) => handlers.keydown({ key: k, target: { tagName: 'BODY' } });
  const setVal = (sel, v) => { els[sel].value = v; };
  return { sb, els, handlers, users, stateOf, gateVisible, gateHidden, click, key, setVal };
}

let bad = 0;
function ok(cond, name) { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) bad++; }

/* ================= 场景 A：全新环境 ================= */
console.log('== 场景 A：多学生档案 ==');
const a = boot({});
ok(a.gateVisible(), '首屏显示登录层（谁在学英语）');
ok(!a.gateHidden(), '登录层处于可见状态');
ok(a.users().list.length === 0, '初始无学生档案');

// 非法名字：HTML 注入 / 超长 / 空
a.setVal('#gin', '<img src=x onerror=alert(1)>');
a.click('gcreate');
ok(a.users().list.length === 0, '拒绝 HTML 注入名字');
a.setVal('#gin', '一二三四五六七八九十一二三四五'); // 15 字
a.click('gcreate');
ok(a.users().list.length === 0, '拒绝超长名字');
a.setVal('#gin', '   ');
a.click('gcreate');
ok(a.users().list.length === 0, '拒绝纯空白名字');

// 创建「小明」
a.setVal('#gin', '小明');
a.click('gcreate');
ok(a.users().list.length === 1 && a.users().cur, '创建小明并登录');
ok(a.stateOf(a.users().cur) && a.stateOf(a.users().cur).name === '小明', '小明档案含名字');
ok(a.gateHidden(), '登录后登录层关闭');
ok(a.els['#whoName'].textContent === '小明', '顶栏显示当前学生');
ok(a.els['#wrap'].innerHTML.indexOf('课程体系') >= 0, '登录后进入今日页');

// 小明产生进度：载入示例并批改 + 换年级
a.click('demo'); a.click('grade');
a.click('setgrade', 'g6');
a.click('scope', 'all');
let xiaomingId = a.users().cur;
let xmState = a.stateOf(xiaomingId);
ok(xmState.grade === 'g6' && xmState.scope === 'all', '小明进度已保存（年级 g6 / 范围 all）');
ok((xmState.done.write || 0) >= 1 && (xmState.history || []).length >= 1, '小明有批改记录');

// 切换 → 新建「小红」
a.click('who');
ok(a.gateVisible() && a.els['gate'].innerHTML.indexOf('小明') >= 0, '切换层列出已有学生');
a.els['#gin'].value = '小红';
a.click('gcreate');
ok(a.users().list.length === 2, '新增小红');
let xiaohongId = a.users().cur;
ok(xiaohongId !== xiaomingId, '当前学生为小红');
let xhState = a.stateOf(xiaohongId);
ok(xhState.grade === 'g3' && !(xhState.history || []).length, '小红是全新档案（默认 g3、无记录）——进度隔离');
ok(a.els['#whoName'].textContent === '小红', '顶栏切到小红');

// 回切小明
a.click('who');
a.click('glogin', xiaomingId);
ok(a.users().cur === xiaomingId, '重新登录小明');
ok(a.stateOf(xiaomingId).grade === 'g6', '小明进度完整恢复（g6）');
ok(a.els['#wrap'].innerHTML.indexOf('课程体系') >= 0, '回切后正常渲染今日页');

// 删除小红（非当前）
a.click('who');
a.click('gdel', xiaohongId);
ok(a.users().list.length === 1 && a.users().cur === xiaomingId, '删除小红成功，当前仍为小明');
ok(a.sb.localStorage.getItem('me_s1.' + xiaohongId) === null, '小红的进度数据已清除');

// 删除小明（当前）→ 回到首屏登录
a.click('who');
a.click('gdel', xiaomingId);
ok(a.users().list.length === 0 && a.users().cur === null, '删除当前学生后无档案');
ok(a.gateVisible() && a.els['gate'].innerHTML.indexOf('还没有学生') >= 0, '回到首屏空态');

/* ================= 场景 B：旧数据迁移 ================= */
console.log('== 场景 B：旧版单档案自动迁移 ==');
const legacy = JSON.stringify({
  day: '2026-09-08', start: '2026-09-01', streak: 3, lastDay: '2026-09-08', grade: 'g8', scope: 'grade',
  done: { write: 1, vocab: 5 }, words: { apple: { box: 2, next: 0, seen: 3, right: 2 } },
  seen: { syn: [], poly: [], gram: [], sent: [], amb: [], corpus: [], chal: [] },
  wrong: [], history: [{ date: '2026-09-08', score: 80 }], mastery: { vocab: 10, gram: 5, sent: 0, amb: 0, out: 60 }
});
const b = boot({ me_state_v1: legacy });
ok(b.users().list.length === 1 && b.users().cur === 'learner' && b.users().list[0].name === '学习者', '旧数据自动迁移为「学习者」档案并登录');
ok(b.sb.localStorage.getItem('me_state_v1') === null, '旧 key 已清理');
ok(b.stateOf('learner') && b.stateOf('learner').grade === 'g8', '旧年级进度保留（g8）');
ok(b.stateOf('learner').words.apple && b.stateOf('learner').words.apple.box === 2, '旧词条记忆盒保留');
ok(b.gateVisible() === false && b.els['#wrap'].innerHTML.indexOf('课程体系') >= 0, '老用户直接进入，不弹登录层');
ok(b.els['#whoName'].textContent === '学习者', '顶栏显示迁移学生名');
// 新用户小红不受影响
b.els['#gin'].value = '小红';
b.click('gcreate');
ok(b.users().list.length === 2, '迁移后仍可新增学生');

console.log('');
console.log(bad ? ('登录专项测试失败：' + bad + ' 处') : '✅ 登录系统专项测试全部通过');
process.exit(bad ? 1 : 0);
