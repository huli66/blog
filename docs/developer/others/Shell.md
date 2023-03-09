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
echo $(date) # $() 也是执行命令，更推荐使用反引号

```

## printf 命令

- `print format-string [arguments]`

  - format: 格式控制字符串 `%s` 输出一个字符串，`%d` 整型输出，`%f` 输出实数，小数形式输出，
    `-8` 只宽度为 8 个字符，`-` 表示左对齐，没有则右对齐，`.2` 表示保留两位小数(`%f` 输出没有明确表示保留几位会默认保留 6 位)
  - arguments: 参数列表

  **格式只指定了一个（一部分），多出的参数依然会按照格式输出，format-string 被重用**
  **格式字符串单引号双引号都可以，没有引号也可以输出，但是转义序列 `\n` 会有问题**
  **如果缺少部分参数，`%s` `%c` 用 NULL （不显示） 代替，`%d` `%f` 用 0 代替**

```sh
# print format-string [arguments]
printf "%-10s %-8s %-4s\n" 姓名 性别 体重/kg
printf "%-10s %-8s %-4.2f\n" huli M 48.666
# 格式字符串重用，下面会按照该格式输出两行
printf "%-10s %-8s %-4.2f\n" huli M 48.666 yuele M 66
# 第三行会自动按照规则补齐
printf "%-10s %-8s %-4.2f\n" huli M 48.666 yuele M 66 null
```

## test 命令

检查某个条件是否成立，可以进行 数值、字符、文件 三个方面的测试

| 场景     | 说明                                                                                                                                                     |                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 数值测试 | -eq -ne -gt -ge -lt -le                                                                                                                                  | if test $[num1] -eq $[num2],[] 中执行基本算术运算 |
| 字符测试 | = != -z(字符串长度为零则真) -n(字符串长度不为零则真)                                                                                                     | if test -z $num1                                  |
| 文件测试 | -e(文件存在) -r(文件存在且可读) -w -x -s(文件存在且至少有一个字符) -d(存在且为目录) -f(存在且为普通文件) -c(存在且为字符型特殊文件) -b(存在且块特殊文件) |

**代码中的 [] 执行基本的算数运算**

**Shell 还提供了 与(`-a`)、或(`-o`)、非(`!`) 三个逻辑操作符用于将测试条件连接起来，优先级 `!` 最高，`-a` 次之，`-o` 最低**

```sh
num1=200
num2=100
if test $[num1] -eq $[num2]
then
  echo 'equal!'
else
  echo 'not equal...'
fi

if test -e ./notFile -o -e ./bash
then
  echo '至少一个文件存在'
```

## 流程控制

- 分支

```sh
if condition
then
  command1
  command2
  ...
elif condition2
then
  command3
# 如果 else 里没有要执行的命令，就不要写这个 else
else
  command4
# 结尾的 fi 就是 if 倒过来，也是 finally 的缩写
fi

# 写成一行也可以
if [ $[4-2] -gt 1 ]; then echo "true"; echo "command2"; fi
```

- for 循环

```sh
# 写成一行
for var 1 2 3 4; do echo "value is $var"; echo "command2"; done

# 用空格分开，循环一次执行所有命令
for var in item1 item2 item3
do
  command1
  command2
  ...
done
```

- while 语句

```sh
int=1
while (( $init <= 5))
do
  echo $int
  let "int++"
done
```

- 无限循环

```sh
while :
do
  command
done

while true
do
  command
done

for (( ; ; ))
```

- until 循环，意思和 `while` 刚好相反，条件判断为 true 时停止

```sh
until condition
do
  command
done
```

- case ... esac

多选择语句，类似其他语言的 `switch ... case`，是多分支选择每个分支用右圆括号开始，两个分号表示 `break` 即执行结束，跳出整个 `case ... esac` 语句，`esac` 结尾（与 case 相反）

```sh
value=$1
case $value in
1)
  echo "1"
  ;;
2)
  echo "2"
  ;;
esac
```

- 跳出循环

**`break` 跳出当前循环**

**`continue` 跳出本次循环**

## 函数

可以带 `function` 进行定义函数，也可以不带
可以显式返回一个值，如果不加将以最后一条命令运行结果作为返回值，**return 后跟数值 n(0-255)**

| 参数处理 | 说明                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| $1 $2 .. | 第 n 个参数                                                                        |
| $#       | 传递给脚本或函数的参数个数                                                         |
| $\*      | 以一个单字符串显示所有向脚本传递的参数                                             |
| $$       | 脚本运行的当前进程 ID 号                                                           |
| $!       | 后台运行的最后一个进程 ID 号                                                       |
| $@       | 与 $\* 相同，但是使用时加引号，在引号中返回每个参数                                |
| $-       | 显示 Shell 使用的当前选项，与 set 命令功能相同                                     |
| $?       | 显示最后命令的退出状态，0 表示没有错误，其他值表示错误，（也可以用于获取返回值？） |

```sh
[ function ] funname [()]
{
  action
  [return int;]
}

# 带参数执行
funname arg1 arg2 ...
```

```sh
#!/bin/bash

funWithReturn(){
  echo "arg1: $1"
  echo "arg2: $2"
  echo "Please Input A Number:"
  read anotherNum
  echo "sum is $(($1 + $anotherNum))"
  return anotherNum
}
funWithReturn 1 2 3 4 5
echo "return is $?"
```

## 输入/输出重定向

| 命令            | 说明                                             |
| --------------- | ------------------------------------------------ |
| command > file  | 将输出重定向到 file                              |
| command < file> | 将输入重定向到 file                              |
| command >> file | 将输出以追加的方式重定向到 file                  |
| n > file        |                                                  |
| n >> file       |                                                  |
| n >& m          |                                                  |
| n <& m          |                                                  |
| << tag          | 将开始标记 tag 和结束标记 tag 直接的内容作为输入 |

```sh
# 用 wc -l 命令计算行数
wc -l << EOF
hello
world
!
EOF

# 不希望显示命令结果，可以重定向到 /dev/null ，这个特殊文件内容都会被丢弃
command > /dev/null
```

## 文件包含

在一个 Shell 脚本内部包含外部脚本，这样可以很方便封装公用代码和公式

```sh
# . 和文件名直接空一格
. filename
. ./test.sh

# 或者
source filename
```

## 其他

记录在工作中碰到的情况

```sh
# 连续执行命令，上一句的结果作为下一句的参数
command1 | command2 | ...

# 从给定的字符串中寻找匹配内容
grep -e Hello Hello-world

# awk 内置函数
awk '{print $1}'

# tail 命令，查看文件内容
tail -n 2 file # 显示文件尾部最后 2 行的内容
tail -c 5 file # 显示最后的 5 个字节内容
tail -f filename # 循环刷新，显示文件最为不的内容

# export 配置环境变量
export USER_ID=HULIJIANJUN
```

[参考教程](https://www.runoob.com/linux/linux-shell.html)
