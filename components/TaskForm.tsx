"use client";

import type { FormEvent } from 'react';
import type { TaskDraft } from '../types/task';

type TaskFormProps = {
  draft: TaskDraft;
  editingTaskId: number | null;
  onChange: (field: keyof TaskDraft, value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
};

export default function TaskForm({ draft, editingTaskId, onChange, onSubmit, onCancel }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded border border-black bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{editingTaskId ? 'Edit task' : 'Create task'}</h2>
        {editingTaskId ? (
          <button type="button" onClick={onCancel} className="text-sm underline">
            Cancel
          </button>
        ) : null}
      </div>

      <input
        required
        value={draft.title}
        onChange={(event) => onChange('title', event.target.value)}
        placeholder="Task title"
        className="w-full border border-black px-3 py-2"
      />

      <input
        required
        value={draft.topic}
        onChange={(event) => onChange('topic', event.target.value)}
        placeholder="Topic"
        className="w-full border border-black px-3 py-2"
      />

      <textarea
        value={draft.description}
        onChange={(event) => onChange('description', event.target.value)}
        placeholder="Description"
        className="min-h-24 w-full border border-black px-3 py-2"
      />

      <input
        required
        type="date"
        value={draft.dueDate}
        onChange={(event) => onChange('dueDate', event.target.value)}
        className="w-full border border-black px-3 py-2"
      />

      <button type="submit" className="w-full border border-black bg-black px-3 py-2 font-medium text-white">
        {editingTaskId ? 'Save changes' : 'Add task'}
      </button>
    </form>
  );
}
