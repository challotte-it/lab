import { describe, expect, it } from 'vitest';

import {
  validateDescription,
  validateDueDate,
  validateTask,
  validateTitle,
  validateTopic,
} from '../lib/inputValidation';

describe('input validation', () => {
  it('accepts non-empty titles', () => {
    expect(validateTitle('Write tests')).toBe(true);
  });

  it('rejects blank titles', () => {
    expect(validateTitle('   ')).toBe(false);
  });

  it('accepts valid dates', () => {
    expect(validateDueDate(new Date('2026-08-10'))).toBe(true);
  });

  it('rejects invalid dates', () => {
    expect(validateDueDate(new Date('invalid'))).toBe(false);
  });

  it('validates topic input', () => {
    expect(validateTopic('Engineering')).toBe(true);
  });

  it('rejects blank topic input', () => {
    expect(validateTopic('   ')).toBe(false);
  });

  it('validates description input', () => {
    expect(validateDescription('Add test coverage')).toBe(true);
  });

  it('accepts empty description input', () => {
    expect(validateDescription('')).toBe(true);
  });

  it('validates a complete task payload', () => {
    const task = {
      title: 'Write tests',
      topic: 'Engineering',
      description: 'Add coverage',
      dueDate: new Date('2026-08-10'),
    };

    expect(validateTask(task)).toBe(true);
  });

  it('rejects a task payload with invalid values', () => {
    const task = {
      title: '   ',
      topic: '   ',
      description: 'Add coverage',
      dueDate: new Date('invalid'),
    };

    expect(validateTask(task)).toBe(false);
  });
});
