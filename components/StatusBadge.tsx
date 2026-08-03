type StatusBadgeProps = {
  label: string;
};

export default function StatusBadge({ label }: StatusBadgeProps) {
  return <span className="rounded border border-black px-2 py-1 text-xs font-medium uppercase tracking-wide">{label}</span>;
}
