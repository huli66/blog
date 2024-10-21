import{_ as n,c as a,a2 as p,o as i}from"./chunks/framework.DOgdC_ou.js";const d=JSON.parse('{"title":"Jenkins","description":"","frontmatter":{"title":"Jenkins","lastUpdated":true},"headers":[],"relativePath":"developer/others/Jenkins入门.md","filePath":"developer/others/Jenkins入门.md","lastUpdated":1729515322000}'),l={name:"developer/others/Jenkins入门.md"};function e(t,s,c,h,r,o){return i(),a("div",null,s[0]||(s[0]=[p(`<h1 id="jenkins" tabindex="-1">Jenkins <a class="header-anchor" href="#jenkins" aria-label="Permalink to &quot;Jenkins&quot;">​</a></h1><p>大多数最基本的持续交付 Pipeline 至少会有三个阶段：构建、测试、部署</p><h2 id="创建流水线" tabindex="-1">创建流水线 <a class="header-anchor" href="#创建流水线" aria-label="Permalink to &quot;创建流水线&quot;">​</a></h2><p><a href="https://www.jenkins.io/zh/doc/book/pipeline/syntax/" target="_blank" rel="noreferrer">流水线语法参考</a></p><h3 id="定义执行环境" tabindex="-1">定义执行环境 <a class="header-anchor" href="#定义执行环境" aria-label="Permalink to &quot;定义执行环境&quot;">​</a></h3><ul><li>agent: 定义执行环境，告诉 Jenkins 在哪里以及如何执行 Pipeline 或者 Pipeline 子集，所有 Pipeline 都需要 agent 指令 <ul><li>所有在块（block） 中的步骤（steps）会被 Jenkins 保存在一个执行队列中，一旦一个执行器（excutor）是可用的，这些步骤就会开始执行 代理方式可以是 node、docker、label、none、any 等</li><li>一个工作空间（workspace）将被分配，工作空间中回包含来自远程仓库的文件和一些用于 Pipeline 的工作文件 <a href="https://www.jenkins.io/doc/book/pipeline/syntax/#agent" target="_blank" rel="noreferrer">参考</a></li><li>可以配置全局的 agent，也可以配置单个 stage 的 agent</li></ul></li></ul><h3 id="定义环境变量" tabindex="-1">定义环境变量 <a class="header-anchor" href="#定义环境变量" aria-label="Permalink to &quot;定义环境变量&quot;">​</a></h3><ul><li>environment: 环境变量，配置环境变量很有用，也可以配置 stage 级别的环境变量，但是直接把凭证信息写入 Jenkinsfile 文件显然不安全，所以 Jenkins Pipeline 允许用户在 Jenkinsfile 中访问预定义的参数，无需知道值 <a href="https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials" target="_blank" rel="noreferrer">参考</a>，Jenkins 网页中创建流水线任务时就可以配置</li></ul><h3 id="流水线工作阶段" tabindex="-1">流水线工作阶段 <a class="header-anchor" href="#流水线工作阶段" aria-label="Permalink to &quot;流水线工作阶段&quot;">​</a></h3><ul><li><p>stages: 所有工作阶段</p><ul><li><p>stage: 某个工作阶段</p><ul><li>steps: 执行多个步骤（step），任何一个步骤失败，Pipeline 的执行结果也为失败，Pipeline 将会标记在该 <code>stage</code> 失败</li></ul><p><code>timeout</code> <code>retry</code> 步骤中可以嵌套其他步骤 <code>input</code> 人工确认</p></li></ul></li></ul><h3 id="执行完毕" tabindex="-1">执行完毕 <a class="header-anchor" href="#执行完毕" aria-label="Permalink to &quot;执行完毕&quot;">​</a></h3><ul><li>post: Pipeline 运行完成时，可能需要做一些清理工作，或者基于 Pipeline 的运行结果执行不同的操作（以下只是命令（junit 等）一般用在什么情况下，其他情况下或者阶段都可以使用） <ul><li>always: 运行结束就执行 <ul><li>junit 单元测试</li><li>deleteDir() 清理工作空间</li><li>archiveArtifacts 保存打包结果</li></ul></li><li>success：只有运行成功才执行</li><li>failure：只有失败才执行 <ul><li>mail hipchat slack 等方式通知</li></ul></li><li>unstable：只有运行被标记为 unstable 才会执行，不稳定</li><li>changed：只有 Pipeline state 被改动了才执行，比如之前失败了，现在成功了</li></ul></li></ul><div class="language-Jenkinsfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Jenkinsfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pipeline {</span></span>
<span class="line"><span>  agent {</span></span>
<span class="line"><span>    docker {</span></span>
<span class="line"><span>      image &#39;node:7-alpine&#39;</span></span>
<span class="line"><span>      label &#39;my-defined-label&#39;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  environment {</span></span>
<span class="line"><span>    DISABLE_AUTH = &#39;true&#39;</span></span>
<span class="line"><span>    DB_ENGINE = &#39;sqlite&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  options {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  triggers {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 所有工作阶段</span></span>
<span class="line"><span>  stages {</span></span>
<span class="line"><span>    // 打包阶段</span></span>
<span class="line"><span>    stage(&#39;build&#39;) {</span></span>
<span class="line"><span>      // 执行多个步骤</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        // 一个步骤可以是单行命令</span></span>
<span class="line"><span>        sh &#39;echo &quot;Hello World&quot;&#39;</span></span>
<span class="line"><span>        // 也可以是多行命令</span></span>
<span class="line"><span>        sh &#39;&#39;&#39;</span></span>
<span class="line"><span>            echo &quot;Multiline shell steps works too&quot;</span></span>
<span class="line"><span>            ls -lah</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 重试</span></span>
<span class="line"><span>        retry(3) {</span></span>
<span class="line"><span>          sh &#39;./flakey-deploy.sh&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 超时</span></span>
<span class="line"><span>        timeout(time: 3, unit: &#39;MINUTES&#39;) {</span></span>
<span class="line"><span>          sh &#39;./health-check.sh&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 重试 5 次，总共不超过 3 分钟</span></span>
<span class="line"><span>        timeout(time: 3, unit: &#39;MINUTES&#39;) {</span></span>
<span class="line"><span>          retry(5) {</span></span>
<span class="line"><span>            sh &#39;./flakey-deploy.sh&#39;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Windows 环境中，用 \`bat\` 步骤表示执行批处理命令</span></span>
<span class="line"><span>    stage(&#39;windowBuild&#39;) {</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        bat &#39;set&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // exit</span></span>
<span class="line"><span>    stage(&#39;Test&#39;) {</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        sh &#39;echo &quot;Fail!&quot;; exit 1&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Pipeline 运行完成时</span></span>
<span class="line"><span>  post {</span></span>
<span class="line"><span>    always {</span></span>
<span class="line"><span>      echo &#39;This will always run&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    success {</span></span>
<span class="line"><span>      echo &#39;This will run only if successful&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    failure {</span></span>
<span class="line"><span>      echo &#39;This will run only if failed&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    unstable {</span></span>
<span class="line"><span>      echo &#39;This will run only if the run was marked as unstable&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    changed {</span></span>
<span class="line"><span>      echo &#39;This will run only if the state of the Pipeline has changed&#39;</span></span>
<span class="line"><span>      echo &#39;For example, if the Pipeline was previously failing but is now successful&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 在 post 阶段记录测试和构建结果</span></span>
<span class="line"><span>  post {</span></span>
<span class="line"><span>    always {</span></span>
<span class="line"><span>      // 获得单元测试结果，如果存在失败的测试用例，Pipeline 会被标记成 \`UNSTABLE\` 网页用黄色表示</span></span>
<span class="line"><span>      junit &#39;build/reports/**/*.xml&#39;</span></span>
<span class="line"><span>      // 存储构建结果，可以指定三个参数 文件路径、文件名、figerprint</span></span>
<span class="line"><span>      archiveArtifacts: artifacts:&#39;build/libs/**/*.jar&#39;, fingerprint: true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 失败时发送邮件</span></span>
<span class="line"><span>    failure {</span></span>
<span class="line"><span>      mail to : &#39;huli66@qq.com&#39;,</span></span>
<span class="line"><span>            subject: &quot;Failed Pipeline: \${currentBuild.fullDisplayName}&quot;,</span></span>
<span class="line"><span>            body: &quot;Something is wrong with \${env.BUILD_URL}&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p><strong>可以跑一个 Docker 容器来作为 Jenkins 服务器，模拟生产环境</strong></p><p>推荐镜像<a href="https://hub.docker.com/r/jenkinsci/blueocean/" target="_blank" rel="noreferrer">https://hub.docker.com/r/jenkinsci/blueocean/</a></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -u</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 关闭时删除容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 后台运行，如果不指定则终端窗口中会输出正在运行的容器日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:8080</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 容器的端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 50000:50000</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 进行通信</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jenkins-data:/var/jenkins_home</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/run/docker.sock:/var/run/docker.sock</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  jenkinsci/blueocean</span></span></code></pre></div><p><a href="https://www.jenkins.io/zh/doc/tutorials/" target="_blank" rel="noreferrer">参考文档</a></p>`,18)]))}const u=n(l,[["render",e]]);export{d as __pageData,u as default};
