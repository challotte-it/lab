import type { Task } from '../types/task';

type TaskRecord = Task & { id: number };
type HistoryRecord = {
  taskId: number;
  event: string;
  eventTime: string;
};

type PersistedState = {
  tasks: TaskRecord[];
  history: HistoryRecord[];
};

const STORAGE_KEY = 'task-app-data-v1';
let tasks: TaskRecord[] = [];
let history: HistoryRecord[] = [];

function normaliseTask(task: Task): TaskRecord {
  return {
    ...task,
    id: task.id ?? 0,
    isCompleted: Boolean(task.isCompleted),
    isArchived: Boolean(task.isArchived),
    dueDate: task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate),
  };
}

function loadState(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return;
    }

    const parsed = JSON.parse(rawValue) as PersistedState;
    if (Array.isArray(parsed.tasks)) {
      tasks = parsed.tasks.map((task) => normaliseTask(task));
    }
    if (Array.isArray(parsed.history)) {
      history = parsed.history;
    }
  } catch {
    tasks = [];
    history = [];
  }
}

function persistState(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, history }));
  } catch {
    console.error('Failed to persist state to localStorage, please check your browser settings if it not disabled.');
 }
}

loadState();

export function insertTask(task: Omit<Task, 'id' | 'isCompleted' | 'isArchived'>): TaskRecord {
  const nextTask: TaskRecord = {
    ...normaliseTask({ ...task, isCompleted: false, isArchived: false, id: Date.now() }),
    id: Date.now(),
  };

  tasks = [...tasks, nextTask];
  persistState();

  return nextTask;
}

export function updateTask(id: number, updates: Partial<Task>): TaskRecord | null {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return null;
  }

  const updatedTask: TaskRecord = {
    ...tasks[index],
    ...updates,
    id,
    dueDate: updates.dueDate instanceof Date ? updates.dueDate : updates.dueDate ? new Date(updates.dueDate) : tasks[index].dueDate,
    isCompleted: updates.isCompleted ?? tasks[index].isCompleted ?? false,
    isArchived: updates.isArchived ?? tasks[index].isArchived ?? false,
  };

  tasks = [...tasks.slice(0, index), updatedTask, ...tasks.slice(index + 1)];
  persistState();

  return updatedTask;
}

export function getTaskById(id: number): TaskRecord | null {
  return tasks.find((task) => task.id === id) ?? null;
}

export function getAllTasks(): TaskRecord[] {
  return tasks.map((task) => ({ ...task, dueDate: new Date(task.dueDate) }));
}

export function insertTaskHistory(taskId: number, event: string): HistoryRecord {
  const record: HistoryRecord = {
    taskId,
    event,
    eventTime: new Date().toISOString(),
  };

  history = [...history, record];
  persistState();

  return record;
}

export function getTaskHistory(taskId: number): HistoryRecord[] {
  return history.filter((entry) => entry.taskId === taskId);
}
