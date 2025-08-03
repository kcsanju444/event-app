import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { validateTaskForm, isValidForm } from '../utils/validation';
import { LoadingSpinner } from './LoadingSpinner';
export const TaskForm = ({ task, onSubmit, onCancel, loading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                category: task.category,
                dueDate: task.dueDate
            });
        }
    }, [task]);
    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };
    const handleBlur = (field) => () => {
        setTouched(prev => ({ ...prev, [field]: true }));
        // Validate single field on blur
        const fieldErrors = validateTaskForm(formData);
        setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mark all fields as touched
        const allFields = Object.keys(formData);
        setTouched(Object.fromEntries(allFields.map(field => [field, true])));
        // Validate form
        const formErrors = validateTaskForm(formData);
        setErrors(formErrors);
        if (!isValidForm(formErrors)) {
            return;
        }
        try {
            await onSubmit(formData);
            // Reset form if creating new task
            if (!task) {
                setFormData({
                    title: '',
                    description: '',
                    priority: 'medium',
                    category: '',
                    dueDate: ''
                });
                setTouched({});
            }
        }
        catch (error) {
            // Error is handled in the hook
        }
    };
    const getFieldError = (field) => {
        return touched[field] ? errors[field] : undefined;
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: task ? 'Edit Task' : 'Create New Task' }), _jsx("button", { onClick: onCancel, disabled: loading, className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-2", children: "Title *" }), _jsx("input", { type: "text", id: "title", value: formData.title, onChange: handleChange('title'), onBlur: handleBlur('title'), className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getFieldError('title') ? 'border-red-300 bg-red-50' : 'border-gray-300'}`, placeholder: "Enter task title", disabled: loading }), getFieldError('title') && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), getFieldError('title')] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700 mb-2", children: "Description *" }), _jsx("textarea", { id: "description", value: formData.description, onChange: handleChange('description'), onBlur: handleBlur('description'), rows: 4, className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${getFieldError('description') ? 'border-red-300 bg-red-50' : 'border-gray-300'}`, placeholder: "Enter task description", disabled: loading }), getFieldError('description') && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), getFieldError('description')] }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "priority", className: "block text-sm font-medium text-gray-700 mb-2", children: "Priority" }), _jsxs("select", { id: "priority", value: formData.priority, onChange: handleChange('priority'), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors", disabled: loading, children: [_jsx("option", { value: "low", children: "Low" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "high", children: "High" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 mb-2", children: "Category *" }), _jsx("input", { type: "text", id: "category", value: formData.category, onChange: handleChange('category'), onBlur: handleBlur('category'), className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getFieldError('category') ? 'border-red-300 bg-red-50' : 'border-gray-300'}`, placeholder: "e.g., Work, Personal", disabled: loading }), getFieldError('category') && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), getFieldError('category')] }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "dueDate", className: "block text-sm font-medium text-gray-700 mb-2", children: "Due Date *" }), _jsx("input", { type: "date", id: "dueDate", value: formData.dueDate, onChange: handleChange('dueDate'), onBlur: handleBlur('dueDate'), className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getFieldError('dueDate') ? 'border-red-300 bg-red-50' : 'border-gray-300'}`, disabled: loading }), getFieldError('dueDate') && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), getFieldError('dueDate')] }))] }), _jsxs("div", { className: "flex items-center justify-end space-x-3 pt-4 border-t border-gray-200", children: [_jsx("button", { type: "button", onClick: onCancel, disabled: loading, className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50", children: "Cancel" }), _jsxs("button", { type: "submit", disabled: loading, className: "inline-flex items-center px-4 py-2 bg-[#715CF3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50", children: [loading ? (_jsx(LoadingSpinner, { size: "sm", className: "mr-2" })) : (_jsx(Save, { className: "w-4 h-4 mr-2" })), task ? 'Update Task' : 'Create Task'] })] })] })] }) }));
};
