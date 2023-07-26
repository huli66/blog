---
title: DNS
lastUpdated: true
---

# DNS

## 域名

根域名 `.` 因为所有域名这部分都相同，所以省略

顶级域名 `.com` `.cn` 分为通用顶级域名 gTLD 和国别顶级域名 ccTLD

一级域名就是通常在某个顶级域名下购买的域名，如 `github.com`

二级域名就是一级域名的子域名 `huli66.github.com`，一级域名拥有者可以自行设置，不需要得到许可

只有知道上级域名，才知道下级域名的 IP 地址，需要逐级查询

## 服务器

```sh
# 安装 dig
yum install bind-utils

# 查询
dig @1.1.1.1 hujianjun.asia
```

[a~m].root-servers.net 根域名服务器，全世界有 13 台，IP 地址是不变的，集成在操作系统里
操作系统会选择其中一台，查询 TLD 服务器的 IP 地址

```sh
# 在 198.41.0.4（a.root-servers.net） 这台根域名服务器上查询
dig @198.41.0.4 hunjianjun.asia
```

返回 \*.gtld-servers.net. TLD 服务器，(返回顶级域名的 DNS 服务器地址，比如 .com .asia 的)

```sh
# 在 顶级域名 .asia 的一台 TLD 服务器 上继续查询
dig @199.19.55.1 hujianjun.asia
```

1.1.1.1 递归 DNS 服务器 把分步骤查询结果自动化，方便用户一次性得到结果
