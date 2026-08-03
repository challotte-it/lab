"use client";

import type { Task } from '../types/task';
import TaskCard from './TaskCard';

type TaskListProps = {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
  onArchive: (task: Task) => void;
};

export default function TaskList({ title, tasks, onEdit, onComplete, onArchive }: TaskListProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {tasks.length === 0 ? <p className="rounded border border-dashed border-black p-4 text-sm">No tasks here yet.</p> : null}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onComplete={onComplete} onArchive={onArchive} />
        ))}
      </div>
    </section>
  );
}
