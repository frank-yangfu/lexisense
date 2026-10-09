/* 构建单文件离线版：把 data-core.js / data-skill.js / app.js 内联进 index.html
   产出 lexisense-offline.html —— 一个文件即可用浏览器打开，可发到手机/平板离线使用 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
html = html.replace(/\r\n/g, '\n'); // 归一化行尾，兼容 CRLF 源文件

['data-core.js', 'data-skill.js', 'data-primary.js', 'data-junior.js', 'data-senior.js', 'data-gskill-a.js', 'data-gskill-b.js', 'data-enrich.js', 'data-curriculum.js', 'app.js'].forEach(f => {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  const tag = new RegExp('<script src="' + f.replace('.', '\\.') + '"></script>');
  if (!tag.test(html)) throw new Error('未找到 script 标签: ' + f);
  if (code.indexOf('</script') >= 0) throw new Error('脚本中包含 </script，需转义: ' + f);
  // 必须用函数形式 —— 字符串形式会把 $& 等特殊模式展开为匹配子串
  html = html.replace(tag, function () {
    return '<script>\n/* ==== ' + f + ' ==== */\n' + code + '\n</script>';
  });
});

// 单文件版不需要外链资源与 SW
html = html.replace(/\s*<link rel="manifest"[^>]*>/, '');
html = html.replace(/if \('serviceWorker' in navigator[\s\S]*?\n  \}\n/, '');

const out = path.join(dir, 'lexisense-offline.html');
fs.writeFileSync(out, html, 'utf8');
const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
console.log('已生成 ' + path.basename(out) + ' (' + kb + ' KB)');
