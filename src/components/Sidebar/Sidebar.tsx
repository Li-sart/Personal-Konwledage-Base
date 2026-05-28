import { useState } from 'react';
import type { Session } from '../../types/session';
import styles from './index.module.less';

interface SidebarProps {
  sessions: Session[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onNewSession: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
  onNewSession,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [showHistory, setShowHistory] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // 切换折叠状态
  const handleToggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse?.();
  };

  // 处理菜单点击
  const handleMenuClick = (sessionId: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    setActiveMenu(activeMenu === sessionId ? null : sessionId);
  };

  // 处理重命名
  const handleRename = (sessionId: string): void => {
    const session = sessions.find((s) => s.id === sessionId);
    const newTitle = prompt('重命名会话:', session?.title);
    if (newTitle?.trim()) {
      onRenameSession(sessionId, newTitle.trim());
    }
    setActiveMenu(null);
  };

  // 处理删除
  const handleDelete = (sessionId: string): void => {
    onDeleteSession(sessionId);
    setActiveMenu(null);
  };

  // 关闭菜单
  const closeMenu = (): void => {
    setActiveMenu(null);
  };

  // 折叠状态
  if (isCollapsed) {
    return (
      <div className={styles.sidebarCollapsed}>
        <button
          onClick={onNewSession}
          className={styles.collapsedBtn}
          title="新聊天"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          onClick={handleToggleCollapse}
          className={styles.collapsedBtn}
          title="展开"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button
            onClick={onNewSession}
            className={styles.newChatBtn}
          >
            <span className={styles.newChatIcon}>+</span>
            <span>新聊天</span>
          </button>
          <button
            onClick={handleToggleCollapse}
            className={styles.collapseBtn}
            title="关闭侧栏"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 会话列表 */}
      <div className={styles.sessionList}>
        {/* 最近标题 */}
        <div className={styles.historyHeader}>
          <span className={styles.historyTitle}>最近</span>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={styles.collapseHistoryBtn}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showHistory ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* 会话列表 */}
        {showHistory && (
          <div>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`${styles.sessionItem} ${session.id === currentSessionId ? styles.sessionItemActive : ''}`}
                onClick={() => onSelectSession(session.id)}
              >
                <span className={styles.sessionTitle}>{session.title}</span>
                <button
                  onClick={(e) => handleMenuClick(session.id, e)}
                  className={styles.moreBtn}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>

                {/* 下拉菜单 */}
                {activeMenu === session.id && (
                  <div className={styles.dropdownMenu}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(session.id);
                      }}
                      className={styles.dropdownItem}
                    >
                      <span className={styles.dropdownIcon}>✏️</span>
                      重命名
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeMenu();
                      }}
                      className={styles.dropdownItem}
                    >
                      <span className={styles.dropdownIcon}>📌</span>
                      置顶
                    </button>
                    <div className={styles.dropdownDivider} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(session.id);
                      }}
                      className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                    >
                      <span className={styles.dropdownIcon}>🗑️</span>
                      删除
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 点击外部关闭菜单 */}
      {activeMenu && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={closeMenu}
        />
      )}
    </div>
  );
};

export default Sidebar;
