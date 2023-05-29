---
title: 搭建monorepo项目
lastUpdated: true
---

# 搭建 monorepo 项目

mono-repo

- 简单工具：
  npm workspace
  yarn workspace
  pnpm workspace

- 专业工具：
  nx
  bit
  truborepo
  rush
  lerna

- pnpm 相比其他打包工具（npm 和 yarn）的优势
  依赖安装快（link）
  更规范（处理幽灵依赖）

## 初始化项目

```sh
npm install -g pnpm

pnpm init
```

创建 `pnpm-workspace.yaml` 文件

```yaml
packages:
  - "pack..ages/*"
```

添加 `.gitignore`

```.gitignore
/node_modules
```

安装代码规范工具

```sh
# monorepo 中需要指定依赖安装在哪个包，-w 指根目录
pnpm i eslint -D -w

# 初始化，
npx eslint --init
```

.eslintrc.json

```json
{}
```

```sh
pnpm i -D -w @typescript-eslint/eslint

pnpm i prettier -D -w

# 把 prettier 集成到 eslint 中，防止规则冲突
pnpm i eslint-config-prettier eslint-plugin-prettier -D -w
```

- eslint-config-prettier: 覆盖 ESLint 本身的规则配置
- eslint-plugin-prettier: 用 Prettier 来接管修复代码 (即 `eslint --fix`)

新建 `.prettierrc.json` 配置文件

pacakge.json

```json
{
  "script": {
    // 以 .ts .tsx .jsx 结尾，自动修复，不输出，指定范围 .packages
    "lint": "eslint --ext .ts,.tsx,.jsx --fix --quiet ./packages"
  }
}
```

设置 VSCode 默认格式化工具为 prettier 保存时自动格式化

### commit 规范检查

```sh
pnpm i husky -D -w

# husky 初始化
npx husky install
# 将上面实现的格式化命令 pnpm lint 纳入 commit 时 husky 将执行的脚本
npx husky add .husky/pre-commit "pnpm lint"
```

pnpm lint 会对代码进行全量检查，项目复杂会比较慢，后续考虑使用 lint-staged 只对暂存区代码进行保存
通过 commitlint 对 git 提交信息进行检查

```sh
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w

npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```
