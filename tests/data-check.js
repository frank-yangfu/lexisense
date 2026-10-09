/* 自测脚本：数据完整性 + 批改引擎冒烟（Node 环境，不进入产品包） */
const fs = require('fs');
const path = require('path');
global.window = global;
global.DB = {};
let DB = global.DB;
['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js',
 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js'
].forEach(function (f) {
  eval(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'));
});
DB = global.DB;
global.DBX.build();

let fail = 0, warn = 0;
const bad = (m) => { console.log('  [FAIL] ' + m); fail++; };
const wr = (m) => { console.log('  [warn] ' + m); warn++; };
const sec = (t) => console.log('\n== ' + t + ' ==');

sec('1. 词库 DB.words');
console.log('  词条数: ' + DB.words.length + ' | 义项总数: ' + DB.words.reduce((a, w) => a + w.senses.length, 0));

/* 词形表：不规则动词 / 不规则复数 / 不规则比较级，避免合法例句被误判 */
const IRREG = {
  be: ['am', 'is', 'are', 'was', 'were', 'been', 'being'],
  have: ['has', 'had', 'having'], do: ['does', 'did', 'done', 'doing'],
  go: ['goes', 'went', 'gone', 'going'], say: ['says', 'said', 'saying'],
  get: ['gets', 'got', 'gotten', 'getting'], make: ['makes', 'made', 'making'],
  know: ['knows', 'knew', 'known', 'knowing'], think: ['thinks', 'thought', 'thinking'],
  take: ['takes', 'took', 'taken', 'taking'], see: ['sees', 'saw', 'seen', 'seeing'],
  come: ['comes', 'came', 'coming'], give: ['gives', 'gave', 'given', 'giving'],
  find: ['finds', 'found', 'finding'], tell: ['tells', 'told', 'telling'],
  become: ['becomes', 'became', 'becoming'], leave: ['leaves', 'left', 'leaving'],
  feel: ['feels', 'felt', 'feeling'], put: ['puts', 'putting'],
  bring: ['brings', 'brought', 'bringing'], begin: ['begins', 'began', 'begun', 'beginning'],
  keep: ['keeps', 'kept', 'keeping'], hold: ['holds', 'held', 'holding'],
  write: ['writes', 'wrote', 'written', 'writing'], stand: ['stands', 'stood', 'standing'],
  hear: ['hears', 'heard', 'hearing'], let: ['lets', 'letting'],
  mean: ['means', 'meant', 'meaning'], set: ['sets', 'setting'],
  meet: ['meets', 'met', 'meeting'], run: ['runs', 'ran', 'running'],
  pay: ['pays', 'paid', 'paying'], sit: ['sits', 'sat', 'sitting'],
  speak: ['speaks', 'spoke', 'spoken', 'speaking'], lie: ['lies', 'lay', 'lain', 'lying'],
  lay: ['lays', 'laid', 'laying'], lead: ['leads', 'led', 'leading'],
  read: ['reads', 'reading'], grow: ['grows', 'grew', 'grown', 'growing'],
  lose: ['loses', 'lost', 'losing'], fall: ['falls', 'fell', 'fallen', 'falling'],
  send: ['sends', 'sent', 'sending'], build: ['builds', 'built', 'building'],
  understand: ['understands', 'understood', 'understanding'],
  draw: ['draws', 'drew', 'drawn', 'drawing'], break: ['breaks', 'broke', 'broken', 'breaking'],
  spend: ['spends', 'spent', 'spending'], cut: ['cuts', 'cutting'],
  rise: ['rises', 'rose', 'risen', 'rising'], drive: ['drives', 'drove', 'driven', 'driving'],
  buy: ['buys', 'bought', 'buying'], wear: ['wears', 'wore', 'worn', 'wearing'],
  choose: ['chooses', 'chose', 'chosen', 'choosing'], seek: ['seeks', 'sought', 'seeking'],
  throw: ['throws', 'threw', 'thrown', 'throwing'], catch: ['catches', 'caught', 'catching'],
  deal: ['deals', 'dealt', 'dealing'], win: ['wins', 'won', 'winning'],
  forget: ['forgets', 'forgot', 'forgotten', 'forgetting'],
  teach: ['teaches', 'taught', 'teaching'], bite: ['bites', 'bit', 'bitten', 'biting'],
  hide: ['hides', 'hid', 'hidden', 'hiding'], fight: ['fights', 'fought', 'fighting'],
  beat: ['beats', 'beaten', 'beating'], bend: ['bends', 'bent', 'bending'],
  blow: ['blows', 'blew', 'blown', 'blowing'], burn: ['burns', 'burnt', 'burned', 'burning'],
  dig: ['digs', 'dug', 'digging'], dream: ['dreams', 'dreamt', 'dreamed', 'dreaming'],
  feed: ['feeds', 'fed', 'feeding'], flee: ['flees', 'fled', 'fleeing'],
  fly: ['flies', 'flew', 'flown', 'flying'], freeze: ['freezes', 'froze', 'frozen', 'freezing'],
  hang: ['hangs', 'hung', 'hanging'], hit: ['hits', 'hitting'], hurt: ['hurts', 'hurting'],
  kneel: ['kneels', 'knelt', 'kneeled', 'kneeling'], lend: ['lends', 'lent', 'lending'],
  light: ['lights', 'lit', 'lighted', 'lighting'], ride: ['rides', 'rode', 'ridden', 'riding'],
  ring: ['rings', 'rang', 'rung', 'ringing'], shake: ['shakes', 'shook', 'shaken', 'shaking'],
  shine: ['shines', 'shone', 'shined', 'shining'], shoot: ['shoots', 'shot', 'shooting'],
  shut: ['shuts', 'shutting'], sing: ['sings', 'sang', 'sung', 'singing'],
  sink: ['sinks', 'sank', 'sunk', 'sinking'], sleep: ['sleeps', 'slept', 'sleeping'],
  slide: ['slides', 'slid', 'sliding'], smell: ['smells', 'smelt', 'smelled', 'smelling'],
  split: ['splits', 'splitting'], spread: ['spreads', 'spreading'],
  steal: ['steals', 'stole', 'stolen', 'stealing'], stick: ['sticks', 'stuck', 'sticking'],
  sting: ['stings', 'stung', 'stinging'], strike: ['strikes', 'struck', 'striking'],
  swear: ['swears', 'swore', 'sworn', 'swearing'], sweep: ['sweeps', 'swept', 'sweeping'],
  swim: ['swims', 'swam', 'swum', 'swimming'], swing: ['swings', 'swung', 'swinging'],
  tear: ['tears', 'tore', 'torn', 'tearing'], wake: ['wakes', 'woke', 'woken', 'waking'],
  weave: ['weaves', 'wove', 'woven', 'weaving'], weep: ['weeps', 'wept', 'weeping'],
  wind: ['winds', 'wound', 'winding'], withdraw: ['withdraws', 'withdrew', 'withdrawn', 'withdrawing'],
  withstand: ['withstands', 'withstood', 'withstanding'],
  overcome: ['overcame', 'overcoming'], undergo: ['underwent', 'undergone', 'undergoing'],
  undertake: ['undertook', 'undertaken', 'undertaking'], upset: ['upsets', 'upsetting'],
  uphold: ['upheld', 'upholding'], undo: ['undid', 'undone', 'undoing'],
  outgrow: ['outgrew', 'outgrown', 'outgrowing'], overlook: ['overlooks', 'overlooked', 'overlooking'],
  awake: ['awoke', 'awoken', 'awaking'], arise: ['arose', 'arisen', 'arising'],
  forbid: ['forbade', 'forbidden', 'forbidding'], strive: ['strove', 'striven', 'striving'],
  thrive: ['throve', 'thrived', 'thriving'], tread: ['trod', 'trodden', 'treading'],
  mislead: ['misled', 'misleading'], rebuild: ['rebuilt', 'rebuilding'],
  rewrite: ['rewrote', 'rewritten', 'rewriting'], retell: ['retold', 'retelling'],
  resend: ['resent', 'resending'], mistake: ['mistook', 'mistaken', 'mistaking'],
  // 不规则复数
  child: ['children'], man: ['men'], woman: ['women'], foot: ['feet'], tooth: ['teeth'],
  mouse: ['mice'], goose: ['geese'], person: ['people'], leaf: ['leaves'], knife: ['knives'],
  life: ['lives'], wife: ['wives'], shelf: ['shelves'], wolf: ['wolves'], thief: ['thieves'],
  half: ['halves'], potato: ['potatoes'], tomato: ['tomatoes'], hero: ['heroes'],
  fish: ['fish'], sheep: ['sheep'], deer: ['deer'], datum: ['data'], medium: ['media'],
  criterion: ['criteria'], phenomenon: ['phenomena'], analysis: ['analyses'],
  basis: ['bases'], crisis: ['crises'], freshman: ['freshmen'],
  // 不规则比较级
  good: ['better', 'best'], bad: ['worse', 'worst'], many: ['more', 'most'],
  much: ['more', 'most'], little: ['less', 'least'], far: ['further', 'furthest', 'farther', 'farthest'],
};
const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const formCache = {};
function wordForms(w) {
  if (formCache[w]) return formCache[w];
  const f = new Set([w]);
  (IRREG[w] || []).forEach((x) => f.add(x));
  f.add(w + 's'); f.add(w + 'es'); f.add(w + 'ed'); f.add(w + 'd');
  f.add(w + 'ing'); f.add(w + 'ly'); f.add(w + 'er'); f.add(w + 'est');
  if (/e$/.test(w)) { f.add(w.slice(0, -1) + 'ing'); f.add(w.slice(0, -1) + 'ed'); }
  if (/y$/.test(w)) {
    f.add(w.slice(0, -1) + 'ies'); f.add(w.slice(0, -1) + 'ied');
    f.add(w.slice(0, -1) + 'ier'); f.add(w.slice(0, -1) + 'iest');
    f.add(w.slice(0, -1) + 'ily');
  }
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) { f.add(w + w.slice(-1) + 'ed'); f.add(w + w.slice(-1) + 'ing'); }
  const alt = Array.from(f).map(reEsc).sort((a, b) => b.length - a.length).join('|');
  formCache[w] = new RegExp('\\b(?:' + alt + ')\\b', 'i');
  return formCache[w];
}

const wset = new Set();
DB.words.forEach(w => {
  if (wset.has(w.w)) bad('重复词条 ' + w.w);
  wset.add(w.w);
  if (!/^[a-z]+(?:[ -][a-z]+)*$/.test(w.w)) bad('词条格式异常: ' + w.w);
  if (!w.ph) bad('缺音标: ' + w.w);
  if (!/^\//.test(w.ph)) bad('音标格式异常: ' + w.w + ' -> ' + w.ph);
  w.senses.forEach((s, i) => {
    if (!s.g || !s.ex || !s.en || !s.zh) bad(w.w + ' 第' + (i + 1) + '义项字段缺失');
    if (!/^[a-z]/i.test(String(s.g).trim())) bad(w.w + ' 释义未以词性开头: ' + s.g);
    if (!wordForms(w.w).test(String(s.ex))) bad(w.w + ' 例句未包含该词: ' + s.ex);
  });
});


sec('2. 近义词辨析 DB.syn');
console.log('  组数: ' + DB.syn.length);
DB.syn.forEach(g => {
  if (!g.quiz || !g.quiz.options || g.quiz.ans == null) return bad(g.id + ' 缺题目');
  if (g.quiz.ans < 0 || g.quiz.ans >= g.quiz.options.length) bad(g.id + ' 答案索引越界');
  if (g.quiz.options.length < 2) bad(g.id + ' 选项过少');
  if (new Set(g.quiz.options).size !== g.quiz.options.length) bad(g.id + ' 选项重复');
  if (!g.items || g.items.length < 2) bad(g.id + ' 对比项不足');
  g.items.forEach(it => { if (!it.w || !it.ex || !it.zh || !it.wrong) bad(g.id + ' 对比项字段缺失: ' + it.w); });
});

sec('3. 一词多义 DB.poly');
console.log('  词数: ' + DB.poly.length + ' | 义项: ' + DB.poly.reduce((a, p) => a + p.senses.length, 0));
DB.poly.forEach(p => {
  p.senses.forEach(s => { if (!s.g || !s.ex) bad(p.w + ' 义项缺字段'); });
  p.quiz.forEach((q, i) => {
    if (q.ans < 0 || q.ans >= q.options.length) bad(p.w + ' 第' + (i + 1) + '题答案越界');
    if (new Set(q.options).size !== q.options.length) bad(p.w + ' 第' + (i + 1) + '题选项重复');
    if (!q.why) bad(p.w + ' 第' + (i + 1) + '题缺解析');
  });
});

sec('4. 词根网络 DB.roots');
console.log('  词根: ' + DB.roots.length + ' | 派生词: ' + DB.roots.reduce((a, r) => a + r.words.length, 0));
DB.roots.forEach(r => { if (!r.root || !r.mean) bad('词根字段缺失'); r.words.forEach(w => { if (!w.w || !w.m) bad(r.root + ' 派生词字段缺失'); }); });

sec('5. 语法地图 DB.grammar');
console.log('  条目: ' + DB.grammar.length);
DB.grammar.forEach(g => {
  if (!g.quiz || g.quiz.ans == null) return bad(g.id + ' 缺题目');
  if (g.quiz.ans < 0 || g.quiz.ans >= g.quiz.options.length) bad(g.id + ' 答案越界');
  if (!g.pairs || g.pairs.length < 2) wr(g.id + ' 对比对少于 2 条');
  if (!g.a || !g.a.length) bad(g.id + ' 缺意义说明');
});

sec('6. 句子标注 DB.sentences');
const ALLOW = ['agent', 'verb', 'patient', 'time', 'link', 'degree', 'extra', 'cond', 'ref'];
console.log('  句子: ' + DB.sentences.length);
DB.sentences.forEach((s, i) => {
  if (ALLOW.indexOf(s.c) >= 0) { }
  s.tokens.forEach(t => { if (ALLOW.indexOf(t.c) < 0) bad('句' + (i + 1) + ' 未知角色色: ' + t.c); if (!t.r) bad('句' + (i + 1) + ' 缺角色名'); });
  // 校验：每个 token 都能按原文顺序定位（定位式渲染的前提）
  let pos = 0;
  s.tokens.forEach(t => {
    const key = t.t.replace(/[.,;:!?"']/g, '').trim();
    const i = s.s.indexOf(key, pos);
    if (i < 0) bad('句' + (i + 1) + ' token 无法在原文定位: ' + t.t);
    else pos = i + key.length;
  });
  if (pos < s.s.length - 1) wr('句' + (i + 1) + ' 有未标注片段: "' + s.s.slice(pos) + '"');
});

sec('7. 歧义句 DB.ambig');
console.log('  句子: ' + DB.ambig.length);
DB.ambig.forEach(a => {
  if (!a.readings || a.readings.length < 2) bad(a.s + ' 解读不足 2 种');
  a.readings.forEach(r => { if (!r.m || !r.rw || !r.note) bad(a.s + ' 解读字段缺失'); });
  if (!a.why) bad(a.s + ' 缺成因说明');
});

sec('8. 语料挑战 DB.challenge');
console.log('  题目: ' + DB.challenge.length);
const cset = new Set();
DB.challenge.forEach(c => {
  if (cset.has(c.s)) bad('题目重复: ' + c.s);
  cset.add(c.s);
  if (c.ans < 0 || c.ans >= c.options.length) bad('答案越界: ' + c.s);
  if (new Set(c.options).size !== c.options.length) bad('选项重复: ' + c.s);
  if (!c.src || !c.zh || !c.why) bad('字段缺失: ' + c.s);
});

sec('9. 批改规则 DB.writeRules');
console.log('  规则: ' + DB.writeRules.length);
const rids = new Set();
DB.writeRules.forEach(r => {
  if (rids.has(r.id)) bad('规则 id 重复: ' + r.id);
  rids.add(r.id);
  try { new RegExp(r.re, 'gi'); } catch (e) { bad('正则无法编译 ' + r.id + ': ' + e.message); }
  if (!r.msg || !r.fix) bad('规则字段缺失: ' + r.id);
  if (['high', 'mid', 'low'].indexOf(r.level) < 0) bad('等级非法: ' + r.id);
});

/* ---------- 批改引擎冒烟 ---------- */
sec('10. 批改引擎（从 app.js 提取核心函数实跑）');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
function grab(startMark, endMark) {
  const a = app.indexOf(startMark);
  const b = app.indexOf(endMark, a);
  if (a < 0 || b < 0) throw new Error('无法定位函数: ' + startMark);
  return app.slice(a, b);
}
const snippet = grab('function splitSents', '  function renderMarked') + grab('  function renderMarked', '  function doGrade');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const countWords = (s) => { const m = String(s).match(/[A-Za-z0-9'’-]+/g); return m ? m.length : 0; };
const today = () => '2026-09-09';
const pad = (n) => n < 10 ? '0' + n : '' + n;
var gradeText, renderMarked, splitSents;
eval(snippet);

const samples = [
  { name: '典型模糊范文', t: "I think this is a very good thing. With the development of technology, more and more people use AI in order to do their work. It is very important for us because it helps people get things done. Some people say it is bad, but I do not think so." },
  { name: '精确表达范文', t: "Independent audits found that the 2024 rollout reduced processing time by 34%, although three regional offices reported data-entry delays. Because the sample excluded rural branches, the figure probably overstates the national effect." },
  { name: '极短文本', t: "It is good." },
  { name: '中文干扰', t: "这是一个测试段落，不包含英文单词。" },
  { name: '含特殊字符', t: "<script>alert('x')</script> The report & its findings were very good, I think." }
];
samples.forEach(s => {
  try {
    const r = gradeText(s.t);
    const okScore = r.score >= 0 && r.score <= 100;
    const dims = ['vocab', 'density', 'struct', 'logic', 'clarity', 'gram', 'amb'];
    let dOk = dims.every(k => r.d[k] >= 0 && r.d[k] <= 100 && !isNaN(r.d[k]));
    if (!okScore) bad(s.name + ' 分数越界: ' + r.score);
    if (!dOk) bad(s.name + ' 维度分异常: ' + JSON.stringify(r.d));
    if (/<script>/i.test(r.marked)) bad(s.name + ' 未转义 HTML');
    console.log('  ' + s.name.padEnd(12, '　') + ' → 明确度 ' + String(r.score).padStart(3) + ' | 命中 ' + String(r.issues.length).padStart(2) + ' 处 | 词数 ' + countWords(s.t) + ' | 句数 ' + splitSents(s.t).length);
  } catch (e) { bad(s.name + ' 批改抛错: ' + e.message); }
});

sec('结论');
console.log('  失败 ' + fail + ' 项，警告 ' + warn + ' 项');
process.exit(fail ? 1 : 0);
