# Design: add-session-sidebar

## Overview

本设计文档详细说明侧栏会话管理功能的实现方案。

## Architecture

### Data Flow

```
用户操作 → App.tsx → sessionService → localStorage
                ↓
           Sidebar 组件
                ↓
           会话列表渲染
```

### Data Structure

```typescript
interface Session {
  id: string;           // UUID
  title: string;        // 会话标题
  messages: Message[];   // 消息列表
  createdAt: number;    // 创建时间
  updatedAt: number;    // 更新时间
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

// localStorage key: 'chatData'
interface StorageData {
  sessions: Session[];
  currentSessionId: string;
}
```

## Components

### 1. Sidebar 组件

职责：渲染侧栏、显示会话列表、处理新建/删除会话

Props：
```typescript
interface SidebarProps {
  sessions: Session[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNewSession: () => void;
}
```

### 2. SessionItem 组件

职责：渲染单个会话项，显示标题和删除按钮

Props：
```typescript
interface SessionItemProps {
  session: Session;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}
```

### 3. sessionService

职责：封装会话 CRUD 操作和 localStorage 持久化

方法：
- `getSessions(): Session[]`
- `createSession(): Session`
- `deleteSession(id: string): void`
- `updateSession(id: string, data: Partial<Session>): void`
- `getCurrentSession(): Session | null`
- `setCurrentSession(id: string): void`
- `addMessage(sessionId: string, message: Message): void`

## UI Design

### Sidebar 样式

- 宽度：250px
- 高度：100vh
- 背景色：#f5f5f5
- 右侧边框：1px solid #e8e8e8
- 新建按钮：固定在顶部，宽度 100%
- 会话列表：可滚动区域

### SessionItem 样式

- 高度：50px
- 内边距：12px
- Hover 背景：#e8e8e8
- 激活状态背景：#d9d9d9
- 删除按钮：悬浮显示，右侧定位

## Title Generation

### Trigger Condition

- 会话 messages.length === 1 时（首轮对话 AI 回答完成）
- 消息 role === 'assistant' 且 loading === false

### API Call

调用 `/chat` 接口，使用特殊 prompt 生成标题：

```typescript
const generateTitle = async (userMessage: string): Promise<string> => {
  const res = await fetch('http://localhost:3001/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `请根据用户的问题生成一个简短的会话标题（不超过20字），只返回标题本身，不要任何解释。用户问题：${userMessage}`,
      isTitleGeneration: true
    })
  });
  // 处理流式响应，返回完整标题
};
```

### Storage

生成标题后更新 localStorage：
```typescript
updateSession(sessionId, { title: generatedTitle });
```

## Integration with App.tsx

### Existing Code Preserved

- actionItems（复制功能）
- scrollToBottom（自动滚动）
- 流式输出逻辑
- ReactMarkdown 渲染
- Bubble 组件配置

### Changes Required

```typescript
// Before
const [list, setList] = useState<Msg[]>([]);

// After
const [sessions, setSessions] = useState<Session[]>([]);
const [currentSessionId, setCurrentSessionId] = useState<string>('');
const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];
```

### Message Flow

```
用户输入 → handleSend →
  1. 添加用户消息到当前会话
  2. 添加 AI 空消息（loading）
  3. 流式输出更新 AI 消息
  4. 输出完成，判断是否生成标题
  5. 如果需要生成，调用 AI 生成标题
```

## Edge Cases

1. **首次访问**：无会话数据，自动创建一个默认会话
2. **删除当前会话**：切换到第一个可用的会话
3. **标题生成失败**：使用默认标题"新会话"
4. **localStorage 满**：提示用户清理历史会话

## Testing Strategy

- 单元测试：sessionService 方法
- 集成测试：侧栏交互流程
- 回归测试：现有功能验证
