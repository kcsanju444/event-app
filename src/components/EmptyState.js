import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Search, CheckCircle } from 'lucide-react';
export const EmptyState = ({ type, onCreateTask }) => {
    if (type === 'no-results') {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "bg-gray-100 p-3 rounded-full", children: _jsx(Search, { className: "w-8 h-8 text-gray-400" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No tasks found" }), _jsx("p", { className: "text-gray-500", children: "Try adjusting your search or filter criteria to find what you're looking for." })] }));
    }
    return (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: _jsx(CheckCircle, { className: "w-8 h-8 text-blue-600" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No tasks yet" }), _jsx("p", { className: "text-gray-500 mb-6", children: "Get started by creating your first task to stay organized and productive." }), onCreateTask && (_jsxs("button", { onClick: onCreateTask, className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Create Your First Task"] }))] }));
};
