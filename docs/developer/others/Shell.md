# Shell

Shell 是一个使用 C 语言编写的程序，是用户使用 Linux 的桥梁，既是一种命令语言，也是一种程序设计语言

Shell 脚本，shell script

Linux 的 Shell 种类众多

- Bourne Again Shell (/bin/bash) 就是常用的 Bash ，免费易用，是大多数 Linux 默认的 Shell

## 编写 Shell 脚本

运行方法

- 跳转到相应目录，作为可执行程序执行，**需要在脚本第一行注释需要用什么解释器执行脚本**

```sh
cd test # 切换到目录
chmod +x ./test.sh # 使脚本具有执行权限
./test.sh # 执行脚本
```

- 作为解释器参数，不需要注释声明用什么解释器

```sh
/bin/sh test.sh
/bin/php test.php
```

## 变量

```sh
#!/bin/bash
# 第一行注释，声明用什么解释器执行脚本
my_name="jianjun.hu" # 声明变量，只能使用 英文字母、数字、下划线 作为变量名，不能以数字开头
echo $my_name # 可以不加花括号包裹，输出 jianjun.hu
echo "${my_name}good" # 加花括号确定边界
my_name="huli66" # 已经被定义的变量可以重新定义，此时不能加 $ 前缀
readonly my_name # 声明只读，之后再重新给 my_name 赋值会报错

your_name="hhh"
unset your_name # 删除变量，之后再使用会报错，不能删除只读变量，否则会报错

echo 'hello,${my_name}' # 单引号内所有内容原样输出，变量无效，不能出现转义字符
echo "Hello, my name is \"$my_name\"!\n"

echo ${#my_name} # 输出 6，输出字符串长度
my_arr=(123 "222" 3) # 声明属组，用 () 包裹，空格分隔，不支持多维数组
echo ${#my_arr} # 3，效果和 ${#my_arr[0]} 一样，直接使用数组名看作使用第 0 个元素
echo ${#my_arr[0]} # 3
echo ${my_arr[@]} # 挨个输出所有元素

string="runoob is a site"
echo ${string:1:4} # 截取第 1 到 4 位，（数组计数）
echo `expr index "$string" io` # 4，查找字符 i 或 o 出现的位置，只计算第一个出现的

:<<EOF
用 :<< 定义一段函数
没有调用也可以当作是多行注释
EOF可以用其他符号替代，只是函数名
EOF
```

## 参数传递

```sh
#!/bin/bash
# ./tesh.sh 33 "666"
echo "执行的文件名: $0"
echo "第一个参数位: $1"
echo "第二个参数: $2"
echo "总共有$#个参数"
echo "当前脚本进程ID号为 $$"
echo "后台运行的最后一个进程ID$!"
echo "所有参数：$*"
echo "字符串显示：\"$@\""
echo "退出状态 $?"
echo "当前选项 $-"
```

## 数组

Bash Shell 只支持一维数组，初始化不需要定义大小，用括号表示，用空格分隔元素

获取数组中所有元素用 `*` 或者 `@`

`declare` 命令声明一个关联数组，参数 `-A`，**关联数组不能再被赋值为普通数组**

```sh
#!/bin/bash
declare -A site=(["google"]="www.google.com" ["baidu"]="www.baidu.com" ["taobao"]=["taobao.com"])
echo "google site is ${site["google"]}" # google site is www.google.com
echo ${site[@]} # www.google.com [taobao.com] www.baidu.com
echo ${site[*]} # 同上
echo ${#site[*]} # 3
echo ${#site[@]} # 3

site["ali"]="www.ali.cn"
echo ${!site[*]} # ali google taobao baidu
echo ${#site} # 0
echo $site # 不输出内容
```

## 运算符

算术运算符
关系运算符
布尔运算符
字符串运算符
文件测试运算符

### 算术运算符

原生 bash 不支持简单的数学运算，但是可以通过 awk 、expr 等命令来实现，两点注意

- 表达式和原算法直接要有空格
- 完整的表达式要被反引号包含

**乘号必须加反斜杠转义**
**Mac 的 Shell 中 expr 语法是 $(())，乘号不需要转义**

```sh
val=`expr 2 + 2`
echo "sum: ${val}" # 4
a=10
b=20
echo `expr $a + $b` # 30
echo `expr $a - $b` # -10
echo `expr $a \* $b` # 200
echo `expr $a / $b` # 0，只保留整数部分
echo `expr $b % $a` # 0
echo [$a == $b] # [$a == $b]，不能直接输出，可以用于 if 判断
echo [$a != $b] # 同上
```

### 关系运算符

| 运算符 | 说明                        |
| ------ | --------------------------- |
| -eq    | equal 是否等于              |
| -ne    | not equal 是否不等          |
| -gt    | great than 是否大于         |
| -lt    | less than 是否小于          |
| -ge    | great or equal 是否大于等于 |
| -le    | less or equal 是否小于等于  |

### 布尔运算符

| 运算符 | 说明   |
| ------ | ------ |
| ！     | 非运算 |
| -o     | 或运算 |
| -a     | 与运算 |

### 逻辑运算符

`&&` `||`

### 字符串运算符

| 运算符 | 说明           |
| ------ | -------------- |
| =      | 是否相等       |
| !=     | 是否不相等     |
| -z     | 长度是否为 0   |
| -n     | 长度是否不为 0 |
| -$     | 是否不为空     |

### 文件测试运算符

| 运算符 | 说明                  |
| ------ | --------------------- |
| -e     | 是否存在              |
| -d     | 是否目录              |
| -f     | 是否普通文件          |
| -s     | 是否不为空，不空 true |
| -r     | 是否可读              |
| -w     | 是否可写              |
| ...    | ...                   |

## echo 命令

Shell 的 `echo` 指令与 PHP 的 `echo` 指令类似，都是用于字符串输出

**单引号显示原样字符串，不转义，不取变量**
**反引号显示命令执行结果**

```sh
echo "string" # 普通输出
echo "\"string\"" # 显示转义字符
echo "$name" # 显示变量
echo -e "OK! \n" # -e 开启转义，显示换行
echo -e "OK! \c" # 显示不换行
echo "It is a test" > myfile # 显示结果定向至文件
echo '$name' # 单引号原样输出字符串，不转义不去变量
echo `date` # 反引号显示命令执行结果

```

## printf 命令

## test 命令

## 流程控制

## 函数

## 输入/输出重定向

## 文件包含

[参考教程](https://www.runoob.com/linux/linux-shell.html)
