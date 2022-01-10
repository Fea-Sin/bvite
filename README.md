# Vue3 And Vite Component Library Project

## 项目工程化

- [x] Editor

- [x] ESLint

- [x] TS

- [x] Prettier

- [x] Lint-Staged

- [x] Husky

- [x] Vite

- [x] Vue3

- [x] Pnpm

- [x] Less

- [x] Jest

  - [x] Snapshots

Vue3 组件 Library Template，包含所有基础工程，遵循最佳实践

git commit code lint

git commit code prettier

unit test

git commit format

contain type definitions

docs 生成

## 如何发布自己的 Library Package

只需要一个步骤即可

```
project-root
  |-- build
  |     |-- vfui
  |     |    |-- package.json
```

将`package.json`的`name`属性修改为你组件库名称即可，例如`my-awesome-ui`

## install package

```
pnpm install
```

## (dev mode)开发模式

```bash
npm run dev
```

## (docs mode)文档开发

```bash
npm run docs
```

## (build package)打包

```bash
npm run build
```

## (unit test)单元测试

```bash
pnpm run test -r
```

## (publish package)包发布

```bash
cd scripts

./publish.sh
```
