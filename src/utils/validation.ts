import { TaskFormData, TaskFormErrors } from '../types/Tasks';

export const validateTaskForm = (data: TaskFormData): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  } else if (data.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  } else if (data.description.trim().length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Category validation
  if (!data.category.trim()) {
    errors.category = 'Category is required';
  } else if (data.category.trim().length < 2) {
    errors.category = 'Category must be at least 2 characters long';
  }

  // Due date validation
  if (!data.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return errors;
};

export const isValidForm = (errors: TaskFormErrors): boolean => {
  return Object.keys(errors).length === 0;
};