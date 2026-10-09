/* 冒烟测试：最小 DOM stub 下跑通所有视图与交互，确保无运行时异常 */
const fs = require('fs');
const path = require('path');

const cache = {};
function El(sel) {
  if (cache[sel]) return cache[sel];
  const e = {
    _sel: sel, innerHTML: '', className: '', textContent: '', value: '', scrollTop: 0,
    dataset: {}, style: {}, parentNode: null,
    classList: { add() { }, remove() { }, toggle() { }, contains() { return false; } },
    scrollIntoView() { }, appendChild() { }, click() { }, focus() { },
    querySelector(s) { return El(sel + ' ' + s); },
    querySelectorAll() { return []; },
    closest() { return null; },
    addEventListener() { }
  };
  cache[sel] = e;
  return e;
}
const handlers = {};
global.document = {
  querySelector: (s) => El(s),
  querySelectorAll: (s) => [],
  getElementById: (id) => El('#' + id),
  addEventListener: (ev, fn) => { handlers[ev] = fn; },
  createElement: () => El('new'),
  body: El('body')
};
global.location = { hash: '' };
global.confirm = () => true;
global.alert = () => { };
const store = {};
global.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; }
};
if (!global.URL.createObjectURL) global.URL.createObjectURL = () => 'blob:x';
if (!global.URL.revokeObjectURL) global.URL.revokeObjectURL = () => { };

global.window = global;
global.DB = {};
var DB = global.DB;
eval(fs.readFileSync(path.join(__dirname, '..', 'data-core.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '..', 'data-skill.js'), 'utf8'));
DB = global.DB;

let err = 0;
function tryStep(name, fn) {
  try { fn(); console.log('  [ok] ' + name); }
  catch (e) { console.log('  [ERR] ' + name + ' → ' + e.message); err++; }
}

/* 加载 app.js（会立即渲染 today） */
tryStep('加载 app.js 并首屏渲染', () => {
  eval(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'));
});

function nav(v) {
  handlers.click({ target: { closest: (sel) => (sel.indexOf('#nav a') >= 0 ? { dataset: { v: v } } : null) } });
}
function act(ds, text) {
  const fake = {
    dataset: ds,
    querySelector: () => ({ textContent: text === undefined ? '__x__' : text }),
    parentNode: El('box')
  };
  handlers.click({ target: { closest: (sel) => (sel.indexOf('#nav a') >= 0 ? null : (sel === '[data-act]' ? fake : null)) } });
}
function html() { return cache['#wrap'] ? cache['#wrap'].innerHTML : ''; }
function assertHas(name, needle) {
  if (html().indexOf(needle) < 0) { console.log('  [ERR] ' + name + ' 缺少关键内容: ' + needle); err++; }
  else console.log('  [ok] ' + name + ' 渲染完整');
}

console.log('\n== 主视图 ==');
['today', 'vocab', 'grammar', 'sentence', 'corpus', 'write', 'wrong', 'report'].forEach(v => {
  tryStep('视图 ' + v, () => {
    nav(v);
    if (html().length < 60) throw new Error('输出过短 (' + html().length + ')');
  });
});

console.log('\n== 词汇模块子页 ==');
['card', 'syn', 'poly', 'root'].forEach(t => tryStep('vocab tab ' + t, () => { act({ act: 'vtab', k: t }); }));
tryStep('答题：语境词卡（错误）', () => { act({ act: 'wans', i: 0 }, 'zzz'); });
tryStep('答题：语境词卡（正确）', () => {
  act({ act: 'vtab', k: 'card' });
  act({ act: 'wans', i: 0 }, 'zzz');
  act({ act: 'wnext' });
  const h = html();
  const opts = [];
  const re = /<span>([^<]{2,40})<\/span><\/button>/g; let x;
  while ((x = re.exec(h)) !== null) opts.push(x[1]);
  if (opts.length < 4) throw new Error('选项数不足: ' + opts.length);
  opts.forEach((o, i) => act({ act: 'wans', i: i }, o));
});
tryStep('近义词辨析答题', () => {
  act({ act: 'vtab', k: 'syn' });
  DB.syn.forEach(g => { act({ act: 'synpick', k: g.id }); act({ act: 'sans', i: g.quiz.ans }); });
});
tryStep('一词多义答题', () => {
  act({ act: 'vtab', k: 'poly' });
  DB.poly.forEach(p => {
    act({ act: 'polypick', k: p.w });
    p.quiz.forEach((q, qi) => act({ act: 'pans', q: String(qi), i: String(q.ans) }));
  });
});
tryStep('词根网络切换', () => { act({ act: 'vtab', k: 'root' }); DB.roots.forEach(r => act({ act: 'rootpick', k: r.root })); });

console.log('\n== 语法模块 ==');
tryStep('全量语法答题', () => {
  DB.grammar.forEach(g => { act({ act: 'gpick', k: g.id }); act({ act: 'gans', i: String(g.quiz.ans) }); });
});

console.log('\n== 句子分析 ==');
['annot', 'ambig', 'deep'].forEach(t => tryStep('sentence tab ' + t, () => act({ act: 'stab', k: t })));
tryStep('切换 10 个标注句', () => { act({ act: 'stab', k: 'annot' }); DB.sentences.forEach((s, i) => act({ act: 'spick', k: String(i) })); });
tryStep('切换 8 个歧义句 + 提交改写', () => {
  act({ act: 'stab', k: 'ambig' });
  El('#ambIn').value = 'To fly planes can be dangerous.';
  DB.ambig.forEach((a, i) => { act({ act: 'apick', k: String(i) }); act({ act: 'ambsub' }); act({ act: 'ambshow' }); });
});

console.log('\n== 语料挑战 ==');
tryStep('答完一轮 15 题', () => {
  act({ act: 'ctab', k: 'quiz' });
  for (let i = 0; i < DB.challenge.length; i++) { act({ act: 'cans', i: '0' }); act({ act: 'cnext' }); }
  act({ act: 'cnew' });
});

console.log('\n== 学习路径（循序渐进）==');
// 课程体系已重构为 DBX.GRADES 驱动的 10 年级分级（LEVELS 为运行时函数），
// 每年级词/语法/近义/多义/挑战的无重复与全覆盖校验由 tests/verify-curriculum.js 承担。
console.log('  [ok] 学习路径分级由 DBX.GRADES 运行时驱动（完整性校验见 verify-curriculum.js）');
tryStep('今日页显示第 N 天与阶段', () => {
  nav('today');
  if (html().indexOf('第 1 天') < 0) throw new Error('缺少天数');
  if (html().indexOf('阶段 1/3') < 0) throw new Error('缺少阶段');
  if (html().indexOf('今日学习路径') < 0) throw new Error('缺少路径列表');
});
tryStep('路径步骤跳转（带参数）', () => {
  ['vocab|card', 'vocab|syn|say-tell-speak-talk', 'vocab|poly|get', 'grammar|past-vs-perfect', 'corpus|quiz', 'write']
    .forEach(g => act({ act: 'goto', go: g }));
});
tryStep('底部标签栏导航', () => {
  ['today', 'vocab', 'grammar', 'sentence', 'corpus', 'write', 'report'].forEach(v => nav(v));
});

console.log('\n== 写作批改 ==');
tryStep('空文本拦截', () => { El('#wta').value = ''; act({ act: 'grade' }); });
tryStep('示例文本批改', () => {
  El('#wta').value = 'I think this is a very good thing. With the development of technology, more and more people use AI in order to do their work. It is very important for us because it helps people get things done.';
  act({ act: 'grade' });
  if (html().indexOf('批改报告') < 0) throw new Error('未生成报告');
  if (html().indexOf('意义明确度') < 0) throw new Error('缺少评分');
});
tryStep('载入示例按钮', () => act({ act: 'demo' }));

console.log('\n== 错题本与报告 ==');
tryStep('错题本有内容', () => {
  nav('wrong');
  if (html().indexOf('错题本') < 0) throw new Error('渲染失败');
});
tryStep('移除一条错题', () => act({ act: 'wrm', i: '0' }));
tryStep('学习报告 + 雷达图', () => {
  nav('report');
  if (html().indexOf('<svg') < 0) throw new Error('雷达图未生成');
});
tryStep('导出数据', () => act({ act: 'export' }));
tryStep('键盘快捷键', () => {
  ['1', '2', '3', '4', '5', '6', '7', '8'].forEach(k => handlers.keydown({ key: k, target: { tagName: 'DIV' } }));
  handlers.keydown({ key: 'Enter', target: { tagName: 'DIV' } });
});
tryStep('重置数据', () => { act({ act: 'reset' }); nav('today'); });

console.log('\n结论: 运行异常 ' + err + ' 项');
process.exit(err ? 1 : 0);
