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

- unknow: 用途和 any 很相似，可以看成一个安全版的 `any` ，所以推荐在编码中使用 `unknow` 替换 `any` ，所有类型都可以赋值给 `unknow` ，但是只有 `unknown` 和 `any` 能被 `unknown` 赋值

- void: 表示没有类型，`undefined` 的子类型，主要用在函数的返回值上，undefined 和 void 的区别： 函数返回值是 void 的时候，实现中可以返回其他值，但是执行结果的类型还是会被判断为 void ，而返回值为 undefined 时实现不能返回其他值

```ts
type VoidFn = () => void;
type UndefFn = () => undefined;

const fn: VoidFn = () => 1; // 不会报错
const fn2: UndefFn = () => 1; // 会有类型错误提示

const res = fn(); // res 实际上值为 1，但是会被提示为 void 类型
```

- never: 表示不存在的值的类型，是任何类型的子类型，除了本身也没有任何子类型，即可以赋值给其他类型，但是其他类型都不能赋值给 nerver 类型，（除了 nerver ，包括 any）
  后续的代码不会执行，比如 thorw Error ， process.exit
  **子类型：即 A 可以赋值 B，则 A 是 B 的子类型**

### 类型间的关系

strictNullChecks 为 true 时

|                  | any | unknown | void | null | undefined | never | 通用（string、number、boolean...） |
| ---------------- | --- | ------- | ---- | ---- | --------- | ----- | ---------------------------------- |
| any 赋值给       | Y   | Y       | Y    | Y    | Y         | N     | Y                                  |
| unknown 赋值给   | Y   | Y       | N    | N    | N         | N     | N                                  |
| void 赋值给      | Y   | Y       | Y    | N    | N         | N     | N                                  |
| null 赋值给      | Y   | Y       | N    | Y    | N         | N     | N                                  |
| undefined 赋值给 | Y   | Y       | Y    | N    | Y         | N     | N                                  |
| never 赋值给     | Y   | Y       | Y    | Y    | Y         | Y     | Y                                  |
| 通用 赋值给      | Y   | Y       | N    | N    | N         | N     | Y (同类型相互赋值)                 |

### 联合与交叉

- 交叉类型，`type C = A & B` 将多个类型合并成一个类型，比如进行合并对象时使用，如果遇到不兼容的类型就会导出 never ，根据上一个表，两个类型之间交叉的关系导出规则如下
  - A 和 B 可以相互赋值 => 目前只有 any 满足这种关系
  - A 可以赋值给 B，B 不可以赋值给 A => A
  - B 可以赋值给 A，A 不可以赋值给 B => B
  - A 和 B 不存在可以赋值的关系 => nerver
  - **C 既可以赋值给 A，也可以赋值给 B，类似位运算的 与，需要同时满足才行**

```ts
type T1 = number & string; // never
type T2 = number & unknown; // number
type T3 = number & any; // any
type T4 = number & nerver; // never
```

- 联合类型，**`type C = A | B` ，此时 C 要么等于类型 A，要么等于类型 B，只需要满足一方条件，但是 C 使用时如果不做类型判断，就只能调用共有的方法和属性**

### 类型推断与保护

正常情况下类型具有自动推断的能力，但是使用联合类型时，TS 在编译阶段无法得知当前的变量类型，所以只能使用共有的一些方法，所以我们需要使用类型保护能力

- typeof 判断变量类型，无法判断对象类型 `typeof value === 'object'`

```ts
const fn = (value: number | string): void => {
  if (typeof value === "number") {
    value.toFixed;
  } else {
    value.length;
  }
};
```

- instanceof 判断类型，可以分辨对象，但是只能判断 `class` 的原型，不能直接判断 `interface` 和 `type`

- in 检查是否存在某个属性

- 字面量判断

- is 关键字自定义

### 类型断言

- as 与 <> `item.parent as Item` `<Item>item.parent`

- ! 非空断言，排除变量是 `null` 和 `undefined` 类型情况，`!item.parent` `item!.parent`

- 双重断言，毫无根据的断言是危险的，所以进行类型断言时， TS 会提供额外的安全性

如果 A 和 B 之间存在赋值关系（A 是 B 的子类型或 B 是 A 的子类型），就可以直接使用断言，不存在则需要找一个中间类型来做桥梁，这就是双重断言（但是断言和双重断言都具有危害性，尽量少用）

```ts
const n1 = "licy" as number; // error，不能充分重叠
const n2 = "aa" as any as number;
const n3 = "aa" as unknown as number; // 推荐
const n4 = "aa" as never as number;
```

### 全局类型

通常情况下定义的类型需要用 `export` 导出，然后在使用的地方 `import` ，但是有有时候需要定义全局类型避免每次使用的繁琐地导入，有两种方式声明全局类型

- 在一个 `.d.ts` 文件中写变量类型，同时不要有 `export` `import` 等导入导出语法，然后需要在 `tsconfig.json` 的 `include` 选项中包含该文件，如果一个 npm 包的类型中，没有引入全局类型，则会变成 `any`

```ts
// global.d.ts
type AnyFunction = (...args: any[]) => any;
```

- 使用 `declare` 定义，比如需要给 `window` 新增类型，给某个包或者某一类文件添加类型说明等

```ts
// global.d.ts
declare module "react" {
  export const licy: string;
}

declare module "npm-package" {
  export const props: { name: "licy"; age: number };
  const App: React.FC<typeof props>;
  export default App;
}

declare module "*.svg" {
  const content: {
    id: string;
  };
  export default content;
}

// app.ts
import React from "react";
import svg from "./log.svg";
import { props } from "npm-package";

React.licy; // stirng
svg.id; // string
props.name; // 'licy
```

很多时候，类型还好引入一些已有类型进行组装，所以就会破坏默认 `.d.ts` 是全局类型的约束，所以需要主动的导出

```ts
// global.d.ts
import { ValueOf } from "./type";

declare namespace CommonNS {
  interface Props {
    name: "licy";
    age: 24;
  }
  type Value = ValueOf<Props>;
}

// 缺一不可，否则类型使用会加前缀
// 将 CommonNS 作为全局类型，类似 UMD
export as namespace CommonNS;
// 将导出命名修改，否则就会使用 CommonNS.CommonNS.xxx 才能获取
export = CommonNS;

// main.ts
const value: CommonNS.Value = "licy";
```

这里需要注意 `skipLibCheck` 配置，如果 `true` 会跳过库文件的类型检查，比如 `node_modules` 中其他库的类型检查和当前项目的 `.d.ts` 检查，会导致编写 `.d.ts` 文件时不一定能发现错误，（但是又不能保证引入的 npm 库的类型文件都是正确的。所以可以在 tsconfig.json 将该选项设置为 false 然后在编译阶段再将该选项设置为 true）？

## 高级用法

### 函数重载

函数重载是静态类型语言很重要的一个能力，很多时候函数需要兼容多种参数类型，根据入参返回不同类型数据
**实现方法就是多声明几个函数类型，然后在最后一个函数中进行实现，注意函数实现中的类型一定要于上面的所有类型兼容（只是类型重载，函数实现并不会重载），重载也只是为了更加精确的类型判断和类型提示**

```ts
// 用断言区分
const data = { name: "licy" };
const getData1 = (stringify: boolean = false): string | object => {
  if (stringify === true) {
    return JSON.stringify(data);
  } else {
    return data;
  }
};
// 此时返回结果类型固定为 string | object，实际上是可以确定类型的
const res1 = getData1(); // string | object
const res2 = getData1(true); // string | object

// 借助函数重载进行改造
function getData(stringify: true): string;
function getData(stringify?: false): object;
function getData(stringify: boolean = false): unknown {
  if (stringify === true) {
    return JSON.stringify(data);
  } else {
    return data;
  }
}
// 此时返回值会精确类型
const res3 = getData(); // object
const res4 = getData(true); // string
```

### 泛型

接口要支持多种类型的时候就可以使用泛型

```ts
// 泛型改造上面的函数
const data = { name: "licy" };
function getData<
  T extends boolean = false,
  R = T extends true ? string : object
>(stringify?: T): R {
  if (stringify === true) {
    return JSON.stringify(data) as unknown as R;
  } else {
    return data as unknown as R; // 双重断言，否则会报错
  }
}
const res1 = getData(); // obejct
const res2 = getData(true); // string

// 泛型类型
type ValueOf<T> = T[keyof T];

interface User {
  name: "licy";
}
type A = keyof User; // 'name'
type B = Valueof<User>; // 'licy'
```

### 内置的高级函数

### 协变 & 逆变

string 可以赋值给 unknown 可以理解为 string 是 unknown 的子类型，正常情况下这个关系即子类型可以赋值给父类型是不会改变的，我们称之为协变
但是在某种情况下关系出现了颠倒，我们称之为逆变

```ts
interface Animal {
  name: string;
}
interface Cat extends Animal {
  catBark: string;
}
interface OrangeCat extends Cat {
  color: "orange";
}
// ts 中不一定要使用继承关系，只要 A 的类型在 B 中全部都有，且 B 比 A 还要多一些类型
// 类似集合 A 属于 B 一样，就可以认为 B 是 A 的子类型

const cat: Cat = {
  name: "maomao",
  catBark: "miaomiao~",
};
const animal: Animal = cat; // 可以赋值，多出属性也不会报错

// 协变与逆变，以下那个类型是其子类型
type FnCat = (value: Cat) => Cat;

type FnAnimal = (value: Animal) => Animal;
type FnOrangeCat = (value: OrangeCat) => OrangeCat;
type FnAnimalOrangeCat = (value: Animal) => OrangeCat;
type FnOrangeCatAnimal = (value: OrangeCat) => Animal;

type RES1 = FnAnimal extends FnCat ? true : false; // false
type RES2 = FnOrangeCat extends FnCat ? true : false; // false
type RES3 = FnAnimalOrangeCat extends FnCat ? true : false; // true
type RES4 = FnOrangeCatAnimal extends FnCat ? true : false; // false

const fn: FnAnimalOrangeCat = (val) => {
  console.log(val.color);
  return oCat;
};

const fn2: FnCat = fn;

const oCat = fn2();
```

为什么最后的 RES3 是可以的呢
返回值：假设使用了 FnCat 的返回值的 cat.catBark 属性，如果返回值是 Animal 则不会有这个属性，会导致调用报错，所以返回值必须是 Cat 的子类型 OrangeCat
参数：假设传入的参数中使用了 orangeCat.color 但是对外的类型参数还是 Cat 没有 color 属性，就会导致该函数运行时内部报错
结论：**返回值是 协变 ，入参是 逆变**，函数 A 如果是函数 B 的子类型，则 A 的入参应该是 B 的入参的父类型，返回值则是 子类型（**需要避免入参类型判断通过但是运行报错和返回值调用时类型判断正确但实际运行时报错**）

:::tip
注意如果 `tsconfig.json` 中的 `strictFunctionTypes` 是 `false` 则上述的 RES2 也是 `true` ，这样表明当前函数是支持双向协变的，默认此项是 `false，如果是新项目建议设置为` `true` ，允许双向协变是有风险的，可能在运行时报错
:::

## 实践场景

## 周边工具

[TS 代码演练场](https://www.typescriptlang.org/play)

VSCode 编辑器：默认使用 VSCode 的 TS 版本，可能存在 VSCode 的 TS 版本和编译版本不一致

TS 类型工具

Lint 检查工具：由于 TS Lint 和 ES Lint 过程高度相似，所以目前 TSLint 被并入 ESLint 了，TSLint 官方标记为放弃维护，使用 `@typescript-eslint/eslint-plugin` `@typescript-eslint/parser` 进行代码风格检查

类型覆盖工具 `type-coverage` ，类型覆盖度检测

[TS 挑战](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)
[深入理解 TypeScript（TypeScript Deep Dive）](https://jkchao.github.io/typescript-book-chinese/#why)
