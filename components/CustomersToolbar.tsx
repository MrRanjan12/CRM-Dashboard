"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Upload,
  Plus,
  Check,
  RotateCcw,
  Search,
  CalendarDays,
  Layers,
  ChevronDown,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter, resetFilters } from "../store/filtersSlice";
import { addCustomers } from "../store/customersSlice";
import type { Customer } from "../store/customersSlice";

type FiltersLocal = {
  category: string;
  subcategory: string;
  brand: string;
  product: string;
  searchType: string;
  search: string;
};

const DEFAULT_LOCAL: FiltersLocal = {
  category: "None",
  subcategory: "None",
  brand: "None",
  product: "None",
  searchType: "None",
  search: "",
};

// ✅ MUST match API values
const CATEGORY_OPTIONS = ["None", "Category 1", "Category 2"];
const SUBCATEGORY_OPTIONS = ["None", "Sub 1", "Sub 2"];
const BRAND_OPTIONS = ["None", "Averiq", "Lumetra", "Ventrova", "Nexora"];
const PRODUCT_OPTIONS = ["None", "Product1", "Product2", "Product3"];
const SEARCHTYPE_OPTIONS = ["None", "Name", "Email", "Phone", "Customer Name"];

export default function CustomersToolbar() {
  const dispatch = useAppDispatch();

  const reduxFilters = useAppSelector((s) => s.filters);
  const customers = useAppSelector((s) => s.customers.items);

  const [filters, setFilters] = useState<FiltersLocal>(DEFAULT_LOCAL);

  // Import file ref
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFilters({
      category: reduxFilters.category ?? "None",
      subcategory: reduxFilters.subcategory ?? "None",
      brand: reduxFilters.brand ?? "None",
      product: reduxFilters.product ?? "None",
      searchType: reduxFilters.searchType ?? "None",
      search: reduxFilters.search ?? "",
    });
  }, [reduxFilters]);

  const onChange = (key: keyof FiltersLocal, value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    console.log("Pending changed:", key, value);
  };

  const apply = () => {
    dispatch(setFilter({ key: "category", value: filters.category }));
    dispatch(setFilter({ key: "subcategory", value: filters.subcategory }));
    dispatch(setFilter({ key: "brand", value: filters.brand }));
    dispatch(setFilter({ key: "product", value: filters.product }));
    dispatch(setFilter({ key: "searchType", value: filters.searchType }));
    dispatch(setFilter({ key: "search", value: filters.search }));

    console.log("Apply filter (pending -> redux):", filters);
  };

  const reset = () => {
    dispatch(resetFilters());
    setFilters(DEFAULT_LOCAL);
    console.log("Reset filter (redux + UI)");
  };

  // ✅ Same filtering logic as table (so export uses current view)
  const filteredForExport = useMemo(() => {
    return customers.filter((c) => {
      if (reduxFilters.activeTab !== "All") {
        if (c.status !== reduxFilters.activeTab) return false;
      }
      if (reduxFilters.category !== "None" && c.category !== reduxFilters.category)
        return false;
      if (reduxFilters.subcategory !== "None" && c.subcategory !== reduxFilters.subcategory)
        return false;
      if (reduxFilters.brand !== "None" && c.brand !== reduxFilters.brand)
        return false;
      if (reduxFilters.product !== "None" && c.product !== reduxFilters.product)
        return false;

      const q = (reduxFilters.search || "").trim().toLowerCase();
      if (q) {
        const hay = `${c.name} ${c.customerName} ${c.email} ${c.phone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [customers, reduxFilters]);

  // ✅ EXPORT CSV
  const exportData = () => {
    const rows = filteredForExport.length ? filteredForExport : customers;

    const headers = [
      "id",
      "name",
      "customerName",
      "phone",
      "email",
      "gender",
      "brand",
      "product",
      "tier",
      "status",
      "category",
      "subcategory",
    ];

    const escape = (v: unknown) => {
      const s = String(v ?? "");
      if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    const csv = [
      headers.join(","),
      ...rows.map((c) => headers.map((h) => escape((c as any)[h])).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();

    URL.revokeObjectURL(url);
    console.log("Export data clicked. Exported rows:", rows.length);
  };

  // ✅ IMPORT CSV
  const importData = async (file?: File | null) => {
    try {
      if (!file) return;

      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) {
        console.log("Import failed: CSV empty");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const get = (obj: any, key: string) => (obj[key] ?? "").toString().trim();

      const parsed: Customer[] = lines.slice(1).map((line, idx) => {
        const cols = line.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
        const obj: any = {};
        headers.forEach((h, i) => (obj[h] = cols[i]));

        const idNum = Number(get(obj, "id"));
        const id = Number.isFinite(idNum) && idNum > 0 ? idNum : Date.now() + idx;

        return {
          id,
          name: get(obj, "name") || "Unknown",
          customerName: get(obj, "customerName") || "",
          phone: get(obj, "phone") || "",
          email: get(obj, "email") || "",
          gender: (get(obj, "gender") as any) === "Female" ? "Female" : "Male",
          brand: get(obj, "brand") || "Averiq",
          product: get(obj, "product") || "Product1",
          tier: (get(obj, "tier") as any) || "Premium",
          status: (get(obj, "status") as any) || "New",
          category: get(obj, "category") || "Category 1",
          subcategory: get(obj, "subcategory") || "Sub 1",
          avatar: "/avatar.png",
        };
      });

      dispatch(addCustomers(parsed));
      console.log("Import data clicked. Imported:", parsed.length);
    } catch (e) {
      console.log("Import failed:", e);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div
      className="
        bg-white border border-[#EAECEE]
        rounded-[10px] rounded-b-none
        px-[14px] py-4
        flex flex-col gap-5
      "
    >
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => importData(e.target.files?.[0])}
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg font-semibold">XXXXXXXXXX</h2>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={exportData}
            className="h-10 px-4 rounded-xl border bg-white hover:bg-gray-50 flex items-center gap-2 text-sm font-medium"
          >
            <Download size={16} />
            Export data
          </button>

          <button
            onClick={() => {
              console.log("Import data clicked (open file picker)");
              fileRef.current?.click();
            }}
            className="h-10 px-4 rounded-xl border bg-white hover:bg-gray-50 flex items-center gap-2 text-sm font-medium"
          >
            <Upload size={16} />
            Import data
          </button>

          <button
            onClick={() => console.log("Add product clicked")}
            className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} />
            Add product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <SelectBox label="Category" value={filters.category} options={CATEGORY_OPTIONS} onChange={(v) => onChange("category", v)} />
        <SelectBox label="Subcategory" value={filters.subcategory} options={SUBCATEGORY_OPTIONS} onChange={(v) => onChange("subcategory", v)} />
        <SelectBox label="Brand" value={filters.brand} options={BRAND_OPTIONS} onChange={(v) => onChange("brand", v)} />
        <SelectBox label="Product" value={filters.product} options={PRODUCT_OPTIONS} onChange={(v) => onChange("product", v)} />

        <button
          onClick={apply}
          className="h-10 w-full px-4 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Check size={16} />
          Apply filter
        </button>

        <button
          onClick={reset}
          className="h-10 w-full px-4 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <RotateCcw size={16} />
          Reset filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5">
          <SelectBox label="Search Type" value={filters.searchType} options={SEARCHTYPE_OPTIONS} onChange={(v) => onChange("searchType", v)} />
        </div>

        <div className="md:col-span-4 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            placeholder="Search for...."
            className="h-10 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          onClick={() => console.log("Date clicked")}
          className="md:col-span-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap px-2"
        >
          <CalendarDays size={16} />
          <span>Date</span>
        </button>

        <button
          onClick={() => console.log("Bulk action clicked")}
          className="md:col-span-2 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap px-3"
        >
          <Layers size={16} />
          <span>Bulk action</span>
        </button>
      </div>
    </div>
  );
}

function SelectBox({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative h-10 w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border bg-white px-4 pr-10 text-sm text-gray-800 hover:bg-gray-50 outline-none appearance-none"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {label} : {op}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
