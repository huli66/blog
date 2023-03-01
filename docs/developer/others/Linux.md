---
title: Linux 基础入门
lastUpdated: true
---

# Linux

今天想删除服务器里的老版本 `nginx` ，但是误删了 `/lib64` 目录...

还好是部门新搞的测试服务器，没有太大问题，最后重新搞了一个服务器，还是要学习一下 `Linux` 的常用命令

`rm -rf` 命令能不用就别用，宁可多一些冗余文件...

Linux 是一种自由和开放源码的类 UNIX 操作系统，最初由芬兰人 Linux Torvalds 上大学时编写的...

**Linux 能运行主要的 UNIX 工具软件、应用程序和网络协议，支持 32 位和 64 位硬件，Linux 继承了 Unix 以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统**

## Linux 和 CentOS

`Linux` 有很多发行版本，从性质上可以划分为由商业公司维护的商业版本和开源社区维护的免费版本
商业版以 `Redhat` 为代表，开源社区版则以 `Debian` 为代表，有着各自的特点，在不同领域发挥作用

**Linux PC 上使用的核心命令大多数在 Mac 上也可以使用**

`CentOS` 基于 `RHEL` ，目前是企业 IT 界使用最广泛的，社区支持的 企业级操作系统，于 2004 年发布，命令行人性化，具有高度的可定制性、安全性、稳定性

`Ubuntu` 基于 `Debian` 架构，有着完善的包管理系统、漂亮的用户界面、丰富的社区，对大多数硬件有着良好兼容，有着极多的个人和专业用户，但是图形界面占用内存非常大，内存越大 `VPS(Virtual Private Server 虚拟专用服务器)` 价格越高，从这一点来讲，`Ubuntu` 并没有在 `VPS` 安装的操作系统选择之列

所以工作上来说，大部分公司的服务器都是 CentOS 系统的（浅薄了解），个人机器上安装可以选择 Ubuntu 体验更好

| Ubuntu                                           | CentOS                                             |
| ------------------------------------------------ | -------------------------------------------------- |
| 基于 Debian 架构                                 | 基于 RHEL 架构                                     |
| 经常更新                                         | 几乎没有更新                                       |
| 没有 cPanel 支持                                 | 支持 cPanle / WHM                                  |
| 更大的用户和开发人员社区                         | 较小的用户和开发人员社区                           |
| 以教程和免费的指南提供更多的帮助                 | 提供的帮助较少                                     |
| 对于之前使用过 Ubuntu 桌面的初学者来说更容易学习 | 由于 RHEL 发布的桌面发行版不多，初学者入手比较困难 |
| **使用 apt-get 包管理器安装 .deb 包**            | **使用 yum 包管理器安装的 .rpm**                   |
|                                                  |                                                    |

```md
Linux 的发行版

- Linux 内核
  - Debian
    - Ubuntu
      - Linux Mint
  - Fedora
    - RHEL
      - CentOS
      - Oracle Linux
  - SUSE
    - SLES
      - openSUSE
  - 其他发行版
```

## Linux 系统目录结构

## Linux 文件和目录管理

参考 1.[Linux 系统之 CentOS 和 Ubuntu 的区别](https://blog.csdn.net/hello_1995/article/details/126582596) 2.[Linux 系统目录结构](https://www.runoob.com/linux/linux-system-contents.html)
