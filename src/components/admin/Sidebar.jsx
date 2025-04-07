export default function Sidebar() {
    return (
      <aside className="w-64 bg-muted p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">Admin</h2>
        <nav className="space-y-2 text-sm">
          <a href="#" className="block hover:underline">Dashboard</a>
          <a href="#" className="block hover:underline">Contracts</a>
          <a href="#" className="block hover:underline">Contractors</a>
        </nav>
      </aside>
    );
  }
  