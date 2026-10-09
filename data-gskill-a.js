/* ============================================================
   辞源 · 分学段技能语料（小学 + 初中）
   语法意义地图 / 近义辨析 / 一词多义 / 真实语料挑战
   ============================================================ */
window.DBX = window.DBX || {};

/* ---------- 小学 · 语法意义地图 ---------- */
DBX.gram = [
  {
    id: 'p-simple', g: 'g3', title: '一般现在时与第三人称单数的 -s', weight: 4,
    q: '为什么 he play 要变成 he plays？这个 -s 到底贡献了什么意义？',
    a: [
      '一般现在时不表示"现在这一刻"，而表示"常态、习惯、事实"——这是它真正的时间意义。',
      '第三人称单数的 -s 不是在变复数，而是在标记"主语是单数第三人称"，把动作锁定在 he / she / it 身上。',
      '少了这个 -s，句子并没有"语法错一点点"，而是把"他习惯做的事"说成了别的意思。'
    ],
    pairs: [
      { s: 'I play football every Saturday.', m: '我踢球——主语是 I，动词用原形' },
      { s: 'He plays football every Saturday.', m: '他踢球——主语是 he，-s 把动作锁在他身上' },
      { s: 'The sun rises in the east.', m: '客观事实：永远如此，所以用一般现在时' },
      { s: 'The sun is rising now.', m: '此刻正在发生：换成进行时，意义立刻变了' }
    ],
    quiz: { q: 'My grandpa ___ tea every morning, not coffee.', options: ['drink', 'drinks', 'drinking', 'is drink'], ans: 1,
      why: 'every morning 表示习惯性常态 → 一般现在时；主语 My grandpa 是第三人称单数 → 动词要加 -s。"他每天早上喝茶"是一个规律，不是此刻正在做的事。' }
  },
  {
    id: 'p-plural', g: 'g3', title: '名词单数与复数：-s 与"可数/不可数"', weight: 4,
    q: '为什么 water 不能加 -s，而 apple 可以？',
    a: [
      '可数名词（能一个一个数）才有复数；不可数名词（水、米、空气）本身就是一个整体概念，不能数。',
      '复数的 -s 贡献的意义是"不止一个"，这直接改变句子的数量命题。',
      '误用单复数不是小错：I like apple 与 I like apples 说的不是同一件事。'
    ],
    pairs: [
      { s: 'I like apples.', m: '我喜欢苹果（这类东西），用复数表示泛指' },
      { s: 'I want an apple.', m: '我想要一个苹果，用单数表示具体一个' },
      { s: 'We need water.', m: '水不可数，没有 waters 这种说法（指"水域"时例外）' },
      { s: 'Two bottles of water, please.', m: '要数就数容器：bottle 可数，所以是 bottles' }
    ],
    quiz: { q: 'There are five ___ in the classroom.', options: ['child', 'childs', 'children', 'childrens'], ans: 2,
      why: 'child 是不规则变化，复数为 children。five 后面必须用复数，否则数量命题自相矛盾。' }
  },
  {
    id: 'p-be', g: 'g3', title: 'am / is / are：主语决定"存在方式"', weight: 3,
    q: '同样表示"是"，为什么要换三个词？',
    a: [
      'be 动词是英语里唯一按人称变形的动词，它把"句子的主人"直接写在动词上。',
      'am 只跟 I；is 跟单数第三人称（he / she / it / 单数名词）；are 跟 you 和所有复数。',
      '这不是死记规则，而是英语"主谓一致"这一意义机制的起点：动词形态必须和主语对得上。'
    ],
    pairs: [
      { s: 'I am a student.', m: '第一人称单数 → am' },
      { s: 'She is my sister.', m: '第三人称单数 → is' },
      { s: 'They are from Xi’an.', m: '复数 → are' },
      { s: 'You are late.', m: 'you 无论单复数都用 are' }
    ],
    quiz: { q: 'The cat ___ under the table now.', options: ['am', 'is', 'are', 'be'], ans: 1,
      why: 'The cat 是第三人称单数 → is。am 只能跟 I；are 用于复数或 you。' }
  },
  {
    id: 'p-article', g: 'g3', title: 'a / an / the：听者知不知道是哪一个', weight: 5,
    q: 'a 和 the 的差别，本质上是信息的差别。',
    a: [
      'a / an = 不定指：说话人判断听者还不知道是哪一个，只说明"有一个、是某一类"。',
      'the = 定指：说话人判断听者已经能确定是哪一个（因为上文提过、语境唯一、或双方共知）。',
      'an 不是另一种冠词，只是 a 在元音音素前的读音形式（an hour，因为 hour 的 h 不发音）。',
      '英语必须每次都做这个判断，中文则常常省略——这是中文母语者最常漏掉的意义标记。'
    ],
    pairs: [
      { s: 'I saw a dog in the street.', m: '第一次提到：有个（不知哪只）' },
      { s: 'The dog was very thin.', m: '第二次提到：就是刚才那只' },
      { s: 'Please close the door.', m: '语境唯一：这屋里只有一扇门' },
      { s: 'She is an English teacher.', m: '职业身份：某一类中的一员' }
    ],
    quiz: { q: 'Look at ___ moon. It is so bright tonight.', options: ['a', 'an', 'the', '不填'], ans: 2,
      why: '月亮在世界里是唯一的，说话人认定听者能确定指的是哪一个 → 定指，用 the。若用 a moon 则暗示"还有别的月亮"，意义荒谬。' }
  },
  {
    id: 'p-there-be', g: 'g4', title: 'There is / There are：先宣告存在，再谈别的', weight: 4,
    q: '为什么不说 The room has a desk，而要说 There is a desk in the room？',
    a: [
      'There be 的意义是"宣告某物存在于某处"，重点在"有 / 没有"这个存在判断本身。',
      'have 的意义是"所属关系"，重点在"归谁所有"。两者关注的是完全不同的事。',
      'There be 还要遵循"就近原则"：be 的形式由紧跟着它的第一个名词决定。'
    ],
    pairs: [
      { s: 'There is a book on the desk.', m: '宣告存在：桌上有本书（谁的不重要）' },
      { s: 'I have a book about birds.', m: '所属关系：我有一本书' },
      { s: 'There are two cats under the bed.', m: '就近名词 two cats 是复数 → are' },
      { s: 'There is a pen and three books here.', m: '就近名词 a pen 是单数 → is' }
    ],
    quiz: { q: '___ some milk in the glass.', options: ['There is', 'There are', 'There have', 'It has'], ans: 0,
      why: 'milk 是不可数名词，按单数处理 → There is。There have 不是英语的存在句结构。' }
  },
  {
    id: 'p-continuous', g: 'g4', title: '现在进行时：此刻正在发生 vs 常态', weight: 5,
    q: 'He reads 和 He is reading 的差别，比"时态"两个字重要得多。',
    a: [
      '现在进行时把动作框进"此刻（或这段时间）正在进行的画面"，强调未完成、进行中。',
      '一般现在时说的是规律与常态：他（平时）读不读，而不是这一刻在不在读。',
      '英语里"知道""喜欢"这类状态动词一般不用进行时，因为它们不是动作，无法"进行"。'
    ],
    pairs: [
      { s: 'He reads the newspaper every day.', m: '习惯：他每天看报' },
      { s: 'He is reading the newspaper now.', m: '此刻：他正在看报' },
      { s: 'She is staying with us this week.', m: '本周这段时间（不是此刻这一秒）' },
      { s: 'I know the answer.', m: '状态动词：一般不说 I am knowing' }
    ],
    quiz: { q: 'Listen! The birds ___ in the tree.', options: ['sing', 'sings', 'are singing', 'is sing'], ans: 2,
      why: 'Listen! 把注意力拉到"此时此刻"，birds 是复数 → are singing。用 sing 会变成"鸟（平时）在树上叫"的习惯陈述，与 Listen! 的意图冲突。' }
  },
  {
    id: 'p-some-any', g: 'g4', title: 'some 与 any：肯定语气与疑问/否定语气', weight: 4,
    q: 'some 和 any 都表示"一些"，为什么不能随便换？',
    a: [
      'some 出现在肯定句中，语气是"确实有一些"。',
      'any 出现在否定句与大多数疑问句中，语气是"有没有都还不知道 / 一点也没有"。',
      '在邀请或请求（Would you like some tea?）中用 some，是因为说话人期待肯定回答——语气本身就是意义。'
    ],
    pairs: [
      { s: 'There is some bread on the table.', m: '肯定：确实有一些面包' },
      { s: 'There is not any bread on the table.', m: '否定：一点面包也没有' },
      { s: 'Do you have any questions?', m: '疑问：还不知道有没有' },
      { s: 'Would you like some tea?', m: '邀请：说话人期待对方说"要"，所以用 some' }
    ],
    quiz: { q: 'We do not have ___ eggs left in the fridge.', options: ['some', 'any', 'a', 'an'], ans: 1,
      why: '否定句中表示"一点也没有"必须用 any。用 some 会与否定词冲突，意义变成自相矛盾。' }
  },
  {
    id: 'p-can', g: 'g4', title: 'can 的三种意义：能力、许可、请求', weight: 4,
    q: 'I can swim 与 Can I swim here? 里的 can 是同一个意思吗？',
    a: [
      '能力：I can swim（我会游泳）— 说的是主语具备什么本事。',
      '许可：You can go now（你现在可以走了）— 说的是规则或权威允许不允许。',
      '请求：Can you help me?（你能帮我吗）— 表面问能力，实际是在发出请求。',
      '所以理解 can 必须看语境：问"能力"还是"允许"还是"请求"，意义完全不同。'
    ],
    pairs: [
      { s: 'She can speak three languages.', m: '能力：她会三种语言' },
      { s: 'You can use my pen.', m: '许可：我允许你用' },
      { s: 'Can you open the window?', m: '请求：请开窗' },
      { s: 'I cannot come tomorrow.', m: '能力或条件不允许，不是"禁止"' }
    ],
    quiz: { q: '___ you pass me the salt, please?', options: ['Must', 'Can', 'Need', 'Shall'], ans: 1,
      why: '这是一个礼貌请求，英语中最常用 Can you...? / Could you...?。用 Must you 会变成"你非得递盐吗"，带责备意味，意义完全走偏。' }
  },
  {
    id: 'p-frequency', g: 'g5', title: '频度副词：位置本身就是意义', weight: 4,
    q: 'always / usually / often / sometimes / never 到底差在哪？',
    a: [
      '这一组词构成一条从 100% 到 0% 的频率刻度：always > usually > often > sometimes > never。',
      '它们放在 be 动词之后、实义动词之前——位置错了，句子就不像英语。',
      'never 本身就是否定词，句子里不能再加 not，否则变成双重否定。'
    ],
    pairs: [
      { s: 'He always gets up at six.', m: '100%：从来没有例外' },
      { s: 'He usually gets up at six.', m: '约 80%：大多如此' },
      { s: 'He sometimes gets up late.', m: '约 30%：偶尔' },
      { s: 'He never eats before seven.', m: '0%：从不（本身已是否定）' }
    ],
    quiz: { q: 'She ___ goes to school by bus — about five days a week.', options: ['never', 'sometimes', 'usually', 'not'], ans: 2,
      why: '一周五天 ≈ 大多数时间 → usually。若用 sometimes（偶尔）就低估了频率，若用 never 则与事实相反。' }
  },
  {
    id: 'p-comparative', g: 'g5', title: '比较级 -er / more：差别有多大', weight: 5,
    q: '为什么有时加 -er，有时用 more？',
    a: [
      '短词（一般一个音节）加 -er：tall → taller，fast → faster。',
      '长词（三个音节以上）用 more：beautiful → more beautiful。',
      '比较级必须有比较对象或 than 短语，否则读者会追问"比谁？"——比较构成一个未完成的命题。',
      'much / a lot / far 可以加强比较：much taller 表示差距明显。'
    ],
    pairs: [
      { s: 'Tom is taller than Jim.', m: '两者比较：明确给出比较对象' },
      { s: 'This book is more interesting.', m: '缺少 than：暗示"比刚才提到的那本"' },
      { s: 'He is much taller than me.', m: 'much 强调差距大' },
      { s: 'The weather is getting colder.', m: '与过去状态比较：越来越冷' }
    ],
    quiz: { q: 'This question is ___ than that one.', options: ['difficult', 'more difficult', 'difficulter', 'most difficult'], ans: 1,
      why: 'difficult 有三个音节 → 用 more 而非 -er。句中有 than，必须用比较级，原级 difficult 不成立。' }
  },
  {
    id: 'p-superlative', g: 'g5', title: '最高级 -est / most：在一组里排第一', weight: 4,
    q: '比较级和最高级的意义差别，是"两个"与"一群"的差别。',
    a: [
      '比较级用于两者之间的相对比较；最高级用于三者及以上中的极点。',
      '最高级前通常要加 the，因为被比较的对象集合是确定的。',
      '最高级常带一个范围短语：in our class / of the three / I have ever seen。'
    ],
    pairs: [
      { s: 'Tom is taller than Jim.', m: '两个人比：比较级' },
      { s: 'Tom is the tallest in our class.', m: '全班范围：最高级' },
      { s: 'This is the best film I have ever seen.', m: '范围 = 我看过的所有电影' },
      { s: 'She runs (the) fastest of the three.', m: '三者中：最高级，副词前的 the 可省' }
    ],
    quiz: { q: 'The Changjiang River is ___ river in China.', options: ['long', 'longer', 'the longest', 'most long'], ans: 2,
      why: 'in China 给出的是包含众多河流的范围 → 最高级。long 是单音节词，最高级为 the longest，不用 most long。' }
  },
  {
    id: 'p-past', g: 'g5', title: '一般过去时：把事件放进已结束的时间', weight: 5,
    q: '过去时的意义不是"发生在过去"，而是"与现在切断"。',
    a: [
      '一般过去时把动作钉在一个已结束的过去时间点：yesterday、last year、in 2010。',
      '它与现在的关系是"无关"——只报告事实，不谈当下后果。',
      '一旦说话人想说"这件事对现在还有影响"，就必须改用现在完成时，这是最关键的转折点。'
    ],
    pairs: [
      { s: 'I lost my key yesterday.', m: '只报告过去发生的事（现在找到没有，没说）' },
      { s: 'I have lost my key.', m: '重点在当下：我现在没有钥匙' },
      { s: 'She lived here for five years.', m: '她已不住这儿了' },
      { s: 'She has lived here for five years.', m: '她现在还住这儿' }
    ],
    quiz: { q: 'We ___ the museum last Sunday.', options: ['visit', 'have visited', 'visited', 'are visiting'], ans: 2,
      why: 'last Sunday 是一个已结束的过去时间点 → 一般过去时。现在完成时不能与明确的过去时间点连用，因为它关心的是"现在"。' }
  },
  {
    id: 'p-future', g: 'g6', title: 'will 与 be going to：临时决定 vs 已有打算', weight: 5,
    q: '两种"将来"说的不是同一件事。',
    a: [
      'be going to 表示说话之前就已经有的打算，或有证据显示即将发生（Look at the sky! It is going to rain）。',
      'will 常表示说话当下才做出的决定或承诺（I will answer the phone）。',
      'will 还承担"客观预测"：The train will arrive at nine（时刻表如此）。'
    ],
    pairs: [
      { s: 'I am going to study medicine.', m: '长久以来的打算' },
      { s: 'The phone is ringing. — I will get it.', m: '此刻才做的决定' },
      { s: 'Look at those clouds. It is going to rain.', m: '有证据：云已在那儿' },
      { s: 'She will be twelve next month.', m: '客观预测（时间自然推移）' }
    ],
    quiz: { q: '— We have no salt left. — Really? I ___ some from the shop.', options: ['buy', 'will buy', 'am buying', 'bought'], ans: 1,
      why: '听到"没盐了"这个新情况后当场做出决定 → will buy。若用 am going to buy 则暗示早有计划，与"才知道"的情境矛盾。' }
  },
  {
    id: 'p-imperative', g: 'g6', title: '祈使句：句子的意义就是"让某事发生"', weight: 3,
    q: '没有主语的句子，主语是谁？',
    a: [
      '祈使句省略主语 you，因为说话对象就在眼前，不需要再指名。',
      '它的言语行为不是"描述"，而是"促使"：命令、请求、指示、警告。',
      '否定形式要借 do not / never 开头，不能用 not 直接否定。'
    ],
    pairs: [
      { s: 'Open your books at page ten.', m: '课堂指示' },
      { s: 'Do not run in the hall.', m: '禁止（必须用 do not）' },
      { s: 'Never give up.', m: '强调式禁止 / 劝诫' },
      { s: 'Please be quiet.', m: '加 please 把命令转为请求' }
    ],
    quiz: { q: '___ careful with that knife — it is very sharp.', options: ['Be', 'Are', 'Being', 'Do be careful'], ans: 0,
      why: '祈使句以动词原形开头，be 动词的原形就是 Be。Are 是陈述句形式，不能用来发指令。' }
  },
  {
    id: 'p-modal-must', g: 'g6', title: 'must / must not / need not：三种完全不同的"不"', weight: 5,
    q: 'must not 和 need not 差在一个字，意义上却相反。',
    a: [
      'must = 必须（说话人施加强制）；must not = 禁止（明确不许做）。',
      'need not = 不必（做不做都行，没有义务）——它否定的不是动作，而是"义务"。',
      '把 must not 当成"不必"用，会把"禁止吸烟"说成"可以不吸烟"，意义强度天差地别。'
    ],
    pairs: [
      { s: 'You must wear a helmet here.', m: '强制：必须戴' },
      { s: 'You must not smoke here.', m: '禁止：绝对不能抽' },
      { s: 'You need not come tomorrow.', m: '不必：来不来都可以' },
      { s: 'You do not need to pay now.', m: '等于 need not：此刻没有付款义务' }
    ],
    quiz: { q: 'You ___ tell anyone. It is a secret between us.', options: ['must not', 'need not', 'not need', 'must'], ans: 0,
      why: '后句说明"这是我们之间的秘密"→ 说话人要求的是禁止外泄，必须用 must not。用 need not 会变成"你不必告诉任何人"，完全没有保密的强制力。' }
  },
  {
    id: 'p-because-so', g: 'g6', title: 'because 与 so：因果的两头不能都用', weight: 4,
    q: '为什么不能说 Because it rained, so we stayed home？',
    a: [
      'because 从"原因"出发引出结果；so 从"结果"出发承接原因。一个句子只用一头。',
      '两者同时出现会造成结构重复——英语不允许。',
      'because 引导的从句位置不同，强调的重点也不同：句首强调原因，句中强调结果。'
    ],
    pairs: [
      { s: 'We stayed home because it rained.', m: '重点在结果：我们待在家' },
      { s: 'Because it rained, we stayed home.', m: '重点在原因：因为下雨' },
      { s: 'It rained, so we stayed home.', m: '用 so 承接，不再用 because' },
      { s: 'Because it rained, we stayed home.', m: '正确：只保留 because 一头' }
    ],
    quiz: { q: 'She was tired, ___ she went to bed early.', options: ['because', 'so', 'but', 'and'], ans: 1,
      why: '前半句是原因（她累了），后半句是结果（早睡）→ 用 so 承接。此处若用 because 就变成"她累了，因为她早睡了"，因果倒置。' }
  },

  /* ---------- 初中 · 语法意义地图 ---------- */
  {
    id: 'j-past-vs-perfect', g: 'g7', title: '现在完成时：把过去与现在接起来', weight: 5,
    q: '现在完成时到底"完成"了什么？',
    a: [
      '它不表示"动作已经结束"，而表示"过去的事与现在的状态相连"。',
      '说话人关心的从来不是事情发生在哪一天，而是它现在造成了什么结果。',
      '这就是为什么它不能与 yesterday、last year 这类已结束的时间点连用。'
    ],
    pairs: [
      { s: 'I have finished my homework.', m: '关心的是现在：我现在可以出去玩了' },
      { s: 'I finished my homework at eight.', m: '只报告：八点做完的（与现在无关）' },
      { s: 'Have you ever been to Dunhuang?', m: '问的是人生经历，不问具体时间' },
      { s: 'He has worked here since 2019.', m: '从 2019 延续到现在，他还在' }
    ],
    quiz: { q: '— Do you know the way to the station? — Sorry, I ___ there before.', options: ['never went', 'have never been', 'did not go', 'do not go'], ans: 1,
      why: '回答的是"到目前为止的人生经历中有没有去过"，与现在（认不认识路）直接相关 → 现在完成时。一般过去时 never went 需要搭配一个过去时间点才自然。' }
  },
  {
    id: 'j-present-cont-vs-simple', g: 'g7', title: '现在进行时 vs 一般现在时的深层对立', weight: 4,
    q: '一个是"画面"，一个是"规律"。',
    a: [
      '进行时给你一段正在展开的画面；一般现在时给你一条可以概括的规律。',
      '与 always 连用时，进行时反而表示抱怨：He is always complaining（他老抱怨）。',
      '状态动词（know、like、belong）通常不用进行时，因为它们不是可以展开的动作。'
    ],
    pairs: [
      { s: 'He works in a bank.', m: '职业常态' },
      { s: 'He is working late tonight.', m: '今晚这段时间，仅限今晚' },
      { s: 'He is always losing his keys.', m: '反复发生 + 说话人不满' },
      { s: 'I think you are right.', m: 'think 表状态，一般不用进行时' }
    ],
    quiz: { q: 'She ___ for a big company, but this month she is helping at her father is shop.', options: ['works', 'is working', 'worked', 'work'], ans: 0,
      why: '前半句说的是长期职业（在大公司工作），用一般现在时；后半句 this month 限定当下这段时间，才用进行时。两者对照正是这一时态对立的意义。' }
  },
  {
    id: 'j-have-been-gone', g: 'g7', title: 'have been to 与 have gone to：回来没回来', weight: 5,
    q: '一词之差，说的是"人在不在这儿"。',
    a: [
      'have been to = 去过（已回来），说话时本人在场，谈的是经历。',
      'have gone to = 去了（还没回来），说话时本人不在这儿。',
      '因此 have gone to 不能用于第一人称 I / We——你不可能一边说话一边不在场。'
    ],
    pairs: [
      { s: 'I have been to Beijing twice.', m: '去过两次，现在我在这儿' },
      { s: 'She has gone to Beijing.', m: '她去北京了，现在不在这里' },
      { s: 'Have you ever been to Dunhuang?', m: '问经历：你去过吗' },
      { s: 'Where is Tom? — He has gone to the library.', m: '他人不在，所以查问去向' }
    ],
    quiz: { q: '— Is your mother at home? — No, she ___ to the market.', options: ['has been', 'has gone', 'went', 'goes'], ans: 1,
      why: '答句说"不在家"→ 人去了还没回来，用 has gone to。若用 has been to 则表示去过市场且已回来，与"不在家"矛盾。' }
  },
  {
    id: 'j-future-forms', g: 'g7', title: '将来时的四种说法：差别在"确定性"', weight: 5,
    q: 'will / be going to / 现在进行时 / 一般现在时，都在说将来，意义不同在哪？',
    a: [
      'be going to：说话前已有打算，或有眼下证据。',
      'will：说话当下做的决定，或客观预测。',
      '现在进行时：已经安排好的、动了起来的事（常带时间地点）。',
      '一般现在时：时刻表、日程这类"不会因人的意志改变"的将来。'
    ],
    pairs: [
      { s: 'I am going to learn the piano.', m: '早有打算' },
      { s: 'I will help you with that box.', m: '当下决定帮忙' },
      { s: 'We are leaving at six tomorrow.', m: '已安排并准备好：票买好了' },
      { s: 'The train leaves at six.', m: '时刻表：不随人变' }
    ],
    quiz: { q: 'The plane ___ at 9:40; we must be at the airport by 8.', options: ['will take off', 'takes off', 'is taking off', 'took off'], ans: 1,
      why: '航班时刻属于固定日程，不随说话人意志改变 → 一般现在时表将来。is taking off 会暗示"即将起飞"的当下画面，与后文"八点前到机场"矛盾。' }
  },
  {
    id: 'j-passive', g: 'g8', title: '被动语态：不是换说法，是重新分配焦点与责任', weight: 5,
    q: '为什么有人刻意用被动语态？',
    a: [
      '被动把"承受者"放到句首，让它成为话题的焦点。',
      '它还可以干脆省略施事（by 短语），用来回避"是谁干的"这个问题。',
      '学术写作常用被动，是因为要强调的是过程与结果，而不是做实验的人。'
    ],
    pairs: [
      { s: 'Someone broke the window.', m: '焦点在做这件事的人' },
      { s: 'The window was broken.', m: '焦点在窗户，谁干的不提' },
      { s: 'Mistakes were made.', m: '经典回避责任的表达：谁犯的错，被抹掉了' },
      { s: 'The water was tested three times.', m: '学术语境：强调流程而非操作者' }
    ],
    quiz: { q: '把 "They built this bridge in 1998" 改为被动，并说明意义变化：', options: ['This bridge built in 1998 — 意义不变', 'This bridge was built in 1998 — 焦点从建造者转到桥本身', 'This bridge is building in 1998 — 强调过程', 'This bridge has built in 1998 — 强调现在'], ans: 1,
      why: '被动语态的意义核心是"信息焦点与责任的再分配"。原句要谈 They；改后要谈这座桥——如果你接下来要讲的是桥的历史，就必须用被动。' }
  },
  {
    id: 'j-modal-speculate', g: 'g8', title: '情态动词表推测：证据有多强', weight: 5,
    q: 'must / might / can not 表示的不是可能性大小，而是说话人的把握。',
    a: [
      'must（一定）：有很强的证据，说话人几乎肯定。',
      'might / may / could（可能）：证据不足，说话人留有余地。',
      'can not（不可能）：有证据否定，说话人几乎肯定"不是"。',
      '注意：表推测的 must 的否定不是 must not（禁止），而是 can not。'
    ],
    pairs: [
      { s: 'He must be tired. He worked all night.', m: '有证据：干了通宵 → 几乎肯定' },
      { s: 'He might be tired.', m: '没有证据，只是猜测' },
      { s: 'He cannot be tired. He just slept.', m: '有反证：刚睡过 → 几乎可以排除' },
      { s: 'He must not come in.', m: '这不是推测，而是"禁止他进来"' }
    ],
    quiz: { q: 'The light in his room is on. He ___ be at home.', options: ['must', 'must not', 'can not', 'might not'], ans: 0,
      why: '灯亮着是一个强证据 → 说话人几乎肯定他在家，用 must。can not 表示"不可能"，与证据方向相反。' }
  },
  {
    id: 'j-object-clause', g: 'g8', title: '宾语从句：that / if / whether 承担的意义', weight: 4,
    q: '引导词不同，句子承诺的东西不同。',
    a: [
      'that：引导一个被当作事实陈述的内容（that 常可省略）。',
      'if / whether：引导一个"是与否尚未确定"的内容，意义是"不确定"。',
      '宾语从句必须用陈述语序：I wonder where he is，而不是 where is he。'
    ],
    pairs: [
      { s: 'I think (that) he is right.', m: '把"他对"当作一个陈述来报告' },
      { s: 'I do not know if he is right.', m: '不确定：对不对还不知道' },
      { s: 'Do you know where he lives?', m: '从句用陈述语序 lives，不是 does he live' },
      { s: 'I am not sure whether he will come.', m: 'whether 后可直接跟 or not' }
    ],
    quiz: { q: 'Could you tell me ___?', options: ['where is the station', 'where the station is', 'where does the station', 'the station is where'], ans: 1,
      why: '宾语从句必须用陈述语序 → where the station is。这是英语从句的根本规则：疑问词提前后，后面跟的是正常的主谓结构。' }
  },
  {
    id: 'j-used-to', g: 'g8', title: 'used to：一段已经关闭的过去', weight: 5,
    q: 'used to 的意义重点在"现在不再如此"。',
    a: [
      'used to + 动词原形：过去经常或曾经处于某状态，但现在已经不是了。',
      '它与 would 的区别：would 只用于过去反复的动作，不能表示过去的状态。',
      '它也与 be used to doing（习惯于）完全不同——后者 to 是介词，后面跟 -ing。'
    ],
    pairs: [
      { s: 'He used to smoke.', m: '过去抽烟，现在不抽了' },
      { s: 'He would smoke after dinner.', m: '只说过去习惯性动作，不保证现在戒烟' },
      { s: 'There used to be a shop here.', m: '过去有，现在没了（状态）' },
      { s: 'I am used to getting up early.', m: '习惯于早起（现在仍然如此）' }
    ],
    quiz: { q: 'There ___ a small river behind our village, but it dried up years ago.', options: ['used to be', 'is used to be', 'used to being', 'would be'], ans: 0,
      why: '表示"过去存在、现在已不存在"的状态必须用 used to be。would be 不能表示过去状态；is used to be 结构错误。' }
  },
  {
    id: 'j-attributive-clause', g: 'g9', title: '定语从句：用一个句子去"锁定"一个名词', weight: 5,
    q: 'who / which / that / whose 的选择，其实是语义的选择。',
    a: [
      'who 指人，which 指物，that 两者皆可（限定性从句中）。',
      'whose 表示所属：the boy whose father is a doctor。',
      '限定性从句（无逗号）用来"识别是哪一个"；非限定性从句（有逗号）只是补充说明，删掉不影响身份识别。',
      '当先行词被 the only、最高级、all 等修饰时，通常用 that。'
    ],
    pairs: [
      { s: 'The girl who is singing is my sister.', m: 'who 指人，限定是哪一个女孩' },
      { s: 'The book which is on the desk is mine.', m: 'which 指物' },
      { s: 'My brother, who lives in Xi’an, is a doctor.', m: '有逗号：补充说明，删掉也知道是谁' },
      { s: 'This is the best film that I have ever seen.', m: '最高级修饰 → 用 that' }
    ],
    quiz: { q: 'The teacher ___ son is in our class spoke to us yesterday.', options: ['who', 'which', 'whose', 'that'], ans: 2,
      why: '此处需要"老师的儿子"这一所属关系 → whose。whose 在定语从句中作定语，后接名词，这是它不可替代的意义功能。' }
  },
  {
    id: 'j-adverbial-clause', g: 'g9', title: '状语从句：when / while / because / if 编织的逻辑', weight: 4,
    q: '连接词不同，两个事件之间的逻辑关系就不同。',
    a: [
      'when：一个时间点或时间段（可接短暂或持续动作）。',
      'while：强调"在…期间"，从句动词必须是持续性的，常与进行时连用。',
      'because 给原因，if 给条件，although 给让步——选错连接词，逻辑关系就错了。',
      '时间状语从句中用一般现在时表示将来：I will call you when I get home。'
    ],
    pairs: [
      { s: 'I was reading while he was cooking.', m: '两个持续性动作同时进行' },
      { s: 'I was reading when he came in.', m: '一个持续动作被一个瞬间动作打断' },
      { s: 'I will call you when I get home.', m: '从句用一般现在时表将来' },
      { s: 'Although it rained, we went out.', m: '让步：与预期相反' }
    ],
    quiz: { q: '___ I was walking home, I met an old friend.', options: ['When', 'While', 'Because', 'If'], ans: 0,
      why: 'met（遇见）是瞬间动作，不能与 while 搭配——while 要求从句是持续性的。用 when 表示"正在走的时候（突然）遇见"。' }
  },
  {
    id: 'j-comparative-adv', g: 'g9', title: 'as...as / 比较级 + and + 比较级', weight: 4,
    q: '比较结构的进阶：相等、递增与"越…越…"。',
    a: [
      'as + 原级 + as：两者在某方面相等；否定时用 not as/so...as。',
      '比较级 + and + 比较级：越来越…（colder and colder）。',
      'the + 比较级..., the + 比较级...：越…越…（The more, the better）。'
    ],
    pairs: [
      { s: 'This river is as long as that one.', m: '长度相等' },
      { s: 'This river is not as long as that one.', m: '不如那条长' },
      { s: 'It is getting colder and colder.', m: '越来越冷' },
      { s: 'The more you read, the more you know.', m: '越读越懂' }
    ],
    quiz: { q: '___ you practise, ___ your English will be.', options: ['More; better', 'The more; the better', 'The most; the best', 'More; the better'], ans: 1,
      why: '"越…就越…"必须用 the + 比较级 的双 the 结构。缺了前面的 the，句子就失去了"两者联动"的意义，只是两个孤立的比较。' }
  },
  {
    id: 'j-past-cont-vs-past', g: 'g9', title: '过去进行时：为事件提供背景', weight: 4,
    q: '过去进行时不是"过去正在做"，而是"铺背景"。',
    a: [
      '它常用来铺陈一个较长的背景动作，再由一般过去时的短动作切入。',
      '两个过去进行时的动作并列，表示同时进行。',
      '只说"当时正在做"而没有后续事件，句子会显得没有结束感。'
    ],
    pairs: [
      { s: 'I was reading when the light went out.', m: '阅读是背景，停电是事件' },
      { s: 'While I was reading, my sister was sleeping.', m: '两个背景动作同时进行' },
      { s: 'At eight last night I was doing homework.', m: '给一个时间点上的画面' },
      { s: 'I read the book yesterday.', m: '只报告：读完了' }
    ],
    quiz: { q: 'He ___ his bike when it suddenly started to rain.', options: ['rode', 'was riding', 'rides', 'has ridden'], ans: 1,
      why: '"正在骑车"是背景，"突然下雨"是切入的事件 → 背景用过去进行时。用 rode 会把两件事都变成先后发生的独立事件，丢失了"正在…突然…"的画面。' }
  }
];

/* ---------- 小学 · 近义词辨析 ---------- */
DBX.syn = [
  {
    id: 's-look-see-watch', g: 'g3', title: 'look / see / watch',
    note: '中文都说"看"，但英语分得很清楚：look 是"主动把目光投向"，see 是"看见（结果）"，watch 是"盯着看一段时间的变化"。',
    items: [
      { w: 'look', core: '主动投向', must: '强调动作本身，常接 at：Look at the blackboard', ex: 'Look at the bird in the tree!', zh: '快看树上那只鸟！', wrong: '✗ I looked a bird.（不及物，需加 at）' },
      { w: 'see', core: '看见（结果）', must: '强调"映入眼帘"这个结果，不用于祈使命令', ex: 'I can see a bird in the tree.', zh: '我能看见树上有一只鸟。', wrong: '✗ I am seeing a bird.（see 表结果，通常不用进行时）' },
      { w: 'watch', core: '注视变化', must: '强调"盯着看一段时间"，常用于电视、比赛', ex: 'We watch TV after dinner.', zh: '我们晚饭后看电视。', wrong: '✗ Let us watch at the picture.（watch 直接接宾语）' }
    ],
    quiz: { ex: '___ the blackboard, please. Can you ___ the words clearly?', options: ['Look at; see', 'See; look at', 'Watch; look', 'Look; watch'], ans: 0,
      why: '第一空是"把目光投过去"这个动作 → look at；第二空问的是"看不看得见"这个结果 → see。顺序不能颠倒。' }
  },
  {
    id: 's-big-large-great', g: 'g3', title: 'big / large / great',
    note: '三个词都能译作"大"，但 big 最口语、强调体积或重要性；large 偏正式、强调面积与数量；great 常表示"伟大、了不起"，带有评价色彩。',
    items: [
      { w: 'big', core: '体积/重要性', must: '口语中最常用，可指尺寸也可指重要程度', ex: 'They live in a big house.', zh: '他们住在一栋大房子里。', wrong: '✗ a big number（数量大应用 large）' },
      { w: 'large', core: '面积/数量', must: '较正式，常用于尺寸、数量、规模', ex: 'China has a large population.', zh: '中国人口众多。', wrong: '✗ a large brother（兄弟不能用 large 形容）' },
      { w: 'great', core: '伟大/极好', must: '带赞美与评价：a great man / a great idea', ex: 'He is a great teacher.', zh: '他是位了不起的老师。', wrong: '✗ a great house（会听成"这房子很棒"，而非"很大"）' }
    ],
    quiz: { ex: 'Yuan Longping was a ___ scientist.', options: ['big', 'large', 'great', 'huge'], ans: 2,
      why: '此处要表达的是敬佩与评价"伟大的科学家"，只有 great 承载这层意义。用 big/large 只描述身形或规模，情感完全不对。' }
  },
  {
    id: 's-house-home-family', g: 'g4', title: 'house / home / family',
    note: 'house 指建筑物，home 指"家"这个情感与生活空间，family 指家庭成员——三者指向的对象根本不同。',
    items: [
      { w: 'house', core: '建筑物', must: '可数，指具体的房子', ex: 'They bought a house near the park.', zh: '他们在公园附近买了栋房子。', wrong: '✗ I go to house.（回家是 go home，不加 to）' },
      { w: 'home', core: '情感归属', must: '强调归属感，副词用法：go home / at home', ex: 'I go home at five every day.', zh: '我每天五点回家。', wrong: '✗ I go to my home every day.（强调归属时不加 to）' },
      { w: 'family', core: '家庭成员', must: '集合名词，指人；强调整体时谓语用单数', ex: 'My family is very large.', zh: '我的家庭很大。', wrong: '✗ My family are five people.（应用 There are five people in my family）' }
    ],
    quiz: { ex: 'There are five people in my ___, and we all live in a small ___.', options: ['home; family', 'family; house', 'house; home', 'family; home'], ans: 1,
      why: '第一空指"五口人"→ family；第二空指"住的房子"→ house。若说 live in a small home，意思变成"生活在一个小家庭里"，与"房子"的所指不符。' }
  },
  {
    id: 's-listen-hear', g: 'g4', title: 'listen / hear',
    note: 'listen 是"主动去听"的动作，hear 是"听见了"的结果——与 look/see 的对立完全一致。',
    items: [
      { w: 'listen', core: '主动去听', must: '不及物，需加 to：listen to music', ex: 'Listen to me, please.', zh: '请听我说。', wrong: '✗ Listen me.（必须加 to）' },
      { w: 'hear', core: '听见（结果）', must: '及物，直接接宾语；不用于进行时表结果', ex: 'I heard a strange noise last night.', zh: '昨晚我听见一个奇怪的声音。', wrong: '✗ I am hearing you.（听见是瞬间结果，不用进行时）' }
    ],
    quiz: { ex: 'I ___ carefully but could ___ nothing in the dark room.', options: ['heard; listen', 'listened; hear', 'listened to; hear', 'hear; listen'], ans: 1,
      why: '第一空是"努力去听"的动作 → listened（后面无宾语，不加 to）；第二空是"什么也没听见"的结果 → hear。动作与结果的对立正是这两个词的分工。' }
  },
  {
    id: 's-bring-take-carry', g: 'g5', title: 'bring / take / carry',
    note: '三个词都和"拿"有关，区别在于方向与方式：bring 是朝说话人而来，take 是离开说话人而去，carry 强调"搬运"这个负重动作，不指定方向。',
    items: [
      { w: 'bring', core: '带来（向内）', must: '朝说话人所在的方向移动', ex: 'Bring your homework to school tomorrow.', zh: '明天把作业带到学校来。', wrong: '✗ Take it here.（here 与 take 方向冲突，应为 bring）' },
      { w: 'take', core: '带走（向外）', must: '离开说话人所在的方向', ex: 'Take an umbrella with you. It may rain.', zh: '带把伞，可能会下雨。', wrong: '✗ Bring this book to your sister.（若说话人不在姐姐那里，应用 take）' },
      { w: 'carry', core: '搬运（负重）', must: '强调"抱着、扛着"的负重状态，不指定方向', ex: 'He carried the box up the stairs.', zh: '他把箱子搬上了楼。', wrong: '✗ Carry me your book.（carry 没有"递给"的意义）' }
    ],
    quiz: { ex: 'When you come to my party, please ___ your little sister with you.', options: ['bring', 'take', 'carry', 'fetch'], ans: 0,
      why: '说话人在聚会现场，请求对方把妹妹"带到自己这儿来"→ bring。若说话人不在现场则会说 take；carry 会让人以为要把妹妹抱着走。' }
  },
  {
    id: 's-many-much', g: 'g5', title: 'many / much / a lot of',
    note: 'many 修饰可数复数，much 修饰不可数名词；a lot of 两者皆可，但多用于肯定句。',
    items: [
      { w: 'many', core: '可数复数', must: '后接可数名词复数：many books / many people', ex: 'There are many students in the hall.', zh: '礼堂里有很多学生。', wrong: '✗ many water（water 不可数）' },
      { w: 'much', core: '不可数', must: '后接不可数名词：much time / much money', ex: 'We do not have much time left.', zh: '我们剩下的时间不多了。', wrong: '✗ much books（books 可数）' },
      { w: 'a lot of', core: '两者皆可', must: '肯定句中常用；口语里比 many/much 自然', ex: 'She has a lot of friends.', zh: '她有很多朋友。', wrong: '✗ It is a lot of colder.（不能修饰比较级，应用 much colder）' }
    ],
    quiz: { ex: 'How ___ milk do you want in your coffee?', options: ['many', 'much', 'many of', 'a lot'], ans: 1,
      why: 'milk 不可数 → much。值得注意的是：加强比较级时也用 much（much better），但那是副词用法，与"数量多少"无关。' }
  },
  {
    id: 's-wear-put-on-dress', g: 'g6', title: 'wear / put on / dress',
    note: 'wear 是"穿着"的状态，put on 是"穿上"的动作，dress 是"给（人）穿衣服"——状态、动作、对象三者不同。',
    items: [
      { w: 'wear', core: '穿着（状态）', must: '强调身上正穿着什么，可持续', ex: 'She wears a red coat today.', zh: '她今天穿着一件红外套。', wrong: '✗ She is wearing a coat now to go out.（若强调"穿"的动作，应用 putting on）' },
      { w: 'put on', core: '穿上（动作）', must: '强调"穿"这个瞬间动作', ex: 'Put on your shoes. We are leaving.', zh: '穿上鞋，我们要走了。', wrong: '✗ He put on a blue shirt all day.（动作不能持续一整天）' },
      { w: 'dress', core: '给…穿衣', must: '宾语通常是人：dress the baby / dress oneself', ex: 'The boy can dress himself now.', zh: '这男孩现在能自己穿衣服了。', wrong: '✗ She dressed a red coat.（dress 的宾语应是人）' }
    ],
    quiz: { ex: 'It is cold outside. ___ your coat before you go out.', options: ['Wear', 'Put on', 'Dress', 'Have on'], ans: 1,
      why: '出门前"穿上外套"是一个动作 → put on。用 wear 会变成"穿着外套"的状态指令，与"出门前"这个时间点不吻合。' }
  },
  {
    id: 's-say-speak', g: 'g6', title: 'say / speak / talk / tell（小学版）',
    note: '小学阶段先抓住最实用的一条：say 后面跟"说的内容"，speak 后面跟"说的语言"，talk 强调"有来有回"，tell 必须带"告诉谁"。',
    items: [
      { w: 'say', core: '内容', must: 'say + 话语内容；不能直接接人', ex: 'He said "good morning" to us.', zh: '他对我们说了声早上好。', wrong: '✗ He said me the news.（应用 told me）' },
      { w: 'speak', core: '语言/开口', must: 'speak + 语言；speak to sb', ex: 'She speaks English very well.', zh: '她英语说得很好。', wrong: '✗ I spoke him about it.（应为 spoke to him）' },
      { w: 'talk', core: '双向交谈', must: 'talk with/to sb about sth', ex: 'We talked about the film for an hour.', zh: '我们聊了一小时这部电影。', wrong: '✗ He talked French.（语言用 speak）' },
      { w: 'tell', core: '告诉某人', must: 'tell sb sth / tell sb to do', ex: 'Tell me the truth, please.', zh: '请告诉我真相。', wrong: '✗ He told that he was tired.（tell 不接 that 从句表示"说"）' }
    ],
    quiz: { ex: 'My grandma ___ me a story every night before bed.', options: ['says', 'speaks', 'talks', 'tells'], ans: 3,
      why: '句中出现了"被告知的人 me"，且内容是故事 → tells。这是 tell 最典型的用法：tell sb a story。' }
  },

  /* ---------- 初中 · 近义词辨析 ---------- */
  {
    id: 'j-borrow-lend', g: 'g7', title: 'borrow / lend / keep',
    note: '三个词都涉及"借"，但方向与时间完全不同：borrow 是"借入"，lend 是"借出"，keep 表示"借了多久"（延续性）。',
    items: [
      { w: 'borrow', core: '借入', must: 'borrow sth from sb：从别人那里借来', ex: 'I borrowed a book from the library.', zh: '我从图书馆借了一本书。', wrong: '✗ I borrowed it for two weeks.（borrow 是瞬间动作，不能接时间段）' },
      { w: 'lend', core: '借出', must: 'lend sb sth / lend sth to sb', ex: 'Can you lend me your ruler?', zh: '你能把尺子借给我吗？', wrong: '✗ Can you borrow me your ruler?（方向反了）' },
      { w: 'keep', core: '保留（延续）', must: '与 for + 时间段连用，表示"借了多久"', ex: 'You can keep the book for two weeks.', zh: '这本书你可以借两周。', wrong: '✗ You can borrow the book for two weeks.' }
    ],
    quiz: { ex: '— How long can I ___ this book? — For two weeks.', options: ['borrow', 'lend', 'keep', 'buy'], ans: 2,
      why: 'How long 要求一个能延续的动作，borrow/lend 都是瞬间动作，只有 keep 能接 for two weeks。这是中考最高频的辨析点之一。' }
  },
  {
    id: 'j-spend-cost-take-pay', g: 'g7', title: 'spend / cost / take / pay',
    note: '四个词都表示"花费"，区别在于"谁作主语"以及"花的是时间还是钱"。',
    items: [
      { w: 'spend', core: '人花时间/钱', must: '主语是人：sb spend time/money on sth / (in) doing', ex: 'I spend two hours reading every day.', zh: '我每天花两小时阅读。', wrong: '✗ It spends me two hours.（主语不能是 it）' },
      { w: 'cost', core: '东西花（钱）', must: '主语是物：sth cost (sb) money', ex: 'The book cost me twenty yuan.', zh: '这本书花了我二十元。', wrong: '✗ I cost twenty yuan for the book.（主语必须是物）' },
      { w: 'take', core: '花时间', must: '常用 It takes sb time to do sth', ex: 'It takes me ten minutes to walk there.', zh: '走到那儿要花我十分钟。', wrong: '✗ I take ten minutes to walk there.（应用 It takes me...）' },
      { w: 'pay', core: '付钱', must: '主语是人：pay (money) for sth', ex: 'I paid fifty yuan for the ticket.', zh: '我花五十元买了这张票。', wrong: '✗ I paid the ticket.（应为 paid for）' }
    ],
    quiz: { ex: 'The new dictionary ___ me 98 yuan, but it is worth it.', options: ['spent', 'cost', 'took', 'paid'], ans: 1,
      why: '主语 The new dictionary 是物，且花的是钱 → cost。spend/pay 的主语必须是人；take 只能用于时间。' }
  },
  {
    id: 'j-other-another', g: 'g8', title: 'other / the other / another / others',
    note: '这一组词的分工是"范围与数量"：another 指不确定的另一个，the other 指两者中的另一个，others 是复数代词。',
    items: [
      { w: 'another', core: '再一个（不限定）', must: 'another + 单数名词：不指定是哪一个', ex: 'Could I have another cup of tea?', zh: '能再给我一杯茶吗？', wrong: '✗ another two cups（应是 two more cups 或 another two，但意义略有不同）' },
      { w: 'the other', core: '两者中的另一个', must: 'one... the other...：总数只有两个', ex: 'I have two pens. One is blue, the other is black.', zh: '我有两支笔，一支蓝的，另一支黑的。', wrong: '✗ One is blue, another is black.（超过两支时才能用 another）' },
      { w: 'other', core: '其他的（形容词）', must: 'other + 复数名词：other students', ex: 'Other students are waiting outside.', zh: '其他学生在外面等着。', wrong: '✗ other student（应为 other students 或 the other student）' },
      { w: 'others', core: '其他人/物（代词）', must: '不接名词：some... others...', ex: 'Some like tea; others prefer coffee.', zh: '有人爱茶，有人爱咖啡。', wrong: '✗ others students（others 是代词，不能接名词）' }
    ],
    quiz: { ex: 'I do not like this shirt. Can you show me ___ one?', options: ['other', 'the other', 'another', 'others'], ans: 2,
      why: '商店里的衬衫远不止两件，"不确定的另一件" → another。the other 只用于两者中的另一个，此处范围不符。' }
  },
  {
    id: 'j-across-through-over', g: 'g8', title: 'across / through / over',
    note: '三个介词都在描述"穿过"，区别在于路径的几何形状：across 横过平面，through 穿过立体空间，over 越过上方。',
    items: [
      { w: 'across', core: '横过平面', must: '从一边到另一边，强调"横跨表面"', ex: 'He walked across the street.', zh: '他穿过了马路。', wrong: '✗ walk across the forest（森林是立体空间，应用 through）' },
      { w: 'through', core: '穿过立体', must: '从内部穿过：forest / tunnel / crowd', ex: 'We drove through the tunnel.', zh: '我们开车穿过了隧道。', wrong: '✗ through the road（马路是平面，应用 across）' },
      { w: 'over', core: '越过上方', must: '从障碍物上方越过：wall / mountain / fence', ex: 'The bird flew over the wall.', zh: '鸟飞过了墙头。', wrong: '✗ climb across the wall（翻墙应用 over）' }
    ],
    quiz: { ex: 'The river runs ___ the city from west to east.', options: ['across', 'through', 'over', 'above'], ans: 1,
      why: '城市是一个立体空间（有建筑、有纵深），河流从城市内部穿过 → through。across 只适合横跨一个平面，如 across the road。' }
  },
  {
    id: 'j-join-join-in', g: 'g9', title: 'join / join in / take part in / attend',
    note: '中文都是"参加"，但英语区分：join 加入组织，join in 加入正在进行的小活动，take part in 参与有组织的活动，attend 是"出席"。',
    items: [
      { w: 'join', core: '加入组织', must: 'join the club / the army / us', ex: 'He joined the English club last term.', zh: '他上学期加入了英语俱乐部。', wrong: '✗ join the meeting（会议应用 attend 或 take part in）' },
      { w: 'join in', core: '加入进行中的活动', must: '常指游戏、讨论、唱歌等正在进行的事', ex: 'Come and join in the game!', zh: '过来一起玩！', wrong: '✗ join in the army（加入组织不加 in）' },
      { w: 'take part in', core: '参与（发挥作用）', must: '强调"在其中扮演角色"：比赛、讨论、活动', ex: 'All students took part in the discussion.', zh: '全体学生参加了讨论。', wrong: '✗ take part in the club（俱乐部是加入，用 join）' },
      { w: 'attend', core: '出席', must: '较正式：attend a meeting / school / class', ex: 'All teachers must attend the meeting.', zh: '所有老师必须参加会议。', wrong: '✗ attend the football match（观赛应用 watch）' }
    ],
    quiz: { ex: 'She ___ the school sports meeting and won two medals.', options: ['joined', 'joined in', 'took part in', 'attended'], ans: 2,
      why: '后文说"赢了两块奖牌"，说明她在其中发挥了实际作用 → took part in。attend 只表示到场，无法解释"拿奖"。' }
  },
  {
    id: 'j-because-since-as', g: 'g9', title: 'because / since / as / for',
    note: '四个词都给原因，但语用地位不同：because 回答 why，since/as 给出已知背景，for 是补充说明（不放句首）。',
    items: [
      { w: 'because', core: '直接原因', must: '语气最强，用来回答 why；可直接回答提问', ex: 'We stayed in because it rained.', zh: '因为下雨我们待在家里。', wrong: '✗ Because it rained, so we stayed in.（because 与 so 不能同用）' },
      { w: 'since', core: '既然（已知）', must: '把对方已知的事作为理由，常放句首', ex: 'Since you are here, let us start.', zh: '既然你来了，我们就开始吧。', wrong: '✗ 用来强调全新信息时，语气会显得生硬' },
      { w: 'as', core: '由于（附带）', must: '语气较弱，把原因当作附带背景', ex: 'As it was late, we went home.', zh: '由于天色已晚，我们回家了。', wrong: '✗ as 还可表示"当…时候/随着"，注意辨析' },
      { w: 'for', core: '补充说明', must: '不放句首，前面常有逗号，像事后补一句', ex: 'It must have rained, for the ground is wet.', zh: '肯定下过雨，因为地是湿的。', wrong: '✗ For it rained, we stayed in.（for 不能置于句首）' }
    ],
    quiz: { ex: 'The ground is wet, ___ it must have rained last night.', options: ['because', 'since', 'for', 'as'], ans: 2,
      why: '这是一个"由结果反推原因"的推断，for 正是用于这种事后补充说明（前有逗号、不在句首）。because 会变成"地湿导致下雨"，因果倒置。' }
  }
];

/* ---------- 小学 · 一词多义 ---------- */
DBX.poly = [
  { w: 'like', ph: '/laɪk/', g: 'g3', senses: [
    { g: 'v. 喜欢', ex: 'I like reading stories before bed.' },
    { g: 'prep. 像…一样', ex: 'He swims like a fish in the water.' }
  ], quiz: [
    { ex: 'She looks like her mother.', options: ['喜欢', '像…一样', '想要', '好像（副词）'], ans: 1, why: 'look like 是固定搭配，like 作介词表示"与…相像"，与"喜欢"毫无关系。' }
  ]},
  { w: 'have', ph: '/hæv/', g: 'g3', senses: [
    { g: 'v. 有', ex: 'We have a small garden behind the house.' },
    { g: 'v. 吃、喝（餐点）', ex: 'They have lunch at school at twelve.' }
  ], quiz: [
    { ex: 'We are having breakfast now.', options: ['正在拥有', '正在吃（早餐）', '正在买', '正在做'], ans: 1, why: 'have + 餐点名称表示"吃/喝"，这是 have 的实义用法，不是"拥有"。' }
  ]},
  { w: 'fish', ph: '/fɪʃ/', g: 'g4', senses: [
    { g: 'n. 鱼', ex: 'We can see many fish in the lake.' },
    { g: 'v. 钓鱼', ex: 'Grandpa likes to fish by the river.' }
  ], quiz: [
    { ex: 'They fish in the lake every weekend.', options: ['鱼（名词）', '钓鱼（动词）', '卖鱼', '养鱼'], ans: 1, why: '此处 fish 位于主语之后作谓语 → 动词"钓鱼"。名词用法会有数量或冠词修饰。' }
  ]},
  { w: 'water', ph: '/ˈwɔːtə(r)/', g: 'g4', senses: [
    { g: 'n. 水', ex: 'Please drink more water when it is hot.' },
    { g: 'v. 浇水', ex: 'I water the flowers every evening.' }
  ], quiz: [
    { ex: 'My job is to water the vegetables.', options: ['水（名词）', '浇水（动词）', '喝水', '挑水'], ans: 1, why: 'to 后面跟动词原形，且宾语是 vegetables → water 作动词"给…浇水"。' }
  ]},
  { w: 'light', ph: '/laɪt/', g: 'g5', senses: [
    { g: 'adj. 轻的', ex: 'The bag is light enough for her to carry.' },
    { g: 'n. 光、灯', ex: 'Turn off the light before you leave.' },
    { g: 'adj. 浅的（颜色）', ex: 'She wore a light blue dress.' }
  ], quiz: [
    { ex: 'The box is very light — even a child can lift it.', options: ['灯', '轻的', '浅色的', '点燃'], ans: 1, why: '后文"连小孩都举得起来"说明在说重量 → 轻的。这是一词多义靠语境消歧的典型例子。' }
  ]},
  { w: 'hand', ph: '/hænd/', g: 'g5', senses: [
    { g: 'n. 手', ex: 'Wash your hands before you eat.' },
    { g: 'v. 递给', ex: 'Please hand me that book on the desk.' }
  ], quiz: [
    { ex: 'Hand me the salt, please.', options: ['手（名词）', '递给（动词）', '举手', '用手'], ans: 1, why: '祈使句以动词原形开头，且后接双宾语（me + the salt）→ hand 作动词"递给"。' }
  ]},
  { w: 'run', ph: '/rʌn/', g: 'g6', senses: [
    { g: 'v. 跑', ex: 'Children run and laugh in the playground.' },
    { g: 'v. 经营、管理', ex: 'My uncle runs a small noodle shop.' },
    { g: 'v. 流动', ex: 'The river runs into the sea.' }
  ], quiz: [
    { ex: 'His family runs a small hotel near the lake.', options: ['跑', '经营', '流动', '跑步去'], ans: 1, why: 'run 后接 a hotel / a shop / a company 时，意思是"经营、管理"。译为"跑"会完全误解句意。' }
  ]},
  { w: 'cross', ph: '/krɒs/', g: 'g6', senses: [
    { g: 'v. 穿过', ex: 'Cross the road at the white lines.' },
    { g: 'adj. 生气的', ex: 'My mother was cross with me yesterday.' }
  ], quiz: [
    { ex: 'Do not be cross with him — he is only five.', options: ['穿过', '生气的', '十字形', '交叉'], ans: 1, why: 'be cross with sb 是固定搭配，意为"对某人生气"。后文"他才五岁"是在劝人别生气，与"穿过"无关。' }
  ]},

  /* ---------- 初中 · 一词多义 ---------- */
  { w: 'since', ph: '/sɪns/', g: 'g7', senses: [
    { g: 'prep./conj. 自从（时间点）', ex: 'We have lived here since 2015.' },
    { g: 'conj. 既然、因为', ex: 'Since you are here, let us start.' }
  ], quiz: [
    { ex: 'Since everyone is here, we can begin the meeting.', options: ['自从', '既然、因为', '在…之后', '直到'], ans: 1, why: '此处不是时间点，而是把"大家都到了"作为理由 → since 作"既然"讲。判断方法：看后面是不是时间。' }
  ]},
  { w: 'for', ph: '/fɔː(r)/', g: 'g7', senses: [
    { g: 'prep. 长达（一段时间）', ex: 'She has taught here for twelve years.' },
    { g: 'prep. 为了、给', ex: 'This gift is for you.' },
    { g: 'conj. 因为（补充说明）', ex: 'It must have rained, for the ground is wet.' }
  ], quiz: [
    { ex: 'He has studied English for six years.', options: ['为了', '长达（六年）', '因为', '给'], ans: 1, why: '现在完成时 + for + 时间段，表示动作持续的长度。若理解为"为了六年"则句子无意义。' }
  ]},
  { w: 'while', ph: '/waɪl/', g: 'g8', senses: [
    { g: 'conj. 当…时候', ex: 'He fell asleep while reading.' },
    { g: 'conj. 而、然而（对比）', ex: 'The north is dry, while the south is wet.' },
    { g: 'n. 一会儿', ex: 'Wait for a while, please.' }
  ], quiz: [
    { ex: 'Some people love the plan, while others strongly oppose it.', options: ['当…时候', '而、然而（对比）', '一会儿', '虽然'], ans: 1, why: '前后是两个对立群体的态度对比 → while 表"而"。若理解为"当…时候"，则两个分句的时间关系说不通。' }
  ]},
  { w: 'once', ph: '/wʌns/', g: 'g8', senses: [
    { g: 'adv. 一次', ex: 'I go there once a week.' },
    { g: 'adv. 曾经', ex: 'I once lived in a small mountain village.' },
    { g: 'conj. 一旦', ex: 'Once you start, you will not want to stop.' }
  ], quiz: [
    { ex: 'Once the rain stops, we will set off at once.', options: ['一次；曾经', '一旦；立刻', '曾经；一次', '一旦；曾经'], ans: 1, why: '第一个 once 引导条件状语从句（一旦雨停）；第二个 at once 是固定短语"立刻"。同一个词在一句里承担两种意义。' }
  ]},
  { w: 'right', ph: '/raɪt/', g: 'g9', senses: [
    { g: 'adj. 正确的', ex: 'Your answer is right.' },
    { g: 'adj./n. 右边的（方向）', ex: 'Turn right at the traffic lights.' },
    { g: 'n. 权利', ex: 'Children have the right to go to school.' }
  ], quiz: [
    { ex: 'Every child has the right to education.', options: ['正确的', '右边的', '权利', '立刻'], ans: 2, why: '后接 to education 且表达"应当享有"→ 权利。这是 right 在议论文与法律语境中的高频义项。' }
  ]},
  { w: 'change', ph: '/tʃeɪndʒ/', g: 'g9', senses: [
    { g: 'v./n. 改变', ex: 'The town has changed a lot since 2010.' },
    { g: 'n. 零钱、找零', ex: 'Here is your change, five yuan.' },
    { g: 'v. 换乘', ex: 'You must change buses at the station.' }
  ], quiz: [
    { ex: 'Keep the change, said he, and walked out.', options: ['改变', '零钱（找零）', '换乘', '变化'], ans: 1, why: 'Keep the change 是固定表达，意为"不用找了"。在商店语境下 change 几乎总是指零钱。' }
  ]}
];

/* ---------- 小学 · 真实语料挑战 ---------- */
DBX.chal = [
  { s: 'There is a cat under the chair.', src: '小学教材语料', zh: '椅子下面有只猫。', g: 'g3',
    q: '为什么这里用 There is 而不用 The chair has？', options: ['两种说法完全一样', 'There is 用于"宣告某物存在于某处"，has 表示"所属关系"，椅子不能拥有猫', 'has 只能用于人', 'There is 更正式'], ans: 1,
    why: 'There be 宣告存在、has 表示所属，是两套不同的意义机制。"椅子有一只猫"在英语里意味着猫归椅子所有，这是荒谬的。' },
  { s: 'He plays football every Saturday.', src: '小学教材语料', zh: '他每周六踢足球。', g: 'g3',
    q: '句尾的 every Saturday 对时态意味着什么？', options: ['只是补充说明，与语法无关', '它把动作标记为"习惯性常态"，因此动词必须用一般现在时', '它要求用进行时', '它要求用过去时'], ans: 1,
    why: '频度时间状语是判断时态意义的关键：every Saturday 说明这是规律而非此刻动作，所以用一般现在时，而不是 is playing。' },
  { s: 'Would you like some tea?', src: '日常交际语料', zh: '你想喝点茶吗？', g: 'g3',
    q: '这是疑问句，为什么不用 any 而用 some？', options: ['语法错误，应该用 any', '说话人期待肯定回答，用 some 传递的是邀请而非单纯询问', 'some 只能用于肯定句，此处例外', 'tea 是不可数名词'], ans: 1,
    why: 'some 与 any 的选择不只是语法规则，更是语气：邀请、请求中用 some，表示说话人已经预设了"要"的答案。' },
  { s: 'Look! The children are playing in the snow.', src: '小学教材语料', zh: '看！孩子们正在雪地里玩。', g: 'g4',
    q: '句首的 Look! 在这里起什么作用？', options: ['没有实际作用', '它把读者的注意力拉到"此时此刻"，因此后面必须用进行时', '它是祈使句，与后面无关', '它表示感叹'], ans: 1,
    why: 'Look! / Listen! 是进行时的信号词：它们强制把动作解释为"此刻正在发生的画面"，用一般现在时会与之冲突。' },
  { s: 'You must not play with fire.', src: '安全教育语料', zh: '禁止玩火。', g: 'g4',
    q: '把 must not 换成 need not，句子的意义会怎样变化？', options: ['意义不变', '从"明令禁止"变成"不必做（做不做都行）"', '语气更客气', '变成过去时'], ans: 1,
    why: 'must not = 禁止；need not = 无义务。在安全标语里用错，等于把"禁止玩火"说成"玩不玩火都行"——后果完全不同。' },
  { s: 'It is going to rain. Look at those black clouds.', src: '日常口语语料', zh: '要下雨了，你看那些乌云。', g: 'g4',
    q: '为什么用 be going to 而不是 will？', options: ['两者完全等价', '说话人有眼下的证据（乌云），所以用 be going to；will 更常用于当下决定或客观预测', 'will 不能用于天气', 'be going to 更正式'], ans: 1,
    why: 'be going to 的意义是"已有证据显示即将发生"。乌云就是证据；若用 will rain，则更像是预报或说话人的预测。' },
  { s: 'This book is more interesting than that one.', src: '小学阅读语料', zh: '这本书比那本更有趣。', g: 'g5',
    q: '为什么是 more interesting 而不是 interestinger？', options: ['interesting 是长词，比较级用 more', 'interesting 没有比较级', '两种都对', 'interestinger 拼写错误但可用'], ans: 0,
    why: '三个音节以上的形容词用 more 构成比较级。这条规则背后是英语的韵律限制，而不是随意规定。' },
  { s: 'Tom is the tallest boy in our class.', src: '小学教材语料', zh: '汤姆是我们班最高的男生。', g: 'g5',
    q: 'in our class 这个短语为什么不可省略？', options: ['只是补充说明', '它界定了比较的范围；没有它，读者不知道"在谁当中最高"', '它是固定搭配', '可以省略，意义不变'], ans: 1,
    why: '最高级本质上是在一个集合中取极值。缺少范围短语，命题就不完整——"最高"永远要回答"在哪个范围里最高"。' },
  { s: 'I visited my grandparents last Sunday.', src: '小学写作语料', zh: '上周日我去看望了祖父母。', g: 'g5',
    q: '为什么这里不能用现在完成时 have visited？', options: ['因为 visit 是不及物动词', 'last Sunday 是已结束的过去时间点，与现在完成时"连接当下"的意义冲突', '因为主语是 I', '两种都可以'], ans: 1,
    why: '现在完成时关心"对现在的影响"，而 last Sunday 把事件钉死在一个已结束的时间点上——两者在意义上互斥，这是中考的经典考点。' },
  { s: 'The phone is ringing. — I will answer it.', src: '日常口语语料', zh: '电话响了。——我来接。', g: 'g6',
    q: '为什么用 will 而不是 am going to？', options: ['will 更正式', '接电话是听到铃声后才做出的决定，用 will；be going to 表示早有打算', 'am going to 不能用于第一人称', '两者没有区别'], ans: 1,
    why: 'will 与 be going to 的核心分野就是"决定的时间点"：说话当下才决定 → will；事先已有打算 → be going to。' },
  { s: 'We should protect the environment.', src: '小学德育语料', zh: '我们应该保护环境。', g: 'g6',
    q: 'should 在这里表达的是什么？', options: ['强制命令（必须）', '建议与义务：这样做是对的，但不是强制', '可能性', '过去习惯'], ans: 1,
    why: 'should 的语气弱于 must：它给出"应当"的价值判断，留给听者余地。把 should 误读成 must，会把建议变成命令。' },
  { s: 'It was raining when we arrived.', src: '小学阅读语料', zh: '我们到达时正在下雨。', g: 'g6',
    q: '为什么"下雨"用进行时，"到达"用一般过去时？', options: ['随便选的', '下雨是持续的背景，到达是切入的瞬间事件', '两个动作都是过去，必须一致', '进行时表示过去'], ans: 1,
    why: '过去进行时铺背景、一般过去时给事件——这是英语叙事的最基本节奏：画面 + 事件。' },

  /* ---------- 初中 · 真实语料挑战 ---------- */
  { s: 'I have been to Dunhuang twice.', src: '初中教材语料', zh: '我去过敦煌两次。', g: 'g7',
    q: '把 have been to 换成 have gone to，句子会怎样？', options: ['意义不变', '从"去过已回来"变成"去了还没回来"，说话人此刻不在场', '变成过去时', '语法错误'], ans: 1,
    why: 'have been to 谈经历（人在现场）；have gone to 谈去向（人不在）。用后者会让"我去过敦煌两次"变成"我去了敦煌（现在不在这儿）"，无法与 twice 搭配。' },
  { s: 'The train leaves at 9:40 tomorrow morning.', src: '车站广播语料', zh: '火车明早 9:40 发车。', g: 'g7',
    q: '说将来的事，为什么用一般现在时？', options: ['广播里可以随便说', '时刻表属于固定日程，不随人的意志改变，用一般现在时表将来', '因为 leave 是特殊动词', '因为用了 tomorrow'], ans: 1,
    why: '英语用一般现在时表达"已排定的、不可更改的将来"。时刻表、课表、日历都属于这一类——它们的确定性高于人的打算。' },
  { s: 'It takes me twenty minutes to get to school by bike.', src: '初中写作语料', zh: '我骑车到学校要二十分钟。', g: 'g7',
    q: '为什么主语用 It 而不是 I？', options: ['两种都可以', 'take 表示"某事占用时间"时，形式主语是 It；用 I take 会说成"我占用二十分钟"', 'I 不能作主语', '因为用了 by bike'], ans: 1,
    why: 'It takes sb time to do sth 的结构里，真正的主语是 to do 这件事，It 只是形式主语。换成 I take 会改变施受关系。' },
  { s: 'He used to be afraid of dogs.', src: '初中阅读语料', zh: '他过去怕狗。', g: 'g7',
    q: 'used to 在这句话里暗示了什么？', options: ['他现在还怕狗', '他现在不怕了——这是"过去曾经"与"现在不同"的对比', '他一直怕狗', '他将来会怕狗'], ans: 1,
    why: 'used to 的意义重心永远在"现在不再如此"。如果说 He was afraid of dogs，只报告过去；加 used to 则明确宣告现状已改变。' },
  { s: 'Mistakes were made during the transition.', src: '新闻发布会常见表达', zh: '过渡期间出现了一些失误。', g: 'g8',
    q: '这句话在意义上的关键选择是什么？', options: ['使用了过去时', '使用被动语态省略了施事，刻意回避"谁犯了错"', '使用了复数名词', '使用了介词 during'], ans: 1,
    why: '被动语态的意义不是"换种说法"，而是信息焦点与责任的再分配。Someone made mistakes 责任明确；Mistakes were made 责任被抹去。' },
  { s: 'The lights are on. He must be at home.', src: '初中推理语料', zh: '灯亮着，他一定在家。', g: 'g8',
    q: '这里的 must 表示什么？', options: ['必须（命令）', '有根据的肯定推测：说话人基于证据几乎确定', '可能', '允许'], ans: 1,
    why: '同样是 must，表"必须"是施加义务，表"一定"是给出把握。判断依据是后面跟的动词与语境：灯亮是证据，所以是推测。' },
  { s: 'Could you tell me where the station is?', src: '初中交际语料', zh: '请问车站在哪里？', g: 'g8',
    q: '为什么从句里是 the station is 而不是 is the station？', options: ['两种都对', '宾语从句必须用陈述语序', '因为 could 是过去式', '因为 where 已经提前'], ans: 1,
    why: '疑问词一旦移到句首引导从句，从句内部就要恢复"主谓正常顺序"。这是英语从句最容易被中文语序带偏的地方。' },
  { s: 'The window was broken by someone in our class.', src: '初中写作语料', zh: '窗户被我们班某个人打破了。', g: 'g8',
    q: '保留 by someone 与删掉它，意义上有什么不同？', options: ['没有不同', '保留 by 短语把责任指向了施事；删掉则只谈结果，不追究是谁', '删掉后句子不通', '保留后变成进行时'], ans: 1,
    why: '被动语态是否带 by 短语，是说话人主动做出的"要不要追究责任"的选择——这正是被动语态的语用价值。' },
  { s: 'The girl who is standing there is my cousin.', src: '初中教材语料', zh: '站在那边的女孩是我表妹。', g: 'g9',
    q: '如果删掉 who is standing there，句子会有什么损失？', options: ['没有损失', '失去识别功能：读者不知道说的是哪个女孩', '变成疑问句', '语法错误'], ans: 1,
    why: '限定性定语从句的作用是"缩小范围、锁定唯一对象"。删掉它，the girl 这个定指就失去了依据。' },
  { s: 'I was walking home when it suddenly started to rain.', src: '初中阅读语料', zh: '我正在往家走，突然下起雨来。', g: 'g9',
    q: '为什么"走"用进行时、"下雨"用一般过去时？', options: ['为了显得语法复杂', '"走"是进行中的背景画面，"下雨"是突然切入的事件', '两个动作都发生在过去，随便安排', '因为用了 when'], ans: 1,
    why: '过去进行时给背景，一般过去时给事件，when 在这里的意思是"就在这时"。这个结构承载的是画面感，而不是时间顺序。' },
  { s: 'The more you read, the more you understand.', src: '初中格言语料', zh: '读书越多，懂得越多。', g: 'g9',
    q: '这个结构里的两个 the 能不能省略？', options: ['可以，省略后意义不变', '不能：双 the 结构表达"前后联动、一方随另一方变化"，缺了就失去联动意义', '可以省略后一个', '可以省略前一个'], ans: 1,
    why: 'the + 比较级..., the + 比较级... 是英语表达"联动变化"的固定手段。省略 the 后，两个分句变成孤立的陈述，因果关系消失。' },
  { s: 'Although it was raining, they kept working.', src: '初中阅读语料', zh: '尽管在下雨，他们仍继续工作。', g: 'g9',
    q: '如果把 Although 换成 But，句子应该怎么写？', options: ['Although 与 But 可以直接互换', '去掉 Although，改成 It was raining, but they kept working. — 英语中一个句子只能用一头', 'It was raining, although but they kept working.', '两者可以同时使用以加强语气'], ans: 1,
    why: '中文说"虽然…但是…"，英语只能用其一。这背后是逻辑标记的分工：一个主从关系只需要一个标记。' },
  { s: 'She has worked in this school since 2016.', src: '初中教材语料', zh: '她自 2016 年起在这所学校工作。', g: 'g9',
    q: '这句话暗示了关于现在什么信息？', options: ['她已经离职了', '她现在仍在这所学校工作', '她换了工作', '无法判断'], ans: 1,
    why: '现在完成时 + since 表示从过去延续到现在。若她已离职，必须改用一般过去时 She worked here from 2016 to 2020。' }
];
