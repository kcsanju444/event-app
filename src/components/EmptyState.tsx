import React from 'react';
import { Plus, Search, CheckCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results';
  onCreateTask?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, onCreateTask }) => {
  if (type === 'no-results') {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
      <p className="text-gray-500 mb-6">
        Get started by creating your first task to stay organized and productive.
      </p>
      {onCreateTask && (
        <button
          onClick={onCreateTask}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Task
        </button>
      )}
    </div>
  );
};