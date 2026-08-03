import { describe, expect, it } from 'vitest';

import { matchesStatusFilter, sortTasks, type StatusFilter, type SortOption } from '../lib/taskSorting';
import type { Task } from '../types/task';

function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: Math.floor(Math.random() * 1000),
    title: 'Task',
    topic: 'General',
    description: '',
    dueDate: new Date('2099-01-01'),
    ...overrides,
  };
}

describe('task sorting', () => {
  it('matches a task to the selected status filter', () => {
    const today = new Date();
    const todoDate = new Date(today);
    todoDate.setDate(today.getDate() + 1);

    const task = createTask({ title: 'Todo task', dueDate: todoDate });

    expect(matchesStatusFilter(task, 'todo' as StatusFilter)).toBe(true);
    expect(matchesStatusFilter(task, 'in-progress' as StatusFilter)).toBe(false);
  });

  it('places matching status tasks first when a status filter is selected', () => {
    const today = new Date();
    const todoDate = new Date(today);
    todoDate.setDate(today.getDate() + 1);

    const inProgressDate = new Date(today);
    inProgressDate.setDate(today.getDate() + 3);

    const tasks = [
      createTask({ title: 'Completed task', isCompleted: true }),
      createTask({ title: 'Todo task', dueDate: todoDate }),
      createTask({ title: 'In progress task', dueDate: inProgressDate }),
    ];

    const sortedTasks = sortTasks(tasks, 'dueDate' as SortOption, 'todo' as StatusFilter);

    expect(sortedTasks.map((task) => task.title)).toEqual(['Todo task']);
  });
});
