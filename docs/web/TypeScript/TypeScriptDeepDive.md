# TypeScript Deep Dive

## TypeScript 项目

### 编译上下文

编译上下文可以用来给文件分组，告诉 TS 哪些文件是有效的，哪些是无效的，还包含正在被使用的编译选项的信息

#### tsconfig.json

在项目的根目录下创建一个 tsconfig.json 文件，这样 TypeScript 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，还包含一部分默认的编译选项

```json
{
  /* 编译选项*/
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  },
  /* 显式指定需要编译的文件 */
  "files": ["./some/file.ts"],
  /* 指定包含和排除文件 */
  "include": ["./folder"],
  "exclude": [
    "./folder/**/*.spec.ts",
    "./folder/someSubFolder",
    "**/*" // 匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx 开启了 allowJS: true 则扩展名包括 .js/.jsx
  ]
}
```

手动运行 TS 编译器

- 运行 tsc ，会自动在当前目录或父级目录寻找 tsconfig.json 文件
- 运行 `tsc -p ./path-to-project-directory`
- 使用 `tsc -w` 启用编译器的观测模式，检测到文件改动后，将会重新编译

### 声明空间

在 TypeScript 中存在两种声明空间：类型声明空间和变量声明空间

类型声明空间包含用来当作类型注解的内容，定义在类型声明空间的内容只能当作类型注解使用，不能当作变量

```ts
class Foo {}
interface Bar {}
type Bas = {};

let foo: Foo;
let bar: Bar;
let bas: Bas;
const bar2 = Bar; // Error: "cannot find name 'Bar'",原因是 Bar 未定义在变量声明空间
```

变量声明空间包含可用作变量的内容，不能用作类型注解

`class Foo` 这样声明提供了一个类型 Foo 到类型声明空间，同时提供了一个变量 Foo 到变量声明空间

## 模块

和 JS 一样，默认情况下，在一个 ts 文件中声明变量，它处于全局命名空间中，在同一个项目的另一个 ts 文件也可以使用，就好像是全局可用一样

**文件模块（即外部模块）：如果 ts 文件的根级别位置（不是在函数内）含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域**
这样在全局命名空间里就不再有该文件内部的变量了，要使用就必须显式地导入（使用 import 导入时也会将此文件标记为一个模块，内部声明的变量也不会污染全局命名空间）

`module: 'none' | 'commonjs' | 'amd' | 'umd' | 'system' | 'es6/es2015' | 'es2022' | 'esnest' | 'node16' | 'nodenext'`

可以根据不同的 module 选项来把 TypeScript 编译成不同的 JavaScript 模块类型

`moduleResolution: node`

相对模块路径：根据相对路径查找
其他动态查找模块：模仿 Node 模块解析策略，找最近的 node_modules/foo 直到系统的根目录

查找顺序：
一个文件 foo.ts
一个文件夹 foo 且存在一个 foo/index.ts
一个文件夹 foo 且存在一个 foo/package.json 文件，且该文件中指定的 types 文件存在
一个文件夹 foo 且存在一个 foo/package.json 文件，且该文件中指定 main 文件存在

可以通过 `declare module 'somePath'` 声明或者重写一个全局模块，动态查找会优先查找

```ts
// global.d.ts
declare module "foo" {
  export var bar: number;
}

// other.ts
import * as foo from "foo";
// foo 是 { bar: number }
```

import/require 仅仅导入类型信息和依赖关系

```ts
import foo = require("foo");
var bar: foo;

// 这个文件将被编译成
// let bar;
// 因为 foo 或者其属性没有被当作变量使用
```

## 命名空间

## 动态导入表达式

## TypeScript 类型系统

## JSX

## TypeScript 错误提示

## Tips

## TypeScript 编译原理

## TypeScript FAQs

[深入理解 TypeScript（TypeScript Deep Dive）](https://jkchao.github.io/typescript-book-chinese/#why)
