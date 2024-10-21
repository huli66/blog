import{_ as i,c as a,a2 as e,o as h}from"./chunks/framework.DOgdC_ou.js";const o=JSON.parse('{"title":"ES7-ES12","description":"","frontmatter":{"title":"ES7-ES12","lastUpdated":true},"headers":[],"relativePath":"blogs/notes/ES7-ES12.md","filePath":"blogs/notes/ES7-ES12.md","lastUpdated":1729515322000}'),t={name:"blogs/notes/ES7-ES12.md"};function n(l,s,k,p,r,E){return h(),a("div",null,s[0]||(s[0]=[e(`<h1 id="es7-es12" tabindex="-1">ES7-ES12 <a class="header-anchor" href="#es7-es12" aria-label="Permalink to &quot;ES7-ES12&quot;">​</a></h1><h2 id="es2016-es7" tabindex="-1">ES2016 (ES7) <a class="header-anchor" href="#es2016-es7" aria-label="Permalink to &quot;ES2016 (ES7)&quot;">​</a></h2><h3 id="array-prototype-includes" tabindex="-1">Array.prototype.includes() <a class="header-anchor" href="#array-prototype-includes" aria-label="Permalink to &quot;Array.prototype.includes()&quot;">​</a></h3><p>区分大小写判断数组是否存在项，但是只能判断简单类型的数据，无法判断对象类型等复杂类型</p><p>可以识别 NaN，indexOf 不能识别 NaN，只判断是否存在用 includes 更好</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(valutToFind[, fromIndex]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回 ture / false ，从 fromIndex 开始找，默认为 0 ，负数则是从末尾开始往前跳 fromIndex 绝对值个索引</span></span></code></pre></div><h3 id="幂运算符" tabindex="-1">幂运算符 <a class="header-anchor" href="#幂运算符" aria-label="Permalink to &quot;幂运算符&quot;">​</a></h3><p>**</p><p>效果等同于 Math.pow()</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1024</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> **</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1024</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> **</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 256</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NaN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> **</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// NaN</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> **</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1 / 10</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> **</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1.116... 小数次幂，先转换成分数，然后分子次幂，分母开方</span></span></code></pre></div><h2 id="es2017-es8" tabindex="-1">ES2017 (ES8) <a class="header-anchor" href="#es2017-es8" aria-label="Permalink to &quot;ES2017 (ES8)&quot;">​</a></h2><h3 id="object-values" tabindex="-1">Object.values() <a class="header-anchor" href="#object-values" aria-label="Permalink to &quot;Object.values()&quot;">​</a></h3><p>返回一个数组，成员是参数自身的（不包括继承）所有可遍历（enumerable）属性的键的值</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;huli&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  age: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">188</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">values</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [ &#39;huli&#39;, 18, 188 ]</span></span></code></pre></div><h2 id="es2018-es9" tabindex="-1">ES2018 (ES9) <a class="header-anchor" href="#es2018-es9" aria-label="Permalink to &quot;ES2018 (ES9)&quot;">​</a></h2><h2 id="es2019-es10" tabindex="-1">ES2019 (ES10) <a class="header-anchor" href="#es2019-es10" aria-label="Permalink to &quot;ES2019 (ES10)&quot;">​</a></h2><h2 id="es2020-es11" tabindex="-1">ES2020 (ES11) <a class="header-anchor" href="#es2020-es11" aria-label="Permalink to &quot;ES2020 (ES11)&quot;">​</a></h2><h2 id="es2021-es12" tabindex="-1">ES2021 (ES12) <a class="header-anchor" href="#es2021-es12" aria-label="Permalink to &quot;ES2021 (ES12)&quot;">​</a></h2><h2 id="es2022-es13" tabindex="-1">ES2022 (ES13) <a class="header-anchor" href="#es2022-es13" aria-label="Permalink to &quot;ES2022 (ES13)&quot;">​</a></h2><h2 id="es2023-es14" tabindex="-1">ES2023 (ES14) <a class="header-anchor" href="#es2023-es14" aria-label="Permalink to &quot;ES2023 (ES14)&quot;">​</a></h2>`,20)]))}const g=i(t,[["render",n]]);export{o as __pageData,g as default};