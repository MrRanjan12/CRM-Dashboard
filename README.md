# CRM Dashboard (Customers Module) 🚀

A modern **CRM Customers Dashboard UI** built using **Next.js (App Router)** with **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, and **TanStack Query**.

This project contains a complete customer listing screen with:
✅ Sidebar + Topbar layout  
✅ Customers header + Tabs  
✅ Filters toolbar with Apply/Reset  
✅ Customers Table + Status Dropdown  
✅ Export to CSV + Import CSV  
✅ Console logs for all actions (as required in task)

---

## ✨ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** (Global state: filters + customers)
- **TanStack Query** (API fetch + caching)
- **Lucide Icons** (icons)
- **Mock API Route** (`/api/customers`)

---

## ✅ Features Implemented

### ✅ 1. Dashboard Layout
- Sidebar navigation
- Topbar search + profile section

### ✅ 2. Customers Page UI
- Customers heading
- Tabs:
  - All
  - New
  - Return
  - In-progress
  - Purchased

### ✅ 3. Filter Toolbar
Filters available:
- Category
- Subcategory
- Brand
- Product
- Search Type
- Search input

Buttons:
- Apply filter ✅
- Reset filter ✅

### ✅ 4. Customers Table
- Customer listing table with:
  - Avatar
  - Name
  - Contact
  - Email
  - Gender
  - Brand
  - Product
  - Tier
  - Status (dropdown update)

### ✅ 5. Export / Import
- **Export data** → downloads CSV file (`customers.csv`)
- **Import data** → upload CSV file and append in table

### ✅ 6. Logging (Task Requirement)
Every action prints logs:
- Export clicked
- Import clicked
- Tab changed
- Apply filter
- Reset filter
- Status update

---

## 📂 Project Structure (Important Files)

app/
page.tsx # Customers page UI
api/customers/route.ts # Mock API data provider

components/
Sidebar.tsx
Topbar.tsx
CustomersHeader.tsx
CustomersToolbar.tsx
CustomersTable.tsx

store/
store.ts
hooks.ts
filtersSlice.ts
customersSlice.ts
uiSlice.ts (optional for column toggle)


---

## 🔥 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
npm run dev
