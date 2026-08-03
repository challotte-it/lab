import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createTask } from '../lib/taskService';
import * as taskRepository from '../lib/taskRepository';

vi.mock('../lib/taskRepository', () => ({
  insertTask: vi.fn(),
  updateTask: vi.fn(),
  insertTaskHistory: vi.fn(),
  getTaskById: vi.fn(),
  getAllTasks: vi.fn(),
  getTaskHistory: vi.fn(),
}));

describe('create task service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null for invalid task input', () => {
    const result = createTask({
      title: '   ',
      topic: 'Work',
      description: 'Need review',
      dueDate: new Date('2026-08-20'),
    } as never);

    expect(result).toBeNull();
    expect(taskRepository.insertTask).not.toHaveBeenCalled();
  });
});
