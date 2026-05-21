## Context

纯前端任务清单应用，使用 React + TypeScript 构建，数据存储在浏览器 localStorage 中。

## Goals / Non-Goals

- Goals:
  - 实现完整的任务 CRUD 功能
  - 完成任务时显示烟花庆祝动画
  - 支持批量选择和操作任务
  - 数据持久化到 localStorage

- Non-Goals:
  - 不需要后端 API
  - 不需要用户认证
  - 不需要多设备同步

## Decisions

- **状态管理**: 使用 React useState + useEffect，不使用 Redux/MobX（简单场景不需要）
- **数据持久化**: 使用 localStorage，在 useEffect 中监听变化自动保存
- **ID 生成**: 使用 crypto.randomUUID() 生成唯一 ID
- **烟花动画**: 使用 canvas-confetti 库，持续 5 秒，保持最后一秒
- **UI 方案**: 使用简单的内联样式或 CSS Modules，不引入 UI 框架

## Risks / Trade-offs

- localStorage 有容量限制（通常 5-10MB），任务过多时可能溢出
- 无后端意味着数据只能在本浏览器使用，无法跨设备同步

## Migration Plan

- 本应用为全新开发，不涉及迁移

## Open Questions

- 无
