---
title: Nginx 基础配置入门
lastUpdated: true
---

# Nginx

环境: CentOS 7.8`

## 安装前置软件

```sh
yum -y install gcc gcc-c++ autoconf pcre-devel make automake
yum -y install wget httpd-tools vim
```

CentOS 本身的 yum 源里面是没有 Nginx 的，所以需要换源，当然也可以下载解压安装
如果是 阿里云 或者 腾讯云 已经配置好了，就可以跳过换源步骤，直接跳到安装步骤

```sh
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# 或者
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 服务器的包信息下载到本地缓存
yum makecache

# 安装 epel 源，然后 yum install 命令就可以从 epel 源安装额外的软件包了
yum install epel-release
```

`mv` 移动或者重命名文件

## 安装

```sh
#
yum list | grep nginx
# 如果不换源会报错 No package nginx available
yum install nginx

nginx -v
# rpm 是 linux 的 rpm 包管理工具，-q 代表询问模式，-l 代表返回列表
# 查看 nginx 的所有安装位置
rpm -ql nginx
```

## 配置

`nginx.conf` 是 `Nginx` 的总配置文件，也是搭建服务器经常调整的文件

```sh
cd /etc/nginx
vim nginx.conf
```

```sh
# 运行用户，默认 nginx，可以不设置，但是有可能出现权限问题
user  nginx;
# Nginx 进程，一般设置为和 CPU 核数一样的
worker_processes  1;
# 错误日志存放目录
error_log /var/log/nginx/error.log warn;
# 进程 pid 存放位置
pid /run/nginx.pid;

events {
  worker_connections 1024; # 单个后台进程的最大并发数
}

http {
  # 设置日志模式
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log main; # nginx 访问日志存放位置

  sendfile            on; # 开启高效传输模式
  tcp_nopush          on; # 减少网络报文段的数量
  keepalive_timeout   65; # 保持连接的时间，超时时间
  types_hash_max_size 4096;

  include             /ect/nginx/mime.types;  # 文件扩展名和类型映射表
  default_type        application/octet-stream; # 默认文件类型

  include /etc/nginx/conf.d/*.conf; # 包含的子配置项位置和文件

  server {
    listen      80; # 配置监听端口
    listen      [::]:80;
    server_name _;  # 配置域名
    root        /usr/share/nginx/html; # 服务默认启动目录

    include /etc/nginx/default.d/*.conf;

    error_page  404 /404.html;  # 配置 404 页面，单独为错误配置处理方式
      location = /40x.html {
      }

    error_page 500 502 503 504 /50x.html; # 错误状态码的显示页面，批量配置
      location = /50x.html {
      }
  }
}
```

默认服务目录 `/usr/share/nginx/html`

## 启动&停止&重启&查看状态

CentOS7.4 版本中可以使用 `nginx` 直接启动
默认情况下 Nginx 启动后会监听 80 端口，从而提供 HTTP 访问，如果端口已经被占用则会启动失败

```sh
# 启动
nginx # CentOS7.4 版本之前不可用
systemctl start nginx.service # systemctl 命令启动

# 停止
nginx -s stop # 立即停止，无论是否在工作，立即停止进程
nginx -s quit # 进程完成当前工作后再停止
killall nginx # 直接杀死进程
systemctl stop nginx.service # systemctl 命令停止

# 重启
systemctl restart nginx.service # 重启 Nginx 服务
nginx -s reload # 修改配置后需要重新载入，可以使用这个

# 查看状态
ps aux | grep nginx
netstat -tlnp # 查看端口号的占用情况
```

## 错误页配置

在默认配置中

```sh
# 配置 404 页面，单独为错误配置处理方式
error_page  404 /404.html;
# 错误状态码的显示页面，批量配置
error_page 500 502 503 504 /50x.html;
# 处理错误的时候也可以使用外部资源，出现 404 直接跳到指定页面
error_page 404 http://huli.com;
```

## 访问权限

**如果指令之间有冲突，先出现的会覆盖后出现的**

`=` 号代表精确匹配

也可以使用 `~` 正则进行匹配

```sh
location / {
  deny  123.9.51.42;
  allow 45.202.231;
}
# 精确匹配
location =/admin{
  deny all;
}
location =/img{
  allow all;
}
# 正则匹配，以 .php 结尾的文件
location ~\.php$ {
  deny all;
}
```

## 配置虚拟主机

虚拟主机是指在一台物理主机划分多个磁盘空间，每个空间是一个虚拟主机，都可以对外提供 WEB 服务，并且互不干扰，**虚拟主机可以基于端口号、基于 IP、基于域名**，将多个网站部署在同一台服务器上

直接在主文件里 `/etc/nginx/nginx.conf` 里配置，添加一个 `server`，配置对应的 `listen` 和 `server_name` 即可

虚拟主机的 端口、IP、域名 都需要是合法且开放的

```sh
server {
  listen  3000;
  server_name _;
  root /usr/share/nginx/html/html3000;
  index index.html;
}
```

## 代理设置

Nginx 反向代理
安全性：正向代理的客户端（梯子）访问网站给网络安全带来了安全隐患，反向代理可以保护真实服务器，客户端只能访问代理服务器（真是服务器结合前面的配置权限，只允许代理服务器访问）
功能性：负载均衡

```sh
# 把 `http://huli2.huli.com` 反向代理到 `http://huli.com`
# 即进入 server_name 的页面，显示的内容是 proxy_pass 对应的页面
server {
      listen 80;
      server_name huli2.huli.com;
      location / {
        proxy_pass http://huli.com;
      }
}
```

其他反向代理指令

- proxy_set_header 更改来自客户端的请求头信息
- proxy_connect_timeout Nginx 与后端代理服务器尝试建立连接的超时时间
- proxy_read_timeout read 请求的等待超时时间
- proxy_send_timeout write 请求的等待超时时间
- proxy_redirect 修改响应头中的 Location 和 Refresh

## 适配 PC 和 移动设备

**Nginx 通过内置变量 `$http_user_agent` 可以获取到请求客户端的 userAgent**

```sh
server {
  listen 80;
  server_name huli.com;
  location / {
    root /usr/share/nginx/pc;
    if ($http_user_agent ~* 'Android|webOS|iPhone|iPod|BlackBerry') {
      root /usr/share/nginx/mobile;
    }
    index index.html
  }
}
```

## Gzip 压缩设置

gzip 需要服务器和浏览器同时支持，浏览器支持 `gzip` 压缩时，在请求消息中包含 `Accept-Encoding:gzip` 这样 Nginx 就会向浏览器发送 gzip 压缩后的内容，并且响应头加入 `Content-Encoding:gzip` 告知浏览器需要先解压再输出

- gzip: 开启关闭 gzip 模块
- gzip_types: 压缩的文件类型
- gzip_buffers: 设置系统获取几个单位缓存用于存储 gzip 压缩结果数据流
- gzip_comp_level: 压缩比，级别 `1-9` ，级别越高压缩时间越长
- gzip_disable: 对一些特定 User-Agent 不使用压缩功能
- gzip_min_length: 允许压缩的页面最小字节数，页面字节数从响应头 `Content-length` 获取
- gzip_http_version: 识别 HTTP 协议版本，`1.1` 或 `1.0`
- gzip_proxied: 启用或禁用从代理服务器收到相应内容 gzip 压缩
- gzip_vary:
