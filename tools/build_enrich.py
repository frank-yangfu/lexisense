# -*- coding: utf-8 -*-
"""把 en / col / rt / roots 四份中间产物组装成 data-enrich.js。

产物结构：
    window.ENRICH = { v, en: {词或词#下标: 英文释义}, col: {词: [搭配]},
                      rt: {词: {k,r,m}}, roots: [{root,mean,words:[{w,m}]}] }
"""
import io
import json
import os

TMP = os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Temp')
ROOT_DIR = r'D:\我的作品\英语单词速记'


def load(name, default):
    p = os.path.join(TMP, name)
    if not os.path.exists(p):
        print('  [缺] %s（按空处理）' % name)
        return default
    return json.load(io.open(p, encoding='utf-8'))


def main():
    en = load('en_defs.json', {})
    col = load('col_map.json', {})
    rt = load('rt_map.json', {})
    roots = load('roots_extra.json', [])

    body = []
    body.append('/* ============================================================')
    body.append('   辞源 · 质量富化层（由 tools/build_enrich.py 自动生成，勿手改）')
    body.append('   来源：WordNet 3.0 + OMW 中文词元对齐；四语料 PMI 搭配；')
    body.append('         词根词缀规则 + 词根聚类')
    body.append('   en 英文释义（多义词用 词#下标） / col 常用搭配 / rt 词根关联')
    body.append('   roots 新增词根网络分组')
    body.append('   ============================================================ */')
    body.append('window.ENRICH = {')
    body.append("  v: '1.0',")
    body.append('  en: ' + json.dumps(en, ensure_ascii=False, separators=(',', ':')) + ',')
    body.append('  col: ' + json.dumps(col, ensure_ascii=False, separators=(',', ':')) + ',')
    body.append('  rt: ' + json.dumps(rt, ensure_ascii=False, separators=(',', ':')) + ',')
    body.append('  roots: ' + json.dumps(roots, ensure_ascii=False, separators=(',', ':')))
    body.append('};')
    js = '\n'.join(body) + '\n'

    if '</script' in js:
        raise SystemExit('生成内容含 </script，需转义')

    out = os.path.join(ROOT_DIR, 'data-enrich.js')
    io.open(out, 'w', encoding='utf-8', newline='\n').write(js)
    print('data-enrich.js  %.0f KB | en %d / col %d / rt %d / roots %d 组'
          % (os.path.getsize(out) / 1024, len(en), len(col), len(rt), len(roots)))
    print('  示例 en :', list(en.items())[0])
    if col:
        print('  示例 col:', list(col.items())[0])
    if rt:
        print('  示例 rt :', list(rt.items())[0])


if __name__ == '__main__':
    main()
