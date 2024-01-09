---
title: 不显示其他人的 console
lastUpdated: true
---

# 不显示其他人的 console

## 问题背景

项目比较老，早期代码规范执行不严格，保留了很多调试的 console 记录，导致现在使用 console 输出来调试时非常不友好
但是不能大量更改老代码，现有的移除 console 的 loader 是用于生产模式的，希望既能够友好调试，又不影响

## 解决思路和实现方法

初步思路是写一个 webpack loader 或者 babel plugin

- webpack loader 是参考社区现有的移除 console 的插件
- babel plugin 是考虑到在 AST 中可以比较准确判断是否 console 调用

实现分为四步

- 获取公共数据，当前用户 child_process.execsync("git config user.name")，和系统信息（不同系统处理信息不一样，findstr/grep）
- 根据 AST 特征找到 console 语句
  - 判断是否函数调用表达式，node.callee.object.name 是否为 console，node.loc.start 来确认是第几行
- 根据行数通过 child_process.execSync 执行 git blame -L 行数，来获取那一行的信息，并提取 author
- 判断作者是否是当前用户或者 Not Commit，进行删除或者修改 arguments 操作（加上行数等信息）

## 缺点和可扩展方向

缺点，对冷启动性能影响大，原来冷启动大概 40s，加上后 50s 了，但是后续热更新影响不大
主要影响原因是遇到 console 要执行一次 `child_process.execSync()`

还可以写成 webpack loader 形式

## 代码

```json
// .babel.config.js
module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": ["remove-console"]
}
```

```js
const types = require("@babel/types");
const os = require("os");
const childProcess = require("child_process");

const userName = childProcess.execSync("git config user.name", {
  encoding: "utf-8",
});

const findStr = os.type() === "Windows_NT" ? "findstr" : "grep";

const removeConsolePlugin = {
  visitor: {
    CallExpression(path, state) {
      const callee = path.get("callee");
      const { node } = path;

      if (types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === "console") {
          const { line, column } = node.loc.start;
          const authorInfo = childProcess.execSync(
            `git blame -L ${line},${line} --porcelain ${state.filename} | ${findStr} "^author "`,
            { encoding: "utf-8" }
          );
          const author = authorInfo
            .slice(authorInfo.indexOf(`author `) + 7)
            .split("\n")[0];

          // node.arguments.push(
          //   types.stringLiteral(`${userName}, ${author}, ${line}:${column}}`)
          // );
          if ([userName, "Not commit"].include(author)) {
            // 移除代码
            path.remove();
          }
        }
      }
    },
  },
};

module.exports = () => {
  return removeConsolePlugin;
};
```
