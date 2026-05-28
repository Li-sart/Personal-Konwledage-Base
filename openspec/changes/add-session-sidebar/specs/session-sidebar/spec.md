# Session Sidebar Specification

## ADDED Requirements

### Requirement: 侧栏界面显示

侧栏 SHALL 显示在聊天界面左侧，宽度为 250px，包含新建会话按钮和会话列表。

#### Scenario: 侧栏初始渲染

- **Given** 用户打开聊天应用
- **Then** 侧栏 SHALL 显示在左侧，宽度 250px

#### Scenario: 新建会话按钮

- **Given** 侧栏渲染完成
- **Then** 顶部 SHALL 显示"新建会话"按钮

### Requirement: 会话列表展示

侧栏 SHALL 显示所有会话，每个会话显示标题。

#### Scenario: 会话列表渲染

- **Given** 存在多个会话
- **Then** 侧栏 SHALL 显示所有会话的标题

#### Scenario: 当前会话高亮

- **Given** 用户选中某个会话
- **Then** 该会话 SHALL 高亮显示

### Requirement: 会话 CRUD 操作

系统 SHALL 支持创建、删除会话。

#### Scenario: 新建会话

- **Given** 用户点击"新建会话"按钮
- **Then** 系统 SHALL 创建新会话并切换到该会话

#### Scenario: 删除会话

- **Given** 用户点击会话的删除按钮
- **Then** 系统 SHALL 删除该会话及其所有消息

### Requirement: 会话切换

用户 SHALL 能够切换不同会话，聊天区域显示对应消息。

#### Scenario: 切换会话

- **Given** 用户点击会话列表中的某个会话
- **Then** 聊天区域 SHALL 显示该会话的消息历史

### Requirement: 自动生成会话标题

系统 SHALL 在 AI 回答完成后自动生成会话标题。

#### Scenario: 标题生成触发

- **Given** 会话首轮对话 AI 回答完成
- **Then** 系统 SHALL 调用 AI 生成简短标题

#### Scenario: 标题显示

- **Given** 标题生成完成
- **Then** 标题 SHALL 显示在侧栏会话列表中

### Requirement: 数据持久化

会话数据 SHALL 保存到 localStorage，刷新页面后数据不丢失。

#### Scenario: 数据保存

- **Given** 用户创建、删除会话或发送消息
- **Then** 数据 SHALL 保存到 localStorage

#### Scenario: 数据恢复

- **Given** 用户刷新页面
- **Then** 系统 SHALL 从 localStorage 恢复会话数据

### Requirement: 现有功能保持

现有功能 SHALL 保持不变。

#### Scenario: 流式输出

- **Given** AI 生成回答
- **Then** 回答 SHALL 以流式方式显示（不改动）

#### Scenario: 复制功能

- **Given** 用户点击复制按钮
- **Then** 消息内容 SHALL 被复制到剪贴板（不改动）

#### Scenario: 自动滚动

- **Given** 收到新消息
- **Then** 聊天区域 SHALL 自动滚动到底部（不改动）
