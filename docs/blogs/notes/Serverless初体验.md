---
title: Serverless 初体验
lastUpdated: true
---

# Serverless 初体验

```sh
# node > 12, 安装
npm i -g serverless-cloud-framework
# 升级
npm update -g serverless-cloud-framework
# scf 是缩写
scf -v

mkdir test-serverless
cd test-serverless
serverless-cloud-framework
# 模版选择 scf-starter 快速部署一个云函数，找不到就往下往上查找
# 选择 scf-nodejs 快速部署一个 nodejs 云函数

# 立即部署到云端，微信扫码登录，如果没有认证可能会失败，需要认证之后重新部署
scf deploy
# 查看状态和资源
scf info
```

`.env` 配置文件可以添加配置

```sh
# 中文引导
SERVERLESS_PLATFORM_VENDOR=tencent
# 开启境外加速
GLOBAL_ACCELERATOR_NA=true
# 配置代理
HTTP_PROXY=http://127.0.0.1:1234
HTTPS_PROXY=http://127.0.0.1:4321
```

比起直接使用云服务器更方便一些，各有优势
云函数不需要考虑峰值性能等问题，
小规模团队使用比较划算，个人使用也是
但是考虑到隐私或者成本，就不一定了
