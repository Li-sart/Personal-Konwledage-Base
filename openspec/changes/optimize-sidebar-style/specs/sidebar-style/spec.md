# Sidebar Style Specification

## ADDED Requirements

### Requirement: 侧栏基础样式

侧栏 SHALL 具有合适的基础样式，包括宽度、背景色、边框等。

#### Scenario: 侧栏渲染

- **Given** 用户打开聊天应用
- **Then** 侧栏 SHALL 宽度为 260px，白色背景，右边框分隔

#### Scenario: 分割线

- **Given** 侧栏与聊天区域
- **Then** 两者之间 SHALL 有 1px 浅灰色分割线

### Requirement: 新聊天样式

新聊天 SHALL 改为列表样式，鼠标悬停有交互反馈。

#### Scenario: 新聊天按钮

- **Given** 用户看到侧栏
- **Then** 新聊天 SHALL 显示为列表项样式，不是按钮

#### Scenario: 悬停效果

- **Given** 用户鼠标悬停在"新聊天"上
- **Then** 鼠标 SHALL 变成小手，背景色变化

### Requirement: 最近会话收拉

最近会话列表 SHALL 支持收拉功能。

#### Scenario: 收拉按钮

- **Given** 侧栏显示最近会话
- **Then** 标题旁 SHALL 有收拉按钮

#### Scenario: 收拉功能

- **Given** 用户点击收拉按钮
- **Then** 会话列表 SHALL 收起或展开

### Requirement: 会话列表交互

会话列表项 SHALL 有良好的交互状态。

#### Scenario: 悬停状态

- **Given** 用户鼠标悬停在会话项上
- **Then** 背景 SHALL 变为浅灰色 (#f7f7f8)

#### Scenario: 激活状态

- **Given** 用户选中了某个会话
- **Then** 该会话 SHALL 背景变为浅灰色 (#f0f0f0)

### Requirement: 操作菜单

会话项 SHALL 有操作菜单，支持重命名、置顶、删除。

#### Scenario: 显示菜单按钮

- **Given** 用户鼠标悬停在会话项上
- **Then** 右边 SHALL 显示三个点按钮

#### Scenario: 菜单显示

- **Given** 用户点击三个点按钮
- **Then** SHALL 弹出下拉菜单，包含重命名、置顶、删除选项
