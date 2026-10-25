# Boming Jia — 学术主页

深色、单栏、响应式静态主页。无运行时依赖，不需要服务器或数据库。打印时自动使用浅色配色。

采用较大字号：桌面正文 20px、摘要 19px、论文标题 22–24px；手机正文与摘要 19px，窄屏教育及教学日期另起一行。强调色采用略偏黄、稍深的蓝绿色。

首页个人介绍之后优先展示 Papers on GitHub，导航首项直接跳转到该区。研究兴趣、arXiv 论文、教育与教学内容依次位于后方。

## 预览

- 运行 `node scripts/build.mjs --standalone` 可生成单文件预览版 `Boming_Jia_preview.html`，内嵌照片、数学字体、10 篇论文 PDF 和 CV。直接用浏览器打开即可；启用 JavaScript 时，论文标题及 PDF 链接通过本地 Blob 在新标签页打开内嵌 PDF，无需联网访问外部站点。
- `index.html` 是部署版，与 `assets/` 和 `papers/` 一起使用。双击也可预览，数学排版不依赖 CDN。
- 摘要默认折叠，可逐篇展开或按分区全部展开。禁用 JavaScript 时，逐篇展开仍可正常使用。
- 部署版的所有论文标题和 PDF 按钮都指向 `papers/` 中的本站文件，CV 指向 `assets/Boming_Jia_CV.pdf`，无需 JavaScript 即可直接访问。arXiv 和 GitHub 链接仅供查看原始来源。

## 部署到 GitHub Pages

个人主页地址：[https://tritonereid.github.io/](https://tritonereid.github.io/)。

1. 在 `tritonereid` 账户中创建或使用 `tritonereid.github.io` 仓库。已有内容时先保留备份并合并。
2. 将 `index.html`、`.nojekyll`、`assets/` 和 `papers/` 放到仓库根目录。
3. 在仓库 Settings → Pages 中选择 Deploy from a branch，分支选择 `main`，目录选择 `/ (root)`。
4. 发布后的主页地址为 `https://tritonereid.github.io/`。

`Boming_Jia_preview.html` 是方便审阅的独立副本，不必上传。预览截图也不必上传。

## 更新内容

- 简介、研究兴趣、教育、教学和报告信息：修改 `scripts/build.mjs`。
- arXiv 论文：修改 `data/arxiv-papers.json`。
- GitHub 论文：修改 `data/github-papers.json`。
- 样式：修改 `assets/style.css`。照片使用容器轻微裁去左侧 2px，以去除原图细白边；手机端论文标题与“展开全部摘要”按钮分行排列。
- CV：替换 `assets/Boming_Jia_CV.pdf`。

首次执行 `npm install`，然后执行 `npm run build` 重新生成 `index.html`。执行 `node scripts/build.mjs --standalone` 同时生成单文件预览。

`papers/` 收录 8 篇 arXiv 论文的最新 PDF 和 2 篇 GitHub 论文的最新 release PDF，核实日期为 2026-10-25。PDF 是本站保存的版本；源站更新后，需替换对应文件、同步版本信息并重新生成主页。原始来源链接仍保存在 JSON 中。文件页数、大小及 SHA-256 校验值记录在 `data/pdf-verification.json` 中。

## 资料来源与署名

- 个人信息：用户提供的 `Boming_Jia_CV_2026_v5.pdf`（October 2026）。研究兴趣使用用户提供的英文原文。
- 照片与中文姓名：[YMSC 个人页面](https://ymsc.tsinghua.edu.cn/en/info/1035/2466.htm)。照片使用该页面原图。
- 8 篇 arXiv 论文：标题、作者与完整摘要均核对原始摘要页；每篇链接保存在 JSON 和主页中。`display_title` / `display_abstract` 仅调整数学排版，原始来源字段保留。
- 2 篇 GitHub 论文：从公开仓库及最新 release 核实标题、摘要、PDF 和版本。两篇署名均为 **GPT-6 Astra; communicated and edited by Boming Jia**，主页保留这一信息。
- GitHub PDF 副本来自 2026-10-25 核实时的最新 release。下载文件的 SHA-256 记录在 JSON 中。

数学排版由 KaTeX 0.16.25 在生成时完成，许可见 `assets/KaTeX-LICENSE.txt`。
