import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Bubble, Actions } from "@ant-design/x";
import { Avatar, Flex } from "antd";
import { Think } from "@ant-design/x";
import { Sidebar } from "./components/Sidebar";
import type { Session, Message } from "./types/session";
import * as sessionService from "./services/sessionService";

// 复制功能
const actionItems = (content: string) => [
  {
    key: "copy",
    label: "copy",
    actionRender: () => <Actions.Copy text={content} />,
  },
];

// 生成标题
const generateTitle = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `请根据用户的问题生成一个简短的会话标题（不超过20字），只返回标题本身，不要任何解释。用户问题：${userMessage}`,
        isTitleGeneration: true,
      }),
    });

    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      const data = await res.json();
      return data.reply?.slice(0, 20) || "新会话";
    }

    // 流式响应处理
    const reader = res.body?.getReader();
    if (!reader) return "新会话";

    const decoder = new TextDecoder("utf-8");
    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
    }
    return result.slice(0, 20) || "新会话";
  } catch (error) {
    console.error("生成标题失败:", error);
    return "新会话";
  }
};

function Chat() {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 初始化会话
  useEffect(() => {
    const initSession = sessionService.initSessions();
    setSessions(sessionService.getSessions());
    setCurrentSessionId(initSession.id);
  }, []);

  // 自动滚动到底部
  const scrollToBottom = (): void => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  // 获取当前会话的消息
  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const currentMessages = currentSession?.messages || [];

  // 新建会话
  const handleNewSession = (): void => {
    const newSession = sessionService.createSession();
    setSessions(sessionService.getSessions());
    setCurrentSessionId(newSession.id);
  };

  // 选择会话
  const handleSelectSession = (sessionId: string): void => {
    setCurrentSessionId(sessionId);
    sessionService.setCurrentSessionId(sessionId);
    // 滚动到底部
    setTimeout(scrollToBottom, 100);
  };

  // 删除会话
  const handleDeleteSession = (sessionId: string): void => {
    sessionService.deleteSession(sessionId);
    setSessions(sessionService.getSessions());
    const newCurrentId = sessionService.getCurrentSessionId();
    setCurrentSessionId(newCurrentId);
  };

  // 重命名会话
  const handleRenameSession = (sessionId: string, newTitle: string): void => {
    sessionService.updateSession(sessionId, { title: newTitle });
    setSessions([...sessionService.getSessions()]);
  };

  // 发送消息
  const handleSend = async (): Promise<void> => {
    if (!input.trim() || !currentSessionId) return;
    const msg = input;
    setInput("");

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
    };
    sessionService.addMessage(currentSessionId, userMessage);
    setSessions([...sessionService.getSessions()]);

    // 添加 AI 空消息
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      loading: true,
    };
    sessionService.addMessage(currentSessionId, aiMessage);
    setSessions([...sessionService.getSessions()]);
    scrollToBottom();

    // 判断是否需要生成标题（只有第一条消息时才生成）
    const shouldGenerateTitle = currentMessages.length === 0;

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
        }),
      });

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        // 天气查询：JSON 响应
        const data = await res.json();
        sessionService.updateLastMessage(currentSessionId, data.reply, false);
        setSessions([...sessionService.getSessions()]);

        // 生成标题
        if (shouldGenerateTitle) {
          const title = await generateTitle(msg);
          sessionService.updateSession(currentSessionId, { title });
          setSessions([...sessionService.getSessions()]);
        }
        return;
      }

      // 普通对话：流式响应
      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder("utf-8");
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        // 实时更新最后一条 AI 消息
        sessionService.updateLastMessage(currentSessionId, result, true);
        setSessions([...sessionService.getSessions()]);
        scrollToBottom();
      }

      // 关闭 loading
      sessionService.updateLastMessage(currentSessionId, result, false);
      setSessions([...sessionService.getSessions()]);
      scrollToBottom();

      // 生成标题
      if (shouldGenerateTitle) {
        const title = await generateTitle(msg);
        sessionService.updateSession(currentSessionId, { title });
        setSessions([...sessionService.getSessions()]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 清空当前会话
  const clearHistory = (): void => {
    if (currentSessionId) {
      sessionService.updateSession(currentSessionId, { messages: [] });
      setSessions([...sessionService.getSessions()]);
    }
  };

  const toggleSidebar = (): void => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        onNewSession={handleNewSession}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #e5e5e5' }}>
        <h2 style={{ padding: '16px 20px', fontSize: '18px', fontWeight: 500, color: '#1f1f1f' }}>AI聊天</h2>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {currentMessages.map((item, index) => (
            <div key={index}>
              <Flex vertical gap="small">
                <Flex gap="small" wrap>
                  <div style={{ width: "100%" }}>
                    {item.role === "assistant" && (
                      <div>
                        {item.loading && item.content === "" && (
                          <Think title="正在思考中..." blink loading />
                        )}
                        <Bubble
                          content={
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                          }
                          header="AI助手"
                          avatar={<Avatar src="/src/assets/AImessage.jpeg" />}
                          footer={() => (
                            <Actions items={actionItems(item.content)} />
                          )}
                        />
                      </div>
                    )}
                  </div>
                </Flex>
                <Flex gap="small" wrap>
                  <div style={{ width: "100%", marginBottom: "30px" }}>
                    {item.role === "user" && (
                      <Bubble
                        content={item.content}
                        placement="end"
                        header="用户"
                        avatar={<Avatar src="/src/assets/user.jpeg" />}
                      />
                    )}
                  </div>
                </Flex>
              </Flex>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e5e5', display: 'flex', gap: '10px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="发送消息..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #d9d9d9', fontSize: '14px', outline: 'none' }}
          />
          <button
            onClick={handleSend}
            style={{ padding: '10px 20px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
          >
            发送
          </button>
          <button
            onClick={clearHistory}
            style={{ padding: '10px 16px', background: '#f5f5f5', color: '#666', border: '1px solid #d9d9d9', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
          >
            清空
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
