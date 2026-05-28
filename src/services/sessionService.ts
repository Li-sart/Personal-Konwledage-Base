import type { Session, Message, StorageData } from '../types/session';

const STORAGE_KEY = 'chatData';

// 生成 UUID
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 获取存储数据
const getStorageData = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { sessions: [], currentSessionId: '' };
};

// 保存存储数据
const saveStorageData = (data: StorageData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 创建新会话
export const createSession = (): Session => {
  const newSession: Session = {
    id: generateId(),
    title: '新会话',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const storageData = getStorageData();
  storageData.sessions.unshift(newSession);
  storageData.currentSessionId = newSession.id;
  saveStorageData(storageData);

  return newSession;
};

// 获取所有会话
export const getSessions = (): Session[] => {
  const storageData = getStorageData();
  return storageData.sessions;
};

// 获取当前会话 ID
export const getCurrentSessionId = (): string => {
  const storageData = getStorageData();
  return storageData.currentSessionId;
};

// 设置当前会话
export const setCurrentSessionId = (sessionId: string): void => {
  const storageData = getStorageData();
  storageData.currentSessionId = sessionId;
  saveStorageData(storageData);
};

// 获取当前会话
export const getCurrentSession = (): Session | null => {
  const storageData = getStorageData();
  return storageData.sessions.find((s) => s.id === storageData.currentSessionId) || null;
};

// 获取指定会话
export const getSession = (sessionId: string): Session | null => {
  const storageData = getStorageData();
  return storageData.sessions.find((s) => s.id === sessionId) || null;
};

// 更新会话
export const updateSession = (sessionId: string, data: Partial<Session>): void => {
  const storageData = getStorageData();
  const index = storageData.sessions.findIndex((s) => s.id === sessionId);
  if (index !== -1) {
    storageData.sessions[index] = {
      ...storageData.sessions[index],
      ...data,
      updatedAt: Date.now(),
    };
    saveStorageData(storageData);
  }
};

// 删除会话
export const deleteSession = (sessionId: string): void => {
  const storageData = getStorageData();
  storageData.sessions = storageData.sessions.filter((s) => s.id !== sessionId);

  // 如果删除的是当前会话，切换到第一个会话
  if (storageData.currentSessionId === sessionId) {
    storageData.currentSessionId = storageData.sessions[0]?.id || '';
  }

  saveStorageData(storageData);
};

// 添加消息到会话
export const addMessage = (sessionId: string, message: Message): void => {
  const storageData = getStorageData();
  const session = storageData.sessions.find((s) => s.id === sessionId);
  if (session) {
    session.messages.push(message);
    session.updatedAt = Date.now();
    saveStorageData(storageData);
  }
};

// 更新会话的最后一条消息（用于流式输出）
export const updateLastMessage = (sessionId: string, content: string, loading?: boolean): void => {
  const storageData = getStorageData();
  const session = storageData.sessions.find((s) => s.id === sessionId);
  if (session && session.messages.length > 0) {
    const lastMessage = session.messages[session.messages.length - 1];
    lastMessage.content = content;
    if (loading !== undefined) {
      lastMessage.loading = loading;
    }
    session.updatedAt = Date.now();
    saveStorageData(storageData);
  }
};

// 初始化会话（如果没有会话则创建一个）
export const initSessions = (): Session => {
  const storageData = getStorageData();
  if (storageData.sessions.length === 0) {
    const newSession = createSession();
    return newSession;
  }
  return storageData.sessions.find((s) => s.id === storageData.currentSessionId) || storageData.sessions[0];
};
