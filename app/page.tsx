"use client";

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Navbar from '../components/Navbar';
import SortControls from '../components/SortControls';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { archiveTask, completeTask, createTask, editTask } from '../lib/taskService';
import { getAllTasks } from '../lib/taskRepository';
import { matchesStatusFilter, sortTasks, type SortOption, type StatusFilter } from '../lib/taskSorting';
import type { Task, TaskDraft } from '../types/task';

const initialDraft: TaskDraft = {
  title: '',
  topic: '',
  description: '',
  dueDate: '',
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState<TaskDraft>(initialDraft);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const refreshTasks = () => {
    setTasks(getAllTasks());
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const sortedTasks = useMemo(() => {
    return sortTasks(tasks, sortBy, statusFilter);
  }, [sortBy, statusFilter, tasks]);

  const activeTasks = sortedTasks.filter((task) => !task.isArchived && matchesStatusFilter(task, statusFilter));
  const archivedTasks = sortedTasks.filter((task) => Boolean(task.isArchived) && matchesStatusFilter(task, statusFilter));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!draft.title || !draft.topic || !draft.dueDate) {
      return;
    }

    const nextTask = {
      title: draft.title.trim(),
      topic: draft.topic.trim(),
      description: draft.description.trim(),
      dueDate: new Date(draft.dueDate),
    };

    if (editingTaskId) {
      editTask(editingTaskId, nextTask);
    } else {
      createTask(nextTask);
    }

    setDraft(initialDraft);
    setEditingTaskId(null);
    refreshTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id ?? null);
    setDraft({
      title: task.title,
      topic: task.topic,
      description: task.description ?? '',
      dueDate: task.dueDate.toISOString().slice(0, 10),
    });
  };

  const handleComplete = (task: Task) => {
    if (task.id) {
      completeTask(task.id);
      refreshTasks();
    }
  };

  const handleArchive = (task: Task) => {
    if (task.id) {
      archiveTask(task.id);
      refreshTasks();
    }
  };

  const handleCancel = () => {
    setDraft(initialDraft);
    setEditingTaskId(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-4">
            <SortControls sortBy={sortBy} statusFilter={statusFilter} onChange={setSortBy} onStatusChange={setStatusFilter} />
            <TaskList title="Active tasks" tasks={activeTasks} onEdit={handleEdit} onComplete={handleComplete} onArchive={handleArchive} />
            <TaskList title="Archived tasks" tasks={archivedTasks} onEdit={handleEdit} onComplete={handleComplete} onArchive={handleArchive} />
          </section>

          <section>
            <TaskForm draft={draft} editingTaskId={editingTaskId} onChange={(field, value) => setDraft((current) => ({ ...current, [field]: value }))} onSubmit={handleSubmit} onCancel={handleCancel} />
          </section>
        </div>
      </main>
    </div>
  );
}
