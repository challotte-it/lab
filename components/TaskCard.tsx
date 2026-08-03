"use client";

import type { Task } from '../types/task';
import { getTaskState, TaskState } from '../lib/taskService';
import StatusBadge from './StatusBadge';

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
  onArchive: (task: Task) => void;
};

const stateLabels: Record<TaskState, string> = {
  [TaskState.IN_PROGRESS]: 'In Progress',
  [TaskState.TODO]: 'Todo',
  [TaskState.OVERDUE]: 'Overdue',
  [TaskState.COMPLETED]: 'Completed',
};

export default function TaskCard({ task, onEdit, onComplete, onArchive }: TaskCardProps) {
  const status = getTaskState(task.dueDate, Boolean(task.isCompleted));

  const isOverdue = status === TaskState.OVERDUE;

  return (
    <article className="rounded border border-black bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-zinc-600">{task.topic}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={isOverdue ? 'animate-pulse rounded-full bg-red-600 px-2 py-1 text-white shadow-sm' : ''}>
            <StatusBadge label={stateLabels[status]} />
          </span>
        </div>
      </div>

      {task.description ? <p className="mt-3 text-sm text-zinc-700">{task.description}</p> : null}
      <p className="mt-3 text-sm">Due: {task.dueDate.toLocaleDateString()}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => onEdit(task)} className="border border-black px-3 py-1 text-sm">
          Edit
        </button>
        {!task.isCompleted ? (
          <button type="button" onClick={() => onComplete(task)} className="border border-black px-3 py-1 text-sm">
            Complete
          </button>
        ) : null}
        {!task.isArchived ? (
          <button type="button" onClick={() => onArchive(task)} className="border border-black px-3 py-1 text-sm">
            Archive
          </button>
        ) : null}
      </div>
    </article>
  );
}
