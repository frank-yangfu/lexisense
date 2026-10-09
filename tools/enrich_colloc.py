# -*- coding: utf-8 -*-
"""语料驱动生成常用搭配（v2 —— 质量优先）。

v1 实测问题（随机抽样 50 条，约 35% 是噪声）：
  a. 用 corp.raw() 全局正则分词 -> 二元组跨越句子边界
     "fish called"（a fish called Wanda）/ "od voyage" / "cd cup" / "hl shelter"
  b. movie_reviews、webtext 里大量影视标题与软件术语
     "lion king" / "total recall" / "inspector gadget" / "js console" / "windows media"
  c. 只看词频与 PMI，没有「结构是否成立」的判定
     "already owns" / "more inclined" / "always reliable" 这类弱搭配照样入选
  d. 同族词重复入选："pay attention" 与 "pays attention"、"heavy rain" 与 "heavy rains"

v2 对策（逐条对应）：
  1) 逐句处理（corp.sents()），二元组/三元组绝不跨句
  2) 「语料多样性」硬门槛：短语须在 >= 2 个语料中共现
  3) 「通用语料」门槛：必须在 brown / reuters / gutenberg 中至少命中一个，
     防止只在电影字幕+网页里出现的噪声入选
  4) 大小写专名检测：连续 TitleCase 段落中的共现占比高 -> 判为专名剔除
  5) token 质量过滤：内容词长度 >= 3、剔标注残留/缩写/技术残渣
  6) POS 模式打分：名词/动词/形容词优先与名词搭配；通用程度副词+形容词判为弱搭配
  7) 同族词归一：搭配伙伴与词条本身同族则剔除；显示时还原为原形（pays -> pay）
  8) 同族去重：heavy rain / heavy rains 只留一条

产出：%TEMP%/col_map.json   {word: [phrase, ...]}
"""
import io
import json
import math
import os
import re
from collections import Counter, defaultdict

from nltk.corpus import wordnet as wn
from nltk.corpus import brown, reuters, movie_reviews, webtext, gutenberg

TMP = os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Temp')
TOKEN_RE = re.compile(r"[A-Za-z]+(?:'[A-Za-z]+)?")

CORPUS_MAP = {'brown': brown, 'reuters': reuters, 'gutenberg': gutenberg,
              'webtext': webtext, 'movie_reviews': movie_reviews}
CORPORA = ('brown', 'reuters', 'gutenberg', 'webtext', 'movie_reviews')
CLEAN = ('brown', 'reuters', 'gutenberg')
DIVERSITY_MIN = 2
FREQ_MIN = 12
PAIR_MIN = 5
PMI_MIN = 5.5
TOPN = 3

STOP = set('''a an the i you he she it we they me him her us them my your his its our their
this that these those am is are was were be been being do does did done have has had having
will would shall should can could may might must and but or so if because as than then there
here when where which who whom whose what how why not no nor too also very just only even still
of to in on at by for with from into onto upon about after before during over under again
s t re ve ll d m o n'''.split())

ALLOW_TAIL = set('''on in off out up down over away back through along around about after for
with to at into from against upon by of as between among beyond within without across under
behind beside past toward towards onto forth ahead apart aside together forward
account advantage care effect place part charge hold attention progress sense
measure action steps emphasis'''.split())

STRONG_DEGREE = set('''highly deeply strongly widely closely firmly greatly badly severely
fully partly largely increasingly particularly especially critically vitally absolutely
completely utterly'''.split())

GENERIC_DEGREE = set('''more most very quite rather fairly pretty too so less least extremely
really always never already still often usually sometimes soon then now again once twice ever
constantly frequently occasionally rarely seldom generally normally nearly almost hardly
somewhat slightly totally well far much'''.split())

NON_COLLOC_ADV = set('''already also still yet often always never usually sometimes soon then
now here there again once twice ever constantly frequently occasionally rarely seldom generally
normally finally suddenly immediately recently lately meanwhile however moreover therefore
thus hence instead besides otherwise'''.split())

ALLOW_LEFT_OK = STRONG_DEGREE | GENERIC_DEGREE

# 专有形容词：天然大写但属于普通搭配伙伴（english teacher / chinese food）
PROPER_ADJ = set('''english chinese french japanese german spanish italian russian greek
roman latin american british indian australian canadian european asian african europe
christian muslim catholic jewish north south east west'''.split())

BAD = set('''nn jj vb rb dt at np pp vbd vbn vbg nns vbz jjs rbr uh huh yeah okay ok oh ah er um
sir madam ll ve re nt
md inc ltd corp plc dept univ gov sen rep gen col capt prof rev hon jr sr vs etc ibid cit op
vol ed est st ave rd blvd mr mrs ms dr
http www html htm css php sql xml json api url uri gui os pc mac ios iphone android linux
google facebook twitter yahoo microsoft amazon ebay ibm intel
hl od js cd tv dvd usb gps ram rom
zz xx edt pst gmt am pm'''.split())

INFL_SUF = ('ing', 'ed', 'es', 's', 'd', 'er', 'est')


def pos_of(gloss):
    m = re.match(r'^(n|v|adj|adv|prep|conj|pron|num|art|aux|int|vt|vi)\.', str(gloss).strip())
    if not m:
        return None
    p = m.group(1)
    return 'v' if p in ('vt', 'vi') else p


def same_lemma(a, b):
    if a == b:
        return True
    for s in INFL_SUF:
        if b.endswith(s) and len(b) - len(s) >= 3 and a == b[:-len(s)]:
            return True
        if a.endswith(s) and len(a) - len(s) >= 3 and b == a[:-len(s)]:
            return True
    return False


def norm_key(phrase):
    """同族词去重键：heavy rain / heavy rains 视为同一搭配"""
    out = []
    for t in phrase.split():
        for s in ('ing', 'ed', 'es', 's', 'd'):
            if t.endswith(s) and len(t) - len(s) >= 3:
                t = t[:-len(s)]
                break
        if len(t) > 3 and t.endswith('e'):
            t = t[:-1]
        out.append(t)
    return ' '.join(out)


def main():
    inv = json.load(io.open(os.path.join(TMP, 'inventory.json'), encoding='utf-8'))
    vocab = set(it['w'] for it in inv)
    tpos_of = {}
    for it in inv:
        g = it['senses'][0]['g'] if it['senses'] else ''
        tpos_of[it['w']] = pos_of(g)
    is_verb = set(w for w, p in tpos_of.items() if p == 'v')

    print('语料加载中（逐句）...')
    uni, up, lowc = Counter(), Counter(), Counter()
    R = {c: defaultdict(Counter) for c in CORPORA}
    L = {c: defaultdict(Counter) for c in CORPORA}
    A = {c: defaultdict(Counter) for c in CORPORA}
    Rall, Lall, Aall = defaultdict(Counter), defaultdict(Counter), defaultdict(Counter)
    # 仅统计「有大小写信息」的语料：movie_reviews 全小写，会把专名比例稀释掉
    Rallc, Lallc, Aallc = defaultdict(Counter), defaultdict(Counter), defaultdict(Counter)
    ptitle = defaultdict(int)

    for cname in CORPORA:
        corp = CORPUS_MAP[cname]
        r_c, l_c, a_c = R[cname], L[cname], A[cname]
        case_ok = cname != 'movie_reviews'
        nw = 0
        for sent in corp.sents():
            seq = []
            first_word = True
            for t in sent:
                if not TOKEN_RE.fullmatch(t):
                    seq.append(None)
                    continue
                seq.append((t.lower(), t[0].isupper() and not first_word))
                first_word = False
            n = len(seq)
            for i, cur in enumerate(seq):
                if cur is None:
                    continue
                lo, ti = cur
                nw += 1
                uni[lo] += 1
                if ti:
                    up[lo] += 1
                else:
                    lowc[lo] += 1
                if i:
                    pv = seq[i - 1]
                    if pv is not None:
                        pb = pv[0]
                        if lo in vocab or pb in vocab:
                            l_c[lo][pb] += 1
                            Lall[lo][pb] += 1
                            if case_ok:
                                Lallc[lo][pb] += 1
                            if ti:
                                ptitle[(lo, pb)] += 1
                if i + 1 < n and seq[i + 1] is not None:
                    nx = seq[i + 1]
                    nb = nx[0]
                    if lo in vocab or nb in vocab:
                        r_c[lo][nb] += 1
                        Rall[lo][nb] += 1
                        if case_ok:
                            Rallc[lo][nb] += 1
                        if ti:
                            ptitle[(lo, nb)] += 1
                if (lo in is_verb and i + 2 < n and seq[i + 1] is not None
                        and seq[i + 2] is not None and seq[i + 1][0] in ('a', 'an', 'the')):
                    ph = seq[i + 1][0] + ' ' + seq[i + 2][0]
                    a_c[lo][ph] += 1
                    Aall[lo][ph] += 1
                    if case_ok:
                        Aallc[lo][ph] += 1
                    if ti:
                        ptitle[(lo, seq[i + 2][0])] += 1
        print('  %-14s %8d 词次' % (cname, nw))

    N = sum(uni.values())
    real = set()
    for t, c in uni.items():
        if c < 4 or len(t) < 3 or t in BAD or "'" in t:
            continue
        if lowc[t] < 3 or up[t] > lowc[t]:
            continue
        real.add(t)
    print('总词次 %d | 词表 %d | 真实词白名单 %d' % (N, len(vocab), len(real)))

    # 各词的非句首大写比例：接近 1 说明本身就是专名/专有形容词（English、American）
    caprate = {}
    for t in uni:
        tot = up[t] + lowc[t]
        caprate[t] = (up[t] / tot) if tot else 0.0

    def proper_junk(w, partner, c_case):
        """专名/作品名判定（双信号）"""
        # 信号 B：搭档天然大写，又不是英语/中国这类专有形容词 -> 人名、地名
        if caprate.get(partner, 0.0) > 0.8 and partner not in PROPER_ADJ:
            return True
        # 本词本身天然大写（English / American），不适用信号 A
        if caprate.get(w, 0.0) > 0.8:
            return False
        # 信号 A：本词在句中突然大写 -> 整串是专名/作品名
        k = ptitle.get((w, partner), 0)
        return k >= 2 and k * 2 >= c_case

    wn_cache, pos_cache = {}, {}

    def in_wn(t):
        if t not in wn_cache:
            try:
                wn_cache[t] = bool(wn.synsets(t))
            except Exception:
                wn_cache[t] = False
        return wn_cache[t]

    def wn_pos(t):
        if t not in pos_cache:
            try:
                ss = wn.synsets(t)
                pos_cache[t] = Counter(s.pos() for s in ss).most_common(1)[0][0] if ss else None
            except Exception:
                pos_cache[t] = None
        return pos_cache[t]

    def pmi(c_ab, c_a, c_b):
        if not c_ab or not c_a or not c_b:
            return 0.0
        return math.log((c_ab * N) / (c_a * c_b), 2)

    def n_corpus(idx, head, tail):
        k = 0
        for c in idx:
            cc = idx[c].get(head)
            if cc and cc.get(tail):
                k += 1
        return k

    def in_clean(idx, head, tail):
        for c in CLEAN:
            cc = idx[c].get(head)
            if cc and cc.get(tail):
                return True
        return False

    def base_form(t):
        """显示用原形：pays -> pay / rains -> rain（仅当原形确在词库中）"""
        for s in ('ing', 'ed', 'es', 's', 'd'):
            if t.endswith(s) and len(t) - len(s) >= 3:
                b = t[:-len(s)]
                for cand in (b, b + 'e'):
                    if cand != t and cand in vocab:
                        return cand
        return t

    def ok_partner(b):
        return b not in BAD and b not in STOP and len(b) >= 3

    rej = Counter()
    out = {}

    for w in sorted(vocab):
        tw = tpos_of.get(w)
        if tw == 'adv' and w in NON_COLLOC_ADV:
            rej['无搭配概念的副词'] += 1
            continue
        cands = []
        forms = set()

        def push(phrase, partner, cnt, raw_pmi, base_bonus, side='L'):
            # 通用程度/频率副词不构成搭配：more efficient / very wisely
            # 按「词条自身词性」判断，不能依赖搭档词性（more 会被 WordNet 判成形容词而漏网）
            if tw in ('adj', 'adv', None) and partner in GENERIC_DEGREE:
                rej['弱程度副词'] += 1
                return
            ppos = {'n': 'n', 'v': 'v', 'a': 'adj', 's': 'adj', 'r': 'adv'}.get(wn_pos(partner))
            # 名词 + 右侧动词 = 主语 + 谓语，不是搭配（动词-宾语时动词在左侧）
            if tw == 'n' and ppos == 'v' and side == 'R':
                rej['名动碎片'] += 1
                return
            bonus = 0.0
            if tw == 'n':
                bonus = 2.0 if ppos == 'adj' else (1.2 if ppos == 'n' else (1.0 if ppos == 'v' else 0.0))
            elif tw == 'v':
                bonus = 2.0 if ppos == 'n' else (1.0 if ppos == 'adv' else 0.0)
            elif tw == 'adj':
                if ppos == 'n':
                    bonus = 2.5
                elif ppos == 'adv':
                    if partner in GENERIC_DEGREE:
                        rej['弱程度副词'] += 1
                        return
                    bonus = 1.2 if partner in STRONG_DEGREE else 0.0
                elif ppos == 'v':
                    bonus = 0.8
            elif tw == 'adv':
                bonus = 1.0 if ppos in ('v', 'adj') else 0.0
            cands.append((raw_pmi + math.log(cnt, 2) * 0.5 + base_bonus + bonus, phrase))

        # 右邻：w + X
        for b, c in list(Rall.get(w, {}).items()):
            if not ok_partner(b) or same_lemma(w, b):
                rej['停用词/同族'] += 1
                continue
            if b in STOP and not (b in ALLOW_TAIL and w in is_verb):
                rej['停用词/同族'] += 1
                continue
            if c < PAIR_MIN or uni[b] < FREQ_MIN or (b not in vocab and not in_wn(b)):
                rej['频次/词表'] += 1
                continue
            if n_corpus(R, w, b) < DIVERSITY_MIN or not in_clean(R, w, b):
                rej['语料单一'] += 1
                continue
            if proper_junk(w, b, Rallc.get(w, {}).get(b, 0)):
                rej['专名'] += 1
                continue
            s = pmi(c, uni[w], uni[b])
            if s < PMI_MIN:
                rej['PMI低'] += 1
                continue
            push(w + ' ' + base_form(b), b, c, s, 2.0 if b in vocab else 0.0, 'R')

        # 左邻：X + w
        for a, c in list(Lall.get(w, {}).items()):
            if a in BAD or same_lemma(a, w):
                rej['停用词/同族'] += 1
                continue
            if a in STOP and a not in ALLOW_LEFT_OK:
                rej['停用词/同族'] += 1
                continue
            if len(a) < 3 and a not in ALLOW_LEFT_OK:
                rej['停用词/同族'] += 1
                continue
            if c < PAIR_MIN or uni[a] < FREQ_MIN or (a not in vocab and not in_wn(a)):
                rej['频次/词表'] += 1
                continue
            if n_corpus(L, w, a) < DIVERSITY_MIN or not in_clean(L, w, a):
                rej['语料单一'] += 1
                continue
            if proper_junk(w, a, Lallc.get(w, {}).get(a, 0)):
                rej['专名'] += 1
                continue
            s = pmi(c, uni[a], uni[w])
            if s < PMI_MIN:
                rej['PMI低'] += 1
                continue
            push(base_form(a) + ' ' + w, a, c, s, 2.0 if a in vocab else 0.0, 'L')

        # 三元组：动词 + 冠词 + 名词
        if w in is_verb:
            for ph, c in list(Aall.get(w, {}).items()):
                det, noun = ph.split(' ')
                if not ok_partner(noun) or c < PAIR_MIN:
                    continue
                if uni[noun] < FREQ_MIN or (noun not in vocab and not in_wn(noun)):
                    continue
                if n_corpus(A, w, ph) < DIVERSITY_MIN or not in_clean(A, w, ph):
                    rej['语料单一'] += 1
                    continue
                if proper_junk(w, noun, Aallc.get(w, {}).get(ph, 0)):
                    rej['专名'] += 1
                    continue
                s = pmi(c, uni[w], uni[noun]) - 3.0
                if s < PMI_MIN - 1.0:
                    rej['PMI低'] += 1
                    continue
                push(w + ' ' + det + ' ' + base_form(noun), noun, c, s,
                     2.0 if noun in vocab else 0.0, 'T')

        picked = []
        for _, ph in sorted(cands, key=lambda x: -x[0]):
            k = norm_key(ph)
            if k in forms:
                continue
            forms.add(k)
            picked.append(ph)
            if len(picked) >= TOPN:
                break
        if picked:
            out[w] = picked

    io.open(os.path.join(TMP, 'col_map.json'), 'w', encoding='utf-8').write(
        json.dumps(out, ensure_ascii=False, separators=(',', ':')))
    print('搭配覆盖 %d / %d 词 (%.1f%%) | 平均 %.1f 条'
          % (len(out), len(vocab), 100.0 * len(out) / max(1, len(vocab)),
             sum(len(v) for v in out.values()) / max(1, len(out))))
    print('过滤统计：', dict(rej))
    for w in ['depend', 'pay', 'take', 'make', 'important', 'heavy', 'rain', 'decision',
              'solve', 'achieve', 'progress', 'attention', 'open', 'note', 'write', 'study']:
        if w in out:
            print('  ', w, '->', ', '.join(out[w]))


if __name__ == '__main__':
    main()
