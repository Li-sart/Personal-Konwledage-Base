import { useState, type FormEvent } from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  onComplete: () => void;
}

export function TaskItem({
  task,
  isSelected,
  onToggleSelect,
  onUpdate,
  onDelete,
  onComplete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (editContent.trim()) {
      onUpdate(editContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(task.content);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        className="task-checkbox"
      />

      {isEditing ? (
        <form onSubmit={handleSave} className="task-edit-form">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="task-edit-input"
            autoFocus
          />
          <button type="submit" className="task-action-btn save">
            保存
          </button>
          <button type="button" onClick={handleCancel} className="task-action-btn cancel">
            取消
          </button>
        </form>
      ) : (
        <>
          <span className="task-content">{task.content}</span>
          <div className="task-actions">
            {task.status === 'pending' && (
              <button
                onClick={onComplete}
                className="task-action-btn complete"
                title="完成"
              >
                ✓
              </button>
            )}
            {task.status === 'completed' && (
              <span className="completed-badge">已完成</span>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="task-action-btn edit"
              title="编辑"
            >
              ✎
            </button>
            <button
              onClick={onDelete}
              className="task-action-btn delete"
              title="删除"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
