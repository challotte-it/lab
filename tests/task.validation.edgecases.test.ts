import { describe, expect, it } from 'vitest';

import { validateDescription, validateDueDate, validateTask, validateTitle, validateTopic } from '../lib/inputValidation';

describe('validation edge cases', () => {
  it('rejects whitespace-only titles', () => {
    expect(validateTitle('   ')).toBe(false);
  });

  it('rejects missing due dates', () => {
    expect(validateDueDate('')).toBe(false);
  });

  it('rejects whitespace-only descriptions', () => {
    expect(validateDescription('   ')).toBe(false);
  });

  it('rejects task payloads with blank topic values', () => {
    const task = {
      title: 'Ship feature',
      topic: '   ',
      description: 'Ready for review',
      dueDate: new Date('2026-08-20'),
    };

    expect(validateTask(task)).toBe(false);
  });
});
