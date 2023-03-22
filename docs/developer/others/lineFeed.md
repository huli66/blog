---
title: CRLF & LF
editLink: 1233
lastUpdated: true
---

# CRLF & LF

## 回车和换行

carriage return
换行：line feed

最早的机械英文打字机，“车”是指纸车，带着纸一起左右移动的模块，每行打第一个字之前，需要把纸车拉到最右边，上紧弹簧，打一个字符弹簧把纸车拉回去一点，打完一行后纸车就完全收回了，所以叫回车，换行意思就是，打字机左边有个把手，扳动纸就会上移一行
后来的电传打字机也有类似的问题

- **Unix 系统里，每行结尾只有 “<换行>”，即 “\n”**
- **Windows 系统每行结尾是“<回车><换行>”，即“\r\n”**
- **Mac 系统最早每行结尾是“回车”，现在也和 Unix 系统统一了，（macOS 和 the classic Mac OS）**

所以直接后果就是：**Unix/Mac 系统下的文件在 Windows 里打开，所有文字会变成一行，Windows 里的文件在 Unix/Mac 下打开，每行会多出一个 ^M 符号，（现在 git、ws_ftp 等都可以自动对换行符做转换），前端 ESLint 也会提示**

## 项目处理

- 项目开发人员使用 Mac 和 Windows 设备共同开发

通过 VSCode 处理此问题，可以保证 win 拉取代码都不需要再过多格式处理，拉取下来就可以直接跑项目

**全部统一使用 lf 结尾是处于两点原因考虑：1.Mac（开发） CentOS（部署） Linux 都是以 `\n` 换行 2.大部分脚手架创建项目都是 lf 格式**

1. 添加 .vscode/settings.json 文件，跟着项目一起上传到 git，并且 git 的 config 进行修改（默认是 true，会自动转化）

```json
{
  "typescript.tsdk": "node_modules\\typescript\\lib", // 使用项目的 TS 版本，而不是 VSCode 的 TS 版本
  "files.eol": "\n" // 保证创建新文件都是以 lf 换行
}
```

2. 终端运行 `git config --global core.autocrlf false` 关闭 git 拉代码自动转换 lf 和 crlf 功能

3. .eslintrc.js

```js
module.exports = {
  rules: {
    "linebreak-style": ["2", "unix"],
  },
};
```

4. .prettierrc.js

```js
module.exports = {
  endOfLine: "lf",
};
```

如果现有项目中文件的格式 crlf 和 lf 不统一，可以使用 `npx prettiers --write ./src` 来全部改写

- 项目没有注意时 ESLint 和 prettier 规则冲突

这种情况下可以通过添加规则 `linebreak-style` 等，或者引入插件处理

参考文章 [阮一峰的网络日志：回车和换行](https://www.ruanyifeng.com/blog/2006/04/post_213.html)
