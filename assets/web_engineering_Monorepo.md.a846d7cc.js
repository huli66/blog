import{_ as a,c as e,o as n,d as s}from"./app.256f9cb4.js";const m=JSON.parse('{"title":"MonoRepo","description":"","frontmatter":{},"headers":[],"relativePath":"web/engineering/Monorepo.md","lastUpdated":1678287685000}'),o={name:"web/engineering/Monorepo.md"},p=s(`<h1 id="monorepo" tabindex="-1">MonoRepo <a class="header-anchor" href="#monorepo" aria-hidden="true">#</a></h1><p>多个项目放在一个仓库里</p><p>相对于传统的 MultiRepo 模式(每个项目一个单独仓库)</p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">├── packages</span></span>
<span class="line"><span style="color:#A6ACCD;">| ├── pkg1</span></span>
<span class="line"><span style="color:#A6ACCD;">| | ├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">| ├── pkg2</span></span>
<span class="line"><span style="color:#A6ACCD;">| | ├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"></span></code></pre></div><p>基于 <code>yarn workspace</code> 实现，通过 link 仓库的各个 package ，达到跨项目复用的 mudi</p>`,5),t=[p];function c(l,r,i,d,_,g){return n(),e("div",null,t)}const A=a(o,[["render",c]]);export{m as __pageData,A as default};
