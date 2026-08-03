export default function Navbar() {
  return (
    <nav className="mb-6 flex items-center justify-between border-b border-black pb-3">
      <div>
        <p className="text-xs uppercase tracking-[0.3em]">Task Manager</p>
        <h1 className="text-2xl font-semibold">Stay on top of your work</h1>
      </div>
      <p className="text-sm text-zinc-600">Black &amp; white workflow</p>
    </nav>
  );
}
