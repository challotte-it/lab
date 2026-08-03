import type { Task } from '../types/task';
import { getTaskState, TaskState } from './taskService';

export type SortOption = 'dueDate' | 'title' | 'status';
export type StatusFilter = 'all' | 'todo' | 'complete' | 'in-progress';

const statusOrder: Record<Exclude<StatusFilter, 'all'>, number> = {
  todo: 0,
  complete: 1,
  'in-progress': 2,
};

function getStatusLabel(task: Task): string {
  const state = getTaskState(task.dueDate, Boolean(task.isCompleted));

  switch (state) {
    case TaskState.COMPLETED:
      return 'complete';
    case TaskState.TODO:
      return 'todo';
    case TaskState.OVERDUE:
      return 'in-progress';
    default:
      return 'in-progress';
  }
}

export function matchesStatusFilter(task: Task, statusFilter: StatusFilter): boolean {
  if (statusFilter === 'all') {
    return true;
  }

  return getStatusLabel(task) === statusFilter;
}

export function sortTasks(tasks: Task[], sortBy: SortOption, statusFilter: StatusFilter = 'all') {
  const filteredTasks = tasks.filter((task) => matchesStatusFilter(task, statusFilter));

  return filteredTasks.sort((firstTask, secondTask) => {
    if (sortBy === 'title') {
      return firstTask.title.localeCompare(secondTask.title);
    }

    if (sortBy === 'status') {
      const firstStatus = getStatusLabel(firstTask);
      const secondStatus = getStatusLabel(secondTask);
      return statusOrder[firstStatus as Exclude<StatusFilter, 'all'>] - statusOrder[secondStatus as Exclude<StatusFilter, 'all'>];
    }

    return new Date(firstTask.dueDate).getTime() - new Date(secondTask.dueDate).getTime();
  });
}
