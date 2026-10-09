/* 运行时渲染冒烟：在 vm + 最小 DOM stub 下加载全部数据并执行 app.js，
   遍历渲染 8 个视图，并模拟 setgrade/setseg/scope 切换，确认不抛异常 */
const fs = require('fs');
const vm = require('vm');

function makeEl() {
  return {
    _html: '', _text: '',
    set innerHTML(v) { this._html = String(v); }, get innerHTML() { return this._html; },
    set textContent(v) { this._text = String(v); }, get textContent() { return this._text; },
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    dataset: {}, style: {}, value: '',
    addEventListener() {}, scrollIntoView() {}, appendChild() {}, click() {},
    closest() { return null; },
    querySelector() { return makeEl(); }, querySelectorAll() { return []; }
  };
}

const handlers = {};
const els = {};
const sandbox = {};
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Date = Date; sandbox.Math = Math; sandbox.JSON = JSON;
sandbox.RegExp = RegExp; sandbox.parseInt = parseInt; sandbox.String = String;
sandbox.Object = Object; sandbox.Array = Array; sandbox.setTimeout = function () {};
sandbox.confirm = function () { return false; };
sandbox.Blob = function () {}; sandbox.URL = { createObjectURL() { return ''; }, revokeObjectURL() {} };
sandbox.location = { hash: '' };
sandbox.localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } };
sandbox.document = {
  getElementById(id) { return els[id] || (els[id] = makeEl()); },
  querySelector(sel) { return els[sel] || (els[sel] = makeEl()); },
  querySelectorAll() { return []; },
  addEventListener(type, fn) { handlers[type] = fn; },
  createElement() { return makeEl(); }
};
// 让各关键选择器返回可记录 innerHTML/textContent 的元素
['#wrap', '#pgTitle', '#pgSub', '#streakN', '#view', '#wbBadge', '#toast'].forEach(function (s) { els[s] = makeEl(); });

const ctx = vm.createContext(sandbox);
['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js', 'app.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
});

let bad = 0;
const KW = { today: '课程体系', vocab: '语境中锁定词义', grammar: '语法意义地图', sentence: '成分意义标注', corpus: '意义挑战', write: '写作意义批改', wrong: '错题本', report: '学习路径' };
const map = { 1: 'today', 2: 'vocab', 3: 'grammar', 4: 'sentence', 5: 'corpus', 6: 'write', 7: 'wrong', 8: 'report' };
Object.keys(map).forEach(function (k) {
  try {
    handlers.keydown({ key: k, target: { tagName: 'BODY' } });
    const html = els['#wrap'].innerHTML;
    const ok = html && html.length > 50 && html.indexOf(KW[map[k]]) >= 0;
    console.log((ok ? '  ✓ ' : '  ✗ ') + map[k] + ' 渲染长度 ' + (html ? html.length : 0) + (ok ? '' : ' （缺失关键词：' + KW[map[k]] + '）'));
    if (!ok) bad++;
  } catch (e) {
    console.log('  ✗ ' + map[k] + ' 抛出异常: ' + e.message);
    bad++;
  }
});

function click(act, k) {
  const t = { dataset: { act: act, k: k }, closest(sel) { return sel === '[data-act]' ? t : null; } };
  handlers.click({ target: t });
}
function checkGrade(label) {
  const html = els['#wrap'].innerHTML || '';
  if (!html.length) { console.log('  ✗ ' + label + ' 渲染为空'); bad++; return; }
  console.log('  ✓ ' + label + ' 渲染长度 ' + html.length);
}
try {
  click('setgrade', 'g12');
  handlers.keydown({ key: '1', target: { tagName: 'BODY' } });
  checkGrade('切换到高三(g12)今日页');
  click('setseg', 'primary');
  handlers.keydown({ key: '1', target: { tagName: 'BODY' } });
  checkGrade('切换到小学学段今日页');
  click('scope', 'all');
  handlers.keydown({ key: '2', target: { tagName: 'BODY' } });
  checkGrade('scope=all 词汇页');
  click('scope', 'grade');
  handlers.keydown({ key: '3', target: { tagName: 'BODY' } });
  checkGrade('scope=grade 语法页');
  // 进入挑战页并模拟答题
  handlers.keydown({ key: '5', target: { tagName: 'BODY' } });
  click('cans', '0');
  console.log('  ✓ 挑战页答题无异常');
} catch (e) {
  console.log('  ✗ 交互模拟异常: ' + e.message);
  bad++;
}

console.log('');
console.log(bad ? ('渲染冒烟失败：' + bad + ' 处') : '✅ 渲染冒烟全部通过（8 视图 + 年级/学段/范围切换 + 答题）');
process.exit(bad ? 1 : 0);
