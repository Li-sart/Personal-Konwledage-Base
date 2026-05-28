# Claude Rules Specification

## ADDED Requirements

### Requirement: 项目技术栈信息

规范文件 SHALL 包含项目实际使用的技术栈信息，确保 AI 生成代码时使用正确的技术版本。

#### Scenario: 前端技术栈

- **Given** 开发者请求 AI 生成前端代码
- **When** 规范文件包含前端技术栈信息
- **Then** AI 应使用 React 19、Vite、Ant Design X 生成代码

#### Scenario: 后端技术栈

- **Given** 开发者请求 AI 生成后端代码
- **When** 规范文件包含后端技术栈信息
- **Then** AI 应使用 Express 5、OpenAI SDK 生成代码

### Requirement: 目录结构规范

规范文件 SHALL 定义完整的项目目录结构，包括前端、后端、浏览器扩展等。

#### Scenario: 前端目录

- **Given** AI 需要创建新的前端模块
- **When** 规范定义了 frontend 目录结构
- **Then** AI 应将组件放入 frontend/components、页面放入 frontend/pages

#### Scenario: 后端目录

- **Given** AI 需要创建新的后端模块
- **When** 规范定义了 server 目录结构
- **Then** AI 应将控制器放入 server/controllers、服务放入 server/services

### Requirement: 代码风格规范

规范文件 SHALL 定义代码风格要求，包括分号、引号、类型定义等。

#### Scenario: TypeScript 规范

- **Given** AI 生成 TypeScript 代码
- **When** 规范定义了类型要求
- **Then** AI 必须为函数参数和返回值添加类型

#### Scenario: React 组件规范

- **Given** AI 生成 React 组件
- **When** 规范定义了组件结构
- **Then** AI 必须使用独立目录、index.tsx 入口、module.less 样式文件
