"use client";

type SortControlsProps = {
  sortBy: 'dueDate' | 'title';
  onChange: (value: 'dueDate' | 'title') => void;
};

export default function SortControls({ sortBy, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Sort by</span>
      <button type="button" onClick={() => onChange('dueDate')} className={`border px-3 py-1 text-sm ${sortBy === 'dueDate' ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}>
        Due date
      </button>
      <button type="button" onClick={() => onChange('title')} className={`border px-3 py-1 text-sm ${sortBy === 'title' ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}>
        Title
      </button>
    </div>
  );
}
