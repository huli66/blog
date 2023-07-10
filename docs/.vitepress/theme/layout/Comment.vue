<!-- Comment.vue -->
<script setup>
import { onMounted, ref } from "vue";
import { inBrowser } from "vitepress";
import Gitalk from "gitalk";
import "gitalk/dist/gitalk.css";

const init = () => {
  if (inBrowser) {
    const wrap = document.createElement("div");
    wrap.setAttribute("id", "gitalk-page-container");
    document.querySelector(".comment-container")?.appendChild(wrap);
    const gitTalk = new Gitalk({
      id: { name: `${location.pathname.replace(/\W/g, "")}` }, // 可选。默认为 location.href
      owner: "huli66", // GitHub repository 所有者
      repo: "blog-comment", // GitHub repo
      clientID: "d97a2204026e668cf7c8", // clientID
      clientSecret: "3dff54439d9b0ea248cf61f25c1992aca9595bb3", // clientSecret
      admin: ["huli66"], // GitHub repo 所有者
      labels: [{ name: "Gitalk" }], // GitHub issue 标签
      // proxy: "https://mellifluous-bombolone-049a57.netlify.app/github_access_token",
      createIssueManually: false, //如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
    });
    gitTalk.render("gitalk-page-container");
  }
};

onMounted(() => {
  init();
});
</script>
<template>
  <div class="comment-container"></div>
</template>
