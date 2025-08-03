import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Clock, Edit, Trash2, CheckCircle, Circle, AlertTriangle } from 'lucide-react';
import { formatDate, isOverdue, getDaysUntilDue } from '../utils/dateUtils';
export const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, loading = false }) => {
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
    return (_jsxs("div", { className: `bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${task.status === 'completed' ? 'opacity-75' : ''} ${isTaskOverdue ? 'ring-2 ring-red-200' : ''}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { onClick: () => onToggleStatus(task.id), disabled: loading, className: "flex-shrink-0 transition-colors hover:scale-110 transform duration-200", children: task.status === 'completed' ? (_jsx(CheckCircle, { className: "w-6 h-6 text-emerald-600" })) : (_jsx(Circle, { className: "w-6 h-6 text-gray-400 hover:text-emerald-600" })) }), _jsx("div", { className: "min-w-0 flex-1", children: _jsx("h3", { className: `font-semibold text-gray-900 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`, children: task.title }) })] }), _jsx("div", { className: "flex items-center space-x-2 flex-shrink-0", children: _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`, children: task.priority }) })] }), _jsx("p", { className: `text-gray-600 mb-4 text-sm leading-relaxed ${task.status === 'completed' ? 'line-through' : ''}`, children: task.description }), _jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center space-x-4 text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: formatDate(task.dueDate) }), isTaskOverdue && (_jsx(AlertTriangle, { className: "w-4 h-4 text-red-500 ml-1" }))] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { children: daysUntilDue === 0 ? 'Due today' :
                                        daysUntilDue === 1 ? 'Due tomorrow' :
                                            daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                                                `${daysUntilDue} days left` })] })] }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md", children: task.category }), _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`, children: task.status.replace('-', ' ') })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => onEdit(task), disabled: loading, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50", title: "Edit task", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => onDelete(task.id), disabled: loading, className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50", title: "Delete task", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] })] }));
};
