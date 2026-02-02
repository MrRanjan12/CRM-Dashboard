import { Users } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-full" />
        <h1 className="font-semibold text-lg">CRM Dashboard</h1>
      </div>

      {/* Menu */}
      <nav>
        <p className="text-xs text-gray-400 mb-2">MAIN</p>

        <Link
          href="/"
          className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 font-medium"
        >
          <Users size={18} />
          Customers
        </Link>
      </nav>
    </aside>
  );
}
