import { describe, expect, it } from 'vitest';

import { validateTask } from '../lib/inputValidation';

describe('task input types', () => {
  it('accepts a task with a string due date', () => {
    const task = {
      title: 'Ship release',
      topic: 'Ops',
      description: 'Prepare deployment',
      dueDate: '2026-08-25',
    };

    expect(validateTask(task)).toBe(true);
  });

  it('rejects a task with an invalid string due date', () => {
    const task = {
      title: 'Ship release',
      topic: 'Ops',
      description: 'Prepare deployment',
      dueDate: 'not-a-date',
    };

    expect(validateTask(task)).toBe(false);
  });
});
