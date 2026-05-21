export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  createdAt: number;
}

export interface AppState {
  tasks: Task[];
  selectedIds: string[];
}
