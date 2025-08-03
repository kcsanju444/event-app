import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { isOverdue } from '../utils/dateUtils';
export const TaskStats = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const overdueTasks = tasks.filter(task => isOverdue(task.dueDate) && task.status !== 'completed').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const stats = [
        {
            label: 'Total Tasks',
            value: totalTasks,
            icon: TrendingUp,
            color: 'bg-blue-100 text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Completed',
            value: completedTasks,
            icon: CheckCircle,
            color: 'bg-emerald-100 text-emerald-600',
            bgColor: 'bg-emerald-50'
        },
        {
            label: 'In Progress',
            value: inProgressTasks,
            icon: Clock,
            color: 'bg-yellow-100 text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Overdue',
            value: overdueTasks,
            icon: AlertTriangle,
            color: 'bg-red-100 text-red-600',
            bgColor: 'bg-red-50'
        }
    ];
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Task Overview" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Completion Rate:" }), _jsxs("span", { className: "font-semibold text-emerald-600", children: [completionRate, "%"] })] })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat) => {
                    const Icon = stat.icon;
                    return (_jsxs("div", { className: `${stat.bgColor} rounded-lg p-4 transition-all duration-200 hover:scale-105`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: `p-2 rounded-lg ${stat.color}`, children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsx("span", { className: "text-2xl font-bold text-gray-900", children: stat.value })] }), _jsx("p", { className: "text-sm font-medium text-gray-600", children: stat.label })] }, stat.label));
                }) }), totalTasks > 0 && (_jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Progress" }), _jsxs("span", { className: "text-sm text-gray-500", children: [completedTasks, " of ", totalTasks] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-emerald-600 h-2 rounded-full transition-all duration-500 ease-out", style: { width: `${completionRate}%` } }) })] }))] }));
};
