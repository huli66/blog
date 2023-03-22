---
title: process
lastUpdated: true
---

# process

[[toc]]

process 对象时 Node 的一个全局对象，提供当前 Node 进程的信息，可以在脚本的任意位置使用，不需要通过 require 命令加载，该对象部署了 EventEmitter 接口

## 属性

- process.argv: 返回一个数组，成员是当前进程的所有命令行参数，第一个成员总是 node，第二个成员是脚本文件名
- process.env: 返回一个对象，成员是当前 Shell 的环境变量，比如 process.env.HOME
- process.installPrefix: 返回要给字符串，表示 Node 安装路径的前缀，比如 /usr/local，相应的，Node 执行文件目录为 /usr/local/bin/node
- process.pid: 返回一个数字，代表当前进程的进程号
- process.platform: 返回一个字符串，表示当前的操作系统，比如 Linux win32
- process.title: 返回一个字符串，默认值为 node，可以自定义该值
- process.version: 返回一个字符串，表示当前使用的 Node 版本，比如 v7.10.0

## 方法

## process.nextTick()

## 事件

## 进程的退出码

## 参考链接
