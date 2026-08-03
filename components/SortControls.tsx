"use client";

import type { SortOption, StatusFilter } from '../lib/taskSorting';

type SortControlsProps = {
  sortBy: SortOption;
  statusFilter: StatusFilter;
  onChange: (value: SortOption) => void;
  onStatusChange: (value: StatusFilter) => void;
};

export default function SortControls({ sortBy, statusFilter, onChange, onStatusChange }: SortControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium">Sort by</span>
      <button type="button" onClick={() => onChange('dueDate')} className={`border px-3 py-1 text-sm ${sortBy === 'dueDate' ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}>
        Due date
      </button>
      <button type="button" onClick={() => onChange('title')} className={`border px-3 py-1 text-sm ${sortBy === 'title' ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}>
        Title
      </button>
      <button type="button" onClick={() => onChange('status')} className={`border px-3 py-1 text-sm ${sortBy === 'status' ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}>
        Status
      </button>

      <label className="ml-2 flex items-center gap-2 text-sm font-medium">
        <span>Status</span>
        <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value as StatusFilter)} className="border border-black bg-white px-2 py-1 text-sm">
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="complete">Complete</option>
          <option value="in-progress">In progress</option>
        </select>
      </label>
    </div>
  );
}
