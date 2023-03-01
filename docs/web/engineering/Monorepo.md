# MonoRepo

多个项目放在一个仓库里

相对于传统的 MultiRepo 模式(每个项目一个单独仓库)

```md
├── packages
| ├── pkg1
| | ├── package.json
| ├── pkg2
| | ├── package.json
├── package.json
```

基于 `yarn workspace` 实现，通过 link 仓库的各个 package ，达到跨项目复用的 mudi
