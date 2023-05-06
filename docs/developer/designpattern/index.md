---
title: 设计模式
lastUpdated: true
---

# 设计模式

《设计模式：可服用面向对象软件的基础》

在软件工程中，设计模式是对软件设计中普遍存在的各种问题所提出的**解决方案**

## 道 与 术

面向编程和面向对象设计的五个基本原则，JavaScript 中主要围绕 单一功能 和 开放封闭 两个原则展开

- SOLID 设计原则
  - Single Responsibilitty Principle, 单一功能原则
  - Opened Closed Principle, 开发封闭原则
  - Liskov Substitution Principle, 里式替换原则
  - Interface Segregation Principle, 接口隔离原则
  - Dependency Inversion Principle, 依赖反转原则

::: tip 为什么要使用设计模式? - 封装变化
实现功能之余要考虑可维护性、可扩展性，所以我们要尽量将代码的变与不变部分分离，确保变化的部分灵活，不变的地方稳定，这样来写出健壮的代码
:::

## 实现

- 创建型

  - 工厂模式
  - 抽象工厂模式
  - 原型模式
  - 单例模式
  - 构造器模式

- 结构型

  - 装饰器模式
  - 适配器模式
  - 代理模式
  - 桥接模式
  - 外观模式
  - 组合模式
  - 享元模式

- 行为型

  - [观察者模式](/developer/designpattern/ObserverPattern)

  - [发布订阅模式](/developer/designpattern/发布订阅模式)

  - 策略模式
  - 状态模式
  - 迭代器模式
  - 解释器模式
  - 中介者模式
  - 访问者模式
  - 备忘录模式
  - 模板方法模式
  - 职责链模式
  - 命令模式

此外，并不是 GOF 提出的 23 种经典设计模式可以被称之为设计模式，只要一个方案遵循设计原则，解决一类问题，就都可以称之为一个设计模式
