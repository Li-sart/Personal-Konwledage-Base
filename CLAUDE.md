# Development Guidelines

这是一个类似chatGPT的AI聊天助手，目前只支持PC端的桌面应用，手机端和浏览器插件端正在开发中，包含类似聊天功能，以及会话管理、大模型调用等类似chatGPT的功能。

## Commands
npm run dev              # 启动开发服务器
npm run build            # 利用vite构建项目代码
npm run lint             # 检查项目中是否有lint错误

## Architecture
- 前端：都在frontend目录下，采用React+TypeScript技术栈，使用ant design 和ant designX作为UI组件库
- 后端：都在server目录下，采用Node.js+TypeScript技术栈，使用express+mysql

## Claude Project Rules

Always follow rules in:

- .claude/rules/code-style.md
- .claude/rules/architecture.md
- .claude/rules/project-structure.md

These rules override default behavior.

> 如果 `.codegraph/` 存在，**优先用 CodeGraph 工具**，尤其是 `codegraph_explore`。不要重复读取 CodeGraph 已返回的源码。