import { useState } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { CelebrationModal } from './components/CelebrationModal';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const {
    tasks,
    selectedIds,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    toggleSelect,
    toggleSelectAll,
    deleteSelected,
    completeSelected,
  } = useTasks();

  const [showCelebration, setShowCelebration] = useState(false);

  const handleComplete = (id: string) => {
    completeTask(id);
    setShowCelebration(true);
  };

  const handleCompleteSelected = () => {
    completeSelected();
    setShowCelebration(true);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  return (
    <div className="app">
      <h1>任务清单</h1>
      <TaskInput onAdd={addTask} />
      <TaskList
        tasks={tasks}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onComplete={handleComplete}
        onDeleteSelected={deleteSelected}
        onCompleteSelected={handleCompleteSelected}
      />
      <CelebrationModal
        isVisible={showCelebration}
        onClose={handleCloseCelebration}
      />
    </div>
  );
}

export default App;
