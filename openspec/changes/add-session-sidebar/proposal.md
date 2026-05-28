# Proposal: add-session-sidebar

## Summary

在 AI 聊天应用左侧添加侧栏，实现会话管理功能，包括新建会话、删除会话、会话切换，以及 AI 自动总结会话标题功能。

## Motivation

当前应用只有单一的聊天界面，所有消息混合存储在 localStorage 中，无会话概念。用户无法：
- 创建多个独立对话
- 切换不同对话上下文
- 快速删除不需要的对话
- 通过标题快速识别对话内容

## Scope

### In Scope
- 左侧侧栏 UI 组件开发
- 会话 CRUD 功能（创建、读取、删除）
- 会话切换功能
- AI 自动生成会话标题
- localStorage 持久化

### Out Scope
- 后端会话管理 API（前端使用 localStorage）
- 用户认证
- 云端同步
- 消息搜索功能

## Dependencies

- React 19
- Ant Design X
- DeepSeek API（用于标题生成）

## Risk Assessment

- **低风险**：纯前端功能，使用 localStorage 存储
- **约束**：不修改现有流式输出、复制、自动滚动功能

## Reference

详细需求文档：`features/add-session-message.md`
