---
title: Electron
lastUpdated: true
---

# electron

## Processes in Electron

### 流程模型

继承了来自 Chromium 的多进程架构

每个 Electron 应用都有一个单一的主进程，作为程序的入口点，主进程在 Node.js 环境中运行，这意味着它可以使用 `require` 模块和 Node.js 的所有 API

#### 主进程

- 窗口管理

主进程的主要目的是用 `BrowserWindow` 模块创建和管理应用程序窗口
`BrowserWindow` 类的每个实例创建一个应用程序窗口，且在单独的渲染进程中加载一个网页，可以从主进程用 window 的 `webContent` 对象与网页内容进行交互

渲染器进程也是为 web embeds（web 嵌入） 而被创建的

由于 `BrowserWindow` 模块是一个 **EventEmitter（事件侦听器？可以侦听事件？）**，所以可以为各种用户事件添加处理程序

当一个 `BrowserWindow` 实例被销毁时，与其对应的渲染器进程也会被终止

- 应用程序生命周期
  主进程还能通过 Electron 的 `app` 模块来控制应用程序的生命周期，这个模块提供了大量用来添加自定义应用行为的事件和方法

- 原生 API
  为了使 Electron 的功能不仅仅限于网页内容的封装，主进程额添加了自定义的 API 来与用户的系统进行交互，完整列表请参阅 [API 文档](https://#)

#### 渲染器进程

渲染器无权直接访问 `require` 或其他 Node.js API。为了在渲染器中直接包含 NPM 模块，必须使用与在 Web 开发时相同的打包工具

注意 _以前是可以引用整个 Node.js 的，但是处于安全原因禁止了_

事实上，**确实没有直接导入 Electron 内容脚本的方法**

#### Preload 脚本

预加载脚本中包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码，这些脚本虽然运行于渲染器环境中，却因能访问 Node.js API 而拥有更多的权限

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

```js
// main.js
const { BrowserWindow } = require("electron");

const win = new BrowserWindow({
	webPreferences: {
		preload: "path/to/preload.js",
	},
});
```

预加载脚本与浏览器**共享同一个全局 `Window` 接口，并且可以访问 Node.js API，所以它通过在全局 `window` 中暴露任意 API 来增强渲染器，以便网页内容使用**，但是不能直接附加任何变动到 `window` 上，因为 `contextIsolation` 是默认的，**预加载脚本和渲染器主要运行环境是隔离开的，以避免泄露任何具有特权的 API 到网页内容代码**，**可以使用 `contextBridge` 模块来安全地实现交互**

**使用 `contextBridge` 模块来安全地实现交互**
`contextBridge.exposeInMainWorld` 不能用来绑定顶层变量 window 已有的属性（不能和 window 已有变量重复）

```js
// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("propName", "anyTypeValue");
```

这个功能很有用

可以通过**进程间通讯（inter-process communication，IPC）任务**来从渲染器触发主进程，反之亦然

### 上下文隔离 contextIsolation

**上下文隔离确保预加载脚本和 Electron 内部逻辑运行在所加载的 `webcontent` 网页之外的另一个独立上下文环境中**，有助于阻止网站访问 Electron 内部组件和预加载脚本可访问的高等级权限 API

Electron 12 后默认开启上下文隔离

没有上下文隔离可以在预加载脚本直接使用 `window.XXX = 'xxx'` 然后渲染器进程直接读取 XXX 值

有上下文隔离之后需要使用 `contextBridge` 模块，**不建议直接暴露高等级权限 API**

#### TypeScript 中使用

```ts
// renderer.d.ts
export interface IElectronAPI {
	loadPreferences: () => Promise<void>;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
```

### 进程间通信

#### 渲染器到主进程（单向）

_将单向 IPC 信息从渲染器进程发送到主进程，用 `ipcRender.send` 发送消息，用 `ipcMain.on` 接收_

main.js 中监听事件

```js
function handler(event, title) {
	const webContents = event.sender; // 拿到发消息的 web 嵌入
	const win = BrowserWindow.fromWebContents(webContents); // 根据嵌入找到对应的 window
	win.setTitle("title"); // 调用 window 的 API
}
ipcMain.on("set-title", handler);
```

preload.js 中用 `contextBridge.exposeInMainWorld` 暴露 `ipcRenderer.send()` 接口，**出于安全考虑，不要暴露完整接口**

```js
contextBridge.exposeInMainWorld("electronAPI", {
	setTitle: (title) => ipcRenderer.send("set-title", title),
});
```

render.js 中使用接口

```js
window.electronAPI.setTitle("newTitle");
```

#### 渲染器到主进程（双向）

_双向 IPC 通常是从渲染器进程代码调用主进程模块并等待结果，使用 `ipcRenderer.invoke` 和 `ipcMain.handle` 完成_

老版本可以用 `ipcRenderer.send` 来做

#### 主进程到渲染器

使用 `webContents` 模块从主进程发送消息给目标渲染进程

**preload 脚本中也可以获取操作 DOM，不过最好在 window 的 DOMContentLoaded 中操作，确保 DOM 在页面上**

如果 preload 和 renderer 中都监听了该消息，会在 renderer 中先触发回调，preload 中后触发

#### 渲染器进程到渲染器进程

没有直接方法可以使用 `ipcMain` 和 `ipcRenderer` 模块在 Electron 中的渲染器进程之间发送消息，可以间接做

- 将主进程作为渲染器之间的消息代理，一个渲染器发送消息给主进程，主进程转发给另一个渲染器
- 从主进程将一个 `MessagePort` 传递到两个渲染器，这将允许初始设置后渲染器之间直接进行通信

**Electron 的 IPC 实现使用 HTML 标准的 结构化克隆算法来序列化进程之间传递的对象，这意味着只有某些类型的对象可以通过 IPC 通道传递， DOM 对象、Node.js 中的 C++ 类支持的对象、Electron 中 C++ 类支持的对象，无法使用结构化克隆序列化**

### 进程沙盒化

Chromium 的一个关键安全特性是，进程可以在沙盒中执行，沙盒通过限制对大多数系统资源的访问来减少恶意代码可能造成的伤害--沙盒化的进程只能自由使用 CPU 周期和内存，为了执行需要额外权限的操作，沙盒处的进程哦通过专用信息渠道将任务下放给更大权限的进程

在 Chromium 中，沙盒化应用与主进程以外的大多数进程，包括 渲染器进程，以及功能性进程如音频服务、GPU 服务和网络服务

从 Electron 20 开始，不需要任何进一步配置沙盒就会被应用于渲染器进程

#### Electron 中的沙盒行为

Electron 中的渲染器进程被沙盒化时，它们的行为与常规的 Chrome 渲染器一样，一个沙盒化的渲染器不会有一个 Node.js 环境

在沙盒中，渲染器只能通过 **进程间通讯（inter-process communication, IPC）** 委派任务给主进程的方式来执行需要权限的任务，例如文件系统的交互，对系统更改等

**为了让渲染器进程能与主进程通信，附属于沙盒化的渲染进程的 preload 脚本中仍可以使用一部分以 Polyfill（填充） 形式的 Node.js API。有一个与 Node.js 中类似的 `require` 函数被提供了出来，但是只能载入 Electron 和 Node 内置模块的一个子集**
electron(仅限渲染器进程模块)
事件
timers
url

此外，Node.js 的基础对象也填充到了 preload 脚本的全局上下文中
Buffer
process
clearImmediate
setImmediate

`require` 函数只是一个功能有限的 Ployfill 实现，并不支持把 preload 脚本拆分为多个文件然后作为 CommonJS 模块来加载，若需要拆分 preload 脚本代码，可以使用 webpack 等打包工具

#### 配置沙箱

可以为特定的进程禁用沙箱，但是会带来安全风险

```js
const win = BrowserWindow({
	webPreferences: {
		sandobx: true,
	},
});
```

只要在渲染器进程中使用 Node 集成，沙箱就会被禁用，新版本**如果要在渲染器进程直接使用 Node(如 process)，还需要设置 `contextIsolation: false`，但是这样就不能使用 contextBridge 模块**

```js
const win = BrowserWindow({
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
	},
});
```

```js
// 在 ready 事件之前全局启动沙盒，强制沙盒化所有渲染器进程
app.enableSandbox();
```

### Electron 中的消息端口

`MessagePort` 是一个允许在不同上下文之间传递消息的 Web 功能，就像 `window.postMessage`，Web Worker 可以使用它

## Best Practices

## Renderer Process 模块

### clipboard

### contextBridge

### crashReporter

### desktopCapturer

### ipcRenderer

### nativeImage

### webFrame
