import{_ as s,c as a,o as n,d as l}from"./app.f4ec9943.js";const i=JSON.parse('{"title":"Yarn","description":"","frontmatter":{"title":"Yarn","lastUpdated":true},"headers":[],"relativePath":"developer/others/yarn.md","lastUpdated":1678114146000}'),p={name:"developer/others/yarn.md"},o=l(`<div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 显示命令列表</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">help</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 初始化一个新项目</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装所有依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 添加依赖项</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">version</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 添加依赖项到不同类别的依赖项中</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--dev</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--peer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 更新依赖项</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">version</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除依赖项</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remove</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 跟新 yarn 本体</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">latest</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">source</span></span>
<span class="line"></span></code></pre></div>`,1),e=[o];function t(c,r,y,C,D,A){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
