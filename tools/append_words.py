# -*- coding: utf-8 -*-
"""辞源 · 词库扩充工具

把 TSV 词包追加进 RAW.gN（幂等 / 自动去重 / 格式校验 / 保持原行尾）。

TSV 每行 6 列（用制表符或 | 分隔）：
    word | phonetic | tag | gloss | example | zh
同一 word 写多行 = 该词的多个义项（音标与主题必须一致）。

用法：
    python tools/append_words.py --pack tools/pack/g10-1.tsv --grade g10 --note "高一补充 1"
    ... 加 --apply 才真正落盘；不加只做干跑校验
    python tools/append_words.py --dump-existing tools/pack/_existing.txt
"""
import argparse
import io
import json
import os
import re
import sys

ROOT = r'D:\我的作品\英语单词速记'
GRADE_FILE = {
    'g3': 'data-primary.js', 'g4': 'data-primary.js', 'g5': 'data-primary.js', 'g6': 'data-primary.js',
    'g7': 'data-junior.js', 'g8': 'data-junior.js', 'g9': 'data-junior.js',
    'g10': 'data-senior.js', 'g11': 'data-senior.js', 'g12': 'data-senior.js',
}
POS_PREFIX = ('n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.', 'pron.', 'num.', 'art.', 'aux.', 'int.',
              'vt.', 'vi.', 'link-v.')


def read_text(path):
    """按原始行尾读入（不转换），返回 (text, eol)"""
    raw = io.open(path, 'rb').read().decode('utf-8')
    eol = '\r\n' if '\r\n' in raw else '\n'
    return raw, eol


def collect_existing():
    """全库已收录词（含 39 词精讲 + 各年级 RAW.gN）"""
    words = set()
    core = io.open(os.path.join(ROOT, 'data-core.js'), encoding='utf-8').read()
    for m in re.finditer(r"\bw:\s*'([^']+)'", core):
        words.add(m.group(1).lower())
    for fn in ('data-primary.js', 'data-junior.js', 'data-senior.js'):
        s = io.open(os.path.join(ROOT, fn), encoding='utf-8').read()
        for m in re.finditer(r"^\s*\['([^'\\]+)'", s, re.M):
            words.add(m.group(1).lower())
    return words


def js_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


IRREG_FORMS = {
    'be': ('am', 'is', 'are', 'was', 'were', 'been', 'being'),
    'have': ('has', 'had', 'having'), 'do': ('does', 'did', 'done', 'doing'),
    'go': ('goes', 'went', 'gone', 'going'), 'say': ('says', 'said', 'saying'),
    'get': ('gets', 'got', 'gotten', 'getting'), 'make': ('makes', 'made', 'making'),
    'know': ('knows', 'knew', 'known', 'knowing'), 'think': ('thinks', 'thought', 'thinking'),
    'take': ('takes', 'took', 'taken', 'taking'), 'see': ('sees', 'saw', 'seen', 'seeing'),
    'come': ('comes', 'came', 'coming'), 'give': ('gives', 'gave', 'given', 'giving'),
    'find': ('finds', 'found', 'finding'), 'tell': ('tells', 'told', 'telling'),
    'become': ('becomes', 'became', 'becoming'), 'leave': ('leaves', 'left', 'leaving'),
    'feel': ('feels', 'felt', 'feeling'), 'bring': ('brings', 'brought', 'bringing'),
    'begin': ('begins', 'began', 'begun', 'beginning'), 'keep': ('keeps', 'kept', 'keeping'),
    'hold': ('holds', 'held', 'holding'), 'write': ('writes', 'wrote', 'written', 'writing'),
    'stand': ('stands', 'stood', 'standing'), 'hear': ('hears', 'heard', 'hearing'),
    'mean': ('means', 'meant', 'meaning'), 'meet': ('meets', 'met', 'meeting'),
    'run': ('runs', 'ran', 'running'), 'pay': ('pays', 'paid', 'paying'),
    'sit': ('sits', 'sat', 'sitting'), 'speak': ('speaks', 'spoke', 'spoken', 'speaking'),
    'read': ('reads', 'reading'), 'grow': ('grows', 'grew', 'grown', 'growing'),
    'lose': ('loses', 'lost', 'losing'), 'fall': ('falls', 'fell', 'fallen', 'falling'),
    'send': ('sends', 'sent', 'sending'), 'build': ('builds', 'built', 'building'),
    'understand': ('understands', 'understood', 'understanding'),
    'draw': ('draws', 'drew', 'drawn', 'drawing'), 'break': ('breaks', 'broke', 'broken', 'breaking'),
    'spend': ('spends', 'spent', 'spending'), 'rise': ('rises', 'rose', 'risen', 'rising'),
    'drive': ('drives', 'drove', 'driven', 'driving'), 'buy': ('buys', 'bought', 'buying'),
    'wear': ('wears', 'wore', 'worn', 'wearing'), 'choose': ('chooses', 'chose', 'chosen', 'choosing'),
    'seek': ('seeks', 'sought', 'seeking'), 'throw': ('throws', 'threw', 'thrown', 'throwing'),
    'catch': ('catches', 'caught', 'catching'), 'deal': ('deals', 'dealt', 'dealing'),
    'win': ('wins', 'won', 'winning'), 'forget': ('forgets', 'forgot', 'forgotten', 'forgetting'),
    'teach': ('teaches', 'taught', 'teaching'), 'bite': ('bites', 'bit', 'bitten', 'biting'),
    'hide': ('hides', 'hid', 'hidden', 'hiding'), 'fight': ('fights', 'fought', 'fighting'),
    'bend': ('bends', 'bent', 'bending'), 'blow': ('blows', 'blew', 'blown', 'blowing'),
    'dig': ('digs', 'dug', 'digging'), 'feed': ('feeds', 'fed', 'feeding'),
    'fly': ('flies', 'flew', 'flown', 'flying'), 'freeze': ('freezes', 'froze', 'frozen', 'freezing'),
    'hang': ('hangs', 'hung', 'hanging'), 'kneel': ('kneels', 'knelt', 'kneeled', 'kneeling'),
    'lend': ('lends', 'lent', 'lending'), 'light': ('lights', 'lit', 'lighted', 'lighting'),
    'ride': ('rides', 'rode', 'ridden', 'riding'), 'ring': ('rings', 'rang', 'rung', 'ringing'),
    'shake': ('shakes', 'shook', 'shaken', 'shaking'), 'shine': ('shines', 'shone', 'shining'),
    'shoot': ('shoots', 'shot', 'shooting'), 'sing': ('sings', 'sang', 'sung', 'singing'),
    'sink': ('sinks', 'sank', 'sunk', 'sinking'), 'sleep': ('sleeps', 'slept', 'sleeping'),
    'slide': ('slides', 'slid', 'sliding'), 'steal': ('steals', 'stole', 'stolen', 'stealing'),
    'stick': ('sticks', 'stuck', 'sticking'), 'strike': ('strikes', 'struck', 'striking'),
    'sweep': ('sweeps', 'swept', 'sweeping'), 'swim': ('swims', 'swam', 'swum', 'swimming'),
    'swing': ('swings', 'swung', 'swinging'), 'tear': ('tears', 'tore', 'torn', 'tearing'),
    'wake': ('wakes', 'woke', 'woken', 'waking'), 'weep': ('weeps', 'wept', 'weeping'),
    'withdraw': ('withdraws', 'withdrew', 'withdrawn', 'withdrawing'),
    'withstand': ('withstands', 'withstood', 'withstanding'),
    'overcome': ('overcame', 'overcoming'), 'undergo': ('underwent', 'undergone', 'undergoing'),
    'undertake': ('undertook', 'undertaken', 'undertaking'), 'upset': ('upsets', 'upsetting'),
    'mislead': ('misled', 'misleading'), 'rebuild': ('rebuilt', 'rebuilding'),
    'child': ('children',), 'man': ('men',), 'woman': ('women',), 'foot': ('feet',),
    'tooth': ('teeth',), 'mouse': ('mice',), 'goose': ('geese',), 'person': ('people',),
    'leaf': ('leaves',), 'knife': ('knives',), 'life': ('lives',), 'wife': ('wives',),
    'shelf': ('shelves',), 'wolf': ('wolves',), 'thief': ('thieves',), 'half': ('halves',),
    'potato': ('potatoes',), 'tomato': ('tomatoes',), 'hero': ('heroes',), 'fish': ('fish',),
    'sheep': ('sheep',), 'deer': ('deer',), 'datum': ('data',), 'medium': ('media',),
    'criterion': ('criteria',), 'phenomenon': ('phenomena',), 'analysis': ('analyses',),
    'basis': ('bases',), 'crisis': ('crises',), 'freshman': ('freshmen',),
    'good': ('better', 'best'), 'bad': ('worse', 'worst'), 'many': ('more', 'most'),
    'much': ('more', 'most'), 'little': ('less', 'least'),
    'far': ('further', 'furthest', 'farther', 'farthest'),
}
_FORM_CACHE = {}


def word_forms(w):
    if w in _FORM_CACHE:
        return _FORM_CACHE[w]
    f = {w}
    f.update(IRREG_FORMS.get(w, ()))
    f.update([w + 's', w + 'es', w + 'ed', w + 'd', w + 'ing', w + 'ly', w + 'er', w + 'est'])
    if w.endswith('e'):
        f.update([w[:-1] + 'ing', w[:-1] + 'ed'])
    if w.endswith('y'):
        f.update([w[:-1] + 'ies', w[:-1] + 'ied', w[:-1] + 'ier', w[:-1] + 'iest', w[:-1] + 'ily'])
    if len(w) >= 3 and w[-1] not in 'aeiouwxy' and w[-2] in 'aeiou' and w[-3] not in 'aeiou':
        f.update([w + w[-1] + 'ed', w + w[-1] + 'ing'])
    rx = re.compile(r'\b(?:' + '|'.join(sorted(map(re.escape, f), key=len, reverse=True)) + r')\b', re.I)
    _FORM_CACHE[w] = rx
    return rx


def example_has_word(word, ex):
    return word_forms(word).search(ex) is not None


def parse_pack(path):
    """解析 TSV -> {word: {'ph','tag','senses':[(g,ex,zh)]}}，同时收集问题"""
    bad = []
    groups = {}
    order = []
    with io.open(path, encoding='utf-8-sig') as fh:
        for ln, line in enumerate(fh, 1):
            line = line.rstrip('\r\n')
            if not line.strip() or line.lstrip().startswith('#'):
                continue
            sep = '\t' if '\t' in line else '|'
            cols = [c.strip() for c in line.split(sep)]
            if len(cols) < 6:
                bad.append('L%d 列数不足(%d): %s' % (ln, len(cols), line[:60]))
                continue
            w, ph, tag, gloss, ex, zh = cols[:6]
            w = w.lower()
            if not re.match(r'^[a-z]+$', w):
                bad.append('L%d 词形非法(须为单个小写英文词): %s' % (ln, w))
                continue
            for name, val in (('音标', ph), ('主题', tag), ('释义', gloss), ('例句', ex), ('译文', zh)):
                if not val:
                    bad.append('L%d %s 为空: %s' % (ln, name, w))
            if ph and not ph.startswith('/'):
                bad.append('L%d 音标未用 / 包裹: %s -> %s' % (ln, w, ph))
            if not example_has_word(w, ex):
                bad.append('L%d 例句未含该词: %s -> %s' % (ln, w, ex))
            if gloss and not gloss.startswith(POS_PREFIX):
                bad.append('L%d 释义未以词性开头(警告): %s -> %s' % (ln, w, gloss))
            if w not in groups:
                groups[w] = {'ph': ph, 'tag': tag, 'senses': []}
                order.append(w)
            else:
                if groups[w]['ph'] != ph or groups[w]['tag'] != tag:
                    bad.append('L%d 同词音标/主题不一致: %s' % (ln, w))
            groups[w]['senses'].append((gloss, ex, zh))
    return groups, order, bad


def build_block(grade, payload, eol):
    lines = ['', '/* ===== 词库扩充：%s ===== */' % payload['note'],
             'RAW.%s = (RAW.%s || []).concat([' % (grade, grade)]
    for w in payload['order']:
        it = payload['groups'][w]
        senses = ', '.join('[' + ', '.join(js_str(x) for x in s) + ']' for s in it['senses'])
        lines.append('  [' + js_str(w) + ', ' + js_str(it['ph']) + ', ' + js_str(it['tag']) + ', [' + senses + ']],')
    lines[-1] = lines[-1].rstrip(',')
    lines.append(']);')
    return eol.join(lines) + eol


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pack')
    ap.add_argument('--grade')
    ap.add_argument('--note', default='')
    ap.add_argument('--apply', action='store_true')
    ap.add_argument('--dump-existing')
    args = ap.parse_args()

    if args.dump_existing:
        ex = sorted(collect_existing())
        io.open(args.dump_existing, 'w', encoding='utf-8', newline='\n').write('\n'.join(ex) + '\n')
        print('已导出全库词表 %d 词 -> %s' % (len(ex), args.dump_existing))
        return

    if not args.pack or not args.grade:
        ap.error('需要 --pack 与 --grade')
    if args.grade not in GRADE_FILE:
        ap.error('未知年级 %s' % args.grade)

    groups, order, bad = parse_pack(args.pack)
    hard = [b for b in bad if '警告' not in b]
    warn = [b for b in bad if '警告' in b]

    existing = collect_existing()
    new_words = [w for w in order if w not in existing]
    dup = [w for w in order if w in existing]

    n_senses = sum(len(groups[w]['senses']) for w in new_words)
    print('词包 %s' % args.pack)
    print('  行内唯一词 %d | 可写入 %d | 已存在跳过 %d | 义项 %d'
          % (len(order), len(new_words), len(dup), n_senses))
    if dup:
        print('  跳过: ' + ' '.join(dup[:40]) + (' ...' if len(dup) > 40 else ''))
    for b in hard[:40]:
        print('  [ERR ] ' + b)
    for b in warn[:10]:
        print('  [warn] ' + b)
    if hard:
        print('  => 存在硬错误 %d 条，已中止（不落盘）' % len(hard))
        sys.exit(1)
    if not new_words:
        print('  => 无新增词，跳过写入')
        return
    if not args.apply:
        print('  => 干跑通过（加 --apply 落盘）')
        return

    target = os.path.join(ROOT, GRADE_FILE[args.grade])
    text, eol = read_text(target)
    if args.note and ('词库扩充：%s' % args.note) in text:
        print('  => 该批次已写入过（note 重复），跳过')
        return

    payload = {'note': args.note or args.grade, 'order': new_words,
               'groups': {w: groups[w] for w in new_words}}
    text = text.rstrip('\r\n') + eol + build_block(args.grade, payload, eol)
    io.open(target, 'wb').write(text.encode('utf-8'))
    print('  => 已写入 %s：+%d 词' % (GRADE_FILE[args.grade], len(new_words)))


if __name__ == '__main__':
    main()
