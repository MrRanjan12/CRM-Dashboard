"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSidebar } from "../store/uiSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar wrapper so button can be positioned on edge */}
      <div className="relative">
        <Sidebar />

        {/* ✅ Figma collapse button */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="
            absolute -right-4 top-[88px]
            w-9 h-9 rounded-full
            bg-white border border-[#EAECEE]
            shadow-md
            flex items-center justify-center
            hover:bg-gray-50
            transition
          "
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
