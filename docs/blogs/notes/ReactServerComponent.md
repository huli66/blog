---
title: RSC
lastUpdated: true
---

# RSC

传统前后端分离模式下以 http 请求和 api 为界区分前后端

SSR（Server Side Rending）服务端渲染：后端（更准确来说是服务端、服务器）运行了 React 组件，生成了一份初始状态的 html，但是这份 html 没有可交互性，只是未来让用户尽早看到页面的一种优化

RSC 服务端组件：同一个项目中，部分组件作为 Server Components 部分组件作为 Client Components，既可以享受到后端内部调用接口的便捷，又可以保证页面的可交互性几乎没有任何妥协

:::tip
PHP + bootstrap + jQuery 这套范式的升级
:::

Server Components 可以使用后端的全部能力，不管是中间件，还是微服务调用，访问 db，直接从源头获取数据，这样就不再需要传统意义上的 API 了
