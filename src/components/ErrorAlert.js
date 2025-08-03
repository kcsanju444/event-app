import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, X } from 'lucide-react';
export const ErrorAlert = ({ message, onDismiss }) => {
    return (_jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-6", children: _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AlertTriangle, { className: "w-5 h-5 text-red-600" }) }), _jsx("div", { className: "ml-3 flex-1", children: _jsx("p", { className: "text-sm font-medium text-red-800", children: message }) }), _jsx("div", { className: "ml-auto pl-3", children: _jsx("button", { onClick: onDismiss, className: "inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 transition-colors", children: _jsx(X, { className: "w-4 h-4" }) }) })] }) }));
};
