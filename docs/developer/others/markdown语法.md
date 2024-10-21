# markdown

[toc]

## 基础语法

### 文本

不同数量的 `#` 代表不同级别的标题

这里有一个[百度](https://www.baidu.com)的链接

链接的其他写法[百度][rel]

[rel]: https://www.baidu.com

<h1>直接用html标签也可以</h1>

> `>`符号的效果如图，区块
> 换行效果还在
> 列表区块随意嵌套

空一行就会结束

<u>下划线</u>
~~这行划掉~~
_斜体_
_斜体_
**加粗**
**加粗**
**_斜体加粗_**
**_斜体加粗_**

:smile:
:angry:

# 展示一级标题

## 展示二级标题

两个空格换行  
换行

分隔线

---

---

---

---

创建 [^脚注]
[^脚注]:这是注释

### 列表

1. 有序列表
   1. 子列表
   2. 空格要注意
2. 无序列表
   - 还有子列表前面的 tab
   - 有序无序用法大致一样

### 图片

![GitHub Logo](/images/logo.png)

格式: ![Alt Text](url)

其他写法 ![alt Text][url]

[url]: /images/logo.png

### 选项

1. 选择题
   - [x] 选项一
   - [x] 选项二
   - [x] 选项三

### 列表

| firstHeader | firstHeader |
| ----------- | ----------- |
| hhh         | hhh         |
| h2          | h3          |

### 代码区块

    function test() {
        console.log('前面加tab或者```即可变成代码块');
    }

````js
function() {
    console.log('```可代码块语言');
}
````

### 需要转义的符号

    \   反斜线
    `   反引号
    *   星号
    _   下划线
    {}  花括号
    []  方括号
    ()  小括号
    #   井字号
    +   加号
    -   减号
    .   英文句点
    !   感叹号

## 其他高级技巧

[请查看](https://www.runoob.com/markdown/md-advance.html)
