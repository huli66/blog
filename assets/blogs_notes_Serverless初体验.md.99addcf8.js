import{_ as s,c as n,o as a,d as l}from"./app.90c1412e.js";const A=JSON.parse('{"title":"Serverless 初体验","description":"","frontmatter":{"title":"Serverless 初体验","lastUpdated":true},"headers":[],"relativePath":"blogs/notes/Serverless初体验.md","lastUpdated":1695209990000}'),e={name:"blogs/notes/Serverless初体验.md"},p=l(`<h1 id="serverless-初体验" tabindex="-1">Serverless 初体验 <a class="header-anchor" href="#serverless-初体验" aria-hidden="true">#</a></h1><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># node &gt; 12, 安装</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">serverless-cloud-framework</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 升级</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">serverless-cloud-framework</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># scf 是缩写</span></span>
<span class="line"><span style="color:#FFCB6B;">scf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-serverless</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-serverless</span></span>
<span class="line"><span style="color:#FFCB6B;">serverless-cloud-framework</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 模版选择 scf-starter 快速部署一个云函数，找不到就往下往上查找</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 选择 scf-nodejs 快速部署一个 nodejs 云函数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 立即部署到云端，微信扫码登录，如果没有认证可能会失败，需要认证之后重新部署</span></span>
<span class="line"><span style="color:#FFCB6B;">scf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deploy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看状态和资源</span></span>
<span class="line"><span style="color:#FFCB6B;">scf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">info</span></span>
<span class="line"></span></code></pre></div><p><code>.env</code> 配置文件可以添加配置</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 中文引导</span></span>
<span class="line"><span style="color:#A6ACCD;">SERVERLESS_PLATFORM_VENDOR</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">tencent</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 开启境外加速</span></span>
<span class="line"><span style="color:#A6ACCD;">GLOBAL_ACCELERATOR_NA</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 配置代理</span></span>
<span class="line"><span style="color:#A6ACCD;">HTTP_PROXY</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://127.0.0.1:</span><span style="color:#F78C6C;">1234</span></span>
<span class="line"><span style="color:#A6ACCD;">HTTPS_PROXY</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://127.0.0.1:</span><span style="color:#F78C6C;">4321</span></span>
<span class="line"></span></code></pre></div><p>比起直接使用云服务器更方便一些，各有优势 云函数不需要考虑峰值性能等问题， 小规模团队使用比较划算，个人使用也是 但是考虑到隐私或者成本，就不一定了</p>`,5),o=[p];function t(c,r,i,y,C,d){return a(),n("div",null,o)}const _=s(e,[["render",t]]);export{A as __pageData,_ as default};
