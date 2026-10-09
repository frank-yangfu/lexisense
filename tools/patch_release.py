# -*- coding: utf-8 -*-
"""更新 release/index.html 的版本信息（幂等，可重复执行）。

用法：
    python tools/patch_release.py --ver 1.2 --apk-mb 3.3 --off-mb 1.1 \
        --words 3296 --primary 519 --junior 1252 --senior 1438 --adv 39
"""
import argparse
import io
import os
import re

ROOT = r'D:\我的作品\英语单词速记'
PAGE = os.path.join(ROOT, 'release', 'index.html')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ver', required=True)
    ap.add_argument('--old-ver', default='1.1')
    ap.add_argument('--apk-mb', required=True)
    ap.add_argument('--off-mb', required=True)
    ap.add_argument('--words', required=True)
    ap.add_argument('--primary', required=True)
    ap.add_argument('--junior', required=True)
    ap.add_argument('--senior', required=True)
    ap.add_argument('--adv', default='39')
    a = ap.parse_args()

    raw = io.open(PAGE, 'rb').read().decode('utf-8')
    text = raw.replace('\r\n', '\n')
    log = []

    def sub(old, new, cnt=None):
        nonlocal text
        n = text.count(old)
        if n == 0:
            log.append('  [未命中] ' + old[:56])
            return
        if cnt is not None and n != cnt:
            log.append('  [数量异常 %d≠%d] %s' % (n, cnt, old[:40]))
        text = text.replace(old, new)
        log.append('  [OK x%d] %s' % (n, old[:46].replace('\n', ' ')))

    oldv, newv = a.old_ver, a.ver
    total = int(a.words)
    seg = [int(a.primary), int(a.junior), int(a.senior)]
    segmax = max(seg) or 1

    # 1) 下载链接与文件名
    sub('lexisense-%s.apk' % oldv, 'lexisense-%s.apk' % newv)
    # 2) 体积
    sub('3.1 MB', '%s MB' % a.apk_mb)
    sub('0.5 MB', '%s MB' % a.off_mb)
    # 3) 词量文案
    sub('小初高 1097 词', '小初高 %d 词' % total)
    sub('10 个年级、约 1097 个精讲词与技能点，循序渐进，每日任务按掌握度自适应推进。',
        '10 个年级、%d 个词条（含 %s 高阶精讲），全部义项配英文释义、常用搭配与词根关联，每日任务按掌握度自适应推进。'
        % (total, a.adv))
    sub('<div class="stat"><b>1097</b><span>精讲词 / 技能</span></div>',
        '<div class="stat"><b>%d</b><span>词条 / 技能</span></div>' % total)
    # 4) 学段柱状
    sub('<div class="bar-row"><span>小学 3–6</span><div class="track"><div class="fill" style="width:55%"></div></div><b>~360</b></div>',
        '<div class="bar-row"><span>小学 3–6</span><div class="track"><div class="fill" style="width:%d%%"></div></div><b>%d</b></div>'
        % (round(100.0 * seg[0] / segmax), seg[0]))
    sub('<div class="bar-row"><span>初中 7–9</span><div class="track"><div class="fill" style="width:78%"></div></div><b>~410</b></div>',
        '<div class="bar-row"><span>初中 7–9</span><div class="track"><div class="fill" style="width:%d%%"></div></div><b>%d</b></div>'
        % (round(100.0 * seg[1] / segmax), seg[1]))
    sub('<div class="bar-row"><span>高中 10–12</span><div class="track"><div class="fill" style="width:100%"></div></div><b>~327</b></div>',
        '<div class="bar-row"><span>高中 10–12</span><div class="track"><div class="fill" style="width:%d%%"></div></div><b>%d</b></div>'
        % (round(100.0 * seg[2] / segmax), seg[2]))

    # 5) 更新日志整块重写
    ul = ''.join(['          <li>%s</li>\n' % x for x in [
        '词库补齐至课标 3100+：总计 %d 词（小学 %d · 初中 %d · 高中 %d + %s 高阶精讲）'
        % (total, seg[0], seg[1], seg[2], a.adv),
        '全部义项补齐英文释义（WordNet 3.0 + OMW 中文词元对齐，覆盖 100%）',
        '新增「常用搭配」：四语料 PMI 提取，答题解析直接给出可复用搭配',
        '新增「词根关联 / 构词拆解」，词根网络扩充至更多分组',
        '新增分层标注：精讲层 / 考纲覆盖层，词卡显示徽标，报告页显示构成',
        '词库校验升级为全量校验（例句含词 / 字段完整 / 音标格式），并修复挑战题重复',
        '保留 v1.1 的「连续学习天数」修复：按自然日幂等推进 + 前台恢复自动校准',
    ]])
    m = re.search(r'<h3><span class="n">v</span>更新日志 v[\d.]+</h3>\n\s*<ul>\n[\s\S]*?</ul>', text)
    if m:
        text = text[:m.start()] + ('<h3><span class="n">v</span>更新日志 v%s</h3>\n        <ul>\n' % newv) + ul.rstrip('\n') + text[m.end() - 5:]
        log.append('  [OK] 更新日志重写')
    else:
        log.append('  [未命中] 更新日志块')

    # 6) 页脚版本戳
    if '构建于' not in text:
        sub('辞源 Lexisense · 一切皆为意义 · 精确表意<br>',
            '辞源 Lexisense · 一切皆为意义 · 精确表意<br>\n'
            '    <span style="opacity:.72">版本 v%s · 课程 %d 词 / 10 年级</span><br>\n' % (newv, total))

    io.open(PAGE, 'wb').write(text.encode('utf-8'))
    print('release/index.html 已更新到 v%s' % newv)
    print('\n'.join(log))
    left = text.count('1097')
    print('残留 "1097": %d 处；残留旧版本号 "%s": %d 处' % (left, 'lexisense-%s.apk' % oldv, text.count('lexisense-%s.apk' % oldv)))


if __name__ == '__main__':
    main()
