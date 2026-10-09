# 辞源 Lexisense · 一切皆为意义

> 以「一切皆为意义」为第一性原理的**英语精确表意训练**应用。
> 每个词在上下文中应当只有唯一且恰当的意义；每个语法结构都贡献清晰可辨的意义。

纯前端 · 无后端 · 无 CDN · 无外链 —— 双击 `index.html` 即可离线使用。

- 🌐 **在线使用**：https://frank-yangfu.github.io/lexisense/
- 📦 **下载（最新版）**：[Releases · v1.4](https://github.com/frank-yangfu/lexisense/releases/latest)
  - 📱 `lexisense-1.4.apk` — 安卓安装包（3.3 MB · 已签名 · Android 5.1+）
  - 📄 `lexisense-offline.html` — 单文件离线版（1.2 MB，一个文件发给手机就能用）

---

## 一、它解决什么问题

传统背单词只记「中文对应词」，导致会认不会用、用错语境。辞源的做法是：**先建立「看语境、再定词义」的习惯，再用最小对比对划清边界，最后在真实语料与写作中检验输出是否无歧义。**

三个层次：

| 层次 | 主张 | 例子 |
|---|---|---|
| 词汇层 | 每个词在上下文中应有唯一且恰当的含义 | `I run a company` 中 run 是「经营」，不是「跑」 |
| 句法层 | 结构本身即意义 | `He is being polite`（临时表现）≠ `He is polite`（一贯特性） |
| 语用层 | 整句表意指向必须清晰 | 歧义结构必须通过语境或改写消除 |

---

## 二、核心特性

八个学习视图构成「感知 → 理解 → 练习 → 输出 → 反馈」闭环：

| 视图 | 内容 |
|---|---|
| **今日学习** | 学段 → 年级 → 阶段（每 7 天推进一阶）的自动路径；新学 3 词 + 记忆盒到期复习；能力雷达 + 14 天轨迹 |
| **词汇意义解码** | 语境词卡（挖空选义）· 近义词辨析（最小对比对）· 一词多义（意义分支判定）· 词根词缀网络（记一个认一串） |
| **语法意义地图** | 52 个语法意义点，每个都给出「含义贡献度」与最小对比对 |
| **句子意义分析** | 成分意义标注（施事/受语/时间/逻辑…）· 歧义检测与改写 · 长难句三层穿透 |
| **真实语料挑战** | 真实语料中「为何这样用」的意义判断 |
| **输出检验批改** | 18 条批改规则，从词汇精确/意义密度/句式结构/逻辑连贯/表意清晰五维打分并逐句划线批注 + 一键精简 |
| **错题本** | 间隔重复记忆盒（1→2→4→8→16 天），答错立即回到第 1 盒 |
| **学习报告** | 五维雷达、累计正确率、词条掌握度、写作明确度记录 |

其他：

- **多学生档案**：同一台设备可建多个学生，进度互不干扰，无需密码（本地存储）。
- **PWA**：Service Worker 离线可用、可加到主屏幕；同时提供 Android APK。
- **移动端适配**：手机底部标签栏 / 平板与桌面侧边栏自适应，支持安全区。

---

## 三、词库规模

| 项目 | 数量 |
|---|---|
| 课标词条 | **3228** 词（小学 g3–g6 · 初中 g7–g9 · 高中 g10–g12，共 10 个年级） |
| 分层 | 精讲层 `core` 140 · 考纲覆盖层 `syllabus` 3088 |
| 英文释义覆盖 | 3257 条（含虚词手写释义） |
| 语法意义点 | 52 |
| 近义词辨析组 | 35 |
| 一词多义词 | 32 |
| 真实语料挑战题 | 48 |
| 句子成分标注句 | 10 · 歧义句 8 · 长难句三层穿透 2 |
| 常用搭配 | 894 词 |
| 词根拆解 | 1004 词 · 42 个词根组 · 30 组词根网络 |
| 写作批改规则 | 18 条 |

---

## 四、技术特点

- **零依赖**：不使用任何框架、构建器或 CDN，`<script src>` 普通加载（非 ES module）。
- **零后端**：所有数据随包发布，学习进度存 `localStorage`。
- **可离线**：`file://` 直接打开即可运行；`http(s)://` 下自动启用 Service Worker 缓存。
- **无网络请求**：代码中不存在 `fetch` / `XMLHttpRequest` / 外链资源（`tests/security.js` 会校验这一点）。

---

## 五、目录结构

```
.
├── index.html              # 应用入口（多文件版）
├── app.js                  # 应用逻辑：路由/出题/判分/SRS/写作批改/雷达图
├── sw.js                   # Service Worker（stale-while-revalidate）
├── manifest.json           # PWA 清单
├── icon.svg
├── data-core.js            # 核心词库 + 语法/近义/多义/句子/语料/批改规则
├── data-primary.js         # 小学词库（g3–g6）
├── data-junior.js          # 初中词库（g7–g9）
├── data-senior.js          # 高中词库（g10–g12）
├── data-skill.js           # 技能语料（语法/近义/多义/句子/挑战/批改规则）
├── data-gskill-a.js        # 语法技能语料 A
├── data-gskill-b.js        # 语法技能语料 B
├── data-curriculum.js      # 课程体系：学段/年级/阶段（DBX.build 注入）
├── data-enrich.js          # 质量富化层：英文释义 / 常用搭配 / 词根网络
├── build-offline.js        # 构建单文件离线版
├── tests/                  # 测试脚本（见下）
├── tools/                  # 词库扩充与富化管线（Python + Node）
└── release/                # 发布产物（APK / 离线版 / 发布页）
```

---

## 六、快速开始

**方式一 · 浏览器直接打开**

```
双击 index.html
```

> 单文件版更方便传播：把 `lexisense-offline.html` 发到手机或平板，用浏览器打开即可。

**方式二 · 本地服务器**（PWA 离线缓存需在 http 下生效）

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

---

## 七、构建

**单文件离线版**（把数据与逻辑内联进 `index.html`）：

```bash
node build-offline.js      # 产出 lexisense-offline.html
```

**Android APK**：使用 Capacitor 壳工程 `D:\AndroidDev\app`，流程为
改 `app/build.gradle` 的 versionName → `node prepare-web.js` → `gradlew assembleRelease` → 复制产物并校验签名/包名/启动 Activity。

---

## 八、测试

全部测试从**项目根目录**运行：

```bash
node tests/smoke.js              # 冒烟：8 视图 + 交互全跑通
node tests/auth-flow.js          # 多学生档案与旧数据迁移
node tests/data-check.js         # 词库完整性 + 批改规则抽样
node tests/streak.js             # 连续学习天数（6 个跨天场景）
node tests/test-render.js        # 渲染冒烟（年级/学段/范围切换）
node tests/verify-curriculum.js  # 课程体系映射校验（10 年级）
node tests/security.js           # 安全测试（XSS/注入/原型污染/ReDoS/网络面）
```

`tests/security.js` 会校验：输入白名单、所有 `innerHTML` 注入点转义、原型污染、批改正则 ReDoS、以及**应用代码中不存在任何外部 URL 与网络调用**。

---

## 九、数据来源与第三方许可

词库与富化层由 `tools/` 下的管线生成，使用了以下上游数据（**均不在本仓库中再分发原始数据**）：

| 来源 | 用途 | 许可 |
|---|---|---|
| [Princeton WordNet 3.0](https://wordnet.princeton.edu/) | 英文释义、派生关系 | Princeton WordNet License（宽松，需保留版权声明） |
| Open Multilingual WordNet (omw-2.0) | 中文词元对齐 | 各语言子库遵循上游许可 |
| NLTK 语料：Brown / Gutenberg | 搭配统计（PMI） | Brown 语料自由使用；Gutenberg 公有领域 |
| NLTK 语料：Reuters / movie_reviews | 搭配统计（PMI） | **仅供研究用途** |
| 手工编写 | 虚词释义、词根改写、批改规则、语料挑战 | 本项目 MIT |

> ⚠️ **许可提示**：常用搭配统计基于以上语料计算，其中 Reuters / movie_reviews 语料的使用条款限于研究目的。
> 若需**商业分发**，建议将搭配统计的上游语料替换为公有领域或宽松许可语料后重新生成。

APK 由本地自签名 keystore 签名，**keystore 与口令不在本仓库中**。

---

## 十、许可证

[MIT](LICENSE) © 2026 Frank &lt;490612981@qq.com&gt;

第三方数据许可见 [`LICENSE`](LICENSE) 末尾与上一节说明。

---

## 十一、安全

本项目为**纯前端离线应用**：无账号体系、无服务端、无网络请求，因而不存在远程可利用的攻击面。

仓库内提供安全回归测试（`tests/security.js`）与安全测试报告（[`安全测试报告-2026-10-09.md`](安全测试报告-2026-10-09.md)）。
