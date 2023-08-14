---
title: ES7-ES12
lastUpdated: true
---

# ES7-ES12

## ES2016 (ES7)

### Array.prototype.includes()

区分大小写判断数组是否存在项，但是只能判断简单类型的数据，无法判断对象类型等复杂类型

可以识别 NaN，indexOf 不能识别 NaN，只判断是否存在用 includes 更好

```js
arr.includes(valutToFind[, fromIndex]); // 返回 ture / false ，从 fromIndex 开始找，默认为 0 ，负数则是从末尾开始往前跳 fromIndex 绝对值个索引
```

### 幂运算符

\*\*

效果等同于 Math.pow()

```js
console.log(Math.pow(2, 10)); // 1024
console.log(2 ** 10); // 1024
console.log(2 ** 8); // 256
NaN ** 2; // NaN
10 ** -1; // 1 / 10
3 ** 0.1; // 1.116... 小数次幂，先转换成分数，然后分子次幂，分母开方
```

## ES2017 (ES8)

### Object.values()

返回一个数组，成员是参数自身的（不包括继承）所有可遍历（enumerable）属性的键的值

```js
const obj = {
  name: "huli",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'huli', 18, 188 ]
```

## ES2018 (ES9)

## ES2019 (ES10)

## ES2020 (ES11)

## ES2021 (ES12)

## ES2022 (ES13)

## ES2023 (ES14)
