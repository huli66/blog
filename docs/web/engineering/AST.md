---
title: AST
lastUpdated: true
---

# AST

**抽象语法树（Abstract Syntax Tree，AST）是源码语法结构的一种树状抽象表示**在代码的语法检查、风格检查、格式化、高亮、错误提示、自动补全等方面均有广泛应用

## 原理

编译器整体执行过程分为三步

- Parsing:

  - 词法分析：使用 tokenizer(分词器) 或者 lexer(词法分析器) 将源码拆分为 tokens 存放在一个数组里
  - 语法分析：将 tokens 重新整理成语法相互关联的表达形式
  - 构建 AST

- Transformation：这个过程主要是根据当前 AST 生成一个新的 AST
  - 对 AST 进行深度优先遍历：Traversal
  - 通过 Vistor 进行访问（进行修改或者生成新的 AST），访问器对象可以处理不同类型的节点函数
  - 输出新的 AST

```js
const visitor = {
  NumberLiteral: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
  ...
}
```

- Code Generation
  - 根据新的 AST 进行目标代码生成
  - 输出新的代码

## 使用 babel 插件

- @babel/parser 可以把源码转换成 AST
- @babel/traverse 用于对 AST 的遍历，维护整棵树的状态，并且负责替换、移除和添加节点
- @babel/generate 可以把 AST 生成源码，同时生成 sourcemap
- @babel/types 用于 AST 节点的 Loadsh 工具库，包含了构造、验证以及变换 AST 节点的方法，对编写处理 AST 逻辑非常有用
- @babel/core Babel 的编译器，核心 API 都在这里，并实现了插件功能

```sh
npm install @babel/core -D # 里面包含了 @babel/parser @babel/traverse @babel/generate 等
```

[astexplorer.net](https://astexplorer.net/)可以在线转换为 AST

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");

// 源代码
const code = `
const hello = () => {};
`;
// 1.将源代码转换成 ast
const ast = parser.parse(code);
// 2.对比需要改动的 ast 部分，写合适的 visitor，通过 traverse 执行
const visitor = {
  Identifier(path) {
    const { node } = path;
    if (node.name === "hello") {
      node.name = "hi";
    }
  },
};
traverse.default(ast, visitor);
// 3.通过 generator 再将 ast 生成新的代码
const result = generator.default(ast, {}, code);
console.log(result.code);

/* 也可以写成插件 */
const namePlugin = {
  visitor: {
    Identifier(path) {
      const { node } = path;
      if (node.name === "hello") {
        node.name = "hhh";
      }
    },
  },
};

const sourceCode = core.transform(code, {
  plugins: [namePlugin],
});
console.log(sourceCode.code);
```

**babel 插件本质上就是一个对象，对象里面有一个 `visitor` 属性，也是一个对象，key 为要处理的类型，value 是对应的函数，传入 `path` 作为参数**

## 最佳实践

### 尽量避免遍历抽象语法树

**遍历 AST 的代价很昂贵，并且容易做出非必要的遍历，可能是数以万计的多余操作**

Babel 对此做出了尽可能的优化，方法是合并多个 visitor ，能够在单次遍历内做完事情的话就合并它们

- 及时合并访问者

```js
path.traverse({
  Identifier(path) {},
});

path.traverse({
  BinaryExpression(path) {},
});

// 两个访问器合并
path.traverse({
  Identifier(path) {},
  BinaryExpression(path) {},
});
```

- 可以手动查找就不要遍历
