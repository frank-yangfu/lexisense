/* ============================================================
   辞源 Lexisense — 技能语料库（句法层 / 语用层 / 输出层）
   ============================================================ */

window.DB = window.DB || {};

/* ---------- 5. 语法意义地图：每个结构贡献什么意义 ---------- */
DB.grammar = [
  {
    id: 'past-vs-perfect', title: '一般过去时 vs 现在完成时', weight: 5,
    q: '这两个时态的意义差别到底在哪里？',
    a: [
      '一般过去时：把动作放进一个已结束的过去时间点，说话人只报告事实，与现在无关。',
      '现在完成时：把过去的动作与现在的状态连接，说话人真正关心的是当下的结果或影响。'
    ],
    pairs: [
      { s: 'I lost my keys.', m: '报告一件过去发生的事（也许现在已经找到了）' },
      { s: 'I have lost my keys.', m: '真正要说的是现在的状态：我现在没有钥匙' },
      { s: 'She worked here for five years.', m: '她已不在这里工作了' },
      { s: 'She has worked here for five years.', m: '她现在仍在这里工作' }
    ],
    quiz: { q: 'Our data engineer ___ in this team since 2019.（他仍在团队中）', options: ['worked', 'has worked', 'had worked', 'was working'], ans: 1,
      why: 'since 2019 + “仍在团队中”说明动作从过去延续到现在，且关注的是当下的状态 → 现在完成时。若用一般过去时 worked，则暗示其已离开。' }
  },
  {
    id: 'be-being', title: 'He is polite. vs He is being polite.', weight: 5,
    q: '为什么要多一个 being？它的意义贡献是什么？',
    a: [
      'He is polite：polite 是他一贯的性格特征（常态属性）。',
      'He is being polite：being 强制把 polite 解释为“此刻临时表现出的举止”，暗示平时未必如此。',
      '规律：be being + 形容词 = 临时行为（temporary behaviour），而非固有属性。'
    ],
    pairs: [
      { s: 'He is polite.', m: '他这个人一向有礼貌' },
      { s: 'He is being polite.', m: '他这会儿表现得很客气（可能平时并不）' },
      { s: 'She is foolish.', m: '她是个愚蠢的人（人身评价）' },
      { s: 'She is being foolish.', m: '她这回做事不明智（针对当下行为）' }
    ],
    quiz: { q: 'The children ___ very quiet today — something must be up.', options: ['are', 'are being', 'were', 'have been'], ans: 1,
      why: 'today 与“一定出事了”暗示这与平时不同，是当下的临时表现 → are being quiet。用 are quiet 只是陈述常态，失去“反常”这层含义。' }
  },
  {
    id: 'will-vs-goingto', title: 'will vs be going to', weight: 4,
    q: '同样是“将来”，两者意义不同在哪？',
    a: [
      'be going to：基于当下已有证据或事先计划的意图（现在已有迹象 / 早已打算）。',
      'will：在说话的当下才作出的决定、承诺、预测（说话瞬间产生）。'
    ],
    pairs: [
      { s: 'Look at those clouds — it is going to rain.', m: '依据当下可见的云（证据在现在）' },
      { s: 'It will rain tomorrow, according to the forecast.', m: '依据外部信息作出的预测' },
      { s: 'The phone is ringing. — I will get it.', m: '听到铃声的瞬间才作出的决定（不能用 am going to）' },
      { s: 'I am going to learn Spanish this year.', m: '早已定下的计划' }
    ],
    quiz: { q: '— We are out of milk. — Really? I ___ some.', options: ['will buy', 'am going to buy', 'am buying', 'buy'], ans: 0,
      why: '这是听到消息当下即时作出的决定，而非事先计划 → will buy。am going to buy 表示早就打算好的意图，与“刚刚才知道”矛盾。' }
  },
  {
    id: 'modal-obligation', title: 'must / have to / should', weight: 4,
    q: '三种“应该、必须”的意义边界是什么？',
    a: [
      'must：说话人自己施加的、主观上认为的必要；或逻辑上的必然推断。',
      'have to：来自外部规则、他人要求或客观情况的必要（与主观意愿无关）。',
      'should：给出建议或预期，不具强制性，语气最弱。'
    ],
    pairs: [
      { s: 'I must remember to call her.', m: '我自己觉得必须（内在压力）' },
      { s: 'I have to wear a uniform at work.', m: '公司规定，外部要求' },
      { s: 'You should see a doctor.', m: '建议，非强制' },
      { s: 'He must be tired — he has been up since 5.', m: 'must 表逻辑推断“一定”（否定用 can\'t）' }
    ],
    quiz: { q: 'In this building, all visitors ___ sign in at the front desk.', options: ['must', 'have to', 'should', 'ought'], ans: 1,
      why: '“这栋楼的规定”是外部制度要求 → have to。must 强调说话人主观施加的必要性，此处说话人并不是规则的制定者；should 只是建议，与制度强制不符。' }
  },
  {
    id: 'usedto-vs-would', title: 'used to vs would', weight: 3,
    q: '都表示过去习惯，差别在哪？',
    a: [
      'used to：既可表过去的习惯动作，也可表过去的状态；且强调“现在已经不再如此”。',
      'would：只表过去反复发生的动作，不能表过去的状态（✗ would be a teacher）。',
      '关键意义：used to 自带“今昔对比”的含义，would 只描述过去。'
    ],
    pairs: [
      { s: 'He used to smoke.', m: '他过去抽烟，现在不抽了' },
      { s: 'He would sit there for hours.', m: '他（那时）常常一坐几小时' },
      { s: 'There used to be a cinema here.', m: '表过去的状态（不能用 would）' },
      { s: 'She would be quiet all day.', m: '✗ 状态动词，宜用 used to be' }
    ],
    quiz: { q: 'My grandmother ___ tell us stories every evening.', options: ['used to', 'would', 'is used to', 'was used to'], ans: 1,
      why: 'tell 是反复发生的动作，且句中没有“今昔对比”的意味 → would 更贴切。注意 be used to doing 意为“习惯于做某事”，与此完全不同。' }
  },
  {
    id: 'subjunctive', title: '虚拟语气：If I were / If I had been', weight: 5,
    q: '虚拟语气究竟在表达什么意义？',
    a: [
      '核心意义：说话人明确标记“这不是事实”——与现在事实相反用过去式（were / did），与过去事实相反用过去完成时。',
      'If I were you：我不是你（现在，非事实）。',
      'If I had known：我当时不知道（过去，非事实）。',
      '这种“距离感”是英语用时态表达意义真实性（factual distance）的典型手段。'
    ],
    pairs: [
      { s: 'If I have time, I will come.', m: '真实条件：有可能' },
      { s: 'If I had time, I would come.', m: '非真实：现在没时间' },
      { s: 'If I had known, I would have called you.', m: '非真实：当时不知道' }
    ],
    quiz: { q: 'If the team ___ the warning, the outage could have been avoided.', options: ['heeded', 'had heeded', 'would heed', 'heeds'], ans: 1,
      why: '主句 could have been avoided 指向过去未发生的结果 → 条件句须用过去完成时 had heeded，表示“当时并未留意警告”。' }
  },
  {
    id: 'passive-meaning', title: '被动语态的意义：谁被抹掉了？', weight: 4,
    q: '为什么英语要大量使用被动语态？',
    a: [
      '被动语态的意义不是“换一种说法”，而是重新分配信息焦点：把受事放在句首作为话题主语。',
      '当施事未知、不重要，或说话人有意回避责任时，被动语承载明确的意义选择。',
      'Mistakes were made. —— 刻意不说出谁犯了错，这本身就是一种表态。'
    ],
    pairs: [
      { s: 'The committee rejected the proposal.', m: '焦点在“委员会”，责任明确' },
      { s: 'The proposal was rejected.', m: '焦点在“提案”；谁拒的不重要或被回避' },
      { s: 'Mistakes were made.', m: '经典的责任回避式表达' }
    ],
    quiz: { q: '选择“更回避责任”的表达：', options: ['We approved the payment late.', 'The payment was approved late.', 'Someone approved the payment late.', 'I approved the payment late.'], ans: 1,
      why: '被动语态省略施事，把焦点放在“付款”这件事上，读者无法知道是谁批的 → 这是最具责任回避意义的写法。' }
  },
  {
    id: 'participle-modifier', title: '-ing 作定语 vs 动名词', weight: 3,
    q: 'flying planes 为什么会有两种意思？',
    a: [
      '现在分词作定语 = 一个省略的定语从句：planes (that are) flying → “正在飞行的飞机”。',
      '动名词作主语 = 把动作本身当作一件事：Flying (planes) = “驾驶飞机这件事”。',
      '形式相同而结构不同，导致语义角色完全不同。'
    ],
    pairs: [
      { s: 'Flying planes can be dangerous. (A)', m: '驾驶飞机这件事可能很危险（动名词短语作主语）' },
      { s: 'Flying planes can be dangerous. (B)', m: '正在飞行的飞机可能是危险的（分词作定语）' },
      { s: 'Visiting relatives can be annoying.', m: '同理：探望亲戚这件事 / 来访的亲戚' }
    ],
    quiz: { q: '"Running water is scarce here." 中 running 的意义是：', options: ['跑步这项运动', '流动的（自来水）', '经营中的', '奔跑的人'], ans: 1,
      why: 'running water 是固定搭配，running 为现在分词作定语，意为“流动的、自来水”，与“跑步”这一动作无关。' }
  },
  {
    id: 'relative-clause', title: '限定性 vs 非限定性定语从句', weight: 5,
    q: '一个逗号改变了什么意义？',
    a: [
      '限定性从句（无逗号）：用来限定到底是哪一个，是识别身份的必要条件。',
      '非限定性从句（有逗号）：先行词身份已唯一确定，逗号后只是补充说明，删去不影响识别。'
    ],
    pairs: [
      { s: 'My brother who lives in Chengdu is a doctor.', m: '我有多个兄弟，特指住在成都的那位（限定身份）' },
      { s: 'My brother, who lives in Chengdu, is a doctor.', m: '我只有一个兄弟，他在成都只是补充信息' },
      { s: 'The students who failed must retake the test.', m: '只有挂科的学生需要重考' },
      { s: 'The students, who failed, must retake the test.', m: '全体学生都要重考（他们都不及格，是补充信息）' }
    ],
    quiz: { q: '“我父亲只有一个，他在上海工作”应写成：', options: ['My father who works in Shanghai...', 'My father, who works in Shanghai,...', 'My father, that works in Shanghai...', 'My father which works in Shanghai...'], ans: 1,
      why: 'father 身份唯一，从句只是补充信息 → 非限定性从句，用逗号 + who。注意非限定性从句不可用 that 引导。' }
  },
  {
    id: 'ed-vs-ing-adj', title: '-ed 形容词 vs -ing 形容词', weight: 3,
    q: 'bored 和 boring 的意义差别由谁决定？',
    a: [
      '-ed 形容词：描述“被作用者”的感受（人感到…）。',
      '-ing 形容词：描述“引发感受的事物”的性质（令人…的）。'
    ],
    pairs: [
      { s: 'I am bored.', m: '我感到无聊（-ed 指向感受者）' },
      { s: 'The lecture is boring.', m: '这讲座令人乏味（-ing 指向引发者）' },
      { s: 'She is interested in the data.', m: '她对数据感兴趣' },
      { s: 'The data is interesting.', m: '这些数据很有意思' }
    ],
    quiz: { q: 'The results were ___, so the team felt ___.', options: ['disappointed / disappointing', 'disappointing / disappointed', 'disappointing / disappointing', 'disappointed / disappointed'], ans: 1,
      why: 'results 是引发感受的事物 → disappointing；team 是感受者 → disappointed。' }
  },
  {
    id: 'modal-perfect', title: '情态动词 + have done', weight: 4,
    q: 'should have done 到底是什么意思？',
    a: [
      '情态 + have done 把情态意义投射到过去，形成三类含义：',
      'should have done：过去本应做却没做（遗憾/责备）。',
      'must have done：对过去非常有把握的推断（一定做过）。',
      'could have done：过去本可以做到却没做（错失的可能）。'
    ],
    pairs: [
      { s: 'You should have backed up the file.', m: '你本该备份的（实际没备份）' },
      { s: 'He must have missed the train.', m: '他一定没赶上火车（很有把握的推断）' },
      { s: 'We could have avoided the penalty.', m: '我们本可以避免这笔罚金（实际没有避免）' }
    ],
    quiz: { q: 'The server crashed — you ___ the warning signs earlier.', options: ['must see', 'should have seen', 'should see', 'could see'], ans: 1,
      why: '服务器已崩溃，说话人责备对方“本应早发现征兆却没发现” → should have seen。' }
  },
  {
    id: 'inversion', title: '否定副词开头的倒装', weight: 3,
    q: 'Never have I… 为什么要倒装？',
    a: [
      '否定/半否定副词置于句首时，主谓必须部分倒装（助动词提前）。',
      '意义作用：把否定词放到最前，制造强烈强调与正式语体色彩。'
    ],
    pairs: [
      { s: 'I have never seen such a mistake.', m: '陈述语气，平铺直叙' },
      { s: 'Never have I seen such a mistake.', m: '强烈强调“前所未见”，语体正式' },
      { s: 'Not only did he resign, but he also sued.', m: '强调递进' },
      { s: 'Under no circumstances should you share the password.', m: '强化禁止语气' }
    ],
    quiz: { q: 'Not until the audit ___ the true scale of the loss.', options: ['we discovered', 'did we discover', 'we did discover', 'discovered we'], ans: 1,
      why: 'Not until 位于句首，主句必须部分倒装 → did we discover。' }
  }
];

/* ---------- 6. 句子成分意义标注 ---------- */
DB.sentences = [
  { s: 'The committee rejected the proposal because it lacked evidence.', zh: '委员会否决了该提案，因为它缺乏证据。',
    tokens: [
      { t: 'The committee', r: '施事 Agent', c: 'agent', n: '作出"reject"这一行为的主体' },
      { t: 'rejected', r: '谓语 Predicate', c: 'verb', n: '核心动作：否定性判断，而非 merely "refused"' },
      { t: 'the proposal', r: '受事 Patient', c: 'patient', n: '被否决的对象' },
      { t: 'because', r: '因果连接', c: 'link', n: '引出理由，把前后两个命题绑定为因果关系' },
      { t: 'it', r: '指代（回指 proposal）', c: 'ref', n: '回指 the proposal，若指代不明则整句歧义' },
      { t: 'lacked', r: '谓语（从句）', c: 'verb', n: '“缺乏”，指向不足而非错误' },
      { t: 'evidence', r: '受事 Patient', c: 'patient', n: '缺乏的具体内容' }
    ]},
  { s: 'Despite heavy rain, the volunteers finished the survey by Friday.', zh: '尽管雨很大，志愿者们仍在周五前完成了调查。',
    tokens: [
      { t: 'Despite', r: '让步（转折）', c: 'link', n: '标记"与预期相反"：雨大本应阻碍，但结果相反' },
      { t: 'heavy rain', r: '让步条件', c: 'cond', n: '被视为阻碍因素' },
      { t: 'the volunteers', r: '施事 Agent', c: 'agent', n: '执行者' },
      { t: 'finished', r: '谓语 Predicate', c: 'verb', n: '完成，强调结果而非过程' },
      { t: 'the survey', r: '受事 Patient', c: 'patient', n: '被完成的任务' },
      { t: 'by Friday', r: '时间（截止）', c: 'time', n: 'by 强调"不晚于"，而非"在…期间"' }
    ]},
  { s: 'She has been working on the manuscript since March.', zh: '自三月以来她一直在写这份手稿。',
    tokens: [
      { t: 'She', r: '施事 Agent', c: 'agent', n: '' },
      { t: 'has been working', r: '现在完成进行', c: 'verb', n: '强调从过去持续到现在的动作过程，且仍在进行' },
      { t: 'on the manuscript', r: '对象（论元）', c: 'patient', n: 'work on 的介词宾语，动作作用的对象' },
      { t: 'since March', r: '时间起点', c: 'time', n: 'since 指定起点，与完成时配合' }
    ]},
  { s: 'Only after the third test did the engineers accept the result.', zh: '直到第三次测试后，工程师们才接受该结果。',
    tokens: [
      { t: 'Only after', r: '强调性时间限定', c: 'link', n: 'Only 置于句首触发倒装，强调"直到…才"' },
      { t: 'the third test', r: '时间参照点', c: 'time', n: '界定了动作发生的最早时点' },
      { t: 'did', r: '助动词（部分倒装）', c: 'verb', n: '助动词 did 提前至主语之前，构成部分倒装' },
      { t: 'the engineers', r: '施事 Agent', c: 'agent', n: '' },
      { t: 'accept', r: '谓语 Predicate', c: 'verb', n: '' },
      { t: 'the result', r: '受事 Patient', c: 'patient', n: '' }
    ]},
  { s: 'Unlike the earlier model, this device consumes almost no standby power.', zh: '与早期型号不同，这台设备几乎不消耗待机电量。',
    tokens: [
      { t: 'Unlike the earlier model', r: '对比参照', c: 'link', n: '建立对比框架，读者据此理解后文的"少"' },
      { t: 'this device', r: '施事/主题', c: 'agent', n: '' },
      { t: 'consumes', r: '谓语 Predicate', c: 'verb', n: '消耗（资源）' },
      { t: 'almost', r: '程度（近似）', c: 'degree', n: '把绝对否定弱化为接近零，避免绝对化断言' },
      { t: 'no standby power', r: '受事 Patient', c: 'patient', n: '' }
    ]},
  { s: 'The report, which was leaked on Tuesday, has been withdrawn.', zh: '这份周二被泄露的报告已被撤回。',
    tokens: [
      { t: 'The report', r: '主题主语', c: 'agent', n: '话题焦点' },
      { t: ', which was leaked on Tuesday,', r: '非限定性定语（补充信息）', c: 'extra', n: '有逗号 → 只是补充，删除后仍能识别是哪份报告' },
      { t: 'has been withdrawn', r: '现在完成时 + 被动', c: 'verb', n: '强调当下状态"已不可用"，且回避了谁撤回了它' }
    ]},
  { s: 'Had we checked the logs, we would have caught the error earlier.', zh: '如果我们当时检查了日志，就能更早发现这个错误。',
    tokens: [
      { t: 'Had we checked', r: '虚拟条件（倒装）', c: 'link', n: 'Had 提前 = If we had checked，标记"与过去事实相反"' },
      { t: 'the logs', r: '受事 Patient', c: 'patient', n: '' },
      { t: 'we would have caught', r: '虚拟结果', c: 'verb', n: '过去本可以做到而实际未发生' },
      { t: 'the error', r: '受事 Patient', c: 'patient', n: '' },
      { t: 'earlier', r: '时间（比较）', c: 'time', n: '与未发生的更早时点比较' }
    ]},
  { s: 'Roughly 40% of respondents described the service as unreliable.', zh: '约 40% 的受访者认为该服务不可靠。',
    tokens: [
      { t: 'Roughly', r: '程度（模糊限制语）', c: 'degree', n: '把数字限定为近似值，体现严谨' },
      { t: '40% of respondents', r: '施事 Agent（部分量）', c: 'agent', n: '量化主语，决定论断适用范围' },
      { t: 'described', r: '谓语（归类）', c: 'verb', n: '把 A 归入某类别：described X as Y' },
      { t: 'the service', r: '受事 Patient', c: 'patient', n: '' },
      { t: 'as unreliable', r: '属性（补语）', c: 'patient', n: '归类的结果' }
    ]},
  { s: 'He is being unusually cautious about the forecast.', zh: '他对这次预测异常谨慎。',
    tokens: [
      { t: 'He', r: '施事/主题', c: 'agent', n: '' },
      { t: 'is being', r: '临时状态标记', c: 'verb', n: 'being 强调"此刻的临时表现"，而非一贯性格' },
      { t: 'unusually', r: '程度（偏离常态）', c: 'degree', n: '暗示与平时相比有出入，呼应 is being' },
      { t: 'cautious', r: '属性', c: 'patient', n: '' },
      { t: 'about the forecast', r: '关涉对象', c: 'cond', n: '限定谨慎的范围' }
    ]},
  { s: 'What surprised us was not the cost but the delay.', zh: '让我们吃惊的不是费用，而是拖延。',
    tokens: [
      { t: 'What surprised us', r: '主语从句（被强调项）', c: 'agent', n: '分裂句结构，把"令我们吃惊的事"提前为话题' },
      { t: 'was', r: '系动词', c: 'verb', n: '' },
      { t: 'not the cost', r: '被否定的选项', c: 'patient', n: '排除项' },
      { t: 'but', r: '对比转折', c: 'link', n: 'not A but B：纠正读者预期' },
      { t: 'the delay', r: '真正焦点', c: 'patient', n: '被凸显的焦点信息' }
    ]}
];

/* ---------- 7. 歧义检测与修正 ---------- */
DB.ambig = [
  { s: 'Flying planes can be dangerous.', score: 'high',
    why: 'Flying 既可理解为动名词（"驾驶飞机"这件事），也可理解为现在分词作定语（"正在飞行的"），导致 planes 的语义角色完全不同。',
    readings: [
      { m: '解读 A：驾驶飞机这件事可能有危险', rw: 'To fly planes can be dangerous.', note: 'Flying 为动名词，planes 是其宾语' },
      { m: '解读 B：正在飞行的飞机（对他人）是危险的', rw: 'Planes that are flying can be dangerous.', note: 'Flying 为现在分词，修饰 planes' }
    ]},
  { s: 'She did not take the book because it was expensive.', score: 'high',
    why: 'not 的否定范围不明确：是否定"拿书"这个动作，还是否定"因为贵"这个原因（即她拿了，但不是因为贵）。',
    readings: [
      { m: '解读 A：因为贵，所以她没拿', rw: 'Because it was expensive, she did not take the book.', note: 'not 否定 take' },
      { m: '解读 B：她拿了这本书，但不是因为它贵', rw: 'She took the book, but not because it was expensive.', note: 'not 否定 because 从句' }
    ]},
  { s: 'I saw the man with the telescope.', score: 'high',
    why: '介词短语 with the telescope 的附着对象不明：是"我用望远镜看"（工具），还是"我看到那个拿着望远镜的男人"（定语）。',
    readings: [
      { m: '解读 A：我用望远镜看到了那个男人', rw: 'Using the telescope, I saw the man.', note: 'with 短语作方式/工具状语' },
      { m: '解读 B：我看到那个带着望远镜的男人', rw: 'I saw the man who had a telescope.', note: 'with 短语作定语修饰 the man' }
    ]},
  { s: 'The chicken is ready to eat.', score: 'high',
    why: '不定式 to eat 的逻辑主语不明：鸡要吃东西，还是鸡可以被吃。',
    readings: [
      { m: '解读 A：鸡（自己）准备进食了', rw: 'The chicken is ready to eat its feed.', note: 'the chicken 是 eat 的施事' },
      { m: '解读 B：鸡（这道菜）可以吃了', rw: 'The chicken is ready to be eaten.', note: 'the chicken 是 eat 的受事' }
    ]},
  { s: 'Visiting relatives can be annoying.', score: 'high',
    why: 'Visiting 与 Flying planes 同构：动名词（探望亲戚这件事）vs 现在分词（来访的亲戚们）。',
    readings: [
      { m: '解读 A：去探望亲戚这件事可能令人烦恼', rw: 'To visit relatives can be annoying.', note: '动名词短语作主语' },
      { m: '解读 B：来访的亲戚们可能很烦人', rw: 'Relatives who visit can be annoying.', note: '分词作定语' }
    ]},
  { s: 'He gave her cat food.', score: 'mid',
    why: 'cat food 可理解为复合名词"猫粮"，也可理解为"她的猫 + 食物"两个宾语（give 的双宾结构）。',
    readings: [
      { m: '解读 A：他给了她一些猫粮', rw: 'He gave her some cat food.', note: 'cat food 为复合名词' },
      { m: '解读 B：他把食物给了她的猫', rw: 'He gave food to her cat.', note: '双宾结构：give + 间接宾语 + 直接宾语' }
    ]},
  { s: 'The students complained about the professor who was unfair.', score: 'mid',
    why: '无逗号时是限定性定语从句，暗示"存在多位教授，投诉的是不公平的那位"；若本意是"这位教授本身就不公平"，应改用非限定性或改写。',
    readings: [
      { m: '解读 A：限定性——投诉的是"不公平的那位"教授（暗示有多位）', rw: 'The students complained about the professor that was unfair.', note: '识别功能' },
      { m: '解读 B：非限定性——教授身份已明确，补充其不公平', rw: 'The students complained about the professor, who was unfair.', note: '补充功能' }
    ]},
  { s: 'They are moving sidewalks.', score: 'mid',
    why: 'moving 既可作谓语动词的一部分（正在搬运），也可看作分词修饰 sidewalks（自动人行道）。',
    readings: [
      { m: '解读 A：他们正在搬运人行道（的部件）', rw: 'They are moving the sidewalks.', note: 'moving 为现在分词构成进行时' },
      { m: '解读 B：它们是自动人行道', rw: 'They are moving sidewalks. (moving sidewalks = 自动步道)', note: 'moving 为形容词化分词' }
    ]}
];

/* ---------- 8. 真实语料“意义挑战” ---------- */
DB.challenge = [
  { s: 'The vaccine is 90% effective at preventing severe illness.', src: 'WHO 技术简报', zh: '该疫苗在预防重症方面有效性为 90%。',
    q: '句中的 effective 能否替换为 efficient？', options: ['可以，两者是同义词', '不可以：effective = 达到预期效果（是否有效）；efficient = 效率高（投入产出比高）', '不可以：efficient 只能修饰人', '可以，但语气更正式'], ans: 1,
    why: 'effective 回答"有没有用"（结果导向），efficient 回答"划不划算"（资源利用率）。疫苗只讲"有效"，不讲"高效"，替换后整个命题的意义被改变。' },
  { s: 'He is being difficult about the schedule.', src: '商务沟通语料', zh: '他在日程安排上故意为难。',
    q: '为什么这里要用 is being 而不是 is？', options: ['因为句子是进行时', 'is being 标记"此刻的临时表现"，暗示他平时并不这样；is difficult 则表示他一贯如此', '两者完全等价，无意义差别', 'being 是为了强调主语'], ans: 1,
    why: 'be being + adj. 强制把形容词解读为临时行为。说 He is difficult 是评价他的性格（人身攻击），说 He is being difficult 是描述当下的具体表现（对事不对人）——意义上的差别极大。' },
  { s: 'Mistakes were made during the transition.', src: '新闻发布会常见表达', zh: '过渡期间出现了一些失误。',
    q: '这句话在意义上的关键选择是什么？', options: ['使用了过去时', '使用被动语态省略了施事，刻意回避"谁犯了错"', '使用了复数名词', '使用了介词 during'], ans: 1,
    why: '被动语态的意义不是"换种说法"，而是信息焦点与责任的再分配。比较：Someone made mistakes.（责任明确）vs Mistakes were made.（责任被抹去）。' },
  { s: 'Few of the proposals were workable.', src: '评审报告', zh: '这些提案中几乎没有可行的。',
    q: '把 Few 换成 A few，句子的意义会怎样变化？', options: ['意义不变', '从"几乎没有（否定）"变为"有几个（肯定）"', '从可数变为不可数', '语气更正式'], ans: 1,
    why: 'few（几乎没有，带否定意味）与 a few（还有几个，肯定意味）意义相反。这是英语中"有无冠词改变命题态度"的典型例子。' },
  { s: 'The study suggests a link, but does not prove one.', src: '《自然》论文摘要', zh: '该研究提示存在关联，但并未证实。',
    q: '为什么作者坚持用 suggests 而不是 proves？', options: ['suggests 更正式', 'suggests 在证据强度上弱于 proves：只指向可能性，不承担因果断言', 'proves 是错误的语法', '两者可以互换'], ans: 1,
    why: '在学术写作中，动词的选择就是证据强度的声明。suggest / indicate 是弱断言，prove / demonstrate 是强断言。用错会让论断超出证据支撑范围。' },
  { s: 'It is not that the plan is bad; it is that it is untested.', src: '会议发言', zh: '问题不在于方案差，而在于它未经检验。',
    q: '这个句型在意义上做了什么？', options: ['重复强调', '先否定一个可能的误解，再指出真正的问题——纠正读者的预期', '表示因果关系', '表达让步'], ans: 1,
    why: 'It is not that…; it is that… 是典型的"预期纠正"结构：先排除读者最容易想到的解释（方案差），再给出真正的判断（未经验证）。' },
  { s: 'We regret to inform you that your application was unsuccessful.', src: '拒信标准模板', zh: '很遗憾地通知您，您的申请未获通过。',
    q: 'regret to inform 与 regretting informing 的意义差别是？', options: ['无差别', 'regret to do 用于"遗憾地要做某事"（正式通知）；regret doing 用于"后悔做过某事"', '后者更礼貌', '前者是错误用法'], ans: 1,
    why: 'regret to do 中的不定式指向"即将说出的坏消息"（通知行为本身）；regret doing 指向"已经做过的行为"（事后后悔）。用错会把"通知"变成"后悔通知"。' },
  { s: 'Only 12% of respondents reported being satisfied.', src: '问卷调查', zh: '只有 12% 的受访者表示满意。',
    q: '句首的 Only 承担了什么意义？', options: ['只是语气词', '设定读者预期：把 12% 标记为"低于预期"的比例；去掉后句子变为中性陈述', '表示强调数量大', '表示唯一性'], ans: 1,
    why: 'Only 是评价性副词，它把数字 12% 与某个隐含的期望值对比，标记为"低"。去掉 Only，句子就是纯中性报告。这正是"意义承载"的典型例子。' },
  { s: 'The policy failed to reduce emissions, despite record spending.', src: '政策评估报告', zh: '尽管支出创纪录，该政策未能减少排放。',
    q: 'despite 在这里的核心意义是？', options: ['表示时间先后', '标记"与预期相反"：花钱多本应有效，结果相反', '表示原因', '表示条件'], ans: 1,
    why: 'despite / in spite of 引导让步状语，其核心意义是"这个因素本应导致相反的结果，但结果并未发生"，因此前后语义必须构成张力。' },
  { s: 'There is little evidence to support the claim.', src: '学术综述', zh: '几乎没有证据支持这一说法。',
    q: '把 little 改为 a little，会怎样？', options: ['意义相同', '从"几乎没有（否定）"变为"有少许（肯定）"，论断力度完全不同', '语法错误', '仅改变语体'], ans: 1,
    why: 'little（否定意味：几乎不）与 a little（肯定意味：有一些）构成最小对立，直接决定该论断是"不支持"还是"部分支持"。' },
  { s: 'He stopped to check the gauge.', src: '工业事故报告', zh: '他停下来去检查仪表。',
    q: 'stopped to check 与 stopped checking 的意义差别是？', options: ['无差别', 'stopped to check = 停下（手头事）以便检查；stopped checking = 不再检查了', '前者语法错误', '后者更正式'], ans: 1,
    why: 'stop 后的不定式表示目的（停下A去做B），动名词表示终止该动作本身（不再做B）。这是英语中不定式与动名词改变命题意义的经典最小对。' },
  { s: 'The new rule applies to all staff, regardless of tenure.', src: '公司公告', zh: '新规定适用于全体员工，不论资历。',
    q: 'regardless of 的意义作用是？', options: ['补充时间信息', '排除一个可能影响适用的变量（资历），明确规则无例外', '表示原因', '表示让步但语义更弱'], ans: 1,
    why: 'regardless of 主动"排除"某个潜在条件，使适用范围成为无例外全集。它比 despite 更强调"该变量不起作用"。' },
  { s: 'She was said to have resigned.', src: '新闻报道', zh: '据说她已经辞职了。',
    q: '这个结构在意义上的作用是？', options: ['强调辞职时间', '转述他人说法，说话人不为消息真实性负责（传闻来源）', '表示被动', '表示将来'], ans: 1,
    why: 'Sb is said to… 是转述结构，把信息源推给"据说"，说话人保留距离。这与直接断言 She resigned 在责任承担上完全不同。' },
  { s: 'The results were not significant, the authors conceded.', src: '期刊论文', zh: '作者承认，这些结果并不显著。',
    q: 'conceded 在这里承载了什么意义？', options: ['表示同意', '表示说话人在不利证据面前"让步承认"，暗示其原本持相反立场', '表示强调', '表示推测'], ans: 1,
    why: 'concede 的意义核心是"不情愿地承认对自己不利的事实"，比 admitted 更强调"让步于证据"。选择它而非 said，等于告诉读者作者的立场。' },
  { s: 'It is one thing to cut costs; it is quite another to cut corners.', src: '评论文章', zh: '削减成本是一回事，偷工减料则完全是另一回事。',
    q: '这个句式的意义功能是什么？', options: ['列举事实', '区分两个容易被混淆的概念，划清语义边界', '表示因果', '表示时间顺序'], ans: 1,
    why: 'It is one thing to…; it is another to… 的功能正是"划界"：承认两者表面相似，但坚持它们在性质上不同。这是典型的"意义辨析"句式。' }
];

/* ---------- 9. 写作意义批改规则库 ---------- */
DB.writeRules = [
  { id: 'vague-noun', cat: '意义模糊', level: 'high', re: '\\b(things?|stuff|something|somewhere|whatever)\\b',
    msg: '“thing / stuff” 不承载具体意义，读者无法判断你到底指什么。',
    fix: '替换为具体名词：aspect / factor / issue / detail / element / matter' },
  { id: 'weak-modifier', cat: '意义模糊', level: 'mid', re: '\\b(very|really|quite|pretty|kind of|sort of|much more)\\b',
    msg: '程度副词只放大语气，不提供信息量。',
    fix: '改用精确的形容词：critical / substantial / marginal，或给出具体数值' },
  { id: 'empty-eval', cat: '意义模糊', level: 'high', re: '\\b(good|bad|nice|great|terrible|important|beautiful)\\b',
    msg: '评价性形容词过于笼统，读者无法复现你的判断。',
    fix: '说明“好在何处 / 坏在何处”：reliable / inconsistent / cost-effective' },
  { id: 'hedge', cat: '意义模糊', level: 'mid', re: '\\b(maybe|perhaps|probably|possibly|might be|could be)\\b',
    msg: '模糊限制语削弱了断言的确定性。',
    fix: '若确有把握，改用明确表达；若不确定，说明不确定性的来源' },
  { id: 'filler-opinion', cat: '冗余', level: 'mid', re: '\\b(I think|I believe|I feel that|in my opinion|I would say)\\b',
    msg: '“I think” 通常不增加信息，反而稀释了后面的论点。',
    fix: '直接陈述主张，把 I think 换成证据：The data show that…' },
  { id: 'wordy-cause', cat: '冗余', level: 'high', re: '\\b(due to the fact that|in light of the fact that|for the reason that|owing to the fact that)\\b',
    msg: '用整句表达一个简单的逻辑关系，增加阅读负担却不增加意义。',
    fix: '直接用 because / since / as' },
  { id: 'wordy-purpose', cat: '冗余', level: 'mid', re: '\\b(in order to|so as to|for the purpose of)\\b',
    msg: '不定式已足以表达目的。',
    fix: '简化为 to' },
  { id: 'wordy-time', cat: '冗余', level: 'mid', re: '\\b(at this point in time|at the present time|in the event that|in the process of)\\b',
    msg: '用短语表达一个单词即可承担的时间/条件意义。',
    fix: 'now / currently / if / while' },
  { id: 'template-open', cat: '模板句', level: 'high', re: '\\b(with the development of|along with the development of|as we all know|with the rapid development)\\b',
    msg: '模板化开头不承载任何具体意义。',
    fix: '直接给出事实、数据或问题：In 2025, deliveries rose 18%…' },
  { id: 'vague-subject', cat: '指代不明', level: 'high', re: '^(It|This|That|They)\\b',
    msg: '以代词开头，读者需要回读才能确定指代对象。',
    fix: '用名词短语复述指代内容：The delay (not "It") cost us two weeks.' },
  { id: 'vague-people', cat: '指代不明', level: 'mid', re: '\\b(people|someone|they|everybody|society)\\b',
    msg: '主语过于宽泛，论断的适用范围不清。',
    fix: '明确主体：respondents aged 18–25 / the audit team / regulators' },
  { id: 'absolute', cat: '过度绝对', level: 'mid', re: '\\b(always|never|all of|everyone|nobody|definitely|absolutely)\\b',
    msg: '绝对化断言容易被一个反例推翻。',
    fix: '限定范围：in most cases / the majority of / rarely' },
  { id: 'get-do', cat: '动词精确', level: 'mid', re: '\\b(get|got|do|make)\\b',
    msg: '泛义动词不够精确，无法说明具体行为。',
    fix: 'obtain / receive / secure / conduct / implement / produce' },
  { id: 'vague-quant', cat: '意义模糊', level: 'mid', re: '\\b(a lot of|lots of|many|some|several|various|numerous|a number of)\\b',
    msg: '数量词不精确，论断无法被验证。',
    fix: '给出具体数字或百分比：37% / four of the six sites' },
  { id: 'very-important', cat: '意义模糊', level: 'mid', re: '\\b(very important|very good|very bad|more and more)\\b',
    msg: '程度模糊 + 评价笼统，双重降低信息密度。',
    fix: 'critical / decisive / a 12% increase' },
  { id: 'passive-vague', cat: '责任不明', level: 'low', re: '\\b(is|are|was|were|be|been|being)\\s+(?!(green|keen|clean|open|even|seven|often)\\b)\\w+(ed|en)\\b',
    msg: '被动语态省略了施事，读者不知道是谁做的。',
    fix: '若需要明确责任，改用主动语态并指出施事' },
  { id: 'double-neg', cat: '逻辑', level: 'low', re: '\\b(not\\s+\\w+\\s+enough|no\\s+\\w+\\s+less)\\b',
    msg: '双重否定增加解码成本。',
    fix: '改为肯定表达：insufficient → too small' },
  { id: 'and-so', cat: '逻辑', level: 'mid', re: '\\b(and so|and then|and also)\\b',
    msg: '用 and 连接逻辑上并非并列的命题，掩盖了真实的逻辑关系。',
    fix: '明确关系：because / therefore / however / whereas' }
];

/* ---------- 10. 长难句三层穿透分析示例 ---------- */
DB.deepParse = [
  { s: 'Although the committee had approved the budget in principle, it withheld the funds until an independent audit could confirm that the projected savings were achievable.', zh: '尽管委员会原则上批准了预算，但在独立审计确认预期节省可实现之前，它扣留了资金。',
    l1: '主句：it withheld the funds（核心命题：资金被扣留）；Although 引导让步状语从句；until 引导时间状语从句，其中嵌套 that 引导的宾语从句。',
    l2: 'approved in principle（原则上同意）与 withheld（实际扣留）构成意义上的对立——这正是让步从句要传达的张力；until 明确了条件解除的时点；could confirm 是能力而非事实。',
    l3: '改写：The committee backed the budget, but held the money back until an audit proved the savings were real.（把抽象名词 approved in principle 换成具体动词 backed，把 withheld 换成短语动词 held back）' },
  { s: 'What the researchers found was not that the treatment failed, but that its effect varied so widely between individuals that a single average figure concealed more than it revealed.', zh: '研究者发现的并非治疗无效，而是其效果在个体间差异极大，以至于单一平均值掩盖的比揭示的更多。',
    l1: 'What the researchers found 是主语从句；主干为 What…was not that…but that…（not A but B 分裂结构）；第二个 that 从句内含 so…that 结果状语从句。',
    l2: 'not…but… 纠正读者预期：不是"失败"，而是"差异太大"；so…that 把差异程度与后果绑定；concealed more than it revealed 是对平均值的明确否定评价。',
    l3: '改写：The treatment did not fail; it simply worked very differently from person to person, so an average number hid more than it showed.' }
];
