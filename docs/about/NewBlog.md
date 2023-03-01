---
title: 新建博客模板
editLink: 1233
lastUpdated: true
---

# 新建博客模板

访问 `frontmatter` 的内容

{{ $frontmatter.title }}

`title` `titleTemplate` `description` 会覆盖 config.js 中对应的应用配置

`head` 要额外注入的头部标签

```yaml
head:
  - - meta
    - name: description
      content: hello
  - - meta
    - name: keywords
      content: super duper SEO
```

## config

可以使用 jsdoc 类型提示，或者 `defineConfig` 辅助函数

```js
// jsdoc 提示
/**
 * @type {import('vitepress').UserConfig}
 */

// 辅助函数提示
import { defineConfig } from "vitepress";
export default defineConfig({
  // ...
});

// 自定义主题进行类型检查和提示
import { defineConfigWithTheme } from 'vitepress'
import { ThemeConfig } from 'your-theme'
export default defineConfigWithTheme<ThemeConfig>({
  themeConfig: {}
})
```

## doc

默认文档样式

## home

主页布局，可以添加 `hero` 和 `feature`

```yaml
---
layout: home

hero:
  name: VuePress
  text: Vite & Vue powered static site generator
  tagline: Lorem ipsum...
  actions:
    - theme: brand
      text: Get Started
      link: /NewBlog
    - theme: alt
      text: View on Github
      link: https://github.com/vuejs/vitepress

features:
  - icon: ⚡
    title: Vite, The DX that can't be beat
    details: Lorem ipsum...
  - icon: 🖖
    title: Power of Vue meets Markdown
    details: Lorem ipsum...
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
---
```

## page

类似于 `doc` 但将样式应用于内容，如果要创建自定义页面可以使用

## markdown

配置 Markdown 解析器选项，VitePress 使用 [Markdown-it](http://www.baidu.com) 作为解析器，Shiki 高亮语言语法

定义行高亮 `{2, 5, 7-8, 99}`

```typescript
interface MarkdownOptions extends MarkdownIt.Options {
  // 自定义主题来高亮语法
  // 可以使用现有的主题。
  // 参考: https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
  // 或者添加自己的主题.
  // 参考: https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
  theme?:
    | Shiki.IThemeRegistration
    | { light: Shiki.IThemeRegistration; dark: Shiki.IThemeRegistration };

  // 在代码块中启用行号。
  lineNumbers?: boolean;

  // markdown-it-anchor plugin options.
  // See: https://github.com/valeriangalliat/markdown-it-anchor#usage
  anchor?: anchorPlugin.AnchorOptions;

  // markdown-it-attrs plugin options.
  // See: https://github.com/arve0/markdown-it-attrs
  attrs?: {
    leftDelimiter?: string;
    rightDelimiter?: string;
    allowedAttributes?: string[];
    disable?: boolean;
  };

  // @mdit-vue/plugin-frontmatter plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter#options
  frontmatter?: FrontmatterPluginOptions;

  // @mdit-vue/plugin-headers plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers#options
  headers?: HeadersPluginOptions;

  // @mdit-vue/plugin-sfc plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc#options
  sfc?: SfcPluginOptions;

  // @mdit-vue/plugin-toc plugin options.
  // See: https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
  toc?: TocPluginOptions;

  // Configure the Markdown-it instance.
  config?: (md: MarkdownIt) => void;
}
```

## 容器

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger STOP
This is a dangerous warning.
:::

::: danger
This is a dangerous warning.
:::

:::details 点击提示
提示
:::

::: raw
raw 用法
:::
