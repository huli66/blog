import { defineConfig } from "vitepress";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDirctSidebar(pathname: string) {
  const p = path.resolve(__dirname, '../', pathname)
  if(!fs.existsSync(p)) return []
  const dirct = fs.readdirSync(p)
                  .filter(v=>v.endsWith('.md'))
                  .sort((a, b) => {
                    if(a==='index.md') return 1
                    if(a[0]!=='2') return 1
                    return a>b ? -1 : 1
                  })
  return dirct.map(dir=>{
    const text = dir.replace('.md','');
    return {
      text,
      link: `/${pathname}/${text}`
    }
  })
}

export default defineConfig({
  lang: "en-US",
  title: "Huli66",
  titleTemplate: "我的网站",
  description: "Huli66 study",
  appearance: true,
  lastUpdated: true,

  themeConfig: {
    logo: "/logo.svg",
    nav: nav(),
    sidebar: {
      "/blogs": [
        { text: "Blogs", items: getDirctSidebar("blogs")}
      ],
      "/": getDirctSidebar("/blogs"),
    },
    siteTitle: "上善若水",
    outlineTitle: "右侧栏目录",
    socialLinks: [
      { icon: "github", link: "https://github.com" },
      { icon: "twitter", link: "" },
    ],
    footer: {
      message: "Release under the MIT License",
      copyright: "Copyright © 2019-present Jianjun Hu",
    },
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    lastUpdatedText: "Updated Date",
  },
});

function nav() {
  return [
    { text: "", link: "" },
    { text: "", link: "" },
    { text: "", link: "" },
    { text: "", link: "" },
    {
      text: "menu",
      items: [
        { text: "", link: "" },
      ]
    }
  ]
}

function sideBarBlogs() {
  return [
    { text: "barTitle", link: "" },
    {
      text: "title",
      collpased: false,
      items: [
        { text: "bar", link: "" },
      ]
    }
  ]
}
