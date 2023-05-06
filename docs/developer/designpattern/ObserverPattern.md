---
title: 观察者模式
lastUpdated: true
---

# 观察者模式

观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象状态发生变化时，会通知所有观察者对象，使它们能够自动更新

## 和 发布订阅模式 的区别

观察者模式: 发布者直接触及到订阅者，类似群聊直接@全体成员，实现细节上发布者需要维护一个订阅者对象

发布订阅模式: 发布者不直接触及到订阅者，类似发布到平台，平台通知订阅者，而是统一由第三方来完成实际的通信操作，实现上需要实现一个第三方 EventBus/EventEmiter

## 实现

- Publisher

  - constructor 初始化，维护一个 observers 列表
  - add 添加新的订阅者
  - remove 移除订阅者
  - notify 通知所有订阅者

- Observer

  - update 收到通知执行

- 简易实现

[TypeScript Playground 实现](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCuAjEBLCALApgJ2gbwChpoB7RCHANxwgC5oBlTAFwB4B5cqnAPgG4CRaMBIA7CM2zxgzErgAUASnxDizdGgB0ZCtmrYYAXmijMAd0Ysl0SJbadd+-quFiIJEJk0gSAc3kARAjIaFi4wNiYYMyYACaaCQGKAsQAvoLEYLGx8jrc2PQO+cqExMQi4h5ePv5BSKgYOJpZsdAoopQkANZxSSll6lp5ejTN2blcI9jJQulCkQC2JNQTdNBFUyUuFe6e3n6BwQ1hmovLmG0d3b0zZdCDENqT+o+xmJ4xq7fQc8SiJMwUAAzACe8gWEF89Ak2Havi2dx2VX2tSOoSa-0BoMunR6sT6LgeT0coyBcgAomBgOh5F9oIYeCo7sQdJp4AAHWLRTDgyHfNLfdJzUCQGAbfRMkxgBaYaGSOECIQ7STSWTYeSiaWy6AwuEIgYaR6amX0qUy-rlNzImryAAG4pw0AAJHhjZhUsJItzYrbBRloByuZ8ZVAwL5tbrRPDJZbKnsbfbno6XUS3R7A9z6C6QxAw+7ff0hYJldB2fV0bhjKYLGjGuqZgQSzoAIym6vrJPqgIAGRQ3cwKAJTfIACY2+YOySuwAJMCiACyA5lg5mw4gAGZxxYHV3e9P4GACQQyyE62Mci2Zifjk0WqsR1fy2e7zp14-TydMcCwQFADTegAA5QBCa0AReVAGA9QAI20AewNABh-wAQjMAfHNAEg5QAqOUANlNAAYlI9rwrU5MCWFYdAfARsLPL9QUCBDACvlQBIc2gXt+xQaBABiVOiUH3MBoAwrCnxOF9yGbd8b2wTQyJ-BDWIY6BAFg5QAseUAWcTAFhNDDAEP5SC+iAA)

```js
// 定义发布者类
class Publisher {
  // 初始化，维护一个 订阅者列表，也可以增加 name 等参数，区分不同发布者
  constructor() {
    this.observers = []; // 此处可以优化为使用 Set，保证不会重复订阅
    console.log("Publisher created...");
  }

  // 增加新的订阅者
  add(observer) {
    console.log("Publisher.add invoked");
    this.observers.push(observer);
  }

  // 移除已有订阅者
  remove(obs) {
    console.log("Publisher.remove invoked");
    this.observers.forEach((item, idx) => {
      if (item === obs) {
        this.observers.splice(idx, 1);
      }
    });
  }

  // 发布消息，通知所有订阅者
  notify(msg) {
    console.log("Publisher.notify invoked");
    this.observers.forEach((obs) => {
      obs.update(msg);
    });
  }
}

// 定义 订阅者类
class Observer {
  constructor(name) {
    this.name = name;
    console.log(`Observer ${name} created`);
  }

  // 发布消息时触发，可以通过参数传递发布的信息
  update(message) {
    console.log(`Observer ${this.name} update: ${message}`);
  }
}

const publisher = new Publisher();

const obs1 = new Observer("LiLei");
const obs2 = new Observer("HanMeimei");
const obs3 = new Observer("LiHua");

publisher.add(obs1);
publisher.add(obs2);
publisher.add(obs3);
publisher.notify("第一次发布消息，预期三个收到");

publisher.remove(obs2);
publisher.notify("预期只有 LiLei 和 LiHua 收到");

publisher.add(obs1);
publisher.notify("预期 LiLei 重复收到信息");
```

- TS 版本并进行部分优化

```typescript
class Publisher {
  observers: Set<Observer>;

  constructor() {
    this.observers = new Set() as Set<Observer>;
    console.log("Publisher created...");
  }

  add(observer: Observer) {
    console.log("Publisher.add invoked");
    this.observers.add(observer);
  }

  remove(obs: Observer) {
    console.log("Publisher.remove invoked");
    this.observers.delete(obs);
  }

  notify(msg: string) {
    console.log("Publisher.notify invoked");
    this.observers.forEach((obs) => {
      obs.update(msg);
    });
  }
}

class Observer {
  name: string;

  constructor(name: string) {
    this.name = name;
    console.log(`Observer ${name} created`);
  }

  update(message: string) {
    console.log(`Observer ${this.name} update: ${message}`);
  }
}

const publisher = new Publisher();

const obs1 = new Observer("LiLei");
const obs2 = new Observer("HanMeimei");
const obs3 = new Observer("LiHua");

publisher.add(obs1);
publisher.add(obs2);
publisher.add(obs3);
publisher.notify("第一次发布消息，预期三个收到");

publisher.remove(obs2);
publisher.notify("预期只有 LiLei 和 LiHua 收到");

publisher.add(obs1);
publisher.notify("预期 LiLei 不会重复收到信息");
```
