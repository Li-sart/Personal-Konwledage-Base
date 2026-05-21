import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onDeleteSelected: () => void;
  onCompleteSelected: () => void;
}

export function TaskList({
  tasks,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onUpdate,
  onDelete,
  onComplete,
  onDeleteSelected,
  onCompleteSelected,
}: TaskListProps) {
  const allSelected = tasks.length > 0 && selectedIds.length === tasks.length;
  const hasSelection = selectedIds.length > 0;

  if (tasks.length === 0) {
    return <div className="task-list-empty">暂无任务</div>;
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <label className="select-all">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleSelectAll}
          />
          全选
        </label>
      </div>

      <div className="task-list-items">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isSelected={selectedIds.includes(task.id)}
            onToggleSelect={() => onToggleSelect(task.id)}
            onUpdate={(content) => onUpdate(task.id, content)}
            onDelete={() => onDelete(task.id)}
            onComplete={() => onComplete(task.id)}
          />
        ))}
      </div>

      {hasSelection && (
        <div className="batch-actions">
          <span>已选择 {selectedIds.length} 项</span>
          <button onClick={onCompleteSelected} className="batch-btn complete">
            批量完成
          </button>
          <button onClick={onDeleteSelected} className="batch-btn delete">
            批量删除
          </button>
        </div>
      )}
    </div>
  );
}
