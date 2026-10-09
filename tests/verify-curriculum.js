/* 校验课程体系构建后的不变量（用 vm 独立上下文加载，避免裸标识符 TDZ） */
const fs = require('fs');
const vm = require('vm');

const sandbox = {};
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Date = Date; sandbox.Math = Math; sandbox.JSON = JSON;
sandbox.RegExp = RegExp; sandbox.parseInt = parseInt; sandbox.String = String;
sandbox.Object = Object; sandbox.Array = Array; sandbox.setTimeout = setTimeout;
const ctx = vm.createContext(sandbox);

['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
});
sandbox.DBX.build();
const DB = sandbox.DB, DBX = sandbox.DBX;

let bad = 0;
const fail = function (m) { console.log('  [FAIL] ' + m); bad++; };

console.log('DB.words 总数:', DB.words.length, '| 词库唯一:', Object.keys(DB.wordMap).length);
console.log('grammar:', DB.grammar.length, '| syn:', DB.syn.length, '| poly:', DB.poly.length, '| challenge:', DB.challenge.length);
console.log('');

DBX.GRADES.forEach(function (G) {
  const w = DB.words.filter(x => x.grade === G.k).length;
  const gram = DB.grammar.filter(x => x.g === G.k).length;
  const syn = DB.syn.filter(x => x.g === G.k).length;
  const poly = DB.poly.filter(x => x.g === G.k).length;
  const chal = DB.challenge.filter(x => x.g === G.k).length;
  console.log(
    G.k + ' ' + G.name + ': 词 ' + w + '/' + G.words.length +
    ' | 语法 ' + gram + '/' + G.gram.length +
    ' | 近义 ' + syn + '/' + G.syn.length +
    ' | 多义 ' + poly + '/' + G.poly.length +
    ' | 挑战 ' + chal + '/' + G.chal.length
  );
  if (w !== G.words.length) fail(G.k + ' 词数不符');
  if (gram !== G.gram.length) fail(G.k + ' 语法数不符');
  if (syn !== G.syn.length) fail(G.k + ' 近义数不符');
  if (poly !== G.poly.length) fail(G.k + ' 多义数不符');
  if (chal !== G.chal.length) fail(G.k + ' 挑战数不符');
});

console.log('');
console.log('=== 挑战索引映射校验（G.chal 必须指向 g===G.k 的条目）===');
DBX.GRADES.forEach(function (G) {
  G.chal.forEach(function (idx) {
    const c = DB.challenge[idx];
    if (!c || c.g !== G.k) fail(G.k + ' 挑战索引错乱 -> #' + idx + ' g=' + (c && c.g));
  });
});

console.log('');
console.log('=== 引用的 id / 词 必须存在 ===');
DBX.GRADES.forEach(function (G) {
  G.gram.forEach(id => { if (!DB.grammar.filter(x => x.id === id)[0]) fail(G.k + ' 语法id缺失: ' + id); });
  G.syn.forEach(id => { if (!DB.syn.filter(x => x.id === id)[0]) fail(G.k + ' 近义id缺失: ' + id); });
  G.poly.forEach(w => { if (!DB.poly.filter(x => x.w === w)[0]) fail(G.k + ' 多义词缺失: ' + w); });
  G.words.forEach(w => { if (!DB.wordMap[w]) fail(G.k + ' 词缺失: ' + w); });
});

console.log('');
console.log(bad ? ('校验失败：' + bad + ' 处') : '✅ 全部校验通过（10 年级 · 词/语法/近义/多义/挑战均正确映射）');
process.exit(bad ? 1 : 0);
