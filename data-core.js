/* ============================================================
   辞源 Lexisense — 核心语料库（词汇层）
   数据均为教研级真实语料，非模板占位
   ============================================================ */

window.DB = window.DB || {};

/* ---------- 1. 语境词库：每个词在真实语境中获得唯一且清晰的意义 ---------- */
DB.words = [
  { w: 'address', ph: '/əˈdres/', tag: '高频多义', senses: [
    { g: 'v. 处理、应对（问题）', en: 'to deal with or discuss a problem', ex: 'The report fails to address the root cause of the delay.', zh: '这份报告没有触及延误的根本原因。' },
    { g: 'v. 向…发表讲话', en: 'to speak formally to a group', ex: 'She addressed the committee for twenty minutes without notes.', zh: '她在没有讲稿的情况下向委员会讲了二十分钟。' }
  ]},
  { w: 'appreciate', ph: '/əˈpriːʃieɪt/', tag: '情感/认知', senses: [
    { g: 'v. 理解并意识到（某事的难度/价值）', en: 'to understand a situation fully', ex: 'Few people appreciate how fragile the supply chain really is.', zh: '很少有人真正意识到这条供应链有多脆弱。' },
    { g: 'v. 感激', en: 'to be grateful for', ex: 'I appreciate your being honest with me about the numbers.', zh: '感谢你在这组数据上对我坦诚。' }
  ]},
  { w: 'articulate', ph: '/ɑːˈtɪkjuleɪt/', tag: '精确表达', senses: [
    { g: 'v. 清晰、有条理地表达', en: 'to express an idea clearly', ex: 'He could not articulate why the proposal bothered him.', zh: '他说不清为什么这个提案让他不安。' },
    { g: 'adj. 表达清晰的', en: 'able to express thoughts clearly', ex: 'She is the most articulate speaker on the panel.', zh: '她是讨论小组中表达最清晰的发言人。' }
  ]},
  { w: 'bear', ph: '/beə(r)/', tag: '高频多义', senses: [
    { g: 'v. 承担（责任、成本）', en: 'to take on responsibility or cost', ex: 'Small suppliers bear most of the risk in this arrangement.', zh: '在这种安排下，小供应商承担了大部分风险。' },
    { g: 'v. 忍受、承受', en: 'to endure', ex: 'The bridge was not designed to bear such heavy loads.', zh: '这座桥的设计无法承受如此重的荷载。' }
  ]},
  { w: 'charge', ph: '/tʃɑːdʒ/', tag: '高频多义', senses: [
    { g: 'v. 收费；n. 费用', en: 'to ask for payment', ex: 'They charge extra for delivery on public holidays.', zh: '公共假日送货他们要额外收费。' },
    { g: 'v. 指控；n. 罪名', en: 'to formally accuse', ex: 'Two executives were charged with falsifying records.', zh: '两名高管被控伪造记录。' }
  ]},
  { w: 'commit', ph: '/kəˈmɪt/', tag: '高频多义', senses: [
    { g: 'v. 承诺、投入（资源/时间）', en: 'to pledge or dedicate', ex: 'The board refused to commit funds to the project.', zh: '董事会拒绝对该项目投入资金。' },
    { g: 'v. 犯（错误、罪行）', en: 'to do something wrong', ex: 'The error was committed during data entry, not analysis.', zh: '这个错误是在数据录入时犯下的，而不是分析阶段。' }
  ]},
  { w: 'compromise', ph: '/ˈkɒmprəmaɪz/', tag: '高频多义', senses: [
    { g: 'v./n. 妥协、折中', en: 'to settle by mutual concession', ex: 'Neither side was willing to compromise on the deadline.', zh: '双方都不愿在截止日期上让步。' },
    { g: 'v. 损害、危及（原则/质量）', en: 'to weaken or endanger', ex: 'Rushing the test compromised the reliability of the results.', zh: '仓促测试损害了结果的可靠性。' }
  ]},
  { w: 'conduct', ph: '/kənˈdʌkt/', tag: '高频多义', senses: [
    { g: 'v. 实施、进行（研究/调查）', en: 'to carry out', ex: 'The team conducted over forty interviews in three cities.', zh: '该团队在三个城市进行了四十多场访谈。' },
    { g: 'n. 行为、品行', en: 'behaviour', ex: 'His conduct during the hearing drew sharp criticism.', zh: '他在听证会上的行为招致了尖锐批评。' }
  ]},
  { w: 'consequence', ph: '/ˈkɒnsɪkwəns/', tag: '逻辑', senses: [
    { g: 'n. （负面）后果', en: 'a negative result of an action', ex: 'He accepted full responsibility for the consequences of the leak.', zh: '他承担了泄密后果的全部责任。' },
    { g: 'n. 重要性', en: 'importance or significance', ex: 'The decision is of little consequence to our daily operations.', zh: '这一决定对我们的日常运营无关紧要。' }
  ]},
  { w: 'consistent', ph: '/kənˈsɪstənt/', tag: '逻辑', senses: [
    { g: 'adj. （数据/说法）前后一致的', en: 'not contradicting itself', ex: 'The two witnesses gave consistent accounts of the evening.', zh: '两名证人对当晚的描述前后一致。' },
    { g: 'adj. 持续的、稳定的', en: 'steady and unchanging', ex: 'Growth has been consistent for eleven straight quarters.', zh: '增长已连续十一个季度保持稳定。' }
  ]},
  { w: 'convey', ph: '/kənˈveɪ/', tag: '精确表达', senses: [
    { g: 'v. 传达（意义、情感）', en: 'to communicate a meaning', ex: 'The word carries a nuance that "sad" cannot convey.', zh: '这个词带有 "sad" 无法传达的细微意味。' },
    { g: 'v. 运送、输送', en: 'to transport', ex: 'Pipes convey the heated water to every floor.', zh: '管道把热水输送到每一层楼。' }
  ]},
  { w: 'critical', ph: '/ˈkrɪtɪkl/', tag: '高频多义', senses: [
    { g: 'adj. 至关重要的', en: 'crucial, decisive', ex: 'Timing is critical in the first hour after a stroke.', zh: '中风后第一小时的时间窗口至关重要。' },
    { g: 'adj. 批评的、挑剔的', en: 'expressing disapproval', ex: 'She was openly critical of the way the trial was run.', zh: '她公开批评了试验的执行方式。' }
  ]},
  { w: 'deliver', ph: '/dɪˈlɪvə(r)/', tag: '高频多义', senses: [
    { g: 'v. 兑现（承诺、结果）', en: 'to produce what was promised', ex: 'The software delivered none of the savings it promised.', zh: '这套软件没有兑现它所承诺的任何节省。' },
    { g: 'v. 投递、递送', en: 'to take goods to a place', ex: 'Orders placed before noon are delivered the same day.', zh: '中午前下的订单当天送达。' }
  ]},
  { w: 'distinguish', ph: '/dɪˈstɪŋɡwɪʃ/', tag: '思维', senses: [
    { g: 'v. 区分、辨别', en: 'to recognise the difference', ex: 'Children learn to distinguish fact from opinion around age ten.', zh: '儿童大约十岁学会区分事实与观点。' },
    { g: 'v. 使…脱颖而出', en: 'to make noticeably different', ex: 'It is her attention to detail that distinguishes her work.', zh: '是她对细节的关注让她的作品与众不同。' }
  ]},
  { w: 'engage', ph: '/ɪnˈɡeɪdʒ/', tag: '高频多义', senses: [
    { g: 'v. 使参与、吸引住', en: 'to attract and hold attention', ex: 'A good opening sentence engages the reader immediately.', zh: '一个好的开篇句能立刻抓住读者。' },
    { g: 'v. 雇用、聘请', en: 'to hire', ex: 'They engaged an independent auditor to review the books.', zh: '他们聘请了一位独立审计师审查账目。' }
  ]},
  { w: 'enhance', ph: '/ɪnˈhɑːns/', tag: '提升', senses: [
    { g: 'v. 提升（价值、质量、吸引力）', en: 'to improve the quality or value', ex: 'Good lighting can enhance the perceived size of a room.', zh: '良好的照明能提升人们对房间大小的感觉。' },
    { g: 'v. 增强（效果）', en: 'to intensify', ex: 'The filter enhances edges without adding noise.', zh: '这个滤镜在增强边缘的同时不引入噪点。' }
  ]},
  { w: 'exploit', ph: '/ɪkˈsplɔɪt/', tag: '褒贬两义', senses: [
    { g: 'v. 开发利用（资源、优势）', en: 'to make full use of', ex: 'The company exploited a gap in the market no one had noticed.', zh: '这家公司利用了没人注意到的市场空白。' },
    { g: 'v. 剥削、利用（人）', en: 'to use unfairly for gain', ex: 'Reports say the factory exploited migrant workers.', zh: '报道称该工厂剥削外来务工人员。' }
  ]},
  { w: 'facilitate', ph: '/fəˈsɪlɪteɪt/', tag: '学术/商务', senses: [
    { g: 'v. 促进、使…更容易发生', en: 'to make a process easier', ex: 'The new form facilitates faster approval of small claims.', zh: '新的表格让小额理赔的审批更快捷。' },
    { g: 'v. 主持（讨论、工作坊）', en: 'to guide a discussion', ex: 'She facilitated the session without taking sides.', zh: '她主持了那场讨论且不偏不倚。' }
  ]},
  { w: 'figure', ph: '/ˈfɪɡə(r)/', tag: '高频多义', senses: [
    { g: 'n. 数字、金额', en: 'a number or amount', ex: 'The final figure came in well below our estimate.', zh: '最终数字远低于我们的估算。' },
    { g: 'v. 认为、推断', en: 'to conclude or think', ex: 'I figured you would want to see the raw data first.', zh: '我猜你会想先看原始数据。' }
  ]},
  { w: 'implement', ph: '/ˈɪmplɪment/', tag: '执行', senses: [
    { g: 'v. 实施、执行（计划）', en: 'to put a plan into effect', ex: 'The policy was implemented without consulting teachers.', zh: '这项政策在未征询教师意见的情况下就实施了。' },
    { g: 'n. 工具、器具', en: 'a tool or instrument', ex: 'Farmers still rely on hand implements in the terraced fields.', zh: '梯田里的农民仍然依赖手工农具。' }
  ]},
  { w: 'imply', ph: '/ɪmˈplaɪ/', tag: '语用', senses: [
    { g: 'v. 暗示、言下之意是', en: 'to suggest without stating', ex: 'His silence implied more than any answer could.', zh: '他的沉默所暗示的比任何回答都多。' },
    { g: 'v. 意味着、必然包含', en: 'to involve as a consequence', ex: 'Growth at this rate implies hiring at least thirty people.', zh: '这种速度的增长意味着至少招聘三十人。' }
  ]},
  { w: 'indicate', ph: '/ˈɪndɪkeɪt/', tag: '学术', senses: [
    { g: 'v. 表明、显示（证据指向）', en: 'to show that something is likely', ex: 'The data indicate a steady decline, not a sudden collapse.', zh: '数据显示的是稳步下滑，而非突然崩塌。' },
    { g: 'v. 指示、指出', en: 'to point out', ex: 'Please indicate your preferred date on the form.', zh: '请在表格上标明你偏好的日期。' }
  ]},
  { w: 'interpret', ph: '/ɪnˈtɜːprɪt/', tag: '思维', senses: [
    { g: 'v. 解读、理解（为某种含义）', en: 'to explain the meaning of', ex: 'The results can be interpreted in more than one way.', zh: '这些结果可以有不止一种解读。' },
    { g: 'v. 口译', en: 'to translate orally', ex: 'She interpreted for the delegation throughout the visit.', zh: '访问期间她全程为代表团做口译。' }
  ]},
  { w: 'maintain', ph: '/meɪnˈteɪn/', tag: '高频多义', senses: [
    { g: 'v. 维持、保持（状态）', en: 'to keep in an existing state', ex: 'The body maintains a temperature of about 37°C.', zh: '人体把体温维持在约 37 摄氏度。' },
    { g: 'v. 坚持认为、主张', en: 'to assert as true', ex: 'He maintains that the samples were never tampered with.', zh: '他坚持认为样本从未被篡改。' }
  ]},
  { w: 'observe', ph: '/əbˈzɜːv/', tag: '高频多义', senses: [
    { g: 'v. 观察（并记录）', en: 'to watch carefully', ex: 'Researchers observed the same pattern in all three groups.', zh: '研究者在三组中都观察到了同样的模式。' },
    { g: 'v. 遵守（规则、习俗）', en: 'to comply with', ex: 'All drivers are required to observe the speed limit.', zh: '所有驾驶员都必须遵守限速规定。' }
  ]},
  { w: 'precise', ph: '/prɪˈsaɪs/', tag: '产品核心词', senses: [
    { g: 'adj. 精确的、确切的', en: 'exact and accurate', ex: 'We need the precise time the alarm was triggered.', zh: '我们需要警报触发的确切时间。' },
    { g: 'adj. （人）一丝不苟的', en: 'careful about details', ex: 'He is very precise in the way he words his contracts.', zh: '他起草合同的措辞一丝不苟。' }
  ]},
  { w: 'profound', ph: '/prəˈfaʊnd/', tag: '程度', senses: [
    { g: 'adj. 深刻的、深远的', en: 'very great or intense', ex: 'Sleep loss has a profound effect on memory formation.', zh: '睡眠不足对记忆形成有着深刻影响。' },
    { g: 'adj. （见解）深邃的', en: 'showing deep insight', ex: 'Her book offers a profound reading of the 1930s.', zh: '她的书为二十世纪三十年代提供了一种深邃的解读。' }
  ]},
  { w: 'reflect', ph: '/rɪˈflekt/', tag: '高频多义', senses: [
    { g: 'v. 反映、体现', en: 'to show or be a sign of', ex: 'Test scores reflect teaching quality, not effort alone.', zh: '考试分数反映的是教学质量，而不只是努力程度。' },
    { g: 'v. 反思、仔细考虑', en: 'to think carefully', ex: 'Give me a day to reflect on what you proposed.', zh: '给我一天时间思考你的提议。' }
  ]},
  { w: 'relevant', ph: '/ˈreləvənt/', tag: '逻辑', senses: [
    { g: 'adj. 相关的、切题的', en: 'closely connected to the matter', ex: 'Please keep your answer relevant to the question asked.', zh: '请让回答紧扣所问的问题。' },
    { g: 'adj. 有实际意义的', en: 'having practical value now', ex: 'The rule is no longer relevant to how people work today.', zh: '这条规定对当今人们的工作方式已不再有实际意义。' }
  ]},
  { w: 'reserve', ph: '/rɪˈzɜːv/', tag: '高频多义', senses: [
    { g: 'v. 保留（权利、意见）', en: 'to keep for oneself', ex: 'I reserve judgement until the full report is published.', zh: '在完整报告发布之前我保留判断。' },
    { g: 'v. 预订（座位、房间）', en: 'to arrange to have later', ex: 'The room was reserved under a different name.', zh: '这个房间是以另一个名字预订的。' }
  ]},
  { w: 'resolve', ph: '/rɪˈzɒlv/', tag: '高频多义', senses: [
    { g: 'v. 解决（争端、问题）', en: 'to settle or find a solution', ex: 'The dispute was resolved without going to court.', zh: '这场纠纷未经法庭就解决了。' },
    { g: 'v. 下定决心', en: 'to decide firmly', ex: 'She resolved to finish the manuscript by spring.', zh: '她下定决心要在春天前完成手稿。' }
  ]},
  { w: 'secure', ph: '/sɪˈkjʊə(r)/', tag: '高频多义', senses: [
    { g: 'v. 获得（不易得到之物）', en: 'to obtain with effort', ex: 'They secured a loan at a rate nobody else was offered.', zh: '他们以别人拿不到的利率拿到了贷款。' },
    { g: 'adj. 安全的、稳固的', en: 'safe and protected', ex: 'Keep the backup in a secure location off site.', zh: '把备份保存在异地的安全位置。' }
  ]},
  { w: 'significant', ph: '/sɪɡˈnɪfɪkənt/', tag: '学术', senses: [
    { g: 'adj. 显著的、相当大的', en: 'large enough to matter', ex: 'There was no significant difference between the two groups.', zh: '两组之间没有显著差异。' },
    { g: 'adj. 有重要意义的', en: 'important or meaningful', ex: 'The finding is significant for how we design treatments.', zh: '这一发现对我们如何设计治疗方案意义重大。' }
  ]},
  { w: 'subtle', ph: '/ˈsʌtl/', tag: '产品核心词', senses: [
    { g: 'adj. 微妙的、不易察觉的', en: 'delicate, hard to detect', ex: 'There is a subtle difference between the two phrasings.', zh: '这两种措辞之间有一个微妙的差别。' },
    { g: 'adj. 巧妙的、含蓄的', en: 'clever and indirect', ex: 'The novel is subtle in the way it judges its hero.', zh: '这部小说评判主人公的方式很含蓄。' }
  ]},
  { w: 'sufficient', ph: '/səˈfɪʃnt/', tag: '逻辑', senses: [
    { g: 'adj. 充足的、足够的', en: 'enough for a purpose', ex: 'One example is not sufficient evidence for such a claim.', zh: '一个例子不足以支撑这样的论断。' },
    { g: 'adj. （条件）充分的', en: 'enough to guarantee', ex: 'Good grades are necessary but not sufficient for admission.', zh: '好成绩是录取的必要条件，但不是充分条件。' }
  ]},
  { w: 'sustain', ph: '/səˈsteɪn/', tag: '持续', senses: [
    { g: 'v. 维持、使持续下去', en: 'to keep going over time', ex: 'Can the city sustain this pace of construction?', zh: '这座城市能维持这样的建设速度吗？' },
    { g: 'v. 遭受（损失、伤害）', en: 'to suffer', ex: 'He sustained minor injuries in the collision.', zh: '他在碰撞中受了轻伤。' }
  ]},
  { w: 'undermine', ph: '/ˌʌndəˈmaɪn/', tag: '学术/新闻', senses: [
    { g: 'v. 逐渐削弱、损害', en: 'to weaken gradually', ex: 'Leaks undermined public trust in the investigation.', zh: '泄密逐渐动摇了公众对调查的信任。' },
    { g: 'v. 暗中破坏', en: 'to sabotage secretly', ex: 'She accused him of undermining her authority in meetings.', zh: '她指责他在会议上暗中削弱她的权威。' }
  ]},
  { w: 'valid', ph: '/ˈvælɪd/', tag: '思维', senses: [
    { g: 'adj. （论点）有根据的、站得住的', en: 'well-founded', ex: 'That is a valid objection, and we should address it.', zh: '那是一个站得住脚的反对意见，我们应该处理。' },
    { g: 'adj. （票证）有效的', en: 'legally acceptable', ex: 'Your ticket is valid for seven days from first use.', zh: '你的票自首次使用起七天内有效。' }
  ]},
  { w: 'virtually', ph: '/ˈvɜːtʃuəli/', tag: '易错', senses: [
    { g: 'adv. 几乎、实际上（= almost）', en: 'nearly, practically', ex: 'Virtually every household in the village owns a motorcycle.', zh: '村里几乎每家每户都有摩托车。' },
    { g: 'adv. 虚拟地（通过计算机）', en: 'by means of a computer', ex: 'The tour can be taken virtually from anywhere.', zh: '这场导览可以在任何地方虚拟地参加。' }
  ]}
];

/* ---------- 2. 近义词精准辨析：最小对比对 ---------- */
DB.syn = [
  {
    id: 'say-tell-speak-talk', title: 'say / tell / speak / talk',
    note: '中文都译作“说”，但英语中四者的意义边界不可互换：say 指向“说出的内容”，tell 指向“被告知的人”，speak 指向“说话的动作/语言能力”，talk 指向“双向交谈”。',
    items: [
      { w: 'say', core: '内容中心', must: '后接话语内容或 that 从句；宾语不能是人（✗ say me）', ex: 'She said that the meeting was cancelled.', zh: '她说会议取消了。', wrong: '✗ She said me the news.' },
      { w: 'tell', core: '对象中心', must: '必须带“被告知的人”（tell sb sth），传递的是信息、真相、故事', ex: 'He told us the whole story.', zh: '他把整个经过告诉了我们。', wrong: '✗ He told that he was tired.（tell 不接 that 从句表示“说”）' },
      { w: 'speak', core: '动作/能力中心', must: '强调“开口说”这个动作或掌握某种语言；正式发言', ex: 'She speaks three languages fluently.', zh: '她能流利地说三种语言。', wrong: '✗ I spoke him about it.（需用 speak to / talk to）' },
      { w: 'talk', core: '双向交流', must: '强调“有来有回的谈话”，常与 to/with/about 连用', ex: 'We talked for hours about the merger.', zh: '关于合并我们谈了好几个小时。', wrong: '✗ He talked French.（语言用 speak）' }
    ],
    quiz: { ex: 'Please ___ me the truth — I can handle it.', options: ['say', 'tell', 'speak', 'talk'], ans: 1,
      why: '句中有“被告知的对象 me”，且传递的是“真相”这一信息 → 必须用 tell。say 只关注说出的内容，不能直接接人；speak 强调动作或语言能力；talk 强调双向交谈。' }
  },
  {
    id: 'big-large-great-huge', title: 'big / large / great / huge',
    note: '都表示“大”，但大的维度不同：large 偏尺寸/数量（客观），big 偏体积/重要性（口语），great 偏程度与价值（抽象），huge 偏极端规模。',
    items: [
      { w: 'large', core: '客观尺寸/数量', must: '最中性的“大”，用于面积、数量、规模，正式语体', ex: 'A large number of applicants were rejected.', zh: '大量申请者被拒。', wrong: '✗ a large brother（人不用 large）' },
      { w: 'big', core: '体积/重要性', must: '口语化；可指“重大的、关键的”（a big decision）', ex: 'This is a big decision for the whole team.', zh: '这对整个团队是个重大决定。', wrong: '✗ a big amount（正式语境用 large amount）' },
      { w: 'great', core: '程度与价值', must: '抽象维度的“大”：伟大、极大（great care / a great deal）', ex: 'She showed great courage during the trial.', zh: '她在审讯期间表现出极大的勇气。', wrong: '✗ a great house（指“很棒的房子”，非“很大的房子”）' },
      { w: 'huge', core: '极端规模', must: '强调大到令人惊讶，程度强于 big/large', ex: 'The project went hugely over budget.', zh: '这个项目严重超出预算。', wrong: '✗ a huge care（great care 不可替换）' }
    ],
    quiz: { ex: 'The report was prepared with ___ care.', options: ['large', 'big', 'great', 'huge'], ans: 2,
      why: 'care 是抽象名词，表示“程度上极大的谨慎”用 great care，这是固定且不可替代的搭配。large 修饰客观尺寸，big 偏口语，huge 强调大到惊人，均不与抽象名词 care 搭配。' }
  },
  {
    id: 'make-do', title: 'make / do',
    note: '核心分界：make = 创造/产生出原本不存在的东西（结果导向）；do = 执行一项活动或任务（过程导向）。',
    items: [
      { w: 'make', core: '创造、产生结果', must: 'make a plan / a mistake / a profit / a decision（产出物）', ex: 'We made a profit in the first quarter.', zh: '我们第一季度实现了盈利。', wrong: '✗ do a decision' },
      { w: 'do', core: '执行、从事', must: 'do homework / research / business / the dishes（活动）', ex: 'She does most of the research herself.', zh: '大部分研究是她自己做的。', wrong: '✗ do a mistake（应为 make a mistake）' }
    ],
    quiz: { ex: 'The team ___ an analysis of 3,000 responses.', options: ['made', 'did', 'made of', 'did of'], ans: 1,
      why: 'do an analysis 强调“执行分析这项活动/工作”；若说 make an analysis，则强调“产出一份分析报告”这件作品。本句强调处理 3000 份问卷的工作过程，用 did an analysis。' }
  },
  {
    id: 'look-see-watch', title: 'look / see / watch',
    note: '核心分界：look = 主动把目光投向某处（有意识）；see = 视觉接收到（无意识/结果）；watch = 持续注视变化中的事物。',
    items: [
      { w: 'look', core: '主动看（方向）', must: 'look at + 对象；强调“把视线投向”的动作', ex: 'Look at the second chart on page four.', zh: '看第四页的第二张图表。', wrong: '✗ I looked a bird.（需 look at）' },
      { w: 'see', core: '看见（结果）', must: '不用于进行时表示“看见”；可引申为“明白、看出”', ex: 'I see what you mean now.', zh: '我明白你的意思了。', wrong: '✗ I am seeing a bird.（表“看见”不用进行时）' },
      { w: 'watch', core: '注视变化', must: '对象是动态的：比赛、视频、过程', ex: 'We watched the numbers change in real time.', zh: '我们实时注视着数字变化。', wrong: '✗ watch a photo（静态用 look at）' }
    ],
    quiz: { ex: 'I ___ the suspect enter the building at 9:14.', options: ['looked', 'saw', 'watched at', 'was looking'], ans: 1,
      why: 'see sb do sth 表示“看到动作发生的全过程或事实”，这里需要一个目击事实（9:14 进入），用 saw。look 和 watch 都强调有意识地注视，无法表达“恰好看见”。' }
  },
  {
    id: 'bring-take-carry-fetch', title: 'bring / take / carry / fetch',
    note: '方向性是这组词的意义核心：bring 朝说话者而来，take 离开说话者而去，carry 只强调负重不定义方向，fetch = 去取再带回来（往返）。',
    items: [
      { w: 'bring', core: '带来（朝向说话者）', must: '以说话者/目的地为参照点，“带到这里”', ex: 'Bring your ID card to the interview.', zh: '把身份证带到面试现场来。', wrong: '✗ Bring this to your mother.（离开时应用 take）' },
      { w: 'take', core: '带走（离开说话者）', must: '从说话者所在处移走', ex: 'Take the report to the printer, please.', zh: '请把报告拿到打印机那儿去。', wrong: '✗ Take me the book here.（方向矛盾）' },
      { w: 'carry', core: '搬运（不定义方向）', must: '强调“负重”本身，无方向含义', ex: 'The cable carries data at 10 Gbps.', zh: '这条电缆以 10 Gbps 传输数据。', wrong: '✗ Carry me the book.（carry 不接双宾语表“带给”）' },
      { w: 'fetch', core: '去取回（往返）', must: '走一趟去拿 → 带回来，完整的往返动作', ex: 'Could you fetch the file from the archive?', zh: '你能去档案室把那份文件取来吗？', wrong: '✗ fetch 与 bring 混用时方向不同，不可互换' }
    ],
    quiz: { ex: 'When you come to the meeting, ___ your laptop with you.', options: ['take', 'bring', 'fetch', 'carry'], ans: 1,
      why: '说话人以会议地点为参照（“来开会时带到这儿来”），方向是朝向说话者/目的地 → bring。take 表示从说话处带走，fetch 强调往返去取，carry 只讲负重不讲方向。' }
  },
  {
    id: 'listen-hear', title: 'listen / hear',
    note: '与 look/see 同构：listen 是有意识的动作，hear 是感官接收的结果。',
    items: [
      { w: 'listen', core: '主动听', must: 'listen to + 对象；强调注意力投入', ex: 'Listen to the difference between the two recordings.', zh: '听一下两段录音的差别。', wrong: '✗ I listened a noise.' },
      { w: 'hear', core: '听到（结果）', must: '强调声音进入耳朵；也可表示“听说”', ex: 'I heard a strange noise upstairs.', zh: '我听到楼上有奇怪的声音。', wrong: '✗ I am hearing a noise.（表“听到”不用进行时）' }
    ],
    quiz: { ex: 'I ___ carefully but could ___ nothing.', options: ['listened / hear', 'heard / listen', 'listened / listen', 'heard / hear'], ans: 0,
      why: '第一个空强调“努力去听”的动作 → listened；第二个空强调“结果什么也没接收到” → hear。这正是动作与结果的对立，用 could hear nothing 表示“听不到任何东西”。' }
  },
  {
    id: 'wear-put-on-dress', title: 'wear / put on / dress',
    note: 'wear 表状态（身上穿着），put on 表动作（穿上这一下），dress 的宾语是人而不是衣服。',
    items: [
      { w: 'wear', core: '穿着（状态）', must: '可延续；wear glasses / a uniform / a smile', ex: 'She wears glasses only for driving.', zh: '她只在开车时戴眼镜。', wrong: '✗ She is putting on glasses for driving.（状态错用动作）' },
      { w: 'put on', core: '穿上（瞬间动作）', must: '强调动作发生的一刻，不可延续', ex: 'He put on his coat and left.', zh: '他穿上外套就走了。', wrong: '✗ He put on a coat all day.（延续状态用 wore）' },
      { w: 'dress', core: '给（人）穿衣服', must: '宾语是人：dress the child / get dressed', ex: 'She dressed the children before breakfast.', zh: '早饭前她给孩子们穿好衣服。', wrong: '✗ She dressed her coat.（宾语应是人）' }
    ],
    quiz: { ex: 'He ___ a dark suit to every client meeting.', options: ['wears', 'puts on', 'dresses', 'is dressing'], ans: 0,
      why: '本句描述的是每次会议的一贯状态（“穿着深色西装”），是延续性状态而非某一瞬间动作 → wears。put on 只表示“穿上”那一瞬间；dress 的宾语必须是人。' }
  },
  {
    id: 'rise-raise-arise', title: 'rise / raise / arise',
    note: 'rise 是不及物（自己升起），raise 是及物（把某物抬高），arise 指问题/局面“出现”。',
    items: [
      { w: 'rise', core: '自身上升（不及物）', must: 'rise-rose-risen；主语自己上升：价格、太阳、水位', ex: 'Prices rose by 4% last month.', zh: '上个月价格上涨了 4%。', wrong: '✗ They rose the price.（及物应用 raised）' },
      { w: 'raise', core: '抬高（及物）', must: '必须有宾语：raise prices / a question / children', ex: 'They raised the price without notice.', zh: '他们未作通知就提了价。', wrong: '✗ The price raised.（不及物用法错误）' },
      { w: 'arise', core: '（问题/机会）出现', must: 'arose-arisen；主语常为抽象物：problem, issue, opportunity', ex: 'New problems arose during the pilot.', zh: '试点期间出现了新问题。', wrong: '✗ The sun arises.（应用 rises）' }
    ],
    quiz: { ex: 'If any difficulty ___, call this number immediately.', options: ['rises', 'raises', 'arises', 'arouses'], ans: 2,
      why: 'difficulty 是抽象事物“出现、产生” → arises。rise 指具体事物自身上升（价格、水位），raise 是及物动词需带宾语，arouse 意为“激起（情绪）”。' }
  },
  {
    id: 'borrow-lend-keep', title: 'borrow / lend / keep',
    note: 'borrow = 借入（→ 向里），lend = 借出（→ 向外），keep = 保留一段时间（延续性动词，可与 for 连用）。',
    items: [
      { w: 'borrow', core: '借入', must: 'borrow sth from sb；瞬间动作，不能与 for 时间段连用', ex: 'I borrowed the book from the library.', zh: '我从图书馆借了这本书。', wrong: '✗ I have borrowed it for a month.（应用 kept）' },
      { w: 'lend', core: '借出', must: 'lend sb sth / lend sth to sb；lent-lent', ex: 'Could you lend me your charger?', zh: '能把充电器借我吗？', wrong: '✗ Could you borrow me your charger?' },
      { w: 'keep', core: '保留（延续）', must: '可与 for / how long 连用，表示持有某物的时长', ex: 'You can keep the book for three weeks.', zh: '这本书你可以借（保留）三周。', wrong: '✗ You can borrow it for three weeks.' }
    ],
    quiz: { ex: 'How long can I ___ this dictionary?', options: ['borrow', 'lend', 'keep', 'borrow from'], ans: 2,
      why: 'how long 要求延续性动词。borrow / lend 都是瞬间动作，不能与时间段连用；keep 表示“持有、保留”，可与 How long 搭配。' }
  },
  {
    id: 'spend-cost-take', title: 'spend / cost / take',
    note: '主语决定一切：spend 主语是人（花钱/时间），cost 主语是物（耗费金钱/代价），take 主语是事或用 it 作形式主语（占用时间）。',
    items: [
      { w: 'spend', core: '人作主语', must: 'sb spend time/money on sth / (in) doing sth', ex: 'She spent two years on the project.', zh: '她在这个项目上花了两年。', wrong: '✗ It spent me two years.' },
      { w: 'cost', core: '物作主语（代价）', must: 'sth cost (sb) money；引申为“使付出代价”', ex: 'The mistake cost the company $2 million.', zh: '这个错误让公司损失了 200 万美元。', wrong: '✗ I cost $20 for the ticket.（人不能作主语）' },
      { w: 'take', core: '占用时间', must: 'It takes (sb) time to do sth / sth takes time', ex: 'It took me an hour to fix the bug.', zh: '修这个漏洞花了我一小时。', wrong: '✗ I took an hour to fix it.（形式主语应为 It）' }
    ],
    quiz: { ex: 'The redesign ___ us six weeks and ___ nearly $80,000.', options: ['took / cost', 'spent / took', 'cost / spent', 'took / spent'], ans: 0,
      why: '第一空“占用我们六周时间”用 sth takes sb time；第二空“耗资 8 万美元”，主语是事物（the redesign）→ cost。若用 spend，主语必须是人。' }
  },
  {
    id: 'few-little', title: 'few / a few / little / a little',
    note: '两重对立：可数 vs 不可数（few / little），以及有无 a 决定态度（几乎没 vs 还有一些）。',
    items: [
      { w: 'few', core: '几乎没有（可数）', must: '带否定意味，“少到几乎没有”', ex: 'Few candidates met the requirements.', zh: '几乎没有候选人符合要求。', wrong: '✗ Few water（不可数应用 little）' },
      { w: 'a few', core: '有几个（可数）', must: '肯定语气，“虽少但有”', ex: 'A few candidates stood out.', zh: '有几位候选人很突出。', wrong: '✗ a few 与 few 意义相反，不可混用' },
      { w: 'little', core: '几乎没有（不可数）', must: '否定意味', ex: 'There is little evidence for that claim.', zh: '几乎没有证据支持这一说法。', wrong: '✗ little reasons（可数应用 few）' },
      { w: 'a little', core: '有一点（不可数）', must: '肯定语气', ex: 'There is a little evidence to support it.', zh: '有少许证据支持它。', wrong: '✗ a little 与 little 语气相反' }
    ],
    quiz: { ex: 'There is ___ evidence that the policy worked — almost none.', options: ['a few', 'few', 'a little', 'little'], ans: 3,
      why: 'evidence 为不可数名词 → 排除 few / a few；后半句 almost none 表明是否定语气 → little。若用 a little 则表示“还有一些”，与 almost none 矛盾。' }
  },
  {
    id: 'join-attend-take-part', title: 'join / attend / take part in',
    note: 'join = 成为其中一员（组织/人群），attend = 到场出席（事件），take part in = 参与其中的活动。',
    items: [
      { w: 'join', core: '加入成为成员', must: 'join a club / a company / us；后可接人', ex: 'She joined the research group in 2019.', zh: '她 2019 年加入了该研究组。', wrong: '✗ join a meeting（会议用 attend）' },
      { w: 'attend', core: '出席（到场）', must: 'attend a meeting / a lecture / school；正式', ex: 'Only twelve people attended the briefing.', zh: '只有十二人出席了简报会。', wrong: '✗ attend the club（加入组织用 join）' },
      { w: 'take part in', core: '参与活动', must: '强调“在其中发挥作用”，而非仅仅到场', ex: 'All departments took part in the drill.', zh: '所有部门都参加了演练。', wrong: '✗ take part in the club（组织用 join）' }
    ],
    quiz: { ex: 'Over 300 teachers ___ the training session last Friday.', options: ['joined', 'attended', 'took part', 'joined in'], ans: 1,
      why: '宾语是 a training session（一场活动/场次），表达“到场参加” → attended。join 后接组织或人群；take part in 强调参与其中发挥作用，且缺介词 in；join in 指中途加入正在进行的小活动。' }
  },
  {
    id: 'hope-wish-expect', title: 'hope / wish / expect',
    note: 'hope 指向可能实现的愿望（陈述语气）；wish 指向与现实相反或不太可能的事（虚拟语气）；expect 指向有依据的预期。',
    items: [
      { w: 'hope', core: '希望（有可能实现）', must: 'hope to do / hope (that) + 陈述语气；不接双宾语', ex: 'I hope (that) the results arrive this week.', zh: '我希望结果这周能到。', wrong: '✗ I hope you to come.（不接宾补）' },
      { w: 'wish', core: '但愿（与现实相反）', must: 'wish + 过去式/过去完成式（虚拟）；或表祝愿', ex: 'I wish I had started earlier.', zh: '我要是早点开始就好了。', wrong: '✗ I wish I will pass.（应改为 I wish I would / I hope I pass）' },
      { w: 'expect', core: '预期（有依据）', must: 'expect sb to do；基于事实或安排的判断', ex: 'We expect delivery by Thursday.', zh: '我们预计周四前到货。', wrong: '✗ I expect that I hope…（语义重复）' }
    ],
    quiz: { ex: 'I ___ I had double-checked the numbers.', options: ['hope', 'wish', 'expect', 'am expecting'], ans: 1,
      why: '“had double-checked”是过去完成时，表达与过去事实相反的遗憾 → 必须用 wish 引导的虚拟。hope 与 expect 后都接真实语气，不能接这种虚拟形式。' }
  },
  {
    id: 'affect-effect', title: 'affect / effect',
    note: '词性即意义：affect 是动词“影响”，effect 是名词“效果”；effect 作动词时意为“实现、促成”（≠ affect）。',
    items: [
      { w: 'affect', core: 'v. 影响', must: '作用于某事物并使之改变', ex: 'Humidity affects the accuracy of the sensor.', zh: '湿度会影响传感器的精度。', wrong: '✗ The effect was affected?（注意词性）' },
      { w: 'effect', core: 'n. 效果、影响', must: 'have an effect on；side effects；take effect', ex: 'The new rule took effect in January.', zh: '新规定一月起生效。', wrong: '✗ effect 作动词意为“促成”：effect change（≠ affect change）' }
    ],
    quiz: { ex: 'The drought had a severe ___ on crop yields.', options: ['affect', 'effect', 'affection', 'effective'], ans: 1,
      why: '空格前有冠词 a 和形容词 severe，需要名词 → effect（have an effect on 为固定搭配）。affect 是动词；affection 意为“喜爱”；effective 是形容词。' }
  },
  {
    id: 'assure-ensure-insure', title: 'assure / ensure / insure',
    note: '三词同源于 sure：assure 使人确信（宾语是人），ensure 确保某事发生（宾语是事），insure 专指保险。',
    items: [
      { w: 'assure', core: '使（某人）确信', must: 'assure sb (that)… / assure sb of sth', ex: 'I can assure you the data is accurate.', zh: '我可以向你保证数据准确。', wrong: '✗ assure the safety（宾语应为事时用 ensure）' },
      { w: 'ensure', core: '确保（事情发生）', must: 'ensure that… / ensure + 名词', ex: 'Please ensure that the door is locked.', zh: '请确保门已锁好。', wrong: '✗ ensure me that…（宾语为人应用 assure）' },
      { w: 'insure', core: '给…投保', must: 'insure sth against；专指保险行为', ex: 'The equipment is insured against fire.', zh: '这些设备已投保火险。', wrong: '✗ insure success（确保成功应用 ensure）' }
    ],
    quiz: { ex: 'Please ___ that all figures are checked before publication.', options: ['assure', 'ensure', 'insure', 'assure of'], ans: 1,
      why: '空格后接 that 从句，且表示“确保某件事发生” → ensure。assure 的宾语必须是人（assure sb that…）；insure 指投保；此处并非“使人放心”。' }
  }
];

/* ---------- 3. 一词多义：按意义分支分类 ---------- */
DB.poly = [
  { w: 'set', ph: '/set/', senses: [
    { g: 'v. 放置、摆放', ex: 'She set the keys on the table and left.' },
    { g: 'v. 确定、设定（规则、日期、标准）', ex: 'The board set a deadline of 15 March.' },
    { g: 'v. （太阳、月亮）落下', ex: 'In winter the sun sets before five.' },
    { g: 'n. 一套、一组', ex: 'A new set of rules came into force.' },
    { g: 'adj. 固定的、安排好的', ex: 'The menu offers a set lunch for ¥48.' }
  ], quiz: [
    { ex: 'The judge set bail at $5,000.', options: ['放置', '确定、设定（金额）', '落下', '一套'], ans: 1, why: 'set + 金额/日期/标准 表示“确定、设定”，而非物理上的“放置”。' },
    { ex: 'We ordered the set menu.', options: ['放置', '设定', '固定的、搭配好的', '一套（作动词）'], ans: 2, why: 'set menu 是固定搭配，指“套餐”，set 作形容词表示“预先安排好的、固定的”。' }
  ]},
  { w: 'get', ph: '/ɡet/', senses: [
    { g: 'v. 得到、获得', ex: 'Did you get my message?' },
    { g: 'v. 变得（系动词，状态变化）', ex: 'It is getting dark earlier now.' },
    { g: 'v. 使某人/某物做某事（使役）', ex: 'I got the printer working again.' },
    { g: 'v. 理解、听懂', ex: 'Sorry, I did not get your point.' },
    { g: 'v. 到达', ex: 'We got to the station just in time.' }
  ], quiz: [
    { ex: 'I cannot get the lid off this jar.', options: ['得到', '理解', '使…移动/打开（使役）', '到达'], ans: 2, why: 'get + 宾语 + 补语（off）构成使役结构，意为“使盖子松开/打开”，强调导致某状态发生。' },
    { ex: 'He never got the joke.', options: ['得到', '听懂、理解', '变得', '使役'], ans: 1, why: 'get + 抽象宾语（joke/point）表示“理解、听懂”，不是“得到”。' }
  ]},
  { w: 'take', ph: '/teɪk/', senses: [
    { g: 'v. 拿走、带走', ex: 'Someone has taken my umbrella.' },
    { g: 'v. 花费（时间）', ex: 'The journey took three hours.' },
    { g: 'v. 接受、承担（职位/责任）', ex: 'She took the job in Beijing.' },
    { g: 'v. 乘坐（交通工具）', ex: 'Take the number 7 bus to the museum.' },
    { g: 'v. 理解、看待（take … as）', ex: 'Do not take his silence as agreement.' }
  ], quiz: [
    { ex: 'I take your point, but I still disagree.', options: ['拿走', '花费', '理解并接受（某个观点）', '乘坐'], ans: 2, why: 'take your point 是固定表达，意为“我理解并接受你的观点（但仍不同意）”，用于让步。' },
    { ex: 'It took me a week to read the report.', options: ['拿走', '占用（时间）', '承担', '看待'], ans: 1, why: 'It takes (sb) time to do sth 为固定句型，take 表示“占用时间”。' }
  ]},
  { w: 'run', ph: '/rʌn/', senses: [
    { g: 'v. 跑、奔跑', ex: 'He runs five kilometres every morning.' },
    { g: 'v. 经营、管理', ex: 'She runs a small design studio.' },
    { g: 'v. （机器）运转；（程序）运行', ex: 'The server has been running for 200 days.' },
    { g: 'v. （液体）流动；（道路）延伸', ex: 'The road runs along the river.' },
    { g: 'n. 一段时间、一连串', ex: 'We had a run of bad luck in April.' }
  ], quiz: [
    { ex: 'They run a training programme for new staff.', options: ['奔跑', '经营、运作（项目）', '流动', '一连串'], ans: 1, why: 'run + 组织/项目/企业 = 经营、运作，是 run 在商务语境中最常见的义项。' },
    { ex: 'The contract runs for two more years.', options: ['奔跑', '经营', '延续、有效期持续', '流动'], ans: 2, why: 'run 表示时间上的“延续、继续有效”，指合同还有两年有效期。' }
  ]},
  { w: 'break', ph: '/breɪk/', senses: [
    { g: 'v. 打破、打碎', ex: 'He broke the window with a stone.' },
    { g: 'v. 违反（法律、承诺）', ex: 'The firm broke the terms of the contract.' },
    { g: 'v. （消息）传开、披露', ex: 'The story broke late on Friday.' },
    { g: 'n. 休息、间歇', ex: 'Let us take a ten-minute break.' },
    { g: 'v. （天气、嗓音）突变', ex: 'His voice broke with emotion.' }
  ], quiz: [
    { ex: 'The news broke just before the markets opened.', options: ['打碎', '违反', '（消息）突然披露/传开', '休息'], ans: 2, why: 'news/story breaks 是新闻用语，指“消息突然被披露、传开”，与“打碎”无关。' },
    { ex: 'She never breaks her promises.', options: ['打碎', '违背（承诺）', '披露', '使突变'], ans: 1, why: 'break a promise / the law / a rule = 违背、违反，宾语为抽象规则类名词。' }
  ]},
  { w: 'hold', ph: '/həʊld/', senses: [
    { g: 'v. 握住、拿着', ex: 'Can you hold this for a second?' },
    { g: 'v. 举行（会议、选举）', ex: 'The election will be held in June.' },
    { g: 'v. 持有（观点、股份）', ex: 'He holds 12% of the shares.' },
    { g: 'v. 容纳', ex: 'The hall holds up to 400 people.' },
    { g: 'v. 认为、主张（hold that…）', ex: 'The court held that the contract was void.' }
  ], quiz: [
    { ex: 'The court held that the company was liable.', options: ['握住', '举行', '容纳', '裁定、认定'], ans: 3, why: '法律语境中 hold that… 表示“法院裁定、认定”，是正式义项。' },
    { ex: 'The stadium holds 60,000 spectators.', options: ['握住', '举行', '容纳', '持有'], ans: 2, why: 'hold + 数量 表示“容纳（多少人）”，主语是空间。' }
  ]},
  { w: 'light', ph: '/laɪt/', senses: [
    { g: 'n. 光、光线', ex: 'The room gets very little natural light.' },
    { g: 'adj. 轻的（重量）', ex: 'The laptop is surprisingly light.' },
    { g: 'adj. （程度）轻微的、少量的', ex: 'There was light rain overnight.' },
    { g: 'adj. （食物）清淡的；（酒）低度的', ex: 'I would prefer something light for lunch.' },
    { g: 'v. 点燃', ex: 'She lit a candle and sat down.' }
  ], quiz: [
    { ex: 'Traffic was light this morning.', options: ['光', '轻的（重量）', '少量的、稀疏的', '点燃'], ans: 2, why: 'light 修饰 traffic / rain / snow 时表示“量少的、稀疏的”，是程度义项，与重量无关。' },
    { ex: 'He lit the fire with a single match.', options: ['光', '轻的', '清淡的', '点燃（动词过去式）'], ans: 3, why: 'lit 是 light 作动词“点燃”的过去式，此处为点燃的动作。' }
  ]},
  { w: 'present', ph: '/ˈpreznt/', senses: [
    { g: 'adj. 出席的、在场的', ex: 'Only three directors were present.' },
    { g: 'n. 礼物', ex: 'She gave him a book as a present.' },
    { g: 'adj. 当前的、目前的', ex: 'The present system cannot handle the load.' },
    { g: 'v. /prɪˈzent/ 呈现、提交、颁发', ex: 'The findings were presented at the conference.' },
    { g: 'v. 造成、带来（问题/机会）', ex: 'The data present a serious problem.' }
  ], quiz: [
    { ex: 'The results present a serious challenge to the theory.', options: ['出席的', '礼物', '造成、带来（问题）', '颁发'], ans: 2, why: 'present + 抽象宾语（problem/challenge/opportunity）表示“造成、带来”，是动词义项。' },
    { ex: 'All members present voted in favour.', options: ['礼物', '出席的、在场的', '当前的', '提交'], ans: 1, why: 'present 置于名词后作后置定语，表示“在场的”，是形容词常见用法。' }
  ]},
  { w: 'figure', ph: '/ˈfɪɡə(r)/', senses: [
    { g: 'n. 数字、金额', ex: 'The figure was revised twice.' },
    { g: 'n. 人物、人士', ex: 'She is a key figure in the reform movement.' },
    { g: 'n. 图形、图表；身材', ex: 'See figure 3 on the next page.' },
    { g: 'v. 认为、推断（figure that…）', ex: 'I figured he would refuse.' },
    { g: 'v. 出现、占有重要地位（figure in）', ex: 'Cost did not figure in their decision.' }
  ], quiz: [
    { ex: 'She is a leading figure in climate research.', options: ['数字', '人物、要人', '图表', '认为'], ans: 1, why: 'figure 指人时意为“人物、要人”，a leading figure 表示“领军人物”。' },
    { ex: 'Price did not figure in his decision.', options: ['数字', '人物', '被考虑、起作用', '推断'], ans: 2, why: 'figure in / figure prominently 表示“在…中起作用、被纳入考虑”。' }
  ]},
  { w: 'spring', ph: '/sprɪŋ/', senses: [
    { g: 'n. 春天', ex: 'Work begins in early spring.' },
    { g: 'n. 泉、泉水', ex: 'The village grew around a natural spring.' },
    { g: 'n. 弹簧', ex: 'The spring in the lock is broken.' },
    { g: 'v. 突然出现、涌现（spring up）', ex: 'New startups sprang up overnight.' },
    { g: 'v. 源于、来自（spring from）', ex: 'The idea sprang from a casual remark.' }
  ], quiz: [
    { ex: 'Dozens of cafés sprang up along the street.', options: ['春天', '泉水', '突然出现、涌现', '弹簧'], ans: 2, why: 'spring up 是短语动词，表示“迅速涌现”，与季节无关。' },
    { ex: 'Their method springs from an older theory.', options: ['春天', '源于、发端于', '跳跃', '泉水'], ans: 1, why: 'spring from 表示“起源于、由…而来”，说明来源。' }
  ]},
  { w: 'bear', ph: '/beə(r)/', senses: [
    { g: 'v. 忍受、承受', ex: 'The pain was hard to bear.' },
    { g: 'v. 承担（责任、费用）', ex: 'Who will bear the cost of the repair?' },
    { g: 'v. 结（果实）；生（孩子）', ex: 'The tree bears fruit in late summer.' },
    { g: 'v. 带有、显示（标记、关系）', ex: 'The letter bears no signature.' },
    { g: 'n. 熊', ex: 'A bear was seen near the campsite.' }
  ], quiz: [
    { ex: 'The document bears no date.', options: ['忍受', '承担', '带有、显示有', '结果实'], ans: 2, why: 'bear + 标记类名词（signature/date/mark）表示“带有、载有”。' },
    { ex: 'Customers should not bear the full cost.', options: ['忍受', '承担（费用）', '生育', '带有'], ans: 1, why: 'bear the cost / responsibility / risk 表示“承担费用或责任”。' }
  ]},
  { w: 'charge', ph: '/tʃɑːdʒ/', senses: [
    { g: 'v. 收费；n. 费用', ex: 'They charge ¥20 for delivery.' },
    { g: 'v. 指控（charge sb with）', ex: 'He was charged with fraud.' },
    { g: 'v. 充电', ex: 'Leave the phone to charge overnight.' },
    { g: 'v. 冲、猛冲', ex: 'The crowd charged towards the gate.' },
    { g: 'n. 掌管、负责（in charge of）', ex: 'She is in charge of quality control.' }
  ], quiz: [
    { ex: 'Who is in charge of the night shift?', options: ['收费', '指控', '负责、掌管', '充电'], ans: 2, why: 'in charge of 是固定搭配，意为“负责、掌管”，charge 在此为名词。' },
    { ex: 'He was charged with leaking the report.', options: ['收费', '被指控（charge sb with）', '充电', '冲向'], ans: 1, why: 'be charged with + 罪名 表示“被指控犯有…”。' }
  ]}
];

/* ---------- 4. 词根词缀意义网络 ---------- */
DB.roots = [
  { root: 'spect', mean: '看 (to look)', words: [
    { w: 'inspect', m: 'in-（向内）+ spect → 向里看 → 检查' },
    { w: 'respect', m: 're-（再）+ spect → 一再注视 → 尊重' },
    { w: 'prospect', m: 'pro-（向前）+ spect → 向前看 → 前景' },
    { w: 'retrospect', m: 'retro-（向后）+ spect → 回头看 → 回顾' },
    { w: 'spectator', m: 'spect + -ator（人）→ 观看者 → 观众' },
    { w: 'perspective', m: 'per-（贯穿）+ spect → 看穿 → 视角' }
  ]},
  { root: 'dict', mean: '说 (to say)', words: [
    { w: 'predict', m: 'pre-（预先）+ dict → 事先说 → 预测' },
    { w: 'dictate', m: 'dict + -ate → 口述、命令' },
    { w: 'contradict', m: 'contra-（相反）+ dict → 说反话 → 反驳' },
    { w: 'verdict', m: 'ver-（真实）+ dict → 说真相 → 裁决' },
    { w: 'indicate', m: 'in- + dic + -ate → 指出、表明' },
    { w: 'dictionary', m: 'dict + -ionary → 收录说法的书 → 词典' }
  ]},
  { root: 'port', mean: '搬运、携带 (to carry)', words: [
    { w: 'transport', m: 'trans-（横跨）+ port → 从一地搬到另一地 → 运输' },
    { w: 'export', m: 'ex-（向外）+ port → 运出去 → 出口' },
    { w: 'import', m: 'im-（向内）+ port → 运进来 → 进口' },
    { w: 'report', m: 're-（回）+ port → 把消息带回来 → 报告' },
    { w: 'support', m: 'sup-（下）+ port → 从下面托着 → 支持' },
    { w: 'portable', m: 'port + -able → 可搬运的 → 便携的' }
  ]},
  { root: 'struct', mean: '建造 (to build)', words: [
    { w: 'construct', m: 'con-（共同）+ struct → 建造起来 → 构造' },
    { w: 'destruction', m: 'de-（相反）+ struct → 毁掉建造物 → 破坏' },
    { w: 'instruction', m: 'in-（在内）+ struct → 在心里搭建 → 指导' },
    { w: 'obstruct', m: 'ob-（对立）+ struct → 建起障碍物 → 阻挡' },
    { w: 'infrastructure', m: 'infra-（在下）+ struct → 底层结构 → 基础设施' },
    { w: 'restructure', m: 're-（重新）+ struct → 重新搭建 → 重组' }
  ]},
  { root: 'scrib / script', mean: '写 (to write)', words: [
    { w: 'describe', m: 'de-（向下）+ scribe → 写下来 → 描述' },
    { w: 'prescribe', m: 'pre-（预先）+ scribe → 事先写好 → 开处方/规定' },
    { w: 'subscribe', m: 'sub-（下面）+ scribe → 在名单下署名 → 订阅' },
    { w: 'manuscript', m: 'manu-（手）+ script → 手写的 → 手稿' },
    { w: 'transcript', m: 'trans-（转）+ script → 转成文字 → 文字记录' },
    { w: 'ascribe', m: 'a-（向）+ scribe → 把…写归于 → 归因于' }
  ]},
  { root: 'tract', mean: '拉、拖 (to pull)', words: [
    { w: 'attract', m: 'at-（向）+ tract → 拉向自己 → 吸引' },
    { w: 'distract', m: 'dis-（分开）+ tract → 把注意力拉走 → 分心' },
    { w: 'contract', m: 'con-（共同）+ tract → 把双方拉到一起 → 合同' },
    { w: 'extract', m: 'ex-（出）+ tract → 拉出来 → 提取' },
    { w: 'abstract', m: 'abs-（离开）+ tract → 抽离出来 → 抽象的/摘要' },
    { w: 'subtract', m: 'sub-（下）+ tract → 拉下去 → 减去' }
  ]},
  { root: 'cred', mean: '相信 (to believe)', words: [
    { w: 'credible', m: 'cred + -ible → 可信的' },
    { w: 'incredible', m: 'in-（不）+ credible → 难以置信的' },
    { w: 'credit', m: 'cred + -it → 信任 → 信用/学分' },
    { w: 'credentials', m: 'cred + -entials → 证明可信之物 → 资格证书' },
    { w: 'credulous', m: 'cred + -ulous（多）→ 太容易相信 → 轻信的' },
    { w: 'creed', m: 'cred 变体 → 信条' }
  ]},
  { root: 'form', mean: '形状 (shape)', words: [
    { w: 'transform', m: 'trans-（转变）+ form → 改变形状 → 转变' },
    { w: 'reform', m: 're-（重新）+ form → 重新塑形 → 改革' },
    { w: 'conform', m: 'con-（共同）+ form → 变成同样形状 → 遵守/符合' },
    { w: 'inform', m: 'in-（在内）+ form → 在心中成形 → 告知' },
    { w: 'formal', m: 'form + -al → 讲究形式的 → 正式的' },
    { w: 'uniform', m: 'uni-（单一）+ form → 同一形状 → 制服' }
  ]},
  { root: 'ject', mean: '投掷 (to throw)', words: [
    { w: 'reject', m: 're-（回）+ ject → 扔回来 → 拒绝' },
    { w: 'project', m: 'pro-（向前）+ ject → 向前抛出 → 项目/投射' },
    { w: 'inject', m: 'in-（内）+ ject → 扔进去 → 注射' },
    { w: 'eject', m: 'e-（外）+ ject → 扔出去 → 弹出' },
    { w: 'object', m: 'ob-（对立）+ ject → 抛在对面 → 反对/物体' },
    { w: 'subject', m: 'sub-（下）+ ject → 被投于…之下 → 受支配/主题' }
  ]},
  { root: 'vers / vert', mean: '转 (to turn)', words: [
    { w: 'convert', m: 'con-（完全）+ vert → 完全转变 → 转换' },
    { w: 'reverse', m: 're-（反）+ verse → 转回去 → 反转' },
    { w: 'diverse', m: 'di-（分开）+ verse → 转向不同方向 → 多样的' },
    { w: 'controversy', m: 'contro-（对立）+ versy → 转向对立 → 争议' },
    { w: 'universe', m: 'uni-（一）+ verse → 转为一体 → 宇宙' },
    { w: 'version', m: 'vers + -ion → 转出的样子 → 版本' }
  ]},
  { root: 'vid / vis', mean: '看 (to see)', words: [
    { w: 'visible', m: 'vis + -ible → 可看见的' },
    { w: 'vision', m: 'vis + -ion → 看见的能力 → 视力/愿景' },
    { w: 'evident', m: 'e-（出）+ vid → 看得出来的 → 明显的' },
    { w: 'provide', m: 'pro-（预先）+ vide → 预先看到需求 → 提供' },
    { w: 'revise', m: 're-（再）+ vise → 再看一遍 → 修订' },
    { w: 'supervise', m: 'super-（上面）+ vise → 在上面看 → 监督' }
  ]},
  { root: 'duc / duct', mean: '引导 (to lead)', words: [
    { w: 'educate', m: 'e-（出）+ duc → 把潜能引导出来 → 教育' },
    { w: 'conduct', m: 'con-（共同）+ duct → 引导众人 → 实施/行为' },
    { w: 'produce', m: 'pro-（向前）+ duce → 向前引导出来 → 生产' },
    { w: 'reduce', m: 're-（回）+ duce → 往回引 → 减少' },
    { w: 'introduce', m: 'intro-（向内）+ duce → 引见进来 → 介绍' },
    { w: 'deduce', m: 'de-（向下）+ duce → 一步步引下去 → 推断' }
  ]}
];
