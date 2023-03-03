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

- /bin: Binaries（二进制文件）存放最常用命令
- /boot: 启动 Linux 时使用的一些核心文件，包括一些连接文件和镜像文件
- /dev: Device（设备）的缩写，存放 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件是相同的
- /etc: Etcetera 存放所有的系统管理所需要的配置文件和子目录
- /home: 用户的主目录，每个用户都拥有一个自己的目录，一般以用户名命名，例如 `/home/alice` `/home/bob`
- /lib: Library 存放系统最基本的动态链接共享库，类似于 Windows 的 DLL 文件，几乎所有的应用程序都要用的这些共享库
- /lost+found: 一般是空的，系统非法关机后这里就会存放一些东西
- /media: 系统会自动识别一些设备，如 U 盘、光驱等，然后挂载到这个目录下
- /mnt: 系统提供该目录是为了让用户临时挂载别的文件系统的，可以把硬盘或者光驱挂载到 /mnt 上，然后就可以进入该目录查看内容了
- /opt: optinal（可选）给主机额外安装软件所摆放的目录，默认是空的
- /proc: Processes（进程）是一中伪文件系统（虚拟文件系统），存储当前内核运行状态的一系列特殊文件，是系统内存的映射，可以直接访问这个目录来获取系统信息，**这个目录的内容不在硬盘上而是在内存中，可以直接修改里面的某些文件**
- /root: 系统管理员的用户主目录
- /sbin: Superuser Binaries，系统管理员使用的系统管理程序
- /selinux: Redhat/CentOS 所特有的目录，存放安全机制（类似 Windows 防火墙）相关文件
- /srv: 存放服务启动之后需要提取的数据
- /sys: **内核设备树的一个直观映射，集成了针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统、针对伪终端的 devpts 文件系统**
- /tmp: temporary（临时）这个目录是用于存放一些临时文件的
- /usr: unix shared resources（共享资源）的缩写，非常重要，很多应用程序和文件都放在这个目录下，类似 windows 的 program files
- /usr/bin: 系统用户使用的应用程序
- /usr/sbin: 超级用户使用的比较高级的管理程序和系统守护程序
- /usr/src: 内核源代码默认的放置目录
- /var: variable（变量）存放着不断扩充的东西，习惯将经常被修改的目录放在这里，比如各种日志文件
- /run: 一个临时文件系统，存储系统启动以来的信息，当系统重启时里面的文件应该被清除，如果系统上有 `/var/run` 目录，应该让其指向 `/run`

- 系统启动必须 `/boot` `/etc` `/lib` `/sys`
- 指令集合 `/bin` `/sbin`
- 外部文件管理 `/dev` `/media` `/mnt`
- 临时文件 `/run` `/lost+found` `/tmp`
- 账户 `/root` `/home` `/usr` `/usr/bin` `/usr/sbin` `/usr/src`
- 运行过程中要用 `/var` `/proc`
- 扩展 `/opt` `/srv`

## Linux 文件和目录管理

### 查看权限和属性

使用 `ll` 或者 `ls -l` 命令，显示当前目录下所有文件的属性和所属用户、组

第一个字符代表文件类型是目录、文件、连接文件等

- `d` 目录
- `-` 文件
- `l` 链接文档
- `b` 可供存储的接口设备(可随机存取装置)
- `c` 串行端口设备，如键盘鼠标等(一次性读取装置)
  接下来 9 个字符，以 3 个为一组，`r` 代表可读（read），`w` 代表可写（write），`x` 代表可执行（execute），这三个权限的位置不会改变，没有权限则显示 `-`
  顺序是 **owner/group/others** 即 user permissions、 group permissions、 other(everyon) permissions

```sh
$ ls -l # 或者 ll
total 16 # 文件总数
dr-xrwx-wx  2 root root 4096 last-modified-date filename
# 类型 属主权限 属组权限 其他用户权限 硬链接数 属主 属组 size 修改时间 文件名及其指向
```

Linux 系统中用户是按组分类的，一个用户可以属于一个或多个组
对于文件所有者以外的用户可以分为文件所属组的同组用户和其他用户，因此有三种权限 **属主权限、属组权限（同组用户）、其他用户权限**

**对于 root 用户来说，文件的权限一般对其不起作用**

### 修改权限和属性

- chgrp 更改文件属组

```sh
chgrp [-R] 属组名 文件名
```

`-R`: 递归更改，也就是加上 `-R` 参数则该目录下的所有文件的属组都会更改

- chown 更改文件属主，也可以同时更改文件属组

:::tip 注意
chown 更改文件属主和属组时，如果属主并不属于该属组呢，或者只更改属主（另一个组的用户）会出现什么情况呢
:::

```sh
chown [-R] 属主名 文件名
chown [-R] 属主名:属组名 文件名
```

- chmod 更改文件 9 个属性

可以设置符号也可以设置数字，每种权限对应的分数如下，每组的值为权限分累加
**`r:4` `w:2` `x:1` `-:0`**

rwxrwx--- ====> (4+2+1=7)(4+2+1=7)(0+0+0=0)

```sh
# 指定文件属性改为 rwxrwx---
chmod [-R] 770 文件或目录
```

设置符号方式
**`u:user` `g:group` `o:other` `a:all`**
**`+(加入权限)` `-(移除权限)` `=(设定权限为)`**

```sh
# 权限设为 -rwxr-xr--
chmod u=rwx,g=rx,o=r filename
# 拿掉所有人的可执行权限
chmod a-x filename
```

### 处理目录的常用命令

- 绝对路径：从根目录 `/` 写起
- 相对路径：不从 `/` 写起，而是使用 `./` `../` 等
- `ls`: list files 列出目录及文件名
  - `-a`: 全部文件，包括隐藏文件
  - `-d`: 仅目录本身，而不是列出目录的文件数据
  - `-l`: 长数据串列出，包含文件的属性与权限等 `ls -dl # 列出目录本身的属性`
- `cd`: change directory 切换目录
- `pwd`: print work directory 显示目前的目录
  - `-P`: 显示确实的路劲，而非链接路径
- `mkdir`: make directory 创建一个新的目录
  - `-p`: 递归创建 `mkdir -p test1/test2/test3`，创建嵌套目录
  - `-m`: 带权限创建 `mkdir -m 770 test`
- `rmdir`: remove directory 删除一个空的目录
  - `-p`: 一次删除多级空目录 `rmdir -p test1/test2/test3`
- `cp`: copy file 复制文件或目录

```sh
cp [-adfilprsu] source target
```

- `rm`: remove 删除文件或目录
  - `-f`: 强制删除
  - `-i`: 互动模式，删除前询问
  - `-r`: 递归删除

```sh
rf [-fir] filename
```

- `mv`: move file 移动文件与目录，或修改文件与目录名称
- `touch`: 生成文件

### 查看文件内容

- `cat`: 从第一行开始查看
  - `-b`: 列出非空白行行号
  - `-v`: 列出一些看不出来的字符
  - `-E`: 结尾的断行字节 $ 显示出来
  - `-T`: 将 tab 显示为 ^l
  - `-A`: 相当于 -vET 的整合
  - `-n`: 列出行号（包括空白行）
- `tac`
- `nl`
- `more`
- `less`
- `head`
- `tail`

## vim

- 命令模式 Command mode：刚开始启动 vi/vim 就进入命令模式，其他模式中按下 `esc` 进入，也叫一般模式
- 输入模式 Insert mode：按 `i` 进入输入模式
- 底线命令模式 Last line mode：按 `:` 英文冒号进入
  - `q`: quit 退出，不保存
  - `w`: write 保存文件，写入到硬盘
  - `q!`: 强制退出，有修改又不想保存时使用，等同于`ZQ`
  - `w!`: 属性为只读时强制写入，但是不一定成功
  - `wq`: 保存退出，也可以加 `!`，等同于 `ZZ`
  - `w [filename]`: 保存成另一个文档，另存为
  - `r [filename]`: 读入另一个文档，将其内容添加到游标后
  - `! command`: 暂时离开 vi 到指令行模式执行 command 的显示结果
  - `set nu`: 显示行号
  - `set nonu`: 取消行号

## yum 命令

yum(Yellow dog Updater, Modified) 是 Fedora 和 RedHat 以及 SUSE 中的 Shell 前端软件包管理器
基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且按照，可以自动处理依赖关系并一次行安装所有依赖的软件包

```sh
yum [options] [command] [package ...]
```

- options: 可选项，`-h` 帮助， `-y` 当安装过程提示选择全部为 yes，`-q` 不显示安装过程
- command: 要进行的操作
- package: 包名

### 常用命令

- `yum check-update`: 列出所有可更新的软件，或者指定某一个包的可更新
- `yum update`: 更新所有软件，或者指定更新一个包
- `yum install <package_name>`: 安装指定包
- `yum list`: 列出所有可按照的软件，或者可按照的指定软件
- `yum search <keyword>`: 查找软件包
- `yum remove <package_name>`: 删除软件包
- `yum clean packages`: 清除缓存目录下的软件包
- `yum clean headers`: 清除缓存目录下的 headers
- `yum clean oldheaders`: 清除缓存目录下的旧的 headers
- `yum clean, yum clean all(= yum clean packages; yum clean oldheaders)`: 清除缓存目录下的软件包及旧的 headers

### 换源

可以换成国内的源，ali，网易（163），等

```sh
# 备份原来的源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 下载对应版本的 repo 文件，放入 /etc/yum.repos.d/
wget http://mirrors.163.com/.help/CentOs7-Base-163.repo
mv CentOS7-Base-163.repo CentOS-Base.repo

# 生成缓存
yum clean all
yum makecache

```

## apt 命令

apt(Advanced Packaging Tool) 是一个在 Debian 和 Ubuntu 中的 Shell 前端软件包管理器
**执行 apt 命令需要超级管理员权限（root）**

```sh
apt [options] [command] [package ...]
```

参数和 yum 一样

### 常用命令

- `sudo apt update`: 列出所有可更新软件清单，或者更新指定包
- `sudo apt upgrade`: 升级软件包
- `sudo apt full-upgrade`: 升级软件包，升级前删除需要更新的包
- `sudo apt list --upgradeable`: 列出可更新的软件包及版本信息
- `sudo apt install <package_2> </package_2>`: 安装一个或多个包
- `sudo apt show <package_name>`: 显示软件包信息，大小、版本、依赖等
- `sudo apt remove <package_name>`: 删除指定包
- `sudo apt autoremove`: 清理不再使用的依赖和库文件
- `sudo apt purge <package_name>`: 移除软件包及配置文件
- `sudo apt search <keyword>`: 查找软件包
- `sudo apt list --installed`: 列出所有已安装包
- `sudo apt list --all-versions`: 列出所有已安装包的版本信息

参考 1.[Linux 系统之 CentOS 和 Ubuntu 的区别](https://blog.csdn.net/hello_1995/article/details/126582596) 2.[Linux 系统目录结构](https://www.runoob.com/linux/linux-system-contents.html) 3.[Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)
