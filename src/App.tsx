import React, { useState, useMemo } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
//import { Header } from './components/Header';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
//import { EmptyState } from './components/EmptyState';
import { EmptyState } from './components/EmptyState';
import { ErrorAlert } from './components/ErrorAlert';
import { LoadingScreen } from './components/LoadingSpinner';
import { useTasks } from './hooks/useTasks';
import { Task, TaskFormData } from './types/Tasks';

function App() {
  const {
    tasks,
    loading,
    error,
    clearError,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Get unique categories from tasks
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tasks.map(task => task.category)));
    return uniqueCategories.sort();
  }, [tasks]);

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesCategory = !categoryFilter || task.category === categoryFilter;

      return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
    });
  }, [tasks, searchTerm, priorityFilter, statusFilter, categoryFilter]);

  // Sort tasks by priority and due date
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Completed tasks go to bottom
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (b.status === 'completed' && a.status !== 'completed') return -1;
      
      // Sort by priority (high > medium > low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date (earlier first)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [filteredTasks]);

  // ✅ FIXED: Ensure it's a boolean, not string
  const hasActiveFilters = !!(
    searchTerm || priorityFilter || statusFilter || categoryFilter
  );

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await createTask(data);
      }
      setShowForm(false);
      setEditingTask(undefined);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('');
    setStatusFilter('');
    setCategoryFilter('');
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header onCreateTask={handleCreateTask} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <ErrorAlert message={error} onDismiss={clearError} />
          )}

          <div className="space-y-6">
            {/* Stats Section */}
            <TaskStats tasks={tasks} />

            {/* Filters Section */}
            <TaskFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              categories={categories}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Tasks Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Tasks ({filteredTasks.length})
                  </h2>
                  {hasActiveFilters && (
                    <span className="text-sm text-gray-500">
                      Showing filtered results
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {loading && tasks.length === 0 ? (
                  <LoadingScreen />
                ) : sortedTasks.length === 0 ? (
                  <EmptyState 
                    type={hasActiveFilters ? 'no-results' : 'no-tasks'}
                    onCreateTask={!hasActiveFilters ? handleCreateTask : undefined}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onToggleStatus={toggleTaskStatus}
                        loading={loading}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={loading}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
