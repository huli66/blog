---
title: websocket重构和状态检测
lastUpdated: true
---

# websocket 重构和状态检测

## 问题背景

websocket 连接较多且分散，不同组件调用相同或不同的 websocket，重复连接消耗性能

断开重连后不需要刷新页面重新连接，断开重连后事件保持

网络断开不会触发 onclose 和 onerror，需要添加状态检测功能

## 解决思路

统计所有连接，部分常用的连接（比如系统信息包括服务端时间）
一个文件维护所有订阅的标识及其 url

解藕 websocket 和事件

系统打开时 批量订阅常用部分

## 问题和难点

类型需要通用

状态变化比较多（考虑了存在 ref 里和 state 里）

## 实现过程

枚举所有连接，16 位二进制（最开始是字符串，但是维护操作不方便），方便状态检测

socketMap

callbackMap

### 封装一个 createWebSocket 方法

```ts
const createWebSocket = (props: { socketServer: SocketServer, onStatusChange: (socketServer: SocketServer, flag: boolean) } => void): void => {
  // 1.创建

  // 2.给 onerror onclose 事件添加重连和改变状态功能

  // 3.onopen 添加心跳检测功能

  // 4.onmessage 添加事件处理
}
```

### closeWebSocket 方法

清除单个，清除整个 map

### subscribeMessage 方法

如果已经订阅了，那么就直接添加 callbackmap
如果没有就创建新连接，添加 socketmap 和 callbackMap

### unSubscribeMessage 方法

socketMap 删除对应 socketServer 的一个 id，callbackMap 删除对应 id

### heartBeat

### changeStatus

```ts
const changeStatus = (socketServer: SocketServer, flag: boolean) => {
  if (flag) {
    // 移除标志
  } else {
    // 添加标志，按位与
  }
};
```

位运算的优势，重复计算不会改变结果，不会改变状态就不会导致 refresh

status 作为一个需要全局查看的状态，放在 App.tsx 里，一个 state
变化了就进行一次计算
判断状态，只需要所有都进行位运算是否为 NoFlags
