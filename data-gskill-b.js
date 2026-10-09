/* ============================================================
   辞源 · 分学段技能语料（高中）
   语法意义地图 / 近义辨析 / 一词多义 / 真实语料挑战
   ============================================================ */
window.DBX = window.DBX || {};
DBX.gram = DBX.gram || [];
DBX.syn = DBX.syn || [];
DBX.poly = DBX.poly || [];
DBX.chal = DBX.chal || [];

/* ---------- 高中 · 语法意义地图 ---------- */
DBX.gram.push(
  {
    id: 's-noun-clause', g: 'g10', title: '名词性从句：that 与 what 的分工', weight: 5,
    q: '为什么有时候用 that，有时候必须用 what？',
    a: [
      'that 在名词性从句中只起连接作用，不充当成分、没有词义——它引导的是一个"已经完整"的命题。',
      'what 等于 the thing(s) which，它同时充当成分并自带"所…的事物"这一意义。',
      '判断方法：从句里缺主语/宾语 → 用 what；什么都不缺 → 用 that。'
    ],
    pairs: [
      { s: 'That he passed the exam surprised us.', m: 'he passed the exam 本身完整 → that 只作连接' },
      { s: 'What he said surprised us.', m: 'said 缺宾语 → what 补上，意为"他说的话"' },
      { s: 'I believe (that) he is honest.', m: '宾语从句，that 可省略' },
      { s: 'This is what I want.', m: '表语从句：want 缺宾语 → what' }
    ],
    quiz: { q: '___ he told me yesterday turned out to be false.', options: ['That', 'What', 'Which', 'Whether'], ans: 1,
      why: 'told me 后面缺直接宾语（tell sb sth），需要 what 既引导又补位，意为"他昨天告诉我的（那件事）"。用 That 会导致从句缺成分，句子不成立。' }
  },
  {
    id: 's-nonfinite', g: 'g10', title: '非谓语动词：不定式与动名词的意义分野', weight: 5,
    q: 'to do 与 doing 作宾语时，意义上差在哪？',
    a: [
      '不定式偏向"尚未发生、指向未来、带有目的性"：hope to do、decide to do。',
      '动名词偏向"已经发生、被当作事实或经验来谈"：enjoy doing、admit doing。',
      '有些动词两者皆可但意义不同：remember to do（记得去做）vs remember doing（记得做过）。'
    ],
    pairs: [
      { s: 'I remember locking the door.', m: '记得"锁过门"这件事（已发生）' },
      { s: 'Remember to lock the door.', m: '记得"要去锁门"（未发生）' },
      { s: 'He stopped to smoke.', m: '停下手中的事，目的 = 去抽烟' },
      { s: 'He stopped smoking.', m: '戒烟：停止"抽烟"这个行为本身' }
    ],
    quiz: { q: 'I regret ___ you that the flight has been cancelled.', options: ['telling', 'to tell', 'tell', 'having told'], ans: 1,
      why: 'regret to do 用于"遗憾地要做某事"（常见于通知坏消息）；regret doing 表示"后悔做过某事"。此句是正式通知航班取消，属于前者。' }
  },
  {
    id: 's-emphasis', g: 'g10', title: '强调句 It is...that：把焦点钉死', weight: 5,
    q: '强调句不是"加强语气"，而是重新指派信息焦点。',
    a: [
      'It is + 被强调部分 + that/who + 其余部分：被强调的部分就是这句话真正要传达的新信息。',
      '它能强调主语、宾语、状语，但不能强调谓语。',
      '判断方法：把 It is 与 that 去掉，剩下的仍能组成一个完整句子 → 就是强调句。'
    ],
    pairs: [
      { s: 'It was Tom who broke the window.', m: '焦点在"是汤姆"（不是别人）' },
      { s: 'It was the window that Tom broke.', m: '焦点在"是窗户"（不是门）' },
      { s: 'It was yesterday that I met him.', m: '焦点在"是昨天"（不是今天）' },
      { s: 'Tom broke the window yesterday.', m: '中性陈述：没有特别焦点' }
    ],
    quiz: { q: 'It was in Xi’an ___ I first met my wife.', options: ['where', 'which', 'that', 'when'], ans: 2,
      why: '去掉 It was 与空格后，I first met my wife in Xi’an 仍是完整句子 → 这是强调句，统一用 that。用 where 会误判为定语从句（但定语从句需要有先行词作地点，此处 in Xi’an 已是完整状语）。' }
  },
  {
    id: 's-inversion', g: 'g10', title: '倒装：把最重的意义放到句首', weight: 5,
    q: '为什么英语有时要把助动词提到主语前面？',
    a: [
      '否定副词（never、seldom、hardly）置于句首时必须部分倒装——把否定的重量放在最前。',
      'Only + 状语置于句首时也倒装，强调"只有在这种条件下"。',
      '完全倒装（谓语整体提前）用于地点方位副词开头：Here comes the bus。',
      '倒装改变的不是命题内容，而是信息的排列顺序与强调重心。'
    ],
    pairs: [
      { s: 'I have never seen such a thing.', m: '中性陈述' },
      { s: 'Never have I seen such a thing.', m: '把"从未"提到最前，语气强烈得多' },
      { s: 'He only realised the truth after the meeting.', m: '陈述：会后才知道' },
      { s: 'Only after the meeting did he realise the truth.', m: '强调"直到会后这个时间点才"' }
    ],
    quiz: { q: 'Not only ___ hard, but he also helped others.', options: ['he worked', 'did he work', 'he did work', 'worked he'], ans: 1,
      why: 'Not only 置于句首 → 该分句部分倒装，把助动词 did 提到主语前。同时注意 not only...but also 连接两个分句时只有前一个倒装。' }
  },
  {
    id: 's-subjunctive', g: 'g11', title: '虚拟语气：动词形式在说"这是假的"', weight: 5,
    q: '虚拟语气的意义核心是"与事实相反"，动词的时态倒退一格就是信号。',
    a: [
      '与现在事实相反：从句用一般过去时（be 用 were），主句用 would/could + 原形。',
      '与过去事实相反：从句用过去完成时，主句用 would have done。',
      '与将来事实相反：从句用 were to do 或 should do。',
      '所以看到 If I were...，不要理解成"过去"，而要说"事实上我不是"。'
    ],
    pairs: [
      { s: 'If I have time, I will go.', m: '真实条件：有时间（可能真的去）' },
      { s: 'If I had time, I would go.', m: '虚拟：其实没时间（与现在相反）' },
      { s: 'If I had had time, I would have gone.', m: '虚拟：当时没时间（与过去相反）' },
      { s: 'I wish I were taller.', m: 'wish 后一律虚拟，be 动词用 were' }
    ],
    quiz: { q: 'If he ___ the warning, he would not be in hospital now.', options: ['heeded', 'had heeded', 'would heed', 'heeds'], ans: 1,
      why: '结果是"现在在医院"（与现在相反），原因是"当初没听警告"（与过去相反）→ 错综虚拟：从句用过去完成时 had heeded，主句用 would not be。' }
  },
  {
    id: 's-modal-perfect', g: 'g11', title: '情态动词 + have done：对过去下判断', weight: 5,
    q: 'must have done / should have done / could have done 说的是三种完全不同的态度。',
    a: [
      'must have done：对过去的肯定推测（他一定做过）。',
      'should have done：本该做却没做（带责备或遗憾）。',
      'could have done：本来能做却没做，或"可能做过"（不确定）。',
      'need not have done：本来不必做（却做了）。'
    ],
    pairs: [
      { s: 'He must have missed the train.', m: '推测：他一定没赶上' },
      { s: 'He should have told us earlier.', m: '责备：他本该早点说（但没说）' },
      { s: 'He could have helped, but he did not.', m: '本可以帮（但没帮）' },
      { s: 'You need not have bought so much.', m: '你本不必买这么多（但买了）' }
    ],
    quiz: { q: 'The road is wet. It ___ rained last night.', options: ['must have', 'should have', 'could have', 'need have'], ans: 0,
      why: '"路是湿的"是对过去的强证据 → 几乎可以肯定下过雨，用 must have rained。should have rained 会变成"昨晚本该下雨（却没下）"，与证据矛盾。' }
  },
  {
    id: 's-non-restrictive', g: 'g11', title: '非限定性定语从句：逗号决定意义', weight: 5,
    q: '一个逗号，把"识别身份"变成了"补充说明"。',
    a: [
      '限定性从句（无逗号）：用来锁定是哪一个，删掉后所指不明。',
      '非限定性从句（有逗号）：只是补充，删掉后身份依然清楚。',
      '非限定性从句不能用 that，也不能用 why；which 还可以指代整个前句。'
    ],
    pairs: [
      { s: 'My brother who lives in Xi’an is a doctor.', m: '暗示还有别的兄弟：住在西安的那个' },
      { s: 'My brother, who lives in Xi’an, is a doctor.', m: '只有一个兄弟，住西安只是补充' },
      { s: 'He failed the exam, which surprised us.', m: 'which 指代"他没及格"这件事' },
      { s: 'This is the book that I told you about.', m: '限定性：锁定是哪本书' }
    ],
    quiz: { q: 'He came late again, ___ made his teacher angry.', options: ['that', 'which', 'what', 'it'], ans: 1,
      why: '非限定性从句指代整个前句"他又迟到了"这件事 → 只能用 which，不能用 that。' }
  },
  {
    id: 's-participle', g: 'g11', title: '分词作状语：-ing 与 -ed 的主被动分野', weight: 5,
    q: 'Seeing 与 Seen 开头的句子，主语完全不同。',
    a: [
      '现在分词（-ing）表示主动、进行：动作由句子主语发出。',
      '过去分词（-ed）表示被动、完成：主语是动作的承受者。',
      '分词短语的逻辑主语必须与主句主语一致，否则就是"悬垂分词"——意义上的错误。',
      'having done 表示"在主句动作之前已完成"。'
    ],
    pairs: [
      { s: 'Seeing the dog, the boy ran away.', m: '男孩看见狗（主动）' },
      { s: 'Seen from the hill, the town looks small.', m: '小镇被看（被动）' },
      { s: 'Having finished the work, he went home.', m: '先完成工作，之后回家' },
      { s: 'Given more time, I could do it better.', m: '如果给我更多时间（被动条件）' }
    ],
    quiz: { q: '___ in the rain for two hours, he caught a bad cold.', options: ['Catching', 'Caught', 'Having caught', 'To catch'], ans: 1,
      why: 'he 是"被困在雨中"的承受者 → 过去分词 Caught（be caught in the rain 是固定搭配）。用 Catching 会变成"他正在抓雨"，意义荒谬。' }
  },
  {
    id: 's-long-sentence', g: 'g12', title: '长难句三层穿透：骨架 → 修饰 → 逻辑', weight: 5,
    q: '遇到五十词以上的长句，按什么顺序拆？',
    a: [
      '第一层找骨架：先抓主句的主语和谓语，把从句和插入语全部括起来。',
      '第二层挂修饰：把每个从句、分词短语、介词短语挂回它所修饰的词。',
      '第三层理逻辑：标出连接词表达的因果、让步、条件、对比关系。',
      '三层做完，句子长度不再是障碍——因为你已经知道每个部分在贡献什么意义。'
    ],
    pairs: [
      { s: 'The report, which was published last week, says that the plan will fail.', m: '骨架：The report says that...；中间是补充说明' },
      { s: 'Although the data are limited, the conclusion is clear.', m: '让步逻辑优先于句子长度' },
      { s: 'He is the man who called me yesterday.', m: '骨架：He is the man；who 从句锁定身份' },
      { s: 'Given the cost, we decided not to continue.', m: '分词短语表条件：考虑到成本' }
    ],
    quiz: { q: '拆解长句的第一步应该做什么？', options: ['逐词翻译', '先找主句的主语与谓语，把从句和插入语括起来', '先查生词', '先找连接词'], ans: 1,
      why: '找不到骨架，所有修饰都无处安放，读得再细也只是碎片。骨架确定后，修饰与逻辑才有归属——这是长难句唯一的可靠入口。' }
  },
  {
    id: 's-subject-verb-agreement', g: 'g12', title: '主谓一致：一致的是"意义"不只是"形式"', weight: 4,
    q: '为什么 The news are 是错的，而 The police are 是对的？',
    a: [
      'news、physics、mathematics 以 -s 结尾却是单数概念 → 谓语用单数。',
      'police、people、cattle 是集合复数 → 谓语用复数。',
      'family、team、class 作为整体时用单数，强调成员个体时用复数。',
      'a number of + 复数动词；the number of + 单数动词——意义重心不同。'
    ],
    pairs: [
      { s: 'The news is surprising.', m: 'news 不可数 → 单数' },
      { s: 'The police are looking into the case.', m: 'police 是复数集合 → 复数' },
      { s: 'His family is large.', m: '把家庭当整体 → 单数' },
      { s: 'His family are all doctors.', m: '强调每个成员 → 复数' }
    ],
    quiz: { q: 'The number of students in our school ___ risen to 2,000.', options: ['have', 'has', 'are', 'were'], ans: 1,
      why: 'the number of 的意义重心是"这个数字"（单数），而 a number of 才是"许多"（复数）。二者形式接近，意义完全不同。' }
  },
  {
    id: 's-ellipsis-substitution', g: 'g12', title: '省略与替代：不重复，才是英语', weight: 4,
    q: '英语为什么要省略？省略掉的是什么？',
    a: [
      '省略的前提是"信息可从上下文还原"——重复已给出的信息反而显得笨拙。',
      '替代词（one、that、those、do so）用来顶替已出现的名词或动作。',
      '并列结构中，相同成分常在后一分句省略：I like tea and he coffee。'
    ],
    pairs: [
      { s: 'Some like tea, others coffee.', m: '省略了 like：与前文重复' },
      { s: 'I prefer this one to that one.', m: 'one 替代前文提到的名词' },
      { s: 'The weather here is colder than that in the south.', m: 'that 替代 weather，避免重复' },
      { s: 'He said he would come, and he did.', m: 'did 替代 came' }
    ],
    quiz: { q: 'The climate of Xi’an is drier than ___ of Chengdu.', options: ['it', 'that', 'one', 'this'], ans: 1,
      why: '比较结构中用 that 替代前面提到的不可数名词 climate，表示"同类的那一个"。用 it 会指代同一个气候，造成"西安的气候比它自己干"的荒谬命题。' }
  },
  {
    id: 's-absolute', g: 'g12', title: '独立主格：自带主语的状语', weight: 4,
    q: '为什么它叫"独立"主格？',
    a: [
      '独立主格有自己的逻辑主语，却不与主句主语一致，也不构成完整句子。',
      '结构：名词/代词 + 分词/形容词/介词短语，用逗号与主句隔开。',
      '它的意义是"伴随状况、时间背景、原因说明"，常用于书面语。'
    ],
    pairs: [
      { s: 'The meeting over, everyone left.', m: '会议结束后（时间背景）' },
      { s: 'Weather permitting, we will go tomorrow.', m: '如果天气允许（条件）' },
      { s: 'He sat there, his eyes closed.', m: '伴随状况：闭着眼睛' },
      { s: 'All things considered, the plan is risky.', m: '通盘考虑之后（补充说明）' }
    ],
    quiz: { q: '___ no bus, we had to walk home.', options: ['There was', 'There being', 'It being', 'Being'], ans: 1,
      why: '两个分句之间没有连词，不能直接用谓语动词 There was（会造成逗号拼接错误）。用独立主格 There being no bus 作原因状语，句子才成立。' }
  }
);

/* ---------- 高中 · 近义词辨析 ---------- */
DBX.syn.push(
  {
    id: 's-raise-rise-arise', g: 'g10', title: 'raise / rise / arise',
    note: 'raise 是及物动词（需要宾语，"抬起"）；rise 是不及物（主语自己上升）；arise 是"出现、产生（问题）"，也是不及物。',
    items: [
      { w: 'raise', core: '及物：抬起、提高、筹集', must: '必须带宾语：raise your hand / raise money', ex: 'They raised 2,000 yuan for the school.', zh: '他们为学校筹了 2000 元。', wrong: '✗ Prices raised by 5%.（价格自己涨，应用 rose）' },
      { w: 'rise', core: '不及物：自身上升', must: '主语自己上升，不能带宾语：The sun rises', ex: 'Prices rose by 5% last year.', zh: '去年物价上涨了 5%。', wrong: '✗ He rose his hand.（应用 raised）' },
      { w: 'arise', core: '不及物：问题出现', must: '主语常是抽象事物：problems / questions / opportunities', ex: 'New problems arose during the test.', zh: '测试过程中出现了新问题。', wrong: '✗ He arose a question.（应用 raised）' }
    ],
    quiz: { ex: 'The sun ___ in the east, and the farmer ___ his head to look at the sky.', options: ['rises; raises', 'raises; rises', 'rises; arises', 'arises; raises'], ans: 0,
      why: '太阳自己升起（不及物）→ rises；农夫抬起头（及物，head 是宾语）→ raises。区分点只有一个：有没有宾语。' }
  },
  {
    id: 's-imply-infer', g: 'g10', title: 'imply / infer',
    note: '这是写作与阅读中最容易颠倒的一对：imply 是作者"暗示"，infer 是读者"推断"。方向恰好相反。',
    items: [
      { w: 'imply', core: '说者暗示', must: '主语是说话人/文本，暗示某种未明说的意思', ex: 'His silence implied disagreement.', zh: '他的沉默暗示着不同意。', wrong: '✗ I imply from the data that...（推断应用 infer）' },
      { w: 'infer', core: '听者推断', must: '主语是读者/听者，从证据中得出结论', ex: 'We can infer the cause from the data.', zh: '我们可以从数据推断原因。', wrong: '✗ The author infers that...（作者是暗示，应用 implies）' }
    ],
    quiz: { ex: 'From the author is tone we can ___ that he is sceptical of the policy.', options: ['imply', 'infer', 'suggest', 'refer'], ans: 1,
      why: '主语是"我们"（读者），动作是从证据得出结论 → infer。imply 的主语必须是信息的发出方。' }
  },
  {
    id: 's-economic-economical', g: 'g11', title: 'economic / economical',
    note: 'economic 指"经济（上）的"，economical 指"节约的、划算的"——一个谈领域，一个谈效率。',
    items: [
      { w: 'economic', core: '与经济相关的', must: 'economic growth / economic policy / economic crisis', ex: 'The country faces serious economic problems.', zh: '该国面临严重的经济问题。', wrong: '✗ an economic car（省油的车应用 economical）' },
      { w: 'economical', core: '节约的、经济的', must: '强调"少花钱、少浪费"：an economical car / to be economical with time', ex: 'This heater is very economical to run.', zh: '这台暖气用起来很省。', wrong: '✗ economical development（经济发展应用 economic）' }
    ],
    quiz: { ex: 'The government announced a set of ___ reforms to cut public spending.', options: ['economic', 'economical', 'economy', 'economics'], ans: 0,
      why: '改革针对的是"经济领域"，用 economic。economical 只能形容某物省资源，不能修饰 reforms。' }
  },
  {
    id: 's-sensible-sensitive', g: 'g11', title: 'sensible / sensitive',
    note: 'sensible 是"明智的、合乎情理的"，sensitive 是"敏感的、易受伤害的"——后者不带"讲道理"的意思。',
    items: [
      { w: 'sensible', core: '明智的、合理的', must: '形容判断、决定、人：a sensible choice', ex: 'It is sensible to save some money each month.', zh: '每月存点钱是明智的。', wrong: '✗ sensible skin（皮肤敏感应用 sensitive）' },
      { w: 'sensitive', core: '敏感的', must: '可指身体敏感，也可指情感或话题敏感', ex: 'This is a highly sensitive topic.', zh: '这是个高度敏感的话题。', wrong: '✗ a sensitive decision（明智的决定应用 sensible）' }
    ],
    quiz: { ex: 'She made a ___ decision to leave before the storm arrived.', options: ['sensitive', 'sensible', 'sensory', 'sentimental'], ans: 1,
      why: '在暴风雨来临前离开是"明智合理的"判断 → sensible。用 sensitive 会变成"敏感的决定"，语义不通。' }
  },
  {
    id: 's-historic-historical', g: 'g12', title: 'historic / historical',
    note: 'historic = 有历史意义的（本身很重要）；historical = 与历史有关的（只是关于过去）。',
    items: [
      { w: 'historic', core: '历史性的、有里程碑意义', must: '用于本身重要的事件：a historic victory', ex: 'The two leaders signed a historic agreement.', zh: '两位领导人签署了一份历史性协议。', wrong: '✗ a historic novel（历史小说应用 historical）' },
      { w: 'historical', core: '历史（上）的、史学的', must: '只是"与过去有关"：historical records / a historical novel', ex: 'The film is based on historical facts.', zh: '这部电影基于史实。', wrong: '✗ a historical meeting（强调重要性应用 historic）' }
    ],
    quiz: { ex: 'The discovery of penicillin was a ___ moment in medicine.', options: ['historical', 'historic', 'history', 'historian'], ans: 1,
      why: '青霉素的发现改变了医学进程，本身具有里程碑意义 → historic。用 historical 只说明"那是过去发生的事"，大大削弱了评价。' }
  },
  {
    id: 's-continual-continuous', g: 'g12', title: 'continual / continuous',
    note: 'continual = 反复发生但中间有间断；continuous = 一刻不停、毫无中断。',
    items: [
      { w: 'continual', core: '反复（有间断）', must: '常常带有"令人厌烦"的色彩：continual interruptions', ex: 'His continual complaints tired everyone.', zh: '他没完没了的抱怨让所有人都累了。', wrong: '✗ a continual line（一条不断开的线应用 continuous）' },
      { w: 'continuous', core: '连续不断（无间断）', must: '强调时间或空间上没有中断', ex: 'The machine ran for 48 hours of continuous use.', zh: '这台机器连续运转了 48 小时。', wrong: '✗ continuous interruptions（打断本身是间断的，应用 continual）' }
    ],
    quiz: { ex: 'The brain needs a ___ supply of oxygen.', options: ['continual', 'continuous', 'continued', 'continuing'], ans: 1,
      why: '大脑的供氧不能有任何中断 → continuous。用 continual 会暗示"供氧反复开始又停止"，与生理事实矛盾。' }
  }
);

/* ---------- 高中 · 一词多义 ---------- */
DBX.poly.push(
  { w: 'issue', ph: '/ˈɪʃuː/', g: 'g10', senses: [
    { g: 'n. 议题、问题（待讨论）', ex: 'Climate change is the key issue of our time.' },
    { g: 'v. 发布、发行', ex: 'The bank issued a warning about online fraud.' },
    { g: 'n. （杂志的）一期', ex: 'The article appeared in the March issue.' }
  ], quiz: [
    { ex: 'The ministry issued new rules on school safety.', options: ['议题（名词）', '发布、颁布（动词）', '一期（杂志）', '争论'], ans: 1, why: 'issue 后接宾语 new rules，且主语是部委 → 动词"发布、颁布"。这是政论语体中的高频用法。' }
  ]},
  { w: 'present', ph: '/ˈpreznt/', g: 'g10', senses: [
    { g: 'adj. 出席的、在场的', ex: 'Only ten members were present at the meeting.' },
    { g: 'n. 礼物', ex: 'She gave me a small present for my birthday.' },
    { g: 'adj. 目前的、现在的', ex: 'The present situation is far from stable.' },
    { g: 'v. 呈现、提出 /prɪˈzent/', ex: 'The report presents a clear picture of the problem.' }
  ], quiz: [
    { ex: 'All present agreed to the plan.', options: ['礼物', '目前的', '出席的人', '呈现'], ans: 2, why: 'present 置于名词之后（all present）表示"在场的人"，这是形容词后置的固定用法。此处不可能是"所有礼物"。' }
  ]},
  { w: 'subject', ph: '/ˈsʌbdʒɪkt/', g: 'g11', senses: [
    { g: 'n. 学科、科目', ex: 'Maths was always my weakest subject.' },
    { g: 'n. 主题、话题', ex: 'Let us return to the subject under discussion.' },
    { g: 'n. （语法）主语', ex: 'In this sentence the subject is hidden.' },
    { g: 'v. 使遭受 /səbˈdʒekt/', ex: 'The data were subjected to strict checks.' }
  ], quiz: [
    { ex: 'The samples were subjected to three rounds of testing.', options: ['学科', '主题', '使遭受、接受（检验）', '主语'], ans: 2, why: 'be subjected to 是固定搭配，意为"被施加、接受（某种处理）"，动词重音在后（subJECT）。这是学术写作的标志性表达。' }
  ]},
  { w: 'sound', ph: '/saʊnd/', g: 'g11', senses: [
    { g: 'n. 声音', ex: 'We heard the sound of running water.' },
    { g: 'adj. 合理的、可靠的', ex: 'The advice is sound, though hard to follow.' },
    { g: 'v. 听起来', ex: 'That sounds like a good idea.' },
    { g: 'adj. 完好的、无损伤的', ex: 'He returned home safe and sound.' }
  ], quiz: [
    { ex: 'His argument rests on sound evidence.', options: ['声音', '合理的、可靠的', '听起来', '完好的'], ans: 1, why: 'sound 修饰 evidence 表示"证据可靠、站得住脚"。若理解为"声音的证据"，句子完全讲不通——这是学术阅读中最高频的义项。' }
  ]},
  { w: 'figure', ph: '/ˈfɪɡə(r)/', g: 'g12', senses: [
    { g: 'n. 数字、数据', ex: 'The latest figures show a sharp fall.' },
    { g: 'n. 人物、身影', ex: 'She is a key figure in the field.' },
    { g: 'v. 认为、估计', ex: 'We figure the work will take a month.' },
    { g: 'v. 弄清楚（figure out）', ex: 'No one could figure out why it failed.' }
  ], quiz: [
    { ex: 'The unemployment figures released today were worse than expected.', options: ['人物', '数字、数据', '认为', '身影'], ans: 1, why: 'figures 与 released（发布）、worse than expected 搭配 → 统计数字。用"人物"义项无法与"发布"搭配。' }
  ]},
  { w: 'yield', ph: '/jiːld/', g: 'g12', senses: [
    { g: 'v. 产生（结果、数据）', ex: 'The experiment yielded no clear answer.' },
    { g: 'v. 屈服、让步', ex: 'He refused to yield to pressure.' },
    { g: 'n. 产量', ex: 'The yield fell by 20% after the drought.' }
  ], quiz: [
    { ex: 'The first survey yielded little useful information.', options: ['产量（名词）', '产生、得出（动词）', '让步', '放弃'], ans: 1, why: 'yield 后接宾语 information，且主语是 survey → 动词"得出、产生"。学术写作中 The study yielded... 是极常见的句式。' }
  ]}
);

/* ---------- 高中 · 真实语料挑战 ---------- */
DBX.chal.push(
  { s: 'The study suggests a link, but does not prove one.', src: '《自然》论文摘要', zh: '该研究提示存在关联，但并未证实。', g: 'g10',
    q: '为什么作者坚持用 suggests 而不是 proves？', options: ['suggests 更正式', 'suggests 在证据强度上弱于 proves：只指向可能性，不承担因果断言', 'proves 是语法错误', '两者可以互换'], ans: 1,
    why: '学术英语对动词的证据强度极其敏感：suggest 给的是"提示"，prove 给的是"证实"。换成 prove，作者就要为一个尚未确证的因果关系负责。' },
  { s: 'Few of the proposals were workable.', src: '评审报告', zh: '这些提案中几乎没有可行的。', g: 'g10',
    q: '把 Few 换成 A few，句子的意义会怎样变化？', options: ['意义不变', '从"几乎没有（否定）"变为"有几个（肯定）"', '从可数变为不可数', '语气更正式'], ans: 1,
    why: 'few（几乎没有，带否定意味）与 a few（还有几个，肯定意味）意义相反。这是英语中"有无冠词改变命题态度"的典型例子。' },
  { s: 'It is what you do, not what you say, that matters.', src: '演讲语料', zh: '重要的不是你说什么，而是你做什么。', g: 'g10',
    q: '这句话用了什么结构来安排信息焦点？', options: ['定语从句', '强调句：把"你做什么"钉为全句的焦点', '倒装句', '虚拟语气'], ans: 1,
    why: '去掉 It is 与 that，"What you do, not what you say, matters" 仍成立 → 强调句。说话人用这个结构把"做"与"说"的对比推到最前面。' },
  { s: 'Never have I seen such dedication in a young student.', src: '教师评语语料', zh: '我从未在一个年轻学生身上见过如此的投入。', g: 'g10',
    q: '为什么这里要倒装？', options: ['为了句子更长', '否定词 Never 置于句首必须部分倒装，把"从未"的重量放在最前', '因为主语太长', '没有原因，习惯用法'], ans: 1,
    why: '倒装改变的是信息排列与语气强度。正常语序也可以说，但"从未"的分量会被削弱——这正是写作者选择倒装的意义动机。' },
  { s: 'The vaccine is 90% effective at preventing severe illness.', src: 'WHO 技术简报', zh: '该疫苗在预防重症方面有效性为 90%。', g: 'g10',
    q: '句中的 effective 能否替换为 efficient？', options: ['可以，两者是同义词', '不可以：effective = 达到预期效果；efficient = 效率高（投入产出比）', '不可以：efficient 只能修饰人', '可以，但语气更正式'], ans: 1,
    why: 'effective 回答"有没有用"（结果导向），efficient 回答"划不划算"（资源利用率）。疫苗只讲"有效"，不讲"高效"，替换后整个命题的意义被改变。' },
  { s: 'If I had known the cost, I would not have started.', src: '访谈语料', zh: '如果当初知道成本，我就不会开始了。', g: 'g11',
    q: '这句话的动词形式在传递什么信息？', options: ['事情发生在现在', '与过去事实相反：当初并不知道，事实上也开始了', '与现在事实相反', '一种真实条件'], ans: 1,
    why: '从句 had known（过去完成时）+ 主句 would not have started 是标准的过去虚拟，它用"时态倒退一格"宣告：事实与句意相反。' },
  { s: 'He must have left in a hurry — his keys are still on the table.', src: '推理语料', zh: '他肯定是匆忙离开的——钥匙还在桌上。', g: 'g11',
    q: '如果把 must have left 换成 should have left，意思会变成什么？', options: ['意义不变', '从"几乎肯定的推测"变成"他本该匆忙离开（却没有）"', '语气更弱', '变成将来'], ans: 1,
    why: 'must have done 对过去下肯定判断；should have done 表达"本该做却没做"的遗憾或责备。这里钥匙是证据，所以只能是前者。' },
  { s: 'My colleague, who has worked here for twenty years, is retiring.', src: '职场语料', zh: '我的同事要退休了，他在这里工作二十年了。', g: 'g11',
    q: '这个逗号能删掉吗？', options: ['能，语义完全一样', '不能：删掉后变成"在这里工作二十年的那位同事"，暗示还有别的同事', '能，删掉后更正式', '不能：删掉后语法错误'], ans: 1,
    why: '逗号决定定语从句是"补充"还是"识别"。如果说话人只有一位同事，加逗号；如果有多位、需要用二十年工龄来区分，就必须删掉逗号。' },
  { s: 'Given the limited budget, we had to cut the second phase.', src: '项目报告语料', zh: '考虑到预算有限，我们不得不砍掉第二期。', g: 'g11',
    q: '句首的 Given 在意义上等于什么？', options: ['过去分词作定语', '一个条件/原因状语：相当于 Considering 或 If we take...into account', '被动语态的一部分', '介词"给"'], ans: 1,
    why: 'Given + 名词 是固定的分词状语，意为"考虑到、鉴于"。它给的是决策的背景依据，而非时间或动作——把它当成定语会完全读错逻辑。' },
  { s: 'The number of applicants has doubled, but the number of places has not.', src: '招生报告语料', zh: '申请人数翻了一番，但录取名额没有。', g: 'g12',
    q: '为什么两处都用 has 而不是 have？', options: ['applicants 是复数', '两处的主语都是 the number（数字），是单数意义', '因为用了 but', '因为 doubled 是单数'], ans: 1,
    why: 'the number of 的重心是"这个数目"→ 单数；a number of 才是"许多"→ 复数。形式只差一个冠词，主谓一致却完全相反。' },
  { s: 'The climate of the north is drier than that of the south.', src: '地理说明语料', zh: '北方的气候比南方干燥。', g: 'g12',
    q: '句末的 that 能否换成 it？', options: ['可以，两者相同', '不能：that 指代"同类的另一个（南方的气候）"，it 会指代同一个对象，造成"北方气候比自己干"', '不能：that 不能指代不可数名词', '可以，但语气更弱'], ans: 1,
    why: '替代词的选择是意义的精确性问题：that 用于"同类不同一"，it 用于"同一个"。这是比较结构中不可逾越的界限。' },
  { s: 'Not only did the policy fail, but it also cost the city millions.', src: '政策评估语料', zh: '该政策不仅失败，还让这座城市损失了数百万。', g: 'g12',
    q: '为什么前半句要用 did 提前？', options: ['为了强调"政策"', 'Not only 置于句首时该分句必须部分倒装，把否定递进的重量前置', '因为 fail 是不及物动词', '没有原因'], ans: 1,
    why: 'not only...but also 连接两个分句时，只有前一个倒装。倒装让"不仅…还…"的递进关系在句首就立起来，读者立刻知道后面还有更重的一层。' }
);
