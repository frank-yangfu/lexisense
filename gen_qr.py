#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成「辞源」发布页二维码。
用法：编辑下面的 PAGE_URL 为你的真实发布页地址，然后运行本脚本：
    python gen_qr.py
输出：release/qrcode.png
"""
import qrcode

# ===== 改成你的真实发布页地址 =====
PAGE_URL = "https://your-username.github.io/lexisense/"
# 常见写法：
#   GitHub Pages : https://你的用户名.github.io/lexisense/
#   Gitee Pages  : https://你的用户名.gitee.io/lexisense/
#   GitHub Releases: https://github.com/你的用户名/lexisense/releases
#   Gitee 仓库页  : https://gitee.com/你的用户名/lexisense
# ==================================

OUT = "release/qrcode.png"

qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=12,
    border=4,
)
qr.add_data(PAGE_URL)
qr.make(fit=True)
img = qr.make_image(fill_color="#3b2f63", back_color="white")
img.save(OUT)
print("saved", OUT, "->", PAGE_URL)
