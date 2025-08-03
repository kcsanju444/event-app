import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-[#715CF3] p-2 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-500">Event and Task Management App</p>
            </div>
          </div>
          
          <button
            onClick={onCreateTask}
            className="inline-flex items-center px-4 py-2 bg-[#715CF3] text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};