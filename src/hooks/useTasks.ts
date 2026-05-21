import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskStatus } from '../types';

const STORAGE_KEY = 'task-list-data';

function loadFromStorage(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadFromStorage);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);

  const addTask = useCallback((content: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: content.trim(),
      status: 'pending',
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, content: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, content: content.trim() } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setSelectedIds((prev) => prev.filter((taskId) => taskId !== id));
  }, []);

  const completeTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'completed' as TaskStatus } : task
      )
    );
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((taskId) => taskId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === tasks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tasks.map((task) => task.id));
    }
  }, [selectedIds, tasks]);

  const deleteSelected = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !selectedIds.includes(task.id)));
    setSelectedIds([]);
  }, [selectedIds]);

  const completeSelected = useCallback(() => {
    setTasks((prev) =>
      prev.map((task) =>
        selectedIds.includes(task.id)
          ? { ...task, status: 'completed' as TaskStatus }
          : task
      )
    );
    setSelectedIds([]);
  }, [selectedIds]);

  return {
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
  };
}
