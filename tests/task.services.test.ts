import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  archiveTask,
  completeTask,
  createTask,
  editTask,
  getTaskState,
  TaskState,
} from '../lib/taskService';
import * as taskRepository from '../lib/taskRepository';

vi.mock('../lib/taskRepository', () => ({
  insertTask: vi.fn(),
  updateTask: vi.fn(),
  insertTaskHistory: vi.fn(),
  getTaskById: vi.fn(),
  getAllTasks: vi.fn(),
  getTaskHistory: vi.fn(),
}));

describe('task service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns completed state for completed tasks regardless of due date', () => {
    const dueDate = new Date('2026-08-10');

    expect(getTaskState(dueDate, true)).toBe(TaskState.COMPLETED);
  });

  it('returns overdue state for tasks whose due date has passed', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() - 1);

    expect(getTaskState(dueDate, false)).toBe(TaskState.OVERDUE);
  });

  it('returns todo state for tasks due within the next two days', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 2);

    expect(getTaskState(dueDate, false)).toBe(TaskState.TODO);
  });

  it('returns in progress state for tasks due later than two days away', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    expect(getTaskState(dueDate, false)).toBe(TaskState.IN_PROGRESS);
  });

  it('creates a task and records a created history event', () => {
    const task = {
      title: 'Write tests',
      topic: 'Engineering',
      description: 'Add service coverage',
      dueDate: new Date('2026-08-10'),
    };
    const createdTask = { id: 7, ...task };

    vi.mocked(taskRepository.insertTask).mockReturnValue(createdTask as never);

    const result = createTask(task as never);

    expect(taskRepository.insertTask).toHaveBeenCalledWith(task);
    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(7, 'CREATED');
    expect(result).toEqual(createdTask);
  });

  it('edits a task and records an edited history event', () => {
    const updatedTask = {
      title: 'Updated title',
      topic: 'Planning',
      description: 'Updated description',
      dueDate: new Date('2026-08-12'),
    };

    editTask(3, updatedTask as never);

    expect(taskRepository.updateTask).toHaveBeenCalledWith(3, updatedTask);
    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(3, 'EDITED');
  });

  it('completes a task and records a completed history event', () => {
    completeTask(4);

    expect(taskRepository.updateTask).toHaveBeenCalledWith(4, { isCompleted: true });
    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(4, 'COMPLETED');
  });

  it('archives a task and records an archived history event', () => {
    archiveTask(5);

    expect(taskRepository.updateTask).toHaveBeenCalledWith(5, { isArchived: true });
    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(5, 'ARCHIVED');
  });
});
