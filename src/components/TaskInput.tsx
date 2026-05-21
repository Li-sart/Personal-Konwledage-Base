import { useState, type FormEvent } from 'react';

interface TaskInputProps {
  onAdd: (content: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入任务内容..."
        className="task-input-field"
      />
      <button type="submit" className="task-input-button">
        添加
      </button>
    </form>
  );
}
