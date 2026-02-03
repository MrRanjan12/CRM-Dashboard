"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../store/hooks";

export default function Sidebar() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <aside
      className={`
        bg-white border-0 min-h-screen p-4
        transition-all duration-300
        ${collapsed ? "w-[80px]" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-full shrink-0" />
        {!collapsed && <h1 className="font-semibold text-lg">CRM Dashboard</h1>}
      </div>

      {/* Menu */}
      <nav>
        {!collapsed && <p className="text-xs text-gray-400 mb-2">MAIN</p>}

        <Link
          href="/"
          className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 font-medium"
        >
          <Users size={18} className="shrink-0" />
          {!collapsed && <span>Customers</span>}
        </Link>
      </nav>
    </aside>
  );
}
