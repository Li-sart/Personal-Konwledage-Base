# Project Context

## Purpose

AI 聊天应用 - 支持与 AI 大模型对话，具备笔记管理、语义搜索等功能。

## Tech Stack

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 19.2.6 |
| 构建工具 | Vite | 8.0.12 |
| UI 组件库 | Ant Design | 6.4.2 |
| UI 组件库 | Ant Design X | 2.7.0 |
| Markdown 渲染 | react-markdown | 10.1.0 |
| 样式方案 | LESS | 4.6.4 |
| 后端框架 | Express | 5.2.1 |
| AI SDK | OpenAI | 6.37.0 |
| 语言 | TypeScript | 6.0.2 |
| HTTP 客户端 | Axios | 1.16.1 |
| 跨域 | CORS | 2.8.6 |
| 环境变量 | dotenv | 17.4.2 |

## Project Conventions

### Code Style

- 使用 TypeScript
- 分号结尾，单引号字符串
- 优先使用 const，箭头函数
- CSS Modules 样式方案（.module.less）
- React 组件使用独立目录结构

### Architecture Patterns

- 分层架构：UI → Service → Data/AI
- Electron 进程架构：Main Process + Renderer Process
- IPC 通信机制

### Testing Strategy

使用 ESLint 进行代码检查

### Git Workflow

使用标准 Git 工作流
