---
title: Vite
lastUpdated: true
---

# Vite

::: tips esbuild

- js 是单线程串行，[esbuild](https://esbuild.github.io/) 是新开一个进程，然后多线程并行，充分发挥多核优势
- go 是纯机器码，比 JIT 快，（比 JS 编写的打包预构建器依赖快 10 - 100 倍）
- 不使用 AST 优化了构建流程（也带来了缺点：没有 AST 功能，部分通过 AST 处理代码的 babel-plugin 没有很好的方法过渡）
- 不兼容低版本浏览器，只能代码转换成 es6
  :::
