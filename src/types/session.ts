// 会话相关类型定义

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface StorageData {
  sessions: Session[];
  currentSessionId: string;
}
