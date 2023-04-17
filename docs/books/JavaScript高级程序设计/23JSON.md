---
title: JSON
lastUpdated: true
---

# JSON

:::
JSON(JavaScript Object Notation, JS 对象简谱) 是一种轻量级数据格式，可以方便地展示复杂数据结构，这个格式使用 JavaScript 语法的一个严格子集表示 **对象、数组、字符串、数值、布尔值和 null**
:::

JSON 不属于 JavaScript，只是拥有相同的语法而已，是一种通用的数据格式，很多语言拥有解析和序列化 JSON 的内置能力

## 1.语法

- 简单值: `string` `number` `boolean` `null` 都可以出现在 JSON 中，特殊值 `undefined` 不可以
- 对象: 有序键值对，每个值都可以是简单值或者复杂类型
- 数组: 可以通过数值索引访问的值的有序列表

JSON 没有变量、函数或对象实例的概念

**JSON 字符串和 JavaScript 字符串的主要区别是，JSON 字符串必须使用双引号，单引号会导致语法错误**

**JSON 中的对象必须使用双引号把属性名包起来（JS 对象可以省略）**

下面代码中每一行都可以是一个有效 JSON ，但是 **每个 JSON 或者 JSON 文件都只能保护一个值，包含多个会报错，并且 JSON 中不能包含注释（比如 package.json 中就不能注释），不需要分号**

```JSON
""
1
true
null
[]
{
  "name": 11
}
```

## 2.解析与序列化

早期可以用 `eval()` 解析解释 JSON，ECMAScript 5 增加了 JSON 全局对象，正式引入了解析 JSON 的内置能力
JSON 对象有两个方法: `stringify` 和 `parse`

### JSON.stringify()

用于将 JavaScript 序列化为 JSON 字符串，默认没有缩进，可以传入一到三个参数

**在序列化 JavaScript 对象时，所有函数和原型成员都会被有意地在结果中省略，值为 undefined 的任何属性也会被跳过**

```js

```

第二个参数是过滤器，可以是一个数组也可以是一个过滤函数

```js

```

第三个参数是控制缩进的
传入数值则代表缩进空格个数，最大是 10 ，超出自动设置为 10
传入字符串则代表以该字符串缩进，字符串长度最大为 10 ，超出则自动截断
**为了方便阅读，还会对所有有效缩进插入换行**

```js

```

toJSON() 方法

```js

```

:::JSON.stringify() 执行过程

:::

### JSON.parse()

用于将 JSON 字符串解析为原生 JavaScript ，传入无效值会抛出错误

可以额外接收第二个参数，区别于 JSON.stringify() 的过滤函数，可以称之为还原函数，实际上它们的格式完全一样
还原函数接收两个参数，key 和 value ，也需要返回值，返回 undefined 则结果中删除相应的 key ，返回其他值则插入到结果中，还原函数常用于把日期字符串转换为 Date 对象

```js

```



fs 读取 JSON 文件的结果是什么，是一个字符串吗
