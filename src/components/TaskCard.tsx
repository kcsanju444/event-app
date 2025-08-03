import React from 'react';
import { Calendar, Clock, Edit, Trash2, CheckCircle, Circle, AlertTriangle } from 'lucide-react';
import { Task } from '../types/Tasks';
import { formatDate, isOverdue, getDaysUntilDue } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  loading?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
  loading = false
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800'
  };

  const isTaskOverdue = isOverdue(task.dueDate) && task.status !== 'completed';
  const daysUntilDue = getDaysUntilDue(task.dueDate);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${isTaskOverdue ? 'ring-2 ring-red-200' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleStatus(task.id)}
            disabled={loading}
            className="flex-shrink-0 transition-colors hover:scale-110 transform duration-200"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 hover:text-emerald-600" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <h3 className={`font-semibold text-gray-900 ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${
        task.status === 'completed' ? 'line-through' : ''
      }`}>
        {task.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(task.dueDate)}</span>
            {isTaskOverdue && (
              <AlertTriangle className="w-4 h-4 text-red-500 ml-1" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>
              {daysUntilDue === 0 ? 'Due today' : 
               daysUntilDue === 1 ? 'Due tomorrow' :
               daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
               `${daysUntilDue} days left`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {task.category}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50"
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};