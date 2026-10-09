# 辞源 Android App · 安装说明（v1.4）

## 文件
- **`lexisense-1.4.apk`** · 3.30 MB（3,463,020 字节）· 已签名可安装
- 包名：`com.lexisense.app` · 版本：1.4（versionCode 5）
- SHA-256：`dfba9219b8fc4c4ccf658c1045e1901f85468595404940638ce8974b1c3d5667`
- 最低系统：Android 5.1 (API 22) · 目标系统：Android 14 (API 34)
- 应用名：**辞源**

## 本次更新（v1.4）—— 词根关联层大幅加固

本版**仍不新增词条**（词库保持 3228 词），专注把「词根关联」这一层的覆盖与准确度做厚：
**748 词 → 1004 词（覆盖率 23.2% → 31.1%）**，新增 256 条构词说明，**每一条都先人工复核再收录**。

### 1. 修掉一个系统性漏标：138 个派生词原本一条标注都没有

上一版的硬性规则是「词干必须是学习词库里的词」。可词库只有 3228 词，而 `beauty`、`usual`、
`sweat`、`occasional`、`additional` 这些基础词都没进词库 —— 结果它们的派生词全军覆没：

| 词 | v1.3 | v1.4 |
|---|---|---|
| `beautiful` | 无标注 | `beauty + -ful（充满…的）` |
| `usually` | 无标注 | `usual + -ly（…地）` |
| `sweater` | 无标注 | `sweat + -er（…的人/物）` |
| `critical` | 无标注 | `critic + -al（…的）` |
| `employee` / `employer` | 无标注 | `employ + -ee / -er` |

本版改用**「词干须经 WordNet 派生关系验证」**：既放开了词库之外的真词词干，又因为
WordNet 的派生关系是词典标注过的**已验证形态家族**，能自动挡掉只靠字符串相似的伪拆分：

| 若只看字面会误判 | 实际 |
|---|---|
| `brother = broth + -er` | 古英语 brōþor，与「汤」无关 |
| `hamburger = hamburg + -er` | 源自德语 Hamburg（汉堡市） |
| `sentence = sent + -ence` | 拉丁 sententia（sentire「感觉」） |

### 2. 同化前缀补齐：ac- / af- / ap- / as- / at- …

ad- 在辅音前会同化，这是英语构词里出现频率最高的一组前缀。上一版只认 `ad-` 本形，
于是 `accompany`、`approve`、`ascertain`、`adverb`、`parameter`、`hypothesis`、`synthesis`
这些词一个都拿不到前缀提示。本版补入 7 个同化形式 + `ab- / para- / circum- / hypo- / meta- / syn-` 等，
新增 15 词。

> 已实测并主动排除 `al-`：`already` / `although` 里的 `al-` 其实是 `all-` 的弱化，不是 ad-。

### 3. -ly 副词支线打通：34 个超高频副词

`actually`、`finally`、`usually`、`completely`、`normally`、`merely`、`recently`…
这些词上一版全都没有标注 —— 因为它们的形容词词基不在词库里，而 WordNet **没有**记录
-ly 副词的派生关系 （实测 deriv 为空），两条路都走不通。本版新增第三条判定：
**基础词只要求是 WordNet 形容词**（-ly 是英语里最刚性的一条构词规则，误判风险极低）。

### 4. 复合词：人工白名单，而不是放宽度量标准

`backpack`、`classmate`、`firefighter`、`fingerprint`、`newspaper` 这类词，两半都是地道的
英语自由词，但其中一半（`pack` / `mate` / `fighter`）没进学习词库，所以「两半都必须在词库里」
的规则命不中。

**曾试过把判据放宽成 WordNet 全量词表，实测精确度跌到七成**，产出下面这类荒唐拆解，因此否决：

| 放宽后的错误产出 | 实际 |
|---|---|
| `literacy = lite + racy` | `liter（字母）+ -acy` |
| `carpenter = carp + enter` | 古法语 charpentier |
| `charitable = chari + table` | `charity（拉丁 caritas）+ -able` |
| `deliberate = deli + berate` | `de- + libr（libra「天平」，权衡）+ -ate` |
| `generate = gene + rate` | `gener（genus「种」）+ -ate` |
| `corporation = corp + oration` | `corpor（corpus「身体」）+ -ation` |

最终改为**逐条人工核对后才收录的白名单**（72 个复合词）。

### 5. 新增 6 个词根

`toler`（忍受）· `liter`（字母）· `moder`（尺度）· `stabil`（站稳）· `dem`（人民）· `centr`（中心）
→ 修正 `tolerant`、`literacy`、`literal`、`moderate`、`stability`、`concentrate`、`epidemic`、`endemic`

### 6. 纠错 15 条原有标注

| 词 | v1.3 | v1.4 |
|---|---|---|
| `syntactic` | `syn- + tact（接触）` ✗ | `派生自 syntax`（希腊 syntaxis ← tassein「排列」，与拉丁 tangere 无关） |
| `courageous` | `courage + -eous` | `courage + -ous` |
| `concentration` | `concentrate + -ion` | `con- + centr（中心）+ -ation` |
| `stability` | `派生自 stable` | `stabil（站稳）+ -ity` |
| `destabilise` | `de- + stabilise` | `de- + stabil（站稳）+ -ise` |
| `personify` | `派生自 persona` | `person + -ify` |
| `trainee` | `派生自 train` | `train + -ee` |

### 7. 拼读自校正

后缀写法一律取「能把整词原样拼回来」的那个，避免构词说明本身拼不通：

| 词 | 上一版写法 | 本版写法 |
|---|---|---|
| `honesty` | `honest + -ty`（读起来像 honestty） | `honest + -y` |
| `assertion` | `assert + -tion`（读起来像 asserttion） | `assert + -ion` |
| `browser` | `browse + -r` | `browse + -er` |

### 8. 词根网络：22 组 → 30 组（175 词）

新增 `cept`（accept / except / concept）、`sist`（consistent / assist / insist）、
`lect`（lecture / dialect / dialectic）、`soci`（sociable / social / association）、
`test`（testify / protest / contestable）、`log`（logical / logic / neologism）等系列。

### 未改动的部分
- 词库仍为 **3228 词**：小学 519 · 初中 1463 · 高中 1207
- 英文释义 **100%**（3335 个义项全覆盖）
- 常用搭配 **894 词**（5 语料约 609 万词次统计，v1.3 已做过质量大修）
- 分层标注：精讲层 140 词 / 考纲覆盖层 3088 词
- 连续学习天数按自然日幂等累计（v1.1 起的修复，保持有效）

## 安装到安卓手机

1. 把 APK 文件传到手机（方式任选）：
   - **微信/QQ/钉钉**：发给自己/文件传输助手 → 长按「另存为」/「下载」到本地
   - **网盘**：百度网盘/阿里云盘上传 → 手机下载
   - **USB 数据线**：电脑连手机 → 把 APK 拷到手机 `Download/` 文件夹
2. 手机里找到该 APK 文件（一般在「下载」或「文件管理」里），点开
3. 系统提示「是否允许此来源安装应用」→ 选「允许」（首次会跳到设置页）
4. 返回再次点 APK → 点「安装」→ 覆盖升级，桌面「辞源」图标不变，学习进度保留

> 已装 1.0 / 1.1 / 1.2 / 1.3 的用户直接覆盖安装即可，进度（学生档案、记忆盒、错题）都存在本机，不会被清空。

## 鸿蒙兼容性
- ✅ **HarmonyOS 4.x 及更早**（基于安卓内核）：与安卓完全一致，可直接装
- ⚠️ **纯血鸿蒙 NEXT（5.0+）**：暂不支持 APK，需要原生鸿蒙应用；只能等待产品上架华为应用市场

## 使用注意
- 首次打开进入登录页 → 输入学生名字（如 `小明` / `Mike`）→ 进入学习
- 学习进度（记忆盒、错题、年级）存在**手机本机**的浏览器沙箱（WebView）
- 换手机/清数据 → 进度会丢。导出方式：学习报告页右上角 → 「导出数据」（生成 JSON 文件）
- 一台手机可以建多个学生账号，顶栏点「● 学生名」随时切换/新建/删除
- **连续学习天数**按自然日计算：当天学过即计 1 天，隔天继续学则累加；漏学一整天则从当天重新计 1
- 词卡答题后会依次展示：完整语境 → **英文释义** → **常用搭配** → **词根关联 / 构词拆解**
- 「词根词缀意义网络」页共 30 个词根族，可点词根切换查看，记一个、认一串

## 常见问题
| 现象 | 处理 |
|---|---|
| 点 APK 没反应 | 检查文件是否完整（3 MB 以上），重新下载 |
| 提示「应用未安装」 | 可能是签名冲突/系统版本过低（需要 5.1+）/空间不足 |
| 鸿蒙 NEXT 装不上 | 等上架华为应用市场，或换 HarmonyOS 4.x 设备 |
| 安装后黑屏/白屏 | 首次需要联网（下载 WebView 组件）；断网后会缓存可用 |
| 连续天数仍显示 1 | 确认装的是 1.4（设置 → 应用 → 辞源 → 版本 1.4）；漏学一天会重置为 1，属正常 |
| 某些词没有「常用搭配」 | 属正常：搭配来自真实语料统计，并要求跨语料共现，抽象学术词在语料中缺少稳定搭配，覆盖率约 28% |
| 某些词没有「词根关联」 | 属正常：只有能可靠拆解或确证派生关系的词才标注（1004/3228 ≈ 31%），其余多为本身不可再拆的基础词（如 work / good / take） |

## 离线版（不装 App 也能用）
双击 `lexisense-offline.html`（1.14 MB）即可用浏览器打开，功能与 App 一致，无需联网、无需安装。
