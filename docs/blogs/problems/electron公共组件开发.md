---
title: electron 公共组件开发
lastUpdated: true
---

# electron 公共组件开发

## 安装

##

## 下载器和下载进度条/保存图片/表格到本地

金融软件中有很多图表，我们的系统中有多处需要导出功能，老版本做法是 `把需要到处的数据转换为 Buffer，转换成本地链接，创建一个隐藏的 a 标签，填入 href 和 download 属性，触发下载`

```js
const downloadUrl = window.URL.createObjectURL(blob as Blob); // 把Buffer转换成URL对象
const a = document.createElement("a");
a.style.display = "none";
a.href = downloadUrl;
a.download = "文件名";
document.body.appendChild(a);
a.click();
window.URL.revokeObjectURL(downloadUrl); // 释放URL对象，帮助垃圾清理
document.body.removeChild(a);
```

- 缺点：
  - 无法看到进度
  - 无法添加下载完成和失败的回调

优化方案：在主进程中封装公共下载方法，渲染进程中传入 buffer、url、文件名和文件格式后缀、下载成功和失败回调，监听 `will-download` 事件

```js
// 要使用下载成功和失败的回调，可以保存在主进程中
// main.js
ipcMain.handle("download-data", (e, url) => {
  // mainWindow.webContents.downloadURL(url);
  Buffer.from(url, "base64url");
  const xlsxBuffer = saveAsXlsxFile(url);
  dialog
    .showSaveDialog(mainWindow, {
      title: "导出文件",
      defaultPath: "test.xlsx",
    })
    .then((res) => {
      const { filePath, canceled } = res;
      if (!canceled) {
        fs.writeFileSync(filePath, xlsxBuffer, "binary");
      }
    });
});

mainWindow.webContents.session.on(
  "will-download",
  (event, item, webContents) => {
    // 下载中
    item.on("updated", (event, state) => {
      if (state === "interrupted") {
        console.log("下载中断，无法恢复");
      } else if (state === "progressing") {
        if (item.isPaused) {
          console.log("下载暂停");
        } else {
          const progress = item.getReceivedBytes() / item.getTotalBytes();
          console.log("进度", progress);
          mainWindow.setProgressBar(progress);
        }
      }
    });

    // 下载结束
    item.on("done", (e, state) => {
      if (state === "completed") {
        console.log("下载成功");
        webContents.send("download-success");
      } else if (state === "interrupted") {
        console.log("下载失败");
      } else {
        console.log("已取消下载");
      }
    });
  }
);
```
