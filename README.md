# Web Project

> 前端应用 Vite+React+Typescript

## 快速开始

```sh
git clone https://github.com/zz943912292/web-project-react-vite
cd web-project-react-vite
```

### 安装依赖

```
npm install / yarn
```

### 运行项目

```
npm run dev / yarn dev
```

## 项目结构

```
fs-manage
├── README.md
├── node_modules
├── package.json
├── vite.config.js ----- vite 打包配置
├── .cz-config.js----- git 提交规范
├── .eslintrc ----- ESLint 配置
├── .gitignore ----- git 忽略文件
├── public ----- 静态文件
└── src
    └── pages ----- 页面
    └── redux ----- redux
    └── routes ------ 页面路由
    └── App.tsx ------ 项目入口
```

## 项目简介

```
项目用于快速创建现代化前端应用，技术栈vite+react+typescript
使用vite提升开发模式效率，支持ES语法，postcss，react热更新等构建能力
结合eslint和prettier约束开发规范，使react+typescript代码整洁优雅，并通过husky做git commit时自动修复
使用git cz作为git提交规范，约束提交行为
配置react-redux，支持扩展reducer以及扩展中间件
配置react-router，支持多页面开发
```
