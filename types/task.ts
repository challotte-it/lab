export interface Task {
  id?: number;
  title: string;
  topic: string;
  description?: string;
  dueDate: Date;
  isCompleted?: boolean;
  isArchived?: boolean;
}

export interface TaskDraft {
  title: string;
  topic: string;
  description: string;
  dueDate: string;
}
