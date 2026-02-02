"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTab, Tab } from "../store/filtersSlice";

export default function CustomersHeader() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((s) => s.filters.activeTab);

  const tabs: Tab[] = ["All", "New", "Return", "In-progress", "Purchased"];

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <h1 className="text-2xl font-bold text-gray-900">Customers</h1>

      <div className="bg-gray-100 rounded-[18px] p-1.5 flex items-center gap-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => dispatch(setTab(t))}
            className={`px-5 py-2 text-sm font-medium rounded-[14px] transition-all ${
              activeTab === t
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
