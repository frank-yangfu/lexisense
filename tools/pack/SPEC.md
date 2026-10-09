# 辞源 · 词包（word pack）编写规范

## 1. 文件格式

每行一个**义项**，用 `|` 分隔 6 列，UTF-8：

```
word|phonetic|tag|gloss|example|zh
```

- `word`：**只能是小写英文字母**（`^[a-z]+$`）。禁止空格、连字符、数字、专有名词。
- `phonetic`：国际音标，必须用 `/` 包裹，如 `/ˈkʊʃn/`。
- `tag`：主题标签，**必须严格取自下表**，一字不改。
- `gloss`：中文释义，**必须以词性前缀开头**：`n.` `v.` `adj.` `adv.` `prep.` `conj.` `pron.` `num.` `int.`
- `example`：英文例句，8–16 词，自然真实，**必须包含该词**（见 §2）。
- `zh`：例句的中文翻译。

同一个词要写多个义项时，**重复该行并改 gloss/example/zh**；同一词的 `phonetic` 与 `tag` 必须完全一致。
一个词最多 2 个义项，绝大多数只写 1 个。

示例：

```
cushion|/ˈkʊʃn/|家居|n. 坐垫，靠垫|She put a soft cushion behind her back.|她在背后垫了一个软垫。
cushion|/ˈkʊʃn/|家居|v. 缓冲，减轻冲击|The extra funding cushioned the blow of the cuts.|这笔额外拨款缓冲了削减带来的冲击。
```

## 2. 例句硬规则（校验会拒绝，务必遵守）

校验规则：把单词**前 4 个字母**作为词干，在例句中做 `\b词干[a-z]{0,12}\b` 匹配。

- ✅ `cushion` → `cushioned` / `cushioning` 都可以
- ✅ `study` → `studies` / `studied` 可以
- ❌ `go` → 例句写 `went` 会被拒绝（`go` 词干是 `go`，`went` 不匹配）
- ❌ `buy` → `bought` 被拒绝
- ❌ `child` → `children` 被拒绝

**因此：例句一律优先使用原形**；只有在前 4 个字母不变时才用变形（`-s/-es/-ed/-ing/-ly`）。
拿不准就用原形。

## 3. 内容规则

- 只要**课标高频词**，不要生僻词、不要拟声词、不要品牌名。
- 中文释义用最通用的意思，不要生硬直译。
- 例句贴近真实生活/校园/社会语境，避免 "This is a ..." 这类空洞句。
- 同一文件内不得出现重复词条；写之前先核对已收录词表。
- 不要出现换行、不要出现 `|` 字符本身。

## 4. 写入

由主流程调用 `tools/append_words.py` 落盘，**词包文件本身不改动项目源码**。
