import { beforeEach, describe, expect, it, vi } from 'vitest';

import { archiveTask, completeTask, editTask } from '../lib/taskService';
import * as taskRepository from '../lib/taskRepository';

vi.mock('../lib/taskRepository', () => ({
  insertTask: vi.fn(),
  updateTask: vi.fn(),
  insertTaskHistory: vi.fn(),
  getTaskById: vi.fn(),
  getAllTasks: vi.fn(),
  getTaskHistory: vi.fn(),
}));

describe('task history service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('records an edit history event', () => {
    vi.mocked(taskRepository.updateTask).mockReturnValue({ id: 4 } as never);

    editTask(4, { title: 'Updated' });

    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(4, 'EDITED');
  });

  it('records a complete history event', () => {
    vi.mocked(taskRepository.updateTask).mockReturnValue({ id: 5 } as never);

    completeTask(5);

    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(5, 'COMPLETED');
  });

  it('records an archive history event', () => {
    vi.mocked(taskRepository.updateTask).mockReturnValue({ id: 6 } as never);

    archiveTask(6);

    expect(taskRepository.insertTaskHistory).toHaveBeenCalledWith(6, 'ARCHIVED');
  });
});
