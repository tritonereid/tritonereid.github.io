import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const katex = require('katex');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arxiv = JSON.parse(fs.readFileSync(path.join(root, 'data/arxiv-papers.json'), 'utf8'));
const github = JSON.parse(fs.readFileSync(path.join(root, 'data/github-papers.json'), 'utf8'));
const talks = JSON.parse(fs.readFileSync(path.join(root, 'data/talks.json'), 'utf8'));
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function rich(s) {
  return s.split(/(\$[^$]+\$)/g).map(t => t.startsWith('$') && t.endsWith('$')
    ? katex.renderToString(t.slice(1,-1), {throwOnError: true, output:'htmlAndMathml', strict:'error'}) : esc(t)).join('');
}
const a = (url, label, attr='') => `<a href="${esc(url)}"${attr}>${label}</a>`;
function paper(p, isGithub = false) {
  const pdfPath = isGithub ? `papers/${path.basename(new URL(p.latest_pdf_url).pathname)}` : `papers/arxiv-${p.arxiv_id}.pdf`;
  const pdfFile = fs.readFileSync(path.join(root, pdfPath));
  if (pdfFile.subarray(0, 5).toString() !== '%PDF-') throw new Error(`Invalid PDF: ${pdfPath}`);
  const pdf = label => a(pdfPath, label, ' type="application/pdf" target="_blank" rel="noopener"');
  let meta;
  if(isGithub) meta = 'GPT-6 Astra · Communicated and edited by Boming Jia';
  else if(p.arxiv_id === '2112.08649') meta = 'Boming Jia · <span class="journal">Journal of Lie Theory</span> 35 (2025), no. 1, 83–100';
  else meta = `${p.authors.length === 2 ? 'Boming Jia and Yu Li' : 'Boming Jia'} · ${p.year}${p.arxiv_id === '2310.14302' ? ' (revised 2026)' : ''}`;
  const links = isGithub
    ? `${pdf('PDF')}${a(p.github_url, 'GitHub')}${a(p.latest_release_url, 'v'+esc(p.version))}`
    : `${pdf('PDF')}${a(p.url, 'arXiv:'+p.arxiv_id)}`;
  return `<li class="paper">
  <h3>${pdf(rich(p.display_title || p.title))}</h3>
  <p class="meta">${meta}</p>
  <div class="paper-links">${links}<details><summary>Abstract</summary>
  <div class="abstract">${rich(p.display_abstract || p.abstract)}</div></details></div>
</li>`;
}
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Boming Jia | Mathematics</title>
<meta name="description" content="Boming Jia, postdoctoral researcher at YMSC, Tsinghua University. Geometric representation theory, symplectic singularities, nilpotent orbits, and quiver varieties.">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="assets/katex.min.css">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="page">
<header class="site-header">
  <h1>Boming Jia <span class="chinese-name" lang="zh-Hans">贾博名</span></h1>
  <nav aria-label="Main navigation"><a class="featured-nav" href="#github-papers">GitHub papers</a><a href="#about">About</a><a href="#teaching">Teaching</a><a href="assets/Boming_Jia_CV.pdf">CV</a></nav>
</header>
<main id="main">
<div class="intro" id="about">
  <div class="intro-text">
    <p class="biography">I am a postdoctoral researcher at Tsinghua University. I received my Ph.D. in Mathematics from the University of Chicago in 2022, under the supervision of <a href="https://mathematics.uchicago.edu/people/profile/victor-ginzburg/">Victor Ginzburg</a>.</p>
    <div class="contact-links"><a href="mailto:jiabm@tsinghua.edu.cn">jiabm@tsinghua.edu.cn</a><a href="assets/Boming_Jia_CV.pdf">Curriculum vitae</a><a href="https://github.com/tritonereid">GitHub</a></div>
  </div>
  <div class="portrait-frame"><img class="portrait" src="assets/boming-jia.jpg" width="164" height="164" alt="Portrait of Boming Jia"></div>
</div>
<section class="featured-papers" id="github-papers" aria-labelledby="github-heading">
  <div class="section-heading"><h2 id="github-heading">Papers on GitHub</h2><button class="expand-all" type="button" aria-controls="github-list" hidden>Expand all abstracts</button></div>
  <p class="section-note">PDFs are hosted on this site and open directly.</p>
  <ol class="papers" id="github-list">${github.map(p => paper(p,true)).join('\n')}</ol>
</section>
<section class="research" aria-labelledby="research-heading">
  <h2 id="research-heading">Research interests</h2>
  <p>My research interests lie in geometric representation theory, especially the interactions of representation theory with complex algebraic (symplectic) geometry. More specifically I study symplectic singularities, complex coadjoint orbits, quiver varieties, flag varieties, and (affine) Springer fibers.</p>
</section>
<section id="papers" aria-labelledby="papers-heading">
  <div class="section-heading"><h2 id="papers-heading">Publications &amp; preprints</h2><button class="expand-all" type="button" aria-controls="arxiv-list" hidden>Expand all abstracts</button></div>
  <ol class="papers" id="arxiv-list">${arxiv.map(p => paper(p)).join('\n')}</ol>
</section>
<section id="background" aria-labelledby="background-heading">
  <div class="section-heading"><h2 id="background-heading">Academic background</h2></div>
  <dl class="history">
    <dt>2022–present</dt><dd>Postdoctoral Researcher, Tsinghua University<span>Yau Mathematical Sciences Center · Shuimu Scholar</span></dd>
    <dt>2016–2022</dt><dd>Ph.D. in Mathematics, University of Chicago<span>Advisor: Victor Ginzburg</span></dd>
    <dt>2012–2016</dt><dd>B.S. in Mathematics, The Ohio State University</dd>
  </dl>
</section>
<section id="teaching" aria-labelledby="teaching-heading">
  <div class="section-heading"><h2 id="teaching-heading">Teaching &amp; mentoring</h2></div>
  <dl class="history">
    <dt>2023–2026</dt><dd>Teaching Assistant, Algebra courses<span>Qiuzhen College, Tsinghua University</span></dd>
    <dt>2022–2023</dt><dd>Yiyou Scholar, Undergraduate mentoring<span>Qiuzhen College, Tsinghua University</span></dd>
    <dt>2018–2022</dt><dd>Instructor, Calculus II, Calculus III, and Linear Algebra<span>University of Chicago</span></dd>
    <dt>2017</dt><dd>Undergraduate research mentor<span>University of Chicago REU</span></dd>
  </dl>
</section>
<section id="talks" aria-labelledby="talks-heading">
  <div class="section-heading"><h2 id="talks-heading">Selected talks</h2></div>
  <ul class="talks">
    ${talks.map(t => `<li><span class="date">${esc(t.date)}</span>${rich(t.title)}<span class="venue">${esc(t.venue)}</span></li>`).join('\n')}
  </ul>
</section>
</main>
<footer>Good Luck！</footer>
</div>
<script>
document.querySelectorAll('.expand-all').forEach(button => {
  button.hidden = false;
  const entries = [...document.getElementById(button.getAttribute('aria-controls')).querySelectorAll('details')];
  const sync = () => { button.textContent = entries.every(d => d.open) ? 'Collapse all abstracts' : 'Expand all abstracts'; };
  button.addEventListener('click', () => { const open = !entries.every(d => d.open); entries.forEach(d => {d.open = open;}); sync(); });
  entries.forEach(d => d.addEventListener('toggle', sync));
});
</script>
</body>
</html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log('Built index.html: 8 arXiv papers + 2 GitHub papers.');

if(process.argv.includes('--standalone')) {
  let css = fs.readFileSync(path.join(root,'assets/katex.min.css'),'utf8');
  css = css.replace(/url\((fonts\/[^)]+)\)/g, (_,p) => {
    const mime = p.endsWith('.woff2') ? 'font/woff2' : p.endsWith('.woff') ? 'font/woff' : 'font/ttf';
    return `url(data:${mime};base64,${fs.readFileSync(path.join(root,'assets',p)).toString('base64')})`;
  });
  let standalone = html.replace('<link rel="stylesheet" href="assets/katex.min.css">', `<style>${css}</style>`)
    .replace('<link rel="stylesheet" href="assets/style.css">', `<style>${fs.readFileSync(path.join(root,'assets/style.css'),'utf8')}</style>`)
    .replace('src="assets/boming-jia.jpg"', `src="data:image/jpeg;base64,${fs.readFileSync(path.join(root,'assets/boming-jia.jpg')).toString('base64')}"`);
  const embeddedPdfs = {};
  standalone = standalone.replace(/href="((?:assets|papers)\/[^"\s]+\.pdf)"/g, (_, pdfPath) => {
    const file = fs.readFileSync(path.join(root, pdfPath));
    if (file.subarray(0, 5).toString() !== '%PDF-') throw new Error(`Invalid PDF: ${pdfPath}`);
    embeddedPdfs[pdfPath] = file.toString('base64');
    return `href="${esc(pdfPath)}" data-pdf-path="${esc(pdfPath)}"`;
  });
  const pdfRuntime = `<script id="embedded-pdfs" type="application/json">${JSON.stringify(embeddedPdfs)}</script>
<script>
(() => {
  const source = document.getElementById('embedded-pdfs');
  const files = JSON.parse(source.textContent);
  const urls = new Map();
  document.querySelectorAll('a[data-pdf-path]').forEach(link => {
    const key = link.dataset.pdfPath;
    if (!urls.has(key)) {
      const binary = atob(files[key]);
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      urls.set(key, URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'})));
    }
    link.href = urls.get(key);
    link.target = '_blank';
    link.rel = 'noopener';
  });
  source.remove();
})();
</script>`;
  standalone = standalone.replace('</body>', `${pdfRuntime}\n</body>`);
  fs.writeFileSync(path.join(root,'Boming_Jia_preview.html'), standalone);
  console.log(`Built self-contained Boming_Jia_preview.html (including photo, math fonts, and ${Object.keys(embeddedPdfs).length} PDFs).`);
}
