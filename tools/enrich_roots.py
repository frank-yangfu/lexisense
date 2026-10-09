# -*- coding: utf-8 -*-
"""生成词根关联（rt）与词根网络分组（roots）—— v2。

v1 实测问题：
  1. 后缀/前缀阶段用 `try_roots(stem)` 兜底 -> 接受「非词词干」
     capital = capity + -al（"capity" 根本不存在）
  2. 词根子串聚类会产生孤立误命中
     sister = sist（站立）+ -er / solar = sol（单独）+ -ar / terrible = terr（土地）+ -ible
  3. 覆盖率低（697/3228 = 21.6%）：只靠规则拆解，大量派生词（decision、worker、beautiful）
     本身不含词根表里的词根，就完全拿不到关联。

v2 对策：
  A. 后缀/前缀阶段的词干必须是**真实词库词**（去掉 try_roots 兜底）-> 消灭虚构词干
  B. 逐条核对规则产出（root 166 条 / pre 108 条），对 12 处错误做精确黑名单 / 手写改写
  C. 新增 WordNet 派生关系阶段：derivationally_related_forms() 是词典里**已验证**的形态关系，
     双向建图，用来把 decision<-decide、worker<-work、national<-nation 这类派生词接上
  D. 词根网络分组与「单条标注」解耦：即使某个词已经拿到派生标注，
     它仍然参与词根聚类，保证「记一个、认一串」的分组不被抢空

优先级：手写改写 > 既有词根网络 > 词根聚类 > WordNet 派生 > 复合词 > 前缀 > 后缀

产出：%TEMP%/rt_map.json、%TEMP%/roots_extra.json
"""
import io
import json
import os
import re
from collections import Counter, defaultdict

from nltk.corpus import wordnet as wn

TMP = os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Temp')

PREFIX = [
    ('anti', '反对'), ('auto', '自己'), ('bi', '二'), ('co', '共同'), ('com', '共同'), ('con', '共同'),
    ('counter', '反对'), ('de', '向下/去除'), ('dis', '否定/分离'), ('en', '使…'), ('ex', '向外'),
    ('extra', '超出'), ('fore', '预先'), ('hyper', '过度'), ('im', '否定/向内'), ('in', '否定/向内'),
    ('inter', '之间'), ('ir', '否定'), ('macro', '宏大'), ('mal', '坏'), ('micro', '微小'), ('mid', '中间'),
    ('mini', '小'), ('mis', '错误'), ('mono', '单一'), ('multi', '多'), ('non', '非'), ('out', '超出'),
    ('over', '过度'), ('poly', '多'), ('post', '之后'), ('pre', '之前'), ('pro', '向前/支持'),
    ('re', '再/回'), ('semi', '半'), ('sub', '下'), ('super', '超'), ('sur', '超过'), ('tele', '远'),
    ('trans', '跨越'), ('tri', '三'), ('ultra', '极端'), ('un', '否定'), ('under', '不足/下'),
    ('uni', '单一'),
    # —— 同化前缀：ad- 在辅音前会变形，这是英语构词里出现频率最高的一组 ——
    #    （不含 al-：already / although 里的 al- 其实是 all- 的弱化，不是 ad-）
    ('ad', '朝向'), ('ac', '朝向'), ('af', '朝向'), ('ag', '朝向'),
    ('ap', '朝向'), ('ar', '朝向'), ('as', '朝向'), ('at', '朝向'),
    # —— 其他高频希腊 / 拉丁前缀 ——
    #    （不含 ana-/cata-/eu-/omni-/proto-/quasi-/therm-：在本词库内无可靠命中）
    ('ab', '离开'), ('abs', '离开'), ('para', '旁边'), ('circum', '环绕'),
    ('retro', '向后'), ('hypo', '在下'), ('meta', '超越/变化'),
    ('syn', '共同'), ('sym', '共同'), ('neo', '新'), ('pseudo', '假'),
    ('dys', '坏'), ('dia', '穿过'), ('epi', '在上'),
]

SUFFIX = [
    ('able', '可…的'), ('ible', '可…的'), ('al', '…的'), ('ial', '…的'), ('ical', '…的'),
    ('ance', '…状态'), ('ence', '…状态'), ('ancy', '…状态'), ('ency', '…状态'),
    ('ant', '…的人/物'), ('ent', '…的/人'), ('ary', '…的'), ('ory', '…的'),
    ('ate', '使…'), ('ify', '使…'), ('fy', '使…'), ('ize', '使…化'), ('ise', '使…化'),
    ('dom', '…领域'), ('ee', '被…的人'), ('er', '…的人/物'), ('or', '…的人/物'),
    ('ful', '充满…的'), ('hood', '…身份'), ('ship', '…关系/身份'), ('ism', '…主义'), ('ist', '…者'),
    ('ic', '…的'), ('ion', '…过程/状态'), ('tion', '…过程'), ('sion', '…过程'),
    ('ation', '…过程'), ('ition', '…过程'), ('ish', '略…的'), ('ity', '…性质'), ('ty', '…性质'),
    ('ive', '有…性质的'), ('less', '无…的'), ('ly', '…地'), ('ment', '…行为/结果'),
    ('ness', '…性质'), ('ous', '多…的'), ('ious', '多…的'), ('eous', '多…的'),
    ('ure', '…行为/结果'), ('ward', '朝…方向'), ('age', '…行为/总称'),
    ('itude', '…状态'), ('acy', '…性质'), ('cy', '…性质'), ('ery', '…的行为/场所'),
    ('est', '最…的'), ('en', '使…/由…制成'), ('ar', '…的'), ('ile', '易…的'),
]
INFL = ('ed', 'd', 's', 'es', 'ing', 'est')
INFL_MEAN = {'ed': '过去/被动', 'd': '过去/被动', 's': '复数/三单', 'es': '复数/三单',
             'ing': '进行', 'est': '最…的'}
SUFFIX_KEYS = set(s for s, _ in SUFFIX)
SUF_MEAN = {}
for s, m in SUFFIX:
    SUF_MEAN.setdefault(s, m)
# 仅用于「显示」的后缀义项：y 是真实后缀（thirsty / rainy / healthy），
# 但绝不能进 SUFFIX 参与匹配 —— 否则 busy = bus + -y、party = part + -y 这类
# 字符串巧合会被当成构词，已实测。
SUF_MEAN.setdefault('y', '…的/…性质')

COMPOSED = {}
for a in ('ate', 'ite', 'ise', 'ize'):
    for b in ('ion', 'ial', 'ive'):
        COMPOSED[a + b] = SUF_MEAN.get(a, '') + '+' + SUF_MEAN.get(b, '')
PREF_MEAN = {}
for p, m in PREFIX:
    PREF_MEAN.setdefault(p, m)

# 后缀对词干词性的要求（用于否决「字符串像、语义无关」的伪派生）
# 值为允许的词干词性集合；未列出的后缀放宽为 {n, v, adj}
SUF_POS = {
    'ly': {'adj', 'n'}, 'ness': {'adj', 'v'}, 'ity': {'adj'}, 'ty': {'adj'},
    'er': {'v', 'n'}, 'or': {'v'}, 'ist': {'n', 'adj'}, 'ism': {'n', 'adj'},
    'ment': {'v'}, 'ion': {'v'}, 'tion': {'v'}, 'sion': {'v'},
    'ation': {'v'}, 'ition': {'v'}, 'ance': {'v', 'adj'}, 'ence': {'v', 'adj'},
    'ant': {'v', 'n'}, 'ent': {'v'}, 'able': {'v', 'n'}, 'ible': {'v'}, 'ive': {'v', 'n'},
    'ous': {'n'}, 'ious': {'n'}, 'eous': {'n'}, 'ful': {'n', 'v'}, 'less': {'n', 'v'},
    'al': {'n', 'v'}, 'ial': {'n', 'v'}, 'ical': {'n', 'v'}, 'ic': {'n', 'v'},
    'ary': {'n', 'v'}, 'ory': {'v', 'n'}, 'ate': {'n', 'adj'},
    'ify': {'n', 'adj'}, 'ise': {'n', 'adj'}, 'ize': {'n', 'adj'},
    'dom': {'n', 'adj'}, 'hood': {'n'}, 'ship': {'n'}, 'age': {'n', 'v'},
    'ure': {'v', 'n'}, 'ery': {'n'}, 'acy': {'adj'}, 'cy': {'adj', 'n'},
    'itude': {'adj'}, 'est': {'adj'}, 'ee': {'v'}, 'ish': {'n', 'adj'},
    'ward': {'n', 'prep'}, 'en': {'adj', 'n'},
}
WN2CN_POS = {'n': 'n', 'v': 'v', 'a': 'adj', 's': 'adj', 'r': 'adv'}

ROOTS = [
    ('act', '做，行动'), ('aud', '听'), ('bio', '生命'), ('cap', '拿，抓'), ('cede', '走，让'),
    ('ceive', '取'), ('cept', '取'), ('cern', '分辨'), ('cide', '切，落'), ('cis', '切'), ('cid', '切，落'),
    ('claim', '喊'), ('clar', '清楚'), ('clude', '关闭'), ('cogn', '知道'), ('corp', '身体'),
    ('cred', '相信'), ('cult', '耕作'), ('dict', '说'), ('duce', '引导'), ('dur', '持久'),
    ('equ', '相等'), ('fac', '做'), ('fer', '带来'), ('fid', '信任'), ('flect', '弯曲'), ('flu', '流'),
    ('form', '形状'), ('fort', '强'), ('fract', '打破'), ('frag', '破碎'), ('gen', '产生'),
    ('geo', '地球'), ('grade', '步，级'), ('graph', '写'), ('gress', '走'), ('habit', '拥有'),
    ('ject', '投掷'), ('jud', '判断'), ('junct', '连接'), ('lect', '选择，读'), ('lev', '举起'),
    ('loc', '地方'), ('log', '言语，学科'), ('lum', '光'), ('magn', '大'), ('manu', '手'),
    ('mand', '命令'), ('memor', '记忆'), ('meter', '测量'), ('migr', '迁移'), ('miss', '送'),
    ('mit', '送'), ('mob', '移动'), ('mot', '移动'), ('mut', '改变'), ('nat', '出生'),
    ('nom', '名字，法则'), ('nov', '新'), ('oper', '工作'), ('part', '部分'), ('pass', '通过'),
    ('path', '感受，疾病'), ('ped', '脚'), ('pel', '推'), ('pend', '悬挂'), ('pens', '称重'),
    ('phon', '声音'), ('plic', '折叠'), ('pon', '放置'), ('port', '携带'), ('pos', '放置'),
    ('prehend', '抓住'), ('prim', '第一'), ('priv', '私人'), ('prob', '证明'), ('quir', '寻求'),
    ('reg', '统治，规则'), ('rupt', '破裂'), ('sci', '知道'), ('scrib', '写'), ('script', '写'),
    ('sect', '切'), ('sequ', '跟随'), ('serv', '服务，保持'), ('sign', '记号'), ('sist', '站立'),
    ('soci', '社会'), ('sol', '单独'), ('solu', '解开'), ('spect', '看'), ('spir', '呼吸'),
    ('sta', '站立'), ('struct', '建造'), ('tact', '接触'), ('tain', '持有'), ('tect', '覆盖'),
    ('tend', '伸展'), ('tens', '拉紧'), ('term', '界限'), ('terr', '土地'), ('test', '证明'),
    ('text', '编织'), ('tract', '拉'), ('trib', '给予'), ('trud', '推'), ('turb', '搅动'),
    ('vac', '空'), ('val', '价值，强壮'), ('vent', '来'), ('ver', '真实'), ('vers', '转'),
    ('vert', '转'), ('vid', '看'), ('vis', '看'), ('viv', '活'), ('voc', '叫'), ('volve', '滚，转'),
    # —— 实测在词库里有稳定产出的补充词根 ——
    ('toler', '忍受'), ('liter', '字母'), ('moder', '尺度'), ('stabil', '站稳'),
    ('dem', '人民'), ('centr', '中心'),
]

# ---- B：逐条核对后确认错误，规则阶段不再接手（改走 OVERRIDE 或干脆留空）----
# syntactic ← 希腊 syntaxis ← syn + tassein（排列），与拉丁 tact（tangere 接触）无关；
# contact / intact 才是真正的 con-/in- + tact，所以只否决 syntactic、保留 tact 词根本身。
ROOT_BAD = set('''sister coverage interval proportion recap solar terrible reverence
during passion compassion syntactic'''.split())
# abroad←on+broad、already/although←all+…、asset←ad+satis、arrow←古英语 arwe、
# appear←ad+parere（与 pear 无关）、admire←ad+mirari（与 mire 无关）、
# afford←古英语 geforthian、afraid←a+fray、accurate←ad+curare（curate 现代义为牧师）、
# affable←ad+fari（拆成 fable 会误导）、parasite←para+sitos（与 site 无关）
PREF_BAD = set('''display insight compost improve abroad affable asset arrow appear
admire afford afraid accurate parasite'''.split())
SUF_BAD = set('''capital question'''.split())
CMP_BAD = set('''justice'''.split())

# ---- 复合词白名单 ----
# 这些词的两半都是地道的英语自由词（back + pack、class + mate、fire + fighter），
# 但其中一半没进 3228 学习词库，所以「两半都必须在词库里」的通用规则命不中。
# 曾试过把通用规则的判据放宽成「两半都在 WordNet 词表里」，结果产出
#   literacy = lite + racy / carpenter = carp + enter / charitable = chari + table
#   deliberate = deli + berate / corporation = corp + oration / generate = gene + rate
# 这类纯字符串巧合，精确度掉到七成，故改为逐条人工核对的白名单。
# 值写 (前半, 后半) 时用统一模板；构词义与现代义有落差时直接写完整说明。
CMP_EXTRA = {
    'backpack': ('back', 'pack'), 'bandwidth': ('band', 'width'),
    'broadcast': ('broad', 'cast'), 'caregiver': ('care', 'giver'),
    'chopstick': ('chop', 'stick'), 'classmate': ('class', 'mate'),
    'coastline': ('coast', 'line'), 'deadline': ('dead', 'line'),
    'farewell': ('fare', 'well'), 'feedback': ('feed', 'back'),
    'fieldwork': ('field', 'work'), 'fingerprint': ('finger', 'print'),
    'firefighter': ('fire', 'fighter'), 'flashback': ('flash', 'back'),
    'flashcard': ('flash', 'card'), 'folklore': ('folk', 'lore'),
    'footprint': ('foot', 'print'), 'forecast': ('fore', 'cast'),
    'foreshadow': ('fore', 'shadow'), 'framework': ('frame', 'work'),
    'goodwill': ('good', 'will'), 'handshake': ('hand', 'shake'),
    'handwriting': ('hand', 'writing'), 'hardware': ('hard', 'ware'),
    'headache': ('head', 'ache'), 'headline': ('head', 'line'),
    'hindsight': ('hind', 'sight'), 'masterpiece': ('master', 'piece'),
    'newspaper': ('news', 'paper'), 'overcome': ('over', 'come'),
    'overfishing': ('over', 'fishing'), 'oversimplify': ('over', 'simplify'),
    'software': ('soft', 'ware'), 'sometimes': ('some', 'times'),
    'stakeholder': ('stake', 'holder'), 'stereotype': ('stereo', 'type'),
    'stomachache': ('stomach', 'ache'), 'suitcase': ('suit', 'case'),
    'therefore': ('there', 'fore'), 'timeline': ('time', 'line'),
    'toothache': ('tooth', 'ache'), 'trustworthy': ('trust', 'worthy'),
    'underline': ('under', 'line'), 'undermine': ('under', 'mine'),
    'understand': ('under', 'stand'), 'watermelon': ('water', 'melon'),
    'wheelchair': ('wheel', 'chair'), 'wildlife': ('wild', 'life'),
    'workforce': ('work', 'force'), 'worksheet': ('work', 'sheet'),
    # —— 构词义与现代义有落差 / 有一半是粘着词素，写完整说明 ——
    'interface': 'inter-（之间）+ face（面）→ interface 界面/接口',
    'extracurricular': 'extra-（超出）+ curricular（课程的）→ extracurricular 课外的',
    'homophobia': 'homo（相同）+ phobia（恐惧）→ homophobia 恐同',
    'demographic': 'demo（人民）+ graphic（写）→ demographic 人口统计的',
    'technology': 'techno（技艺）+ -logy（…学科）→ technology 技术',
    'methodology': 'method（方法）+ -ology（…学科）→ methodology 方法论',
    'morphology': 'morph（形态）+ -ology（…学科）→ morphology 形态学',
    'phonology': 'phon（声音）+ -ology（…学科）→ phonology 音系学',
    'psychology': 'psycho（心灵）+ -ology（…学科）→ psychology 心理学',
    'tautology': 'tauto（相同）+ -logy（…学科）→ tautology 同义反复',
    'solidarity': 'solid（坚固）+ -arity（…性质）→ solidarity 团结',
    'wireless': 'wire（线）+ -less（无…的）→ wireless 无线的',
    'discover': 'dis-（除去）+ cover（覆盖）→ discover 发现',
    'reinforce': 're-（再）+ in-（进入）+ force（力量）→ reinforce 加强',
    'generate': 'gener（源自 genus「种」）+ -ate（使…）→ generate 产生',
    'temperament': 'temper（源自 temperare「调和」）+ -ament → temperament 性情',
    'knowledge': 'know（知道）+ -ledge（古英语 -lāc「状态」）→ knowledge 知识',
    'platform': 'plat（法语 plat「平的」）+ form（形状）→ platform 平台',
    'surveillance': 'sur-（超过）+ veill（veiller「看守」）+ -ance → surveillance 监视',
    'corporation': 'corpor（身体）+ -ation（…过程）→ corporation 公司',
    'deliberate': 'de-（加强）+ libr（源自 libra「天平」，权衡）+ -ate → deliberate 深思熟虑的',
    'enterprise': 'enter-（法语 entre「之间」）+ prise（prendre「取」）→ enterprise 企业',
}

# ---- C：WordNet 派生关系虽然成立，但构词说明会误导学习者，主动否决 ----
#     gravity   ← gravis（重），不是 grave（严肃）+ -ity
#     butter    ← 拉丁 butyrum ← 希腊 boutyron，与 butt 无关
#     expertise ← 法语 expertise，拆成 expert + -ise 会读成「使人变专家」
#     equator   ← aequator ← aequare，与现代义「equate 等同」的语感对不上
#     sanitation / dissertation ← 反向构词 sanitate / dissertate 过于生僻，
#                                 写进构词说明反而比直接记单词更难
DERIV_BAD = set('''gravity butter expertise sanitation dissertation equator'''.split())

# ---- B：手写改写（最高优先级），给出更准确的词源/构词说明 ----
OVERRIDE = {
    'coverage': {'k': 'suf', 'r': 'age', 'm': 'cover（覆盖）+ -age（…总称）→ coverage 覆盖范围'},
    'interval': {'k': 'root', 'r': 'inter', 'm': 'inter-（之间）+ val（源自 vallum「墙」，间隔）→ interval'},
    'proportion': {'k': 'root', 'r': 'pro',
                   'm': 'pro-（向前）+ port（源自 portio「份额」）+ -ion → proportion 比例'},
    'recap': {'k': 'root', 'r': 're', 'm': 're-（再）+ cap（源自 capit-「头/要点」）→ recap 扼要重述'},
    'solar': {'k': 'root', 'r': 'sol', 'm': 'sol（太阳，此处非「单独」）+ -ar（…的）→ solar 太阳的'},
    'terrible': {'k': 'root', 'r': 'terr',
                 'm': 'terr（源自 terrere「使害怕」）+ -ible（可…的）→ terrible 可怕的'},
    'reverence': {'k': 'root', 'r': 'ver',
                  'm': 're-（再）+ ver（源自 vereri「敬畏」）+ -ence（…状态）→ reverence 敬畏'},
    'during': {'k': 'root', 'r': 'dur', 'm': 'dur（持久）→ during（源自古法语 durer「持续」）'},
    'passion': {'k': 'root', 'r': 'pass', 'm': 'pass（忍受，感受）+ -ion（…状态）→ passion 激情'},
    'compassion': {'k': 'root', 'r': 'pass',
                   'm': 'com-（共同）+ pass（忍受，感受）+ -ion → compassion 同情'},
    'display': {'k': 'pre', 'r': 'dis', 'm': 'dis-（分离）+ plic（折叠）→ display（原义「展开」）陈列'},
    'insight': {'k': 'cmp', 'r': 'in+sight', 'm': 'in（向内）+ sight（看）→ insight 洞察力'},
    'compost': {'k': 'pre', 'r': 'com', 'm': 'com-（共同）+ posit（放置）→ compost 堆肥'},
    'improve': {'k': 'pre', 'r': 'im', 'm': 'im-（使…）+ prove（源自古法语 prou「获益」）→ improve 改善'},
    'capital': {'k': 'root', 'r': 'cap',
                'm': 'cap（源自 capit-「头」，引申为首要）+ -al → capital 首都/资本'},
    'question': {'k': 'suf', 'r': 'ion', 'm': 'quest（寻求）+ -ion（…过程）→ question 问题'},
    'career': {'k': 'root', 'r': '-', 'm': 'carrière（古法语「道路、跑道」）→ career 生涯'},
    'empirical': {'k': 'root', 'r': '-', 'm': 'empeiria（希腊语「经验」）+ -ical（…的）→ empirical 经验的'},
    'similar': {'k': 'root', 'r': '-', 'm': 'similis（拉丁语「相似」）+ -ar（…的）→ similar 相似的'},
    'shower': {'k': 'root', 'r': '-', 'm': 'scūr（古英语「阵雨」）→ shower 阵雨/淋浴'},
    'determine': {'k': 'root', 'r': 'term',
                  'm': 'de-（加强）+ term（源自 terminus「界限」）+ -ine → determine 决定'},
    'determined': {'k': 'suf', 'r': 'ed',
                   'm': 'determine + -ed（…的）→ determined 坚定的'},
}

POS_CN = {'n': '名词', 'v': '动词', 'adj': '形容词', 'adv': '副词', 'prep': '介词',
          'conj': '连词', 'pron': '代词', 'num': '数词', 'art': '冠词', 'int': '感叹词',
          'aux': '助动词'}
WN2CN = {'n': '名词', 'v': '动词', 'a': '形容词', 's': '形容词', 'r': '副词'}


def load_inventory():
    return json.load(io.open(os.path.join(TMP, 'inventory.json'), encoding='utf-8'))


def load_existing_roots():
    p = os.path.join(TMP, 'roots_base.json')
    if not os.path.exists(p):
        return {}
    out = {}
    for g in json.load(io.open(p, encoding='utf-8')):
        for x in g['words']:
            out[x['w'].lower()] = (g['root'], g['mean'].split(' ')[0])
    return out


def suf_ok(suf):
    return suf == '' or suf in SUFFIX_KEYS or suf in COMPOSED or suf in INFL


def try_roots(word):
    """词根聚类：前缀? + 词根 + 后缀? 完全可拆"""
    best = None
    for root, mean in ROOTS:
        p = word.find(root)
        while p >= 0:
            pre, suf = word[:p], word[p + len(root):]
            if (pre == '' or pre in PREF_MEAN) and suf_ok(suf) and (pre or suf):
                score = len(root) * 10 + len(pre) + len(suf)
                if best is None or score > best[0]:
                    best = (score, root, mean, pre, suf)
            p = word.find(root, p + 1)
    return best


def build_deriv_map(words):
    """WordNet 派生关系：{词: [同族词]}，双向建图（只保留双方都在词库里的）"""
    wset = set(words)
    link = defaultdict(set)
    for w in words:
        try:
            for s in wn.synsets(w):
                for l in s.lemmas():
                    ln = l.name().lower().replace('_', ' ')
                    for r in l.derivationally_related_forms():
                        rn = r.name().lower().replace('_', ' ')
                        if rn == ln:
                            continue
                        if ln == w and rn in wset and rn != w:
                            link[w].add(rn)
                        if rn == w and ln in wset and ln != w:
                            link[w].add(ln)
        except Exception:
            continue
    return {k: sorted(v) for k, v in link.items()}


def build_deriv_all(words):
    """WordNet 派生关系「全量版」：不要求同族词也在词库里。

    后缀阶段原先要求「词干必须是 3228 词库里的词」。这条约束把 beauty、usual、
    sweat、occasional 这类**确凿是英语真词、但没进学习词库**的词干全部挡在门外，
    连带 beautiful / usually / sweater / occasionally 都拿不到构词说明
    （实测 3228 词里有 625 个派生词因此落空）。

    改为「词干须与目标词存在 WordNet 派生关系」——这是词典标注过的、已验证的
    形态家族关系，比「字符串像不像」可靠得多。而 brother←broth、sentence←sent、
    hamburger←hamburg 这类纯字符串巧合因为没有派生关系，会自动被挡掉。
    """
    out = defaultdict(set)
    for w in words:
        try:
            for s in wn.synsets(w):
                for l in s.lemmas():
                    if l.name().lower().replace('_', ' ') != w:
                        continue
                    for r in l.derivationally_related_forms():
                        rn = r.name().lower().replace('_', ' ')
                        if rn != w:
                            out[w].add(rn)
        except Exception:
            continue
    return out


def main():
    inv = load_inventory()
    words = [it['w'] for it in inv]
    wset = set(words)
    gloss = {}
    for it in inv:
        gloss[it['w']] = it['senses'][0]['g'] if it['senses'] else ''
    ordered = {w: i for i, w in enumerate(words)}
    existing = load_existing_roots()
    deriv = build_deriv_map(words)
    deriv_all = build_deriv_all(words)

    def pos_cn(w):
        g = gloss.get(w, '')
        m = re.match(r'^(n|v|adj|adv|prep|conj|pron|num|art|int|vt|vi)\.', str(g).strip())
        if m:
            p = m.group(1)
            return POS_CN.get('v' if p in ('vt', 'vi') else p, p)
        ss = wn.synsets(w)
        if ss:
            return WN2CN.get(Counter(s.pos() for s in ss).most_common(1)[0][0], '')
        return ''

    rt = {}
    stat = Counter()

    # 0) 手写改写（最高优先）
    for w, rec in OVERRIDE.items():
        if w in wset:
            rt[w] = rec
            stat['override'] += 1

    # 1) 既有词根网络
    for w in words:
        if w in rt:
            continue
        if w in existing:
            r, m = existing[w]
            rt[w] = {'k': 'net', 'r': r, 'm': '%s（%s）家族' % (r, m)}
            stat['network'] += 1

    # 2) 词根聚类（单条标注）
    for w in words:
        if w in rt or len(w) < 4 or w in ROOT_BAD:
            continue
        b = try_roots(w)
        if not b:
            continue
        _, root, mean, pre, suf = b
        parts = []
        if pre:
            parts.append('%s-（%s）' % (pre, PREF_MEAN[pre]))
        parts.append('%s（%s）' % (root, mean))
        if suf:
            parts.append('-%s（%s）' % (suf, SUF_MEAN.get(suf, INFL_MEAN.get(suf, '变形'))))
        rt[w] = {'k': 'root', 'r': root, 'm': ' + '.join(parts) + ' → ' + w}
        stat['root'] += 1

    # 4) 复合词（两半都必须是真实词库词）
    #    阈值 6：可覆盖 airport / forgive / keyword / rainbow 这类短复合词
    for w in words:
        if w in rt or len(w) < 6 or w in CMP_BAD:
            continue
        if w in CMP_EXTRA:
            v = CMP_EXTRA[w]
            if isinstance(v, tuple):
                rt[w] = {'k': 'cmp', 'r': v[0] + '+' + v[1],
                         'm': '%s + %s 复合 → %s' % (v[0], v[1], w)}
            else:
                rt[w] = {'k': 'cmp', 'r': '-', 'm': v}
            stat['cmp'] += 1
            continue
        best = None
        for i in range(3, len(w) - 2):
            a, c = w[:i], w[i:]
            if len(a) < 3 or len(c) < 3 or max(len(a), len(c)) < 4:
                continue
            if a in wset and c in wset:
                sc = min(len(a), len(c))
                if best is None or sc > best[0]:
                    best = (sc, a, c)
        if best:
            _, a, c = best
            rt[w] = {'k': 'cmp', 'r': a + '+' + c, 'm': '%s + %s 复合 → %s' % (a, c, w)}
            stat['cmp'] += 1

    # 5) 前缀（残余部分必须是真实词库词）
    for w in sorted(words):
        if w in rt or len(w) < 5 or w in PREF_BAD:
            continue
        for p, pm in PREFIX:
            if w.startswith(p) and len(w) - len(p) >= 4:
                rest = w[len(p):]
                if rest in wset:
                    rt[w] = {'k': 'pre', 'r': p, 'm': '%s-（%s）+ %s → %s' % (p, pm, rest, w)}
                    stat['pre'] += 1
                    break

    # 6) 后缀拆解（词干必须是真实词库词）
    #    放在 WordNet 派生之前：national = nation + -al / beautiful = beauty + -ful
    #    对学习者比「派生自 nationality」清楚得多，且 WordNet 派生关系本身很稀疏。
    #
    #    两条硬约束，专治「字符串像、语义无关」的伪派生：
    #      A. 变形受限：只允许标准拼写调整 —— 去 e（arrive←arriv+-al）、y→i（happy←happi+-ness）。
    #         严禁无条件做 -y/-i 还原，否则会造出 gratitude←gray、honesty←honey、
    #         citation←city、happen←happy 这类荒唐拆解。
    #      B. 词性匹配：后缀对词干词性有固定要求（-ness 要形容词、-ment 要动词…），
    #         不匹配直接否决 —— 这一步干掉 earnest←earn、coalition←coal、fallacy←fall。
    all_suf = list(SUFFIX) + list(COMPOSED.items())
    all_suf.sort(key=lambda x: -len(x[0]))

    def poss_of(x):
        hs = re.findall(r'(?:^|[/、（(])\s*(n|v|adj|adv|prep|conj|pron|num|art|int|vt|vi)\s*\.',
                        str(gloss.get(x, '')))
        out = set('v' if h in ('vt', 'vi') else h for h in hs)
        if not out:
            ss = wn.synsets(x)
            if ss:
                p = WN2CN_POS.get(Counter(s.pos() for s in ss).most_common(1)[0][0])
                if p:
                    out.add(p)
        return out

    for w in sorted(words):
        if w in rt or len(w) < 6 or w in SUF_BAD:
            continue
        wpos = poss_of(w)
        for s, sm in all_suf:
            if not (w.endswith(s) and len(w) - len(s) >= 4):
                continue
            stem = w[:-len(s)]
            cands = [stem, stem + 'e']
            if stem.endswith('i'):                       # y→i 的标准还原，别无例外
                cands.append(stem[:-1] + 'y')
            if s[0] in 'aeiou' and stem[-1] not in 'aeiou' and len(stem) >= 3 \
                    and stem[-2:-1] in 'aeiou' and stem[-3:-2] not in 'aeiou':
                cands.append(stem + stem[-1])            # run -> runn（-ing 双写）
            # 词干末尾的字母与后缀首字母相同、拼写只写一次：
            #   additional + -ly -> additionally / honest + -ty -> honesty
            if len(stem) >= 3 and s[0] not in 'aeiou' and stem[-1] != s[0]:
                cands.append(stem + s[0])
            allow = SUF_POS.get(s, {'n', 'v', 'adj'})
            fam = deriv_all.get(w) or frozenset()
            # 两条接受路径，都要求「词干 ≠ 目标词」：
            #   ① 词干是词库真词 + 词性模板匹配（原有路径，national = nation + -al）
            #   ② 词干与目标词存在 WordNet 派生关系（词典验证过的形态家族）
            # 路径 ② 只在前者落空时启用，且受 DERIV_BAD 否决。
            hit = [c for c in cands
                   if c and c != w and c in wset and (poss_of(c) & allow)]
            if not hit and w not in DERIV_BAD:
                hit = [c for c in cands if c and c != w and c in fam]
            # ③ -ly 副词：基础词只要求是 WordNet 形容词。
            #    additional → additionally / usual → usually / complete → completely
            #    这类形容词没进学习词库、WordNet 又没记 -ly 派生关系，只能靠词性判定。
            if not hit and s == 'ly' and len(stem) >= 4 and wn.synsets(stem, pos=wn.ADJ):
                hit = [stem]
            if hit:
                base = sorted(hit, key=lambda c: (c != cands[0], len(c)))[0]
                # 后缀写法取「能把整词原样拼回来」的那个：
                #   assert + -ion -> assertion（而不是 assert + -tion，拼出双 t）
                #   honest + -y  -> honesty（而不是 honest + -ty，拼出双 t）
                # 拼不回来时（去 e、y→i 等）保留原后缀名：
                #   educate + -ation -> education / beauty + -ful -> beautiful
                disp = s
                if base + s != w:
                    for d in (s[1:],):
                        # 缩写法必须本身就是已知后缀，否则 browser 会被写成 browse + -r
                        if d in SUF_MEAN and base + d == w:
                            disp = d
                            break
                rt[w] = {'k': 'suf', 'r': s,
                         'm': '%s + -%s（%s）→ %s' % (base, disp, SUF_MEAN.get(disp, sm), w)}
                stat['suf'] += 1
                break

    # 7) WordNet 派生关系（兜底）。
    #    WordNet 的派生关系是无向的（tense/tensor 互相指向），无法直接判断谁是基础词。
    #    判据：只有找到**严格更短**的同族词时才认为它是基础词；
    #    若同族词都不比本词短（farm/farmer、time/timer、syntax/syntactic），
    #    说明本词自己就是基础词 —— 此时宁可不标注，也不要输出反向的错误关系。
    for w in words:
        if w in rt or len(w) < 5:
            continue
        hits = deriv.get(w)
        if not hits:
            continue
        pool = set(hits)
        for h in list(hits):
            pool.update(x for x in deriv.get(h, []) if x != w)
        pool.discard(w)
        pool = [b for b in pool if len(b) < len(w)]
        if not pool:
            continue
        base = sorted(pool, key=lambda b: (len(b), ordered.get(b, 99999)))[0]
        pa, pb = pos_cn(w), pos_cn(base)
        note = '（%s → %s）' % (pb, pa) if (pa and pb and pa != pb) else '（同族词）'
        rt[w] = {'k': 'der', 'r': base, 'm': '派生自 %s%s → %s' % (base, note, w)}
        stat['deriv'] += 1

    # D) 词根网络分组：独立于上面的单条标注，遍历全部词，保证分组不被抢空
    groups = defaultdict(lambda: {'mean': '', 'words': []})
    for w in words:
        if len(w) < 4 or w in ROOT_BAD:
            continue
        b = try_roots(w)
        if not b:
            continue
        _, root, mean, pre, suf = b
        groups[root]['mean'] = mean
        groups[root]['words'].append({'w': w, 'm': mean})

    net_roots = set(r for r, _ in existing.values())
    extra = []
    for root, g in sorted(groups.items(), key=lambda kv: -len(kv[1]['words'])):
        # 门槛 3：mit / sci / tect / nat / vent / sect … 这些三词组语义完全成立，
        # 「记一个、认一串」在 3 词规模上依然说得通，砍掉反而让网络瘦得没必要
        if len(g['words']) >= 3 and root not in net_roots:
            extra.append({'root': root, 'mean': g['mean'], 'words': g['words']})

    io.open(os.path.join(TMP, 'rt_map.json'), 'w', encoding='utf-8').write(
        json.dumps(rt, ensure_ascii=False, separators=(',', ':')))
    io.open(os.path.join(TMP, 'roots_extra.json'), 'w', encoding='utf-8').write(
        json.dumps(extra, ensure_ascii=False, separators=(',', ':')))

    cov = len(rt)
    print('总词 %d | 词根关联覆盖 %d (%.1f%%)' % (len(words), cov, 100.0 * cov / max(1, len(words))))
    print('  手写 %d | 网络 %d | 词根 %d | 派生 %d | 复合 %d | 前缀 %d | 后缀 %d'
          % (stat['override'], stat['network'], stat['root'], stat['deriv'],
             stat['cmp'], stat['pre'], stat['suf']))
    print('新增词根网络分组 %d 组 / %d 词'
          % (len(extra), sum(len(g['words']) for g in extra)))
    for g in extra:
        print('  ', g['root'], '(%s)' % g['mean'], ' '.join(x['w'] for x in g['words'][:10]))
    print('派生样例：')
    for w in ['decision', 'worker', 'beautiful', 'national', 'happiness', 'carefully',
              'dangerous', 'teacher', 'useful', 'kindness', 'active', 'sister', 'recap']:
        if w in rt:
            print('   %-12s %s' % (w, rt[w]['m']))


if __name__ == '__main__':
    main()
