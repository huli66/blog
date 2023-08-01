import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDirctSidebar(pathname: string) {
  const p = path.resolve(__dirname, "../", pathname);
  if (!fs.existsSync(p)) return [];
  const dirct = fs
    .readdirSync(p)
    .filter((v) => v.endsWith(".md") && v !== "index.md")
    .sort((a, b) => {
      if (a === "index.md") return 1;
      if (a[0] !== "2") return 1;
      return a > b ? -1 : 1;
    });
  return dirct.map((dir) => {
    const text = dir.replace(".md", "");
    return {
      text,
      link: `/${pathname}/${text}`,
    };
  });
}

export default defineConfig({
  lang: "zh-cn",
  title: "HuJianjun",
  titleTemplate: "胡建军的博客",
  description: "Huli66 study",
  appearance: true,
  lastUpdated: true,
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/head.jpg", sizes: "16x16" }]],

  themeConfig: {
    logo: "/logo.svg",
    nav: nav(),
    sidebar: {
      "/blogs": [
        {
          text: "随笔",
          items: [
            {
              text: "随手记录",
              // collapsed: false,
              items: getDirctSidebar("blogs/notes"),
            },
            {
              text: "问题解决",
              collapsed: true,
              items: getDirctSidebar("blogs/problems"),
            },
          ],
        },
      ],
      "/web": [
        {
          text: "学习记录",
          items: [
            {
              text: "JS & H5 & C3",
              collapsed: false,
              items: getDirctSidebar("web/protogenesis"),
            },
            {
              text: "React",
              collapsed: false,
              items: getDirctSidebar("web/react"),
            },
            {
              text: "Vue",
              collapsed: false,
              items: getDirctSidebar("web/vue"),
            },
            {
              text: "工程化",
              collapsed: false,
              items: getDirctSidebar("web/engineering"),
            },
            {
              text: "Node",
              collapsed: false,
              items: getDirctSidebar("web/node"),
            },
            {
              text: "TypeScript",
              collapsed: false,
              items: getDirctSidebar("web/TypeScript"),
            },
            {
              text: "翻译",
              collapsed: false,
              items: getDirctSidebar("web/translate"),
            },
          ],
        },
      ],
      "/developer": [
        {
          text: "程序员基础",
          items: [
            {
              text: "算法",
              collapsed: true,
              items: getDirctSidebar("developer/algorithms"),
            },
            {
              text: "设计模式",
              collapsed: true,
              items: getDirctSidebar("developer/designpattern"),
            },
            {
              text: "开发者常识",
              collapsed: false,
              items: getDirctSidebar("developer/others"),
            },
          ],
        },
      ],
      "/about": [{ text: "关于", items: getDirctSidebar("about") }],
      "/": getDirctSidebar("/blogs"),
    },
    siteTitle: "🍁狐篱",
    outlineTitle: "目录",
    socialLinks: [
      { icon: "github", link: "https://github.com/huli66" },
      { icon: "twitter", link: "" },
    ],
    footer: {
      message: "风华正茂 书生意气",
      copyright: "Copyright © 2023-present Jianjun Hu",
    },
    editLink: {
      pattern: "https://github.com/huli66/blog-vitepress/:path",
      text: "Edit this page on GitHub",
    },
    lastUpdatedText: "最近更新时间",
  },
});

function nav() {
  return [
    {
      text: "随笔",
      link: "/blogs/index",
      items: [
        { text: "问题解决", link: "/blogs/problems/index" },
        { text: "随手记录", link: "/blogs/notes/index" },
      ],
    },
    {
      text: "学习记录",
      link: "/web/index",
      items: [
        { text: "JS&H5&C3", link: "/web/protogenesis/index" },
        { text: "React", link: "/web/react/index" },
        { text: "Vue", link: "/web/vue/index" },
        { text: "工程化", link: "/web/engineering/index" },
        { text: "翻译", link: "/web/translate/index" },
      ],
    },
    {
      text: "程序员基础",
      link: "/developer/index",
      items: [
        { text: "算法", link: "/developer/algorithms/index" },
        { text: "设计模式", link: "/developer/designpattern/index" },
        { text: "开发者技能", link: "/developer/others/index" },
      ],
    },
    {
      text: "翻译",
      link: "/translate/index",
      // items: [
      //   { text: "Next.js", link: "/developer/algo" },
      //   { text: "Babel", link: "/developer/index" },
      //   { text: "blogs", link: "/developer/algo" },
      // ],
    },
    {
      text: "关于",
      link: "/about/index",
      // items: [
      //   { text: "本站历史", link: "/about/siteHistory" },
      //   { text: "生活记录", link: "/about/life" },
      //   { text: "个人简介", link: "/about/introduce" },
      // ],
    },
  ];
}
