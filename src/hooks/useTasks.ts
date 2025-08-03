import { useState, useCallback } from 'react';
import { Task, TaskFormData } from '../types/Tasks';
import { useLocalStorage } from './useLocalStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createTask = useCallback(async (taskData: TaskFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setTasks]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setTasks]);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setTasks]);

  const toggleTaskStatus = useCallback(async (id: string): Promise<void> => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(id, { status: nextStatus });
  }, [tasks, updateTask]);

  return {
    tasks,
    loading,
    error,
    clearError,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
};