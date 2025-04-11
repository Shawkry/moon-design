<p align="center"><img src="../assets/moon.png"  alt=""/></p>

<h1 align="center">Moon Design</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/moond" target="_blank" style={{margin:'5px'}}>
    <img src="https://img.shields.io/npm/v/moond" alt="NPM Package Stable" />
  </a>
  <a href="https://github.com/Shawkry/moon-design/blob/master/LICENSE" target="_blank"  style={{margin:'5px'}}>
    <img src="https://img.shields.io/github/license/shawkry/moon-design" alt="License" />
  </a>
  <a href="https://github.com/Shawkry/moon-design" target="_blank" style={{margin:'5px'}}>
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-View-9873B9?logo=github" />
  </a>
</p>

## 🌙 介绍

欢迎使用 Moon Design 组件库！Moon Design 是一个专注于现代化设计和用户体验的 React 组件库，旨在为您的项目提供一套完整、美观且易于使用的组件，让您可以轻松构建出色的用户界面。

## ✨ 特性

Moon Design 组件库具有以下特性：

- **🎨 现代化设计**：我们的设计灵感源自月亮的壮丽景象，每个组件都散发着独特的光芒，为您的应用增添魅力。
- **🛠 易于使用**：我们的组件易于使用，具有良好的可定制性，可以满足各种项目的需求。
- **🔍 TS类型支持**：提供类型安全的开发体验，减少错误和调试时间，让开发更高效。
- **📱 响应式布局**：所有组件都经过精心设计，确保在不同屏幕尺寸下都能够良好地显示和响应。
- **🎨 提供主题定制**：允许用户根据项目需求定制组件外观，使UI风格更符合项目整体风格。(开发中)

## 📦 安装

使用 npm 或者 pnpm 安装 Moon Design 组件库：

```bash
npm install moond
# 或者
pnpm intall moond
```

全局引入 CSS 样式文件

```ts
import 'moond/dist/style.css';
```

## 🚀 快速开始

```tsx
import React from 'react';
import { Button, Input } from 'moond';

const App = () => {
    return (
        <div>
            <Button onClick={() => alert('Hello, Moon Design!')}>Click me</Button>
            <Input placeholder="Enter your email" />
        </div>
    );
};
export default App;
```
