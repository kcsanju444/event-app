# ✅ TaskFlow – Event and Task Management App

**Frontend Traineeship Assignment** for **ebPearls Pvt. Ltd**  
📍 Kupondole, Lalitpur, Nepal

---

## 📌 Overview

**TaskFlow** is a sleek and interactive Event & Task Management App built with **React**, **TypeScript**, **Tailwind CSS**, and **React Hook Form**.  
It allows users to create, manage, filter, and track tasks/events visually with intuitive UI components.

---

## ✨ Features

### 🎯 Dashboard Overview
- 📊 Total Tasks
- ✅ Completed
- ⏳ In Progress
- ⚠️ Overdue
- 🔢 Completion Rate

### ➕ Add Task / Event
Form includes:
- Title (required)
- Description (required)
- Venue (required)
- Date (required)
- Priority
- Category
- Status

Validation:
- Prevents submission if **venue + date** conflict with existing task

### 📃 View Tasks
- Task cards with:
  - Title
  - Date
  - Venue

### ✏️ Update Task
- Edit existing task with validation for venue/date collision

### ❌ Delete Task
- Permanently remove any task from the list

### 🔍 Filter & Search
- Filter by:
  - Priority
  - Status
  - Category
- Search by title

### 💾 Persistence
- All tasks saved using **localStorage** 
