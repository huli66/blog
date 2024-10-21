---
title: Server-Sent Event
lastUpdated: true
---

# Server-Sent Event

## SSE 对比 WebSocket

- SSE 使用 HTTP 协议，现有的服务器软件都支持；WebSocket 是一个独立协议
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂
- SSE 是单向通道，只能服务端发往浏览器，本质上是流信息下载；WebSocket 是全双工通道
- SSE 默认支持断线重连；WebSocket 需要自己实现
- SSE 一般只用来传送文本，二进制需要编码后传送；WebSocket 默认支持二进制数据
- SSE 支持自定义发送的消息类型

## http2 主动推送数据的原理和实现
