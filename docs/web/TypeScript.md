# TypeScript

[[toc]]

## 介绍

`TypeScript` 是 `JavaScript` 的超集，任何合法的 `JavaScript` 代码在 `TypeScript` 中都是合法的

在 `TS` 流行之前也有其他辅助工具能做类型提示，比如 `Flow` 、`JSDoc`，`Flow` 写法也类似于 `TS`

静态类型检查在一开始就防止代码出现错误

tsc 转译后的代码会擦除类型并进行降级处理

## 基础使用

### 基础类型

`JS` 中支持的类型在 `TS` 中也支持，并且 `TS` 具有类型自动推断能力，使用 `const` 或 `let` 声明变量时如果直接赋值，当前变量的就自动赋值对应类型

```ts
let str = "hello"; // let bool: boolean
let num = 666; // let num: number
let bool = true; // let bool: boolean
let undef = undefined; // let undef: undefined
let nul = null; // let nul: null
let sym = Symbol(123); // let sym: symbol
const fn = () => 123; // const fn: () => number
let res = fn(); // let res: number
let arr = [1, 2, "aa"]; // let arr: (string | number)[]
const obj = {
  a: 1,
  b: true,
};
/*
const obj: {
  a: number;
  b: boolean;
}
*/
```

**如果 `undefined` 和 `null` 自动被推断成 `any` ，则是 `config.json` 中需要把 `compilerOptions.strictNullChecks` 设置为 `true`**，也可以直接 `strict:true` 开启全部严格性设置

### 新增类型

- 元组：tuple 表示一个**已知元素数量和类型的数组**，各元素类型不必相同
  比如 useState 的返回值就是一个元组类型，数组第一项是一个变量的类型，第二项是一个函数

```ts
let tuple: [string, number];
tuple = ["hi", 12];
tuple = ["hi", "2"]; // Error
```

- 枚举: enum 既可以当成类型使用，也可以当成值使用，如果不给枚举指定值，它会从 0 开始累加

  用 `object as const` 来实现 `enum` 的功能

```ts
type ValueOf<T> = T[keyof T];

const Color = {
  Red: 0,
  Green: 1,
  Blue: 2,
} as const;
type TColor = keyof typeof Color;
type TColorValue = VauleOf<typeof Color>;
const c: TColorValue = Color.Green;
```

- any: **所有类型都可以赋值给 `any` ，也可以把 `any` 类型赋值给除 `never` 外的所有类型**

- unknow: 用途和 any 很相似，可以看成一个安全版的 any ，所以推荐在编码中使用 unknow 替换 any ，所有类型都可以赋值给 unknow，

- never:

## 高级用法

### 函数重载

### 泛型

### 内置的高级函数

### 协变 & 逆变

## 实践场景

## 周边工具
