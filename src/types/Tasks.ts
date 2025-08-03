export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Task['priority'];
  category: string;
  dueDate: string;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  priority?: string; // ← Add this line
  category?: string;
  dueDate?: string;
}
