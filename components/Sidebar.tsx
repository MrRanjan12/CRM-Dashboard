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
      `}>
      {/* ✅ Logo  */}
      <div className="flex items-center gap-3 mb-10">
        {/* Icon box */}
        <div className="bg-white rounded-xl shadow-md w-14 h-14 flex items-center justify-center">
          <div className="relative w-10 h-10"> 
            <span className="absolute left-4 top-3 w-6 h-6 bg-blue-800 rounded-full border-2 border-white" />
            <span className="absolute left-0 top-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white " />
           
          </div>
        </div>

        {!collapsed && (
          <h1 className="font-semibold text-lg text-gray-900">CRM Dashboard</h1>
        )}
      </div>

      {/* Menu */}
      <nav>
        {!collapsed && <p className="text-xs text-gray-400 mb-2">MAIN</p>}

        <Link
          href="/"
          className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 font-medium">
          <Users size={18} className="shrink-0" />
          {!collapsed && <span>Customers</span>}
        </Link>
      </nav>
    </aside>
  );
}
