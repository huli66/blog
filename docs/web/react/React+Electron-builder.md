---
title: React + Electron + Typescript + Webpack + Electron-builder 实践
lastUpdated: true
---

# React

## 初始化

- 创建项目

```sh
npx create-react-app plt-micro-test --template typescript
```

`.gitignore` 文件中添加 `build`, `electron_build`, `release` 等工程化产物

- 添加依赖

```sh
npm install -D electron electron-builder babel-loader webpack
```

- 创建 electron 目录，清理 React 暂时用不上的文件

```md
├── electron
│ ├── script
│ │ └─ build.js
│ ├── config
│ │ └─ webpack.config.js
│ └── main.js
├── electron_build
├── node_modules
├── public
├── src
│ ├── assets
│ └── components
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

- package.json 文件修改

```json
{
  "main": "electron/main.js", // 执行 electron . 时的入口
  "scripts": {
    "web:start": "react-scripts start",
    "web:build": "react-scripts build",
    "electron:start": "electron .", // 启动 electron 程序，参考 Electron 官方文档
    "electron:build": "node electron/script/build",
    "pack": "electron-builder --win --x64",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "homepage": "./"
  // ....
}
```

## 主进程（Electron）

- 启动主进程

将之前初始化的 React 项目跑起来 `npm run web:start`，默认端口 3000，然后再开一个终端启动 electron 程序 `npm run electron:build`，此时 electron 窗口中是之前的 React 项目启动页面

```js
// electron/main.js
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

- 打包主进程

执行 `npm run electron:build` 命令打包主进程，会自动生成 `electron_build` 目录，里面有打包结果

```js
// electron/config/webpack.config.js
const path = require("path");
const pathResolve = (dir = "") => path.join(__dirname, "..", dir);

/**
 * 打包 electron 的配置
 */

/** @type {import('webpack').Configuration} */
const config = {
  mode: "production",
  devtool: "cheap-module-source-map",
  target: "electron-main",
  entry: pathResolve("main.js"),
  output: {
    path: path.join(__dirname, "../../electron_build"),
    filename: "electron.js",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};

module.exports = config;
```

```js
// electron/script/build.js
const webpack = require("webpack");
const config = require("../config/webpack.config");

const compiler = webpack(config);
const TAG = "[electron/script/build.js]";

compiler.hooks.beforeCompile.tap(TAG, (arg0) => {
  console.log(TAG, console.log("Electron webpack 开始构建"));
});

compiler.run((err, stats) => {
  if (err) {
    // err 对象将只包含与webpack相关的问题，例如错误配置等
    console.log(TAG, console.log("Electron webpack 相关报错"));
  } else if (stats.hasErrors()) {
    // webpack 编译报错
    console.log(TAG, console.log("Electron 构建报错"));
  } else {
    console.log(TAG, console.log("Electron webpack 构建完成"));
  }
});
```

将 `package.json` 中的 `main` 换成打包结果地址，再次启动主进程，现在是使用打包结果启动的了

```json
{
  "main": "electron_build/electron.js"
}
```

## 渲染进程（React 项目）

- 打包项目

执行 `npm run web:build` 打包项目，会自动生成 `build` 目录，里面有打包产物

直接在浏览器打开打包结果的 `build/index.html`，可以看到页面

## 构建项目

我们希望最终的结果是**主进程的打包结果跑起来，然后从渲染进程的打包结果中读取 index.html**

所以要对 `electron/main.js` 进行修改，使之适配生产和开发两种情况

```js
/** 获取启动路径 */
const getWindowPath = () => {
  const ELECTRON_START_URL = "http://localhost:3000";
  const isDev = process.env.NODE_ENV === "development";
  console.log("isDev", isDev);
  return isDev
    ? ELECTRON_START_URL
    : `file://${join(__dirname, "..")}/build/index.html`;
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(getWindowPath());
};
```

`process.env.NODE_ENV` 是自定义环境变量，用 `cross-env` 可以设置运行时的环境变量，`webpack.config.js` 中的 `mode` 值优先级高于 cross-env

**这里为了开发环境和生产环境都使用主进程打包结果，但是本地开发渲染进程使用本地地址，生产环境渲染进程使用打包结果，主进程的 `webpack.config.js` 中 `mode` 设置为 `none`，这样本地开发时就可以通过 `cross-env` 传递 `process.env.NODE_ENV` 让主进程渲染本地内容**

```sh
npm install -D cross-env
```

修改 `package.json` 中的配置，添加 `dev` 命令用于开发调试

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development electron ."
  }
}
```

参考文档 [Electron-builder 打包详解](https://github.com/QDMarkMan/CodeBlog/blob/master/Electron/electron-builder%E6%89%93%E5%8C%85%E8%AF%A6%E8%A7%A3.md)
