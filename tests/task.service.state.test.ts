import { describe, expect, it } from 'vitest';

import { getTaskState, TaskState } from '../lib/taskService';

describe('task state service', () => {
  it('marks a task as todo when it is due soon', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);

    expect(getTaskState(dueDate, false)).toBe(TaskState.TODO);
  });

  it('marks a task as in progress when it is due later', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 5);

    expect(getTaskState(dueDate, false)).toBe(TaskState.IN_PROGRESS);
  });
});
