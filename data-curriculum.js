/* ============================================================
   辞源 · 课程体系（小学 ~ 高中）
   1) 把 RAW.gX 紧凑词表归一化为标准词条
   2) 定义学段 / 年级 / 课程目标与配套技能点
   3) 合并分学段技能语料（DBX.*）进主库
   ============================================================ */
window.DBX = window.DBX || {};

/* ---------- 1. 学段定义 ---------- */
DBX.SEGS = [
  { k: 'primary', name: '小学', short: '小', range: '3–6 年级', color: '#00b8a9', desc: '在真实语境中把词和物、动作直接对应，建立"一词一义"的第一直觉。' },
  { k: 'junior', name: '初中', short: '初', range: '7–9 年级', color: '#635bff', desc: '开始处理近义边界、多义分支与句子结构所贡献的意义。' },
  { k: 'senior', name: '高中', short: '高', range: '高一–高三', color: '#f5576c', desc: '在学术语料中区分证据强度、命题态度与语域，输出无歧义的表达。' }
];

/* ---------- 2. 年级课程定义 ---------- */
DBX.GRADES = [
  {
    k: 'g3', seg: 'primary', n: 3, name: '三年级', label: '三上/三下',
    goal: '把英语词直接锚定在可见、可感的事物与动作上，养成"看到句子就想到画面"的习惯。',
    topics: ['动物', '饮食', '家人', '身体', '学习用品', '颜色', '动作', '形容词'],
    gram: ['p-simple', 'p-plural', 'p-be', 'p-article'],
    syn: ['s-look-see-watch', 's-big-large-great'],
    poly: ['like', 'have'],
    chal: [0, 1, 2]
  },
  {
    k: 'g4', seg: 'primary', n: 4, name: '四年级', label: '四上/四下',
    goal: '把词放进天气、地点、时间、交通等真实场景，理解"语境决定选词"。',
    topics: ['天气季节', '职业', '地点', '时间', '交通', '衣物', '情感'],
    gram: ['p-there-be', 'p-continuous', 'p-some-any', 'p-can'],
    syn: ['s-house-home-family', 's-listen-hear'],
    poly: ['fish', 'water'],
    chal: [3, 4, 5]
  },
  {
    k: 'g5', seg: 'primary', n: 5, name: '五年级', label: '五上/五下',
    goal: '用频度副词、比较等级和逻辑连词把句子说得更准确，懂得"程度与关系"也是意义。',
    topics: ['学科', '爱好', '餐饮', '品质', '频度', '逻辑连词', '描述性形容词'],
    gram: ['p-frequency', 'p-comparative', 'p-superlative', 'p-past'],
    syn: ['s-bring-take-carry', 's-many-much'],
    poly: ['light', 'hand'],
    chal: [6, 7, 8]
  },
  {
    k: 'g6', seg: 'primary', n: 6, name: '六年级', label: '六上/六下',
    goal: '走向文化、环保、健康与科技话题，能就一个主题连续说清三四句话。',
    topics: ['节日文化', '环保', '健康', '理想职业', '科普', '社会', '高频动词'],
    gram: ['p-future', 'p-imperative', 'p-modal-must', 'p-because-so'],
    syn: ['s-wear-put-on-dress', 's-say-speak'],
    poly: ['run', 'cross'],
    chal: [9, 10, 11]
  },
  {
    k: 'g7', seg: 'junior', n: 7, name: '七年级', label: '初一',
    goal: '建立"时态即视角"的意识：同一个动作，用不同时态说的是不同的事。',
    topics: ['学习方法', '日常作息', '能力情感', '饮食购物', '天气问路', '旅行爱好'],
    gram: ['j-past-vs-perfect', 'j-present-cont-vs-simple', 'j-have-been-gone', 'j-future-forms'],
    syn: ['j-borrow-lend', 'j-spend-cost-take-pay'],
    poly: ['since', 'for'],
    chal: [12, 13, 14, 15]
  },
  {
    k: 'g8', seg: 'junior', n: 8, name: '八年级', label: '初二',
    goal: '理解被动语态、宾语从句与情态动词推测所承担的信息焦点与证据强度。',
    topics: ['思维方法', '志愿服务', '环保', '科技', '健康', '交际', '描述副词'],
    gram: ['j-passive', 'j-modal-speculate', 'j-object-clause', 'j-used-to'],
    syn: ['j-other-another', 'j-across-through-over'],
    poly: ['while', 'once'],
    chal: [16, 17, 18, 19]
  },
  {
    k: 'g9', seg: 'junior', n: 9, name: '九年级', label: '初三',
    goal: '掌握定语从句、状语从句与比较结构，能把简单句扩展为信息完整的复合句。',
    topics: ['心智品质', '目标理想', '教育', '社会行业', '传媒法治', '国情世界'],
    gram: ['j-attributive-clause', 'j-adverbial-clause', 'j-comparative-adv', 'j-past-cont-vs-past'],
    syn: ['j-join-join-in', 'j-because-since-as'],
    poly: ['right', 'change'],
    chal: [20, 21, 22, 23]
  },
  {
    k: 'g10', seg: 'senior', n: 10, name: '高一', label: '必修一~三',
    goal: '从"会造句"走向"会论证"：学会区分事实、观点与证据强度。',
    topics: ['学业方法', '变化描述', '社会参与', '心理认知', '逻辑关系', '文化认同'],
    gram: ['s-noun-clause', 's-nonfinite', 's-emphasis', 's-inversion'],
    syn: ['s-raise-rise-arise', 's-imply-infer'],
    poly: ['issue', 'present'],
    chal: [24, 25, 26, 27]
  },
  {
    k: 'g11', seg: 'senior', n: 11, name: '高二', label: '选择性必修一~三',
    goal: '在科研、议题、文学语料中识别命题态度、偏见与隐含前提。',
    topics: ['科研方法', '社会议题', '立场表达', '语义精确', '文学分析', '科技数据'],
    gram: ['s-subjunctive', 's-modal-perfect', 's-non-restrictive', 's-participle'],
    syn: ['s-economic-economical', 's-sensible-sensitive'],
    poly: ['subject', 'sound'],
    chal: [28, 29, 30, 31]
  },
  {
    k: 'g12', seg: 'senior', n: 12, name: '高三', label: '总复习 + 高阶',
    goal: '长难句三层穿透与写作意义精确性，把输入真正转化为无歧义的输出。',
    topics: ['语义学', '论证谬误', '人文价值', '时代议题', '高阶动词', '学术名词'],
    gram: ['s-long-sentence', 's-subject-verb-agreement', 's-ellipsis-substitution', 's-absolute'],
    syn: ['s-historic-historical', 's-continual-continuous'],
    poly: ['figure', 'yield'],
    chal: [32, 33, 34, 35]
  }
];

/* ---------- 3. 归一化：紧凑词表 → 标准词条 ---------- */
DBX.EN = function () { return (typeof window !== 'undefined' && window.ENRICH) || {}; };

/* 把富化层（英文释义 / 常用搭配 / 词根关联）注入单个词条；幂等 */
DBX.enrichWord = function (w) {
  var E = DBX.EN();
  var EN = E.en || {}, COL = E.col || {}, RT = E.rt || {};
  var key = String(w.w).toLowerCase();
  var single = w.senses.length === 1;
  w.senses.forEach(function (s, i) {
    if (!s.en) s.en = EN[single ? key : (key + '#' + i)] || '';
  });
  if (!w.col && COL[key]) w.col = COL[key];
  if (!w.rt && RT[key]) w.rt = RT[key];
  return w;
};

DBX.norm = function (raw) {
  return (raw || []).map(function (r) {
    var list = r[3] || [];
    var senses = list.map(function (s) {
      return { g: s[0], en: s[3] || '', ex: s[1], zh: s[2] };
    });
    return DBX.enrichWord({ w: r[0], ph: r[1], tag: r[2], senses: senses, grade: null });
  });
};

/* 分层：精讲层 core（课程精讲 / 多义 / 被近义·多义引用）/ 考纲覆盖层 syllabus */
DBX.tierOf = function (w, coreSet) { return coreSet[String(w.w).toLowerCase()] ? 'core' : 'syllabus'; };


/* ---------- 4. 构建：合并词库与年级技能 ---------- */
DBX.build = function () {
  var DB = window.DB, RAW = window.RAW || {};

  // 4.1 各年级词表归一化 + 打标（跨年级同词只并入一次；G.words 仅保留本年级实际可学词，保证进度统计一致）
  DBX.GRADES.forEach(function (G) {
    var list = DBX.norm(RAW[G.k] || []);
    var have = {};
    DB.words.forEach(function (w) { have[w.w] = 1; });
    var added = [];
    list.forEach(function (w) {
      if (!have[w.w]) { w.grade = G.k; DB.words.push(w); have[w.w] = 1; added.push(w.w); }
    });
    G.words = added;
  });

  // 4.2 原有 39 词标记为高阶精讲
  DB.words.forEach(function (w) { if (!w.grade) w.grade = 'adv'; });

  // 4.3 合并分学段技能语料（年级挑战题优先，同句的基础集条目被剔除，避免同一题出现两次）
  ['gram', 'syn', 'poly', 'chal'].forEach(function (key) {
    var target = key === 'gram' ? 'grammar' : key === 'chal' ? 'challenge' : key;
    var incoming = DBX[key] || [];
    if (key === 'chal') {
      var seen = {};
      incoming.forEach(function (it) { if (it && it.s) seen[it.s] = 1; });
      DB[target] = DB[target].filter(function (it) { return !(it && seen[it.s]); });
    }
    incoming.forEach(function (it) {
      DB[target].push(it);
    });
  });

  // 4.3b 缺失 g 字段的补 'adv'（原 39 词精讲配套，跨年级高阶补充，始终在范围内可见）
  ['grammar', 'syn', 'poly', 'challenge'].forEach(function (key) {
    DB[key].forEach(function (it) { if (it && !it.g) it.g = 'adv'; });
  });
  // 4.3c 按 g 字段动态计算各年级挑战题索引（避免 GRADES 写死索引与实际合并顺序错乱）
  DBX.GRADES.forEach(function (G) {
    G.chal = DB.challenge.map(function (c, i) { return (c && c.g === G.k) ? i : null; }).filter(function (x) { return x !== null; });
  });

  // 4.3d 富化注入 + 分层（精讲层 core / 考纲覆盖层 syllabus）
  var coreSet = {};
  DB.words.forEach(function (w) {
    DBX.enrichWord(w);
    var k = String(w.w).toLowerCase();
    if (w.grade === 'adv' || w.senses.length > 1) coreSet[k] = 1;
  });
  DB.poly.forEach(function (p) { if (p && p.w) coreSet[String(p.w).toLowerCase()] = 1; });
  DB.syn.forEach(function (g) {
    (g.items || []).forEach(function (it) { if (it && it.w) coreSet[String(it.w).toLowerCase()] = 1; });
  });
  DB.tierCount = { core: 0, syllabus: 0 };
  DB.colCount = 0; DB.rtCount = 0;
  DB.words.forEach(function (w) {
    w.tier = DBX.tierOf(w, coreSet);
    DB.tierCount[w.tier]++;
    if (w.col) DB.colCount++;
    if (w.rt) DB.rtCount++;
  });

  // 4.3e 合并富化层新增的词根网络分组（按 root 归并，组内按词去重）
  (DBX.EN().roots || []).forEach(function (g) {
    if (!g || !g.root) return;
    var hit = DB.roots.filter(function (r) { return r.root === g.root; })[0];
    if (hit) {
      (g.words || []).forEach(function (x) {
        if (!hit.words.filter(function (y) { return y.w === x.w; })[0]) hit.words.push(x);
      });
    } else {
      DB.roots.push({ root: g.root, mean: g.mean, words: (g.words || []).slice() });
    }
  });

  // 4.4 索引
  DB.gradeMap = {};
  DBX.GRADES.forEach(function (G) { DB.gradeMap[G.k] = G; });
  DB.segGrades = {};
  DBX.SEGS.forEach(function (s) {
    DB.segGrades[s.k] = DBX.GRADES.filter(function (G) { return G.seg === s.k; });
  });
  DB.wordMap = {};
  DB.words.forEach(function (w) { if (!DB.wordMap[w.w]) DB.wordMap[w.w] = w; });
};
