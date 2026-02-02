"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Crown,
  Medal,
  Award,
  BadgeCheck,
  UserRound,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCustomers, updateCustomerStatus } from "../store/customersSlice";
import type { Customer, Status, Tier } from "../store/customersSlice";

const STATUS_OPTIONS: Status[] = ["New", "Return", "In-progress", "Purchased"];

const statusChip: Record<Status, string> = {
  New: "bg-pink-100 text-pink-700",
  Return: "bg-red-100 text-red-700",
  "In-progress": "bg-yellow-100 text-yellow-800",
  Purchased: "bg-green-100 text-green-700",
};

function TierIcon({ tier }: { tier: Tier }) {
  const cls = "w-4 h-4";
  if (tier === "Premium") return <Crown className={cls} />;
  if (tier === "Gold") return <Medal className={cls} />;
  if (tier === "Silver") return <Award className={cls} />;
  return <BadgeCheck className={cls} />;
}

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch("/api/customers", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export default function CustomersTable() {
  const dispatch = useAppDispatch();

  // Redux state
  const customers = useAppSelector((s) => s.customers.items);
  const filters = useAppSelector((s) => s.filters);

  // ✅ NEW: columns visibility from uiSlice
  const columns = useAppSelector((s) => s.ui.columns);

  // ✅ NEW: dynamic colSpan (Sr.no + avatar = 2 fixed + visible columns)
  const visibleColsCount = useMemo(() => {
    return 2 + Object.values(columns).filter(Boolean).length;
  }, [columns]);

  // Dropdown open state
  const [openRow, setOpenRow] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpenRow(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // TanStack Query fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  // Put fetched data into Redux
  useEffect(() => {
    if (data) dispatch(setCustomers(data));
  }, [data, dispatch]);

  // Filtering logic (Tabs + dropdowns + search)
  const filtered = useMemo(() => {
    return customers.filter((c) => {
      // 1) Tab -> status filter
      if (filters.activeTab !== "All") {
        if (c.status !== filters.activeTab) return false;
      }

      // 2) Dropdown filters
      if (filters.category !== "None" && c.category !== filters.category)
        return false;
      if (
        filters.subcategory !== "None" &&
        c.subcategory !== filters.subcategory
      )
        return false;
      if (filters.brand !== "None" && c.brand !== filters.brand) return false;
      if (filters.product !== "None" && c.product !== filters.product)
        return false;

      // 3) Search
      const q = (filters.search || "").trim().toLowerCase();
      if (q) {
        const haystack = `${c.name} ${c.customerName} ${c.email} ${c.phone}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [customers, filters]);

  const changeStatus = (id: number, status: Status) => {
    dispatch(updateCustomerStatus({ id, status }));
    setOpenRow(null);
  };

  // Pagination UI (simple demo)
  const pageSize = 10;
  const page = 1;
  const total = filtered.length;
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) return <div className="mt-4 text-sm">Loading...</div>;
  if (isError)
    return (
      <div className="mt-4 text-sm text-red-600">Error loading customers</div>
    );

  return (
    <div className="bg-white border border-[#EAECEE] rounded-[10px] rounded-t-none overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-900">
            <tr className="border-b border-[#EAECEE]">
              <th className="px-4 py-3 text-left">Sr.no</th>
              <th className="px-2 py-3 text-left w-10" />

              {columns.name && (
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 border border-[#EAECEE] flex items-center justify-center">
                      <UserRound size={16} className="text-gray-500" />
                    </span>
                    <span className="text-gray-900">Name</span>
                  </div>
                </th>
              )}

              {columns.customerName && (
                <th className="px-4 py-3 text-left">Customer Name</th>
              )}
              {columns.phone && (
                <th className="px-4 py-3 text-left">Contact No.</th>
              )}
              {columns.email && <th className="px-4 py-3 text-left">Email</th>}
              {columns.gender && (
                <th className="px-4 py-3 text-left">Gender</th>
              )}
              {columns.brand && <th className="px-4 py-3 text-left">Brand</th>}
              {columns.product && (
                <th className="px-4 py-3 text-left">Product Name</th>
              )}
              {columns.tier && <th className="px-4 py-3 text-left">Tiers</th>}
              {columns.status && (
                <th className="px-4 py-3 text-left">Status</th>
              )}
            </tr>
          </thead>

          <tbody>
            {pageRows.map((c) => (
              <tr
                key={c.id}
                className="border-b border-[#EAECEE] last:border-0"
              >
                <td className="px-4 py-4">{c.id}</td>

                <td className="px-2 py-4">
                  <Image
                    src={c.avatar || "/avatar.png"}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </td>

                {columns.name && (
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {c.name}
                  </td>
                )}

                {columns.customerName && (
                  <td className="px-4 py-4 text-gray-900">{c.customerName}</td>
                )}

                {columns.phone && (
                  <td className="px-4 py-4 text-gray-900">{c.phone}</td>
                )}

                {columns.email && (
                  <td className="px-4 py-4 text-gray-900">{c.email}</td>
                )}

                {columns.gender && (
                  <td className="px-4 py-4 text-gray-900">{c.gender}</td>
                )}

                {columns.brand && (
                  <td className="px-4 py-4 text-gray-900">{c.brand}</td>
                )}

                {columns.product && (
                  <td className="px-4 py-4 text-gray-900">{c.product}</td>
                )}

                {columns.tier && (
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-2 text-gray-900">
                      <TierIcon tier={c.tier} />
                      <span>{c.tier}</span>
                    </div>
                  </td>
                )}

                {columns.status && (
                  <td className="px-4 py-4 relative">
                    <div ref={openRow === c.id ? dropdownRef : null}>
                      <button
                        onClick={() =>
                          setOpenRow(openRow === c.id ? null : c.id)
                        }
                        className={`h-8 px-4 rounded-xl text-sm font-medium inline-flex items-center gap-2 ${statusChip[c.status]}`}
                      >
                        {c.status}
                        <ChevronDown size={16} />
                      </button>

                      {openRow === c.id && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-[#EAECEE] rounded-xl shadow-lg z-30 overflow-hidden">
                          <div className="px-4 py-2 text-xs text-gray-500 border-b border-[#EAECEE]">
                            Request Status
                          </div>

                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => changeStatus(c.id, s)}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                            >
                              <span
                                className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${statusChip[s]}`}
                              >
                                {s}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td
                  colSpan={visibleColsCount}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No matching customers.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom: Results + Pagination (UI only) */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#EAECEE] text-sm text-gray-600">
        <div>
          Results: {start}-{end} of {total}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-lg hover:bg-gray-50"
            onClick={() => console.log("Previous page")}
          >
            &lt; Previous
          </button>

          <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-900">
            1
          </button>

          <button
            className="w-8 h-8 rounded-lg hover:bg-gray-50"
            onClick={() => console.log("Go page 2")}
          >
            2
          </button>

          <button
            className="w-8 h-8 rounded-lg hover:bg-gray-50"
            onClick={() => console.log("Go page 3")}
          >
            3
          </button>

          <span className="px-2">....</span>

          <button
            className="w-10 h-8 rounded-lg hover:bg-gray-50"
            onClick={() => console.log("Go page 10")}
          >
            10
          </button>
        </div>
      </div>
    </div>
  );
}
