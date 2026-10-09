# -*- coding: utf-8 -*-
"""为每个义项生成英文释义。

来源优先级：
  1) curated_en.CURATED —— 虚词 / WordNet 未收录词的人工释义
  2) WordNet 3.0 + OMW 中文词元对齐 —— 用义项里的中文词去命中同义词语义集

产出：
  %TEMP%/en_defs.json   {key: definition}
  %TEMP%/miss.json      未能解析的义项（需补 CURATED）
"""
import io
import json
import os
import re
import sys

from nltk.corpus import wordnet as wn

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from curated_en import CURATED  # noqa: E402

TMP = os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Temp')

POS_RE = re.compile(r'^(n|v|adj|adv|prep|conj|pron|num|art|aux|int|vt|vi)\.')
POS_WN = {'n': 'n', 'v': 'v', 'adj': 'a', 'adv': 'r', 'vt': 'v', 'vi': 'v'}
FUNCTION_POS = ('prep', 'conj', 'pron', 'num', 'art', 'aux', 'int')
SPLIT_RE = re.compile(r'[、，,;；/／]+')


def pos_of(g):
    m = POS_RE.match(str(g).strip())
    return m.group(1) if m else None


def toks_of(g):
    """中文释义 -> 关键词（去掉词性前缀与括号注释，按顿号/逗号切）"""
    s = POS_RE.sub('', str(g).strip())
    s = re.sub(r'[（(][^）)]*[）)]', '', s)
    out = []
    for p in SPLIT_RE.split(s):
        p = p.strip()
        if not p:
            continue
        out.append(p)
    return out


def lemma_score(syn, toks):
    """义项中文词与同义集中文词元的匹配强度（越靠前的关键词权重越高）"""
    try:
        lemmas = syn.lemma_names('cmn')
    except Exception:
        return 0
    if not lemmas:
        return 0
    best = 0
    for idx, t in enumerate(toks):
        for l in lemmas:
            if t == l:
                s = 30 - idx
            elif len(t) >= 2 and t in l:
                s = 20 - idx
            elif len(t) >= 2 and l in t:
                s = 15 - idx
            elif len(t) == 1 and len(l) == 1 and t == l:
                s = 10 - idx
            else:
                s = 0
            if s > best:
                best = s
    return best


def tidy(defn):
    """精简释义：截到第一个分号，去掉句末句点"""
    d = str(defn).strip()
    if ';' in d and len(d.split(';')[0].strip()) >= 12:
        d = d.split(';')[0].strip()
    d = d.rstrip('.')
    return d


def gloss_for(word, pos, toks, avoid=None):
    """返回 (synset_name, definition) 或 None"""
    avoid = avoid or set()
    wnpos = POS_WN.get(pos or '')
    cands = []
    if wnpos:
        cands = wn.synsets(word, pos=wnpos)
    if not cands:
        cands = wn.synsets(word)
    if not cands:
        return None

    scored = []
    for i, s in enumerate(cands):
        scored.append((lemma_score(s, toks), i, s))

    # 优先：中文对齐命中，且未被同词其他义项占用
    hit = sorted(scored, key=lambda x: (-x[0], x[1]))
    if hit and hit[0][0] > 0:
        for sc, i, s in hit:
            if sc <= 0:
                break
            if s.name() in avoid:
                continue
            return s.name(), tidy(s.definition())
        return hit[0][2].name(), tidy(hit[0][2].definition())

    # 退化：按 WordNet 频率序取第一个（词性匹配优先）
    if wnpos:
        same = [(i, s) for i, s in enumerate(cands) if s.pos() == wnpos]
        if same:
            for i, s in same:
                if s.name() not in avoid:
                    return s.name(), tidy(s.definition())
            return same[0][1].name(), tidy(same[0][1].definition())
    for i, s in enumerate(cands):
        if s.name() not in avoid:
            return s.name(), tidy(s.definition())
    return cands[0].name(), tidy(cands[0].definition())


def main():
    inv = json.load(io.open(os.path.join(TMP, 'inventory.json'), encoding='utf-8'))
    en, miss = {}, []
    n_curated = n_wn = 0

    for it in inv:
        w = it['w']
        senses = it['senses']
        single = len(senses) == 1
        avoid = set()
        for s in senses:
            if s.get('en'):
                continue
            # 键的约定：单词只有 1 个义项时用 'word'；多义时一律用 'word#<下标>'
            key = w if single else (w + '#%d' % s['i'])
            pos = pos_of(s['g'])
            # 裸键（不带 #i）只在「单义项」或「当前义项是虚词性」时生效，
            # 避免多义词的实义义项被虚词释义误命中
            g = CURATED.get(key)
            if not g and (single or pos in FUNCTION_POS):
                g = CURATED.get(w)
            if g:
                en[key] = g
                n_curated += 1
                continue
            toks = toks_of(s['g'])
            r = gloss_for(w, pos, toks, avoid)
            if r:
                en[key] = r[1]
                avoid.add(r[0])
                n_wn += 1
            else:
                miss.append({'w': w, 'i': s['i'], 'g': s['g'], 'key': key})

    io.open(os.path.join(TMP, 'en_defs.json'), 'w', encoding='utf-8').write(
        json.dumps(en, ensure_ascii=False))
    io.open(os.path.join(TMP, 'miss.json'), 'w', encoding='utf-8').write(
        json.dumps(miss, ensure_ascii=False, indent=1))

    total = n_curated + n_wn + len(miss)
    print('义项总数 %d | 生成 %d（人工 %d / WordNet %d）| 未解析 %d | 覆盖率 %.1f%%'
          % (total, n_curated + n_wn, n_curated, n_wn, len(miss),
             100.0 * (n_curated + n_wn) / max(1, total)))
    for m in miss[:40]:
        print('  miss:', m['key'], '|', m['g'])


if __name__ == '__main__':
    main()
