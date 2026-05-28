# Design: update-claude-rules

## Overview

本提案旨在更新 `.claude/rules/` 目录下的三个规范文件，补充项目实际的技术栈信息。

## Design Decisions

### 1. openspec/project.md 更新

**当前状态**: 模板文件，内容为空

**更新内容**:
- 补充项目用途：AI 聊天应用
- 补充技术栈列表
- 补充代码风格规范

### 2. architecture.md 更新

**当前状态**: 已包含分层架构和 Electron 架构约束

**更新内容**:
- 补充前端技术栈：React 19 + Vite
- 补充 UI 组件库：Ant Design X
- 补充后端技术栈：Express + OpenAI SDK

### 3. code-style.md 更新

**当前状态**: 已包含通用规范、React 规范、样式规范

**更新内容**:
- 补充 React 19 特定规范（如 Hooks 规则）
- 补充 Ant Design 组件使用规范
- 补充 LESS 样式规范细节

### 4. project-structure.md 更新

**当前状态**: 已包含目录结构

**更新内容**:
- 补充浏览器扩展目录结构
- 补充声明文件目录

## Technical Details

### 项目技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 19.2.6 |
| 构建工具 | Vite 8.0.12 |
| UI 组件库 | Ant Design 6.4.2, Ant Design X 2.7.0 |
| 样式方案 | LESS 4.6.4 |
| 后端框架 | Express 5.2.1 |
| AI SDK | OpenAI 6.37.0 |
| 语言 | TypeScript 6.0.2 |
| HTTP 客户端 | Axios 1.16.1 |
| Markdown | react-markdown 10.1.0 |

### 目录结构

```
/AI_chat
├── declare              # 全局类型声明
├── browser-extension     # 浏览器扩展
├── frontend             # 前端应用
│   ├── components       # React 组件
│   ├── pages           # 页面组件
│   ├── services        # 业务逻辑
│   ├── commons         # 公共模块
│   ├── utils          # 工具函数
│   ├── styles         # 样式文件
│   └── types          # 类型定义
├── public              # 静态资源
├── server              # 后端服务
│   ├── config         # 配置
│   ├── controllers    # 数据访问层
│   ├── models         # 数据模型
│   ├── routes         # 路由
│   └── services       # 服务层
├── openspec            # OpenSpec 规范
└── .claude             # Claude 配置
    └── rules          # 规范文件
```

## Alternatives Considered

### 保持现状
- **缺点**: 规范文件缺少技术栈信息，可能导致 AI 生成代码时使用不匹配的技术版本

### 创建新规范文件
- **缺点**: 分散规范内容，增加维护成本
- **优点**: 可以独立演进

**选择**: 更新现有文件，保持规范集中管理
