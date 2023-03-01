---
title: Express
editLink: 1233
lastUpdated: true
---

# 回车和换行

carriage return
换行：line feed

最早的机械英文打字机，“车”是指纸车，带着纸一起左右移动的模块，每行打第一个字之前，需要把纸车拉到最右边，上紧弹簧，打一个字符弹簧把纸车拉回去一点，打完一行后纸车就完全收回了，所以叫回车，换行意思就是，打字机左边有个把手，扳动纸就会上移一行
后来的电传打字机也有类似的问题

- **Unix 系统里，每行结尾只有 “<换行>”，即 “\n”**
- **Windows 系统每行结尾是“<回车><换行>”，即“\r\n”**
- **Mac 系统最早每行结尾是“回车”，现在也和 Unix 系统统一了，（macOS 和 the classic Mac OS）**

所以直接后果就是：**Unix/Mac 系统下的文件在 Windows 里打开，所有文字会变成一行，Windows 里的文件在 Unix/Mac 下打开，每行会多出一个 ^M 符号，（现在 git、ws_ftp 等都可以自动对换行符做转换），前端 ESLint 也会提示**

参考文章 [阮一峰的网络日志：回车和换行](https://www.ruanyifeng.com/blog/2006/04/post_213.html)
