const { traverseNode } = require("@vue/compiler-core");

/**
 * 遍历输入的代码字符串，挨个字符遍历，判断字符类型，根据不同类型生成不同 token
 * 最后返回 tokens 数组
 * @param {string} input
 */
function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        current++;
      }
      tokens.push({ type: "name", value });
      continue;
    }
  }
}

/**
 * 输入 tokens 数组，遍历，根据 token 的 type 返回不同值
 * 输出 ast 对象
 * @param {[]} tokens
 */
function parser(tokens) {
  let current = 0; // 访问 tokens 的下标

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // 如果是括号则需要递归，嵌套的语句，需要深度优先
    if (token.type === "paren" && token.value === "(") {
    }
  }

  let ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

/**
 * visitor 访问器，声明不同节点的 enter 和 exit
 */
const visitor = {
  Program: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
  CallExpression: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
};

/**
 * ast 是一个对象，
 * @param {*} ast
 * @param {*} visitor
 */
function traverse(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      case "NumberLiteral":
      case "StringLiteral":
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node.parent);
    }
  }

  traverseNode(ast, null);
}
