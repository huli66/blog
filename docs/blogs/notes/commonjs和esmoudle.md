---
title: CommonJS 和 ESModule
lastUpdated: true
---

# CommonJS 和 ESModule

一个是导出一份值的拷贝，一个是导出值的引用；一个运行时加载，一个是静态编译时加载

CommonJS 通过模块缓存的方法解决循环引用问题，先检查是否有缓存，已有则不会进入执行，在模块缓存中记录导出的变量的拷贝值

ESModule 通过 模块地图 和 模块记录，一句进入过的模块标注为 fetching，遇到 import 语句会去检查这个地图，已经标注为获取中（fetching）则不会进入，地图每个节点是一个模块记录，上面有导出变量的内存地址，导入时会做一个连接，指向同一块内存

查找模块时，核心模块和文件模块都比较简单，第三方模块会从最近的 node_module 开始，递归往上找，找到包后根据 package.json 的 main 字段找到入口文件

CommonJS 的 module.export 和 export 指向同一块内存，但是由于最后导出的是 module.export 所以不能直接给 export 赋值，会导致指向丢失
