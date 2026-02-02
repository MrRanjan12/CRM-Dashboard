"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Moon, Search, ChevronDown, LogOut, User2 } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white h-16 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative w-[360px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search here..."
            className="w-full bg-gray-100 border border-gray-200 rounded-2xl pl-11 pr-16 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            onChange={(e) => console.log("Top search:", e.target.value)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white border rounded-lg px-2 py-1">
            ⌘ F
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => console.log("Theme clicked")}
        >
          <Moon size={18} />
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-100 relative"
          onClick={() => console.log("Notifications clicked")}
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-3 px-2 py-1 rounded-2xl hover:bg-gray-100"
          >
            <Image
              src="/avatar.png"
              alt="avatar"
              width={34}
              height={34}
              className="rounded-full"
            />

            <div className="text-left leading-tight">
              <p className="text-sm font-semibold">Bell Bunny</p>
              <p className="text-xs text-gray-500">bell@crm.com</p>
            </div>

            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-2xl shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  console.log("Edit profile clicked");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50"
              >
                <User2 size={18} className="text-blue-600" />
                Edit profile
              </button>

              <button
                onClick={() => {
                  console.log("Logout clicked");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 text-red-600"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
