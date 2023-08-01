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
维护全局变量

socketMap: 保存已经连通的 websocket

callbackMap: 保存回调事件

### 封装基础方法

先封装基础的方法

- createWebsocket
- closeWebsocket
- subscribeMessage
- unSubscribeMessage
- reconnect

```ts
const createWebsocket = (props: { socketServer: SocketServer, onStatusChange: (socketServer: SocketServer, flag: boolean) } => void): void => {
  // 1.创建
  // 2.给 onerror onclose 事件添加重连和改变状态功能
  // 3.onopen 添加心跳检测功能
  // 4.onmessage 添加事件处理
  // 5.保存到 socketMap
}

const closeWebsocket = (socketServer: SocketServer): void => {
  // 1.关闭websocket
  // 2.释放空间
}

const unSubscribeWebsocket = (
  socketServer: SocketServer,
  subscribeParams: any
): string => {
  // 1.判断是否订阅过，没有则 createWebsocket
  // 2.生成唯一 id，把回调事件添加到 callbackMap，返回 id
};

const unSubscribeWebsocket = (
  socketServer: SocketServer,
  subscribeParams: any
) => {
  // 1.移除事件map中对应id 的事件
  // 2.判断是否还有事件，没有则 closeWebsocket
};

const reconnect = () => {

}
```

### 封装心跳检测方法

到这里其实 websocket 方法已经可以满足功能了，但是没有把状态暴露出去

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
判断状态，只需要所有 socketServer 都进行位运算是否为 NoFlags，哪个不是则哪个状态有问题

需要注意，服务没起来时创建 websocket 会直接触发 onerror + onclose
服务起来了，但是对应的 websocket 地址没有会触发 onopen + onclose
所以不要在这几个事件里去改变 status ，应该通过心跳来判断是否连上了

### 后续

可以考虑将这些方法和状态封装成自定义 hooks，方便直接在其他地方直接获取状态

## 完整代码

[完整代码和调试](https://github.com/huli66/websocket-test.git)

```typescript
import { useState } from "react";
import { genID } from "../utils/commonFn";

export enum SocketServer {
  MDM = 0x000001,
  TDM = 0x000010,
  SCM = 0x000100,
}

const socketUrlMap: Map<SocketServer, string> = new Map([
  [SocketServer.MDM, "ws://localhost:3000/mdm"],
  [SocketServer.TDM, "ws://localhost:3000/tdm"],
  [SocketServer.SCM, "ws://localhost:3000/scm"],
]);

// TODO: 改成数组存储也可以
const socketMap: Map<SocketServer, WebSocket> = new Map();
const callbackMap: Map<
  SocketServer,
  Map<string, (message: unknown) => void>
> = new Map();
const lockReconnectLockMap: { [socketServer: string]: boolean } = {};

export const useWebsocket = () => {
  const [status, setStatus] = useState(0x000000);
  const changeStatus = (socketServer: SocketServer, isConnected: boolean) => {
    console.log(socketServer, isConnected);
    if (!isConnected) {
      setStatus((oldStatus) => {
        return (oldStatus |= socketServer);
      });
    } else {
      setStatus((oldStatus) => {
        return (oldStatus &= ~socketServer);
      });
    }
  };

  const createWebsocket = (socketServer: SocketServer) => {
    const url = socketUrlMap.get(socketServer) || "";
    console.log("url", url);
    const websocket = new WebSocket(url);
    const onStatusChange = (isConnected: boolean) =>
      changeStatus(socketServer, isConnected);

    socketMap.set(socketServer, websocket);
    heartCheck.start(socketServer);

    websocket.onopen = (e) => {
      console.log("open", e, socketServer);
    };

    websocket.onmessage = (e) => {
      if (e.data === "PONG") {
        heartCheck.clear(socketServer);
        onStatusChange(true);
        return;
      }
      const socketServerCallback = callbackMap.get(socketServer);
      socketServerCallback?.forEach((callback) => {
        callback(e.data);
      });
    };

    websocket.onerror = (e) => {
      console.log("error", e);
    };

    websocket.onclose = (e) => {
      console.log("close", e);
    };

    return websocket;
  };

  interface SubScribeParams<T = unknown, K = unknown> {
    callback: (message: T) => void;
    params?: K;
  }

  const subscribeWebsocket = (
    socketServer: SocketServer,
    subscribeParams: SubScribeParams
  ) => {
    // 1.判断是否订阅过
    let websocket = socketMap.get(socketServer);
    console.log(websocket);
    if (websocket) {
      console.log("已经订阅过");
    } else {
      websocket = createWebsocket(socketServer);
    }

    // 2.生成唯一id，保存回调事件
    const subscribeId = genID("socket");

    if (callbackMap.has(socketServer)) {
      const serverCallback = callbackMap.get(socketServer);
      serverCallback?.set(subscribeId, subscribeParams.callback);
      websocket.send(
        JSON.stringify({
          id: subscribeId,
          params: subscribeParams.params,
        })
      );
    }

    return { websocket, subscribeId };
  };

  const unSubscribeWebsocket = (
    socketServer: SocketServer,
    subscribeId: string
  ) => {
    // 1.移除事件map中对应id 的事件
    const serverCallback = callbackMap.get(socketServer);
    serverCallback?.delete(subscribeId);
    console.log(serverCallback?.size);
    // 2.判断是否还有事件，没有则 closeWebsocket
    if (serverCallback?.size === 0) {
      closeWebsocket(socketServer);
    }
  };

  const reconnect = (socketServer: SocketServer) => {
    if (lockReconnectLockMap[socketServer]) return;
    //没连接上会一直重连，设置延迟避免请求过多
    lockReconnectLockMap[socketServer] = true;
    setTimeout(() => {
      createWebsocket(socketServer);
      lockReconnectLockMap[socketServer] = false;
    }, 6000);
  };

  interface IHeartCheckType {
    timeout: number;
    timeoutId: { [socketServer: number]: number };
    sendCount: { [socketServer: number]: number };
    start: (socketServer: SocketServer) => void;
    clear: (socketServer: SocketServer) => void;
  }
  const heartCheck: IHeartCheckType = {
    timeout: 2000,
    timeoutId: {},
    sendCount: {},
    start: function (socketServer) {
      clearInterval(this.timeoutId[socketServer]);
      this.timeoutId[socketServer] = setInterval(() => {
        const websocket = socketMap.get(socketServer) as WebSocket;
        if (websocket?.readyState === 1) {
          websocket.send(`PING`);
        }
        this.sendCount[socketServer] += 1;
        if (this.sendCount[socketServer] > 3) {
          changeStatus(socketServer, false);
          websocket.onclose = null;
          websocket.onerror = null;
          reconnect(socketServer);
        }
      }, this.timeout);
    },
    clear: function (socketServer) {
      this.sendCount[socketServer] = 0;
    },
  };

  const closeWebsocket = (socketServer: SocketServer) => {
    // 1.关闭websocket
    const websocket = socketMap.get(socketServer);
    websocket && websocket.close();
    // 2.释放空间
    socketMap.delete(socketServer);
    callbackMap.delete(socketServer);
  };

  return {
    subscribeWebsocket,
    unSubscribeWebsocket,
    status,
  };
};
```
