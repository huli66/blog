---
title: React合成事件
lastUpdated: true
---

# React 合成事件

React 事件系统的大致原理分为三步

1.在 createRoot 的时候挂载所有支持的原生事件
（React 18.1.0 中 react-dom/src/ReactDOMRoot.js 文件中 createRoot 函数，执行完 createContainer 之后执行 listenToAllSupportedEvents，原理就是监听挂载容器上所有原生事件，原生事件触发后 dispatch 对应的事件）

2.dispatch 过程

- 通过参数把事件 e 传递进来，触发事件的真实 DOM 就是 e.target，然后收集 e.target 到 container 之间的 捕获和冒泡事件

- 构造一个合成事件，里面有一个是否阻止冒泡的属性，阻止冒泡方法就直接调用原生的

- 捕获事件数组挨个执行

- 冒泡事件数组挨个执行

这里要注意事件执行顺序：先执行捕获事件，再执行冒泡事件，捕获从外层往内层执行，冒泡从内层往外层

3.在 mount 和 update 过程中添加和更新保存事件回调函数的属性，在 DOM 的一个属性上保存所有回调函数比如 onClick onClickCapture

## 有个坑

在 Chrome 上 console.log 输出 e.target 和 e.currentTarget 都有结果，但是直接 console.log(e) 打印结果里面 e 的 currentTarget 值显示 null
