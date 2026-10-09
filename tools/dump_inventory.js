/* 导出全库义项清单（供富化脚本消费）
   用法: node tools/dump_inventory.js
   产出: %TEMP%/inventory.json
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const TMP = path.join(os.homedir(), 'AppData', 'Local', 'Temp');

const sandbox = {};
sandbox.window = sandbox;
sandbox.console = console;
sandbox.Date = Date; sandbox.Math = Math; sandbox.JSON = JSON;
sandbox.RegExp = RegExp; sandbox.parseInt = parseInt; sandbox.String = String;
sandbox.Object = Object; sandbox.Array = Array; sandbox.setTimeout = setTimeout;
const ctx = vm.createContext(sandbox);

/* 注意：绝不能加载 data-enrich.js —— 否则上一轮注入的释义会被当成
   「源数据已有」而跳过，导致富化不可重入（释义自我擦除）。 */
const FILES = ['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js',
  'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-curriculum.js'];
FILES.forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));
sandbox.DBX.build();
const DB = sandbox.DB;

const inv = DB.words.map(w => ({
  w: w.w, ph: w.ph, tag: w.tag, grade: w.grade,
  senses: w.senses.map((s, i) => ({ i: i, g: s.g, en: s.en, ex: s.ex, zh: s.zh }))
}));
fs.writeFileSync(path.join(TMP, 'inventory.json'), JSON.stringify(inv), 'utf8');

// 既有词根网络（data-core.js 的 DB.roots）
const rootsBase = (DB.roots || []).map(r => ({
  root: r.root, mean: r.mean, words: (r.words || []).map(x => ({ w: x.w, m: x.m }))
}));
fs.writeFileSync(path.join(TMP, 'roots_base.json'), JSON.stringify(rootsBase), 'utf8');
console.log('既有词根网络 ' + rootsBase.length + ' 组 / ' +
  rootsBase.reduce((a, r) => a + r.words.length, 0) + ' 词');

const senses = inv.reduce((a, w) => a + w.senses.length, 0);
const noEn = inv.reduce((a, w) => a + w.senses.filter(s => !s.en).length, 0);
const multi = inv.filter(w => w.senses.length > 1).length;
const POS_RE = /^(n|v|adj|adv|prep|conj|pron|num|art|aux|int|vt|vi)\./;
const fw = [];
inv.forEach(w => w.senses.forEach(s => {
  const m = POS_RE.exec(String(s.g).trim());
  const p = m ? m[1] : '?';
  if (['prep', 'conj', 'pron', 'num', 'art', 'aux', 'int', '?'].indexOf(p) >= 0) fw.push(w.w + '|' + s.g);
}));
console.log('词条 ' + inv.length + ' | 义项 ' + senses + ' | 缺英文释义 ' + noEn + ' | 多义词 ' + multi);
console.log('需手工释义的虚词/无词性义项 ' + fw.length + ' 条');
fs.writeFileSync(path.join(TMP, 'funcwords.txt'), fw.join('\n'), 'utf8');
console.log('已写出 inventory.json / funcwords.txt');
