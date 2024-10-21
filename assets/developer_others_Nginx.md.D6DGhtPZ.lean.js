import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.DOgdC_ou.js";const g=JSON.parse('{"title":"Nginx 基础配置入门","description":"","frontmatter":{"title":"Nginx 基础配置入门","lastUpdated":true},"headers":[],"relativePath":"developer/others/Nginx.md","filePath":"developer/others/Nginx.md","lastUpdated":1729515322000}'),p={name:"developer/others/Nginx.md"};function h(t,s,k,e,r,d){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><p>环境: CentOS 7.8\`</p><h2 id="安装前置软件" tabindex="-1">安装前置软件 <a class="header-anchor" href="#安装前置软件" aria-label="Permalink to &quot;安装前置软件&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc-c++</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> autoconf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pcre-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> automake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> httpd-tools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span></span></code></pre></div><p>CentOS 本身的 yum 源里面是没有 Nginx 的，所以需要换源，当然也可以下载解压安装 如果是 阿里云 或者 腾讯云 已经配置好了，就可以跳过换源步骤，直接跳到安装步骤</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 备份</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/CentOS-Base.repo.backup</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或者</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 服务器的包信息下载到本地缓存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> makecache</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 epel 源，然后 yum install 命令就可以从 epel 源安装额外的软件包了</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> epel-release</span></span></code></pre></div><p><code>mv</code> 移动或者重命名文件</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果不换源会报错 No package nginx available</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># rpm 是 linux 的 rpm 包管理工具，-q 代表询问模式，-l 代表返回列表</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 nginx 的所有安装位置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ql</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span></code></pre></div><p>也可以参考手动下载安装 <a href="https://www.runoob.com/linux/nginx-install-setup.html" target="_blank" rel="noreferrer">Nginx 手动安装</a></p><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p><code>nginx.conf</code> 是 <code>Nginx</code> 的总配置文件，也是搭建服务器经常调整的文件</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.conf</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 运行用户，默认 nginx，可以不设置，但是有可能出现权限问题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Nginx 进程，一般设置为和 CPU 核数一样的</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">worker_processes</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 错误日志存放目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error_log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/log/nginx/error.log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> warn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进程 pid 存放位置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pid</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /run/nginx.pid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">events</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  worker_connections</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1024</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 单个后台进程的最大并发数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 设置日志模式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  log_format</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  main</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                    &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                    &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  access_log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  /var/log/nginx/access.log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># nginx 访问日志存放位置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  sendfile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 开启高效传输模式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  tcp_nopush</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 减少网络报文段的数量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  keepalive_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   65</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 保持连接的时间，超时时间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  types_hash_max_size</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4096</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             /ect/nginx/mime.types</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 文件扩展名和类型映射表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  default_type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        application/octet-stream</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 默认文件类型</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/conf.d/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.conf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 包含的子配置项位置和文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置监听端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      [::]:80;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> _</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置域名</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        /usr/share/nginx/html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 服务默认启动目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/default.d/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.conf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  404</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /404.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置 404 页面，单独为错误配置处理方式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /40x.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 500</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 502</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 503</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 504</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /50x.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 错误状态码的显示页面，批量配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /50x.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>默认服务目录 <code>/usr/share/nginx/html</code></p><h2 id="启动-停止-重启-查看状态" tabindex="-1">启动&amp;停止&amp;重启&amp;查看状态 <a class="header-anchor" href="#启动-停止-重启-查看状态" aria-label="Permalink to &quot;启动&amp;停止&amp;重启&amp;查看状态&quot;">​</a></h2><p>CentOS7.4 版本中可以使用 <code>nginx</code> 直接启动 默认情况下 Nginx 启动后会监听 80 端口，从而提供 HTTP 访问，如果端口已经被占用则会启动失败</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # CentOS7.4 版本之前不可用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.service</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # systemctl 命令启动</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 停止</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 立即停止，无论是否在工作，立即停止进程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> quit</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 进程完成当前工作后再停止</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">killall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 直接杀死进程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.service</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # systemctl 命令停止</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.service</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 重启 Nginx 服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 修改配置后需要重新载入，可以使用这个</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ps</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aux</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">netstat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -tlnp</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 查看端口号的占用情况</span></span></code></pre></div><h2 id="错误页配置" tabindex="-1">错误页配置 <a class="header-anchor" href="#错误页配置" aria-label="Permalink to &quot;错误页配置&quot;">​</a></h2><p>在默认配置中</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置 404 页面，单独为错误配置处理方式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  404</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /404.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 错误状态码的显示页面，批量配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 500</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 502</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 503</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 504</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /50x.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 处理错误的时候也可以使用外部资源，出现 404 直接跳到指定页面</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 404</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://huli.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h2 id="访问权限" tabindex="-1">访问权限 <a class="header-anchor" href="#访问权限" aria-label="Permalink to &quot;访问权限&quot;">​</a></h2><p><strong>如果指令之间有冲突，先出现的会覆盖后出现的</strong></p><p><code>=</code> 号代表精确匹配</p><p>也可以使用 <code>~</code> 正则进行匹配</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  deny</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  123.9.51.42</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  allow</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 45.202.231</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 精确匹配</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =/admin{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  deny</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =/img{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  allow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 正则匹配，以 .php 结尾的文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  deny</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="配置虚拟主机" tabindex="-1">配置虚拟主机 <a class="header-anchor" href="#配置虚拟主机" aria-label="Permalink to &quot;配置虚拟主机&quot;">​</a></h2><p>虚拟主机是指在一台物理主机划分多个磁盘空间，每个空间是一个虚拟主机，都可以对外提供 WEB 服务，并且互不干扰，<strong>虚拟主机可以基于端口号、基于 IP、基于域名</strong>，将多个网站部署在同一台服务器上</p><p>直接在主文件里 <code>/etc/nginx/nginx.conf</code> 里配置，添加一个 <code>server</code>，配置对应的 <code>listen</code> 和 <code>server_name</code> 即可</p><p>虚拟主机的 端口、IP、域名 都需要是合法且开放的</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> _</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/html/html3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="代理设置" tabindex="-1">代理设置 <a class="header-anchor" href="#代理设置" aria-label="Permalink to &quot;代理设置&quot;">​</a></h2><p>Nginx 反向代理 安全性：正向代理的客户端（梯子）访问网站给网络安全带来了安全隐患，反向代理可以保护真实服务器，客户端只能访问代理服务器（真是服务器结合前面的配置权限，只允许代理服务器访问） 功能性：负载均衡</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 把 \`http://huli2.huli.com\` 反向代理到 \`http://huli.com\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 即进入 server_name 的页面，显示的内容是 proxy_pass 对应的页面</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> huli2.huli.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        proxy_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://huli.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>其他反向代理指令</p><ul><li>proxy_set_header 更改来自客户端的请求头信息</li><li>proxy_connect_timeout Nginx 与后端代理服务器尝试建立连接的超时时间</li><li>proxy_read_timeout read 请求的等待超时时间</li><li>proxy_send_timeout write 请求的等待超时时间</li><li>proxy_redirect 修改响应头中的 Location 和 Refresh</li></ul><h2 id="适配-pc-和-移动设备" tabindex="-1">适配 PC 和 移动设备 <a class="header-anchor" href="#适配-pc-和-移动设备" aria-label="Permalink to &quot;适配 PC 和 移动设备&quot;">​</a></h2><p><strong>Nginx 通过内置变量 <code>$http_user_agent</code> 可以获取到请求客户端的 userAgent</strong></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> huli.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/pc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($http_user_agent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Android|webOS|iPhone|iPod|BlackBerry&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/mobile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="gzip-压缩设置" tabindex="-1">Gzip 压缩设置 <a class="header-anchor" href="#gzip-压缩设置" aria-label="Permalink to &quot;Gzip 压缩设置&quot;">​</a></h2><p>gzip 需要服务器和浏览器同时支持，浏览器支持 <code>gzip</code> 压缩时，在请求消息中包含 <code>Accept-Encoding:gzip</code> 这样 Nginx 就会向浏览器发送 gzip 压缩后的内容，并且响应头加入 <code>Content-Encoding:gzip</code> 告知浏览器需要先解压再输出</p><ul><li>gzip: 开启关闭 gzip 模块</li><li>gzip_types: 压缩的文件类型</li><li>gzip_buffers: 设置系统获取几个单位缓存用于存储 gzip 压缩结果数据流</li><li>gzip_comp_level: 压缩比，级别 <code>1-9</code> ，级别越高压缩时间越长</li><li>gzip_disable: 对一些特定 User-Agent 不使用压缩功能</li><li>gzip_min_length: 允许压缩的页面最小字节数，页面字节数从响应头 <code>Content-length</code> 获取</li><li>gzip_http_version: 识别 HTTP 协议版本，<code>1.1</code> 或 <code>1.0</code></li><li>gzip_proxied: 启用或禁用从代理服务器收到相应内容 gzip 压缩</li><li>gzip_vary:</li></ul>`,42)]))}const y=i(p,[["render",h]]);export{g as __pageData,y as default};