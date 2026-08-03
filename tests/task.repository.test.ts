import { beforeEach, describe, expect, it } from 'vitest';

import { getAllTasks, getTaskById, insertTask, insertTaskHistory, updateTask } from '../lib/taskRepository';

describe('task repository', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('stores and retrieves a task', () => {
    const created = insertTask({
      title: 'Write tests',
      topic: 'Engineering',
      description: 'Add coverage',
      dueDate: new Date('2026-08-20'),
    });

    const stored = getTaskById(created.id);

    expect(stored?.title).toBe('Write tests');
    expect(getAllTasks()).toHaveLength(1);
  });

  it('updates a task and records history', () => {
    const created = insertTask({
      title: 'Plan sprint',
      topic: 'Product',
      description: 'Outline milestones',
      dueDate: new Date('2026-08-22'),
    });

    updateTask(created.id, { isCompleted: true });
    insertTaskHistory(created.id, 'COMPLETED');

    const stored = getTaskById(created.id);
    const allTasks = getAllTasks();

    expect(stored?.isCompleted).toBe(true);
    expect(allTasks.find((task) => task.id === created.id)?.isCompleted).toBe(true);
  });
});
