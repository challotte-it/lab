import type { Task } from '../types/task';
import { validateTask } from './inputValidation';
import {
  insertTask,
  insertTaskHistory,
  updateTask,
} from './taskRepository';

export enum TaskState {
  IN_PROGRESS,
  TODO,
  OVERDUE,
  COMPLETED,
}

export function getTaskState(dueDate: Date, isCompleted: boolean): TaskState {
  if (isCompleted) {
    return TaskState.COMPLETED;
  }

  const today = new Date();
  const daysRemaining = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (daysRemaining < 0) {
    return TaskState.OVERDUE;
  }

  if (daysRemaining <= 2) {
    return TaskState.TODO;
  }

  return TaskState.IN_PROGRESS;
}

export function createTask(task: Task) {
  if (!validateTask(task)) {
    return null;
  }

  const createdTask = insertTask(task);
  insertTaskHistory(createdTask.id, 'CREATED');
  return createdTask;
}

export function editTask(id: number, updates: Partial<Task>) {
  const updatedTask = updateTask(id, updates);
  insertTaskHistory(id, 'EDITED');
  return updatedTask;
}

export function completeTask(id: number) {
  const updatedTask = updateTask(id, { isCompleted: true });
  insertTaskHistory(id, 'COMPLETED');
  return updatedTask;
}

export function archiveTask(id: number) {
  const updatedTask = updateTask(id, { isArchived: true });
  insertTaskHistory(id, 'ARCHIVED');
  return updatedTask;
}


