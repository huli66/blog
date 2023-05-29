---
title: Symbol
lastUpdated: true
---

# Symbol

`symbol` 是一种基本数据类型（primitive data type）。`Symbol()` 函数会返回 `symbol` 类型的值

**每个从 `Symbol` 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符**

```js
Symbol([description]);
```

description 可选，是对 symbol 的描述，可以用于调试但不是访问 symbol 本身，不管描述是否相同，是否存在，每次都会创建一个新的 symbol 类型

:::warning
ECMAScript 6 开始，围绕原始类型创建一个显示的包装类型就不被支持了，`new Symbol` 会报错 TypeError，`new Boolean()` `new String()` `new Number()` 因为历史遗留原因仍可用
:::

## 全局共享的 Symbol

`Symbol.for()` 从全局的 symbol 注册表设置，确保多个模块间共享某个 Symbol 值时唯一，如果已有则返回该 symbol 值，如果没有则创建一个新的并返回

`Symbol.keyFor()` 从全局的 symbol 注册表取得，不存在则返回 `undefined`，存在则返回描述值

:::tip
全局是指什么范围呢？计算机？当前页面？当前浏览器 tab 页面进程？当前的作用域？
:::

## 在对象中查找 Symbol 属性

`Object.getOwnPropertySymbols()` 方法，查找一个给定对象的 symbol 属性，返回一个 symbol 类型的数组

## 属性

- Symbol.length
  值为 0

:::tip
Symbol.length 有什么用
:::

- Symbol.prototype.toString()
- Symbol.prototype.valueOf() 返回 Symbol 值本身

```js
let ss = Symbol("sss");
ss === ss.valueOf(); // true
```

## 用途

- 是唯一的
- 可以用作对象属性名，不会被意外覆盖
- 作为私有属性来使用，无法通过对象外部访问对象中的 Symbol 属性
- 常量
