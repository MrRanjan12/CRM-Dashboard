# CRM Dashboard — Customers Module

> A modern CRM Customers Dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Redux Toolkit, and TanStack Query.



![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)




![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)




![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)




![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)



---

## 🔗 Live Demo

| | Link |
|--|------|
| 🌐 Live App | [#########] |
| 📁 Repository | [github.com/MrRanjan12/CRM-Dashboard](https://github.com/MrRanjan12/CRM-Dashboard) |

---

## Overview

A fully functional CRM Customers Module featuring a complete customer listing screen with filtering, CSV import/export, status management, and real-time state handling — built as a production-grade frontend system.

---

## Features

- **Dashboard Layout** — Sidebar navigation + Topbar with search and profile
- **Customers Table** — Avatar, Name, Contact, Email, Gender, Brand, Product, Tier, Status
- **Tab Navigation** — All / New / Return / In-progress / Purchased
- **Filter Toolbar** — Category, Subcategory, Brand, Product, Search Type with Apply/Reset
- **Export to CSV** — Downloads `customers.csv` instantly
- **Import CSV** — Upload and append customer data to table
- **Status Dropdown** — Inline status update per customer
- **Action Logging** — Every user action logged to console

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Global State | Redux Toolkit |
| Server State | TanStack Query |
| Icons | Lucide React |
| Mock API | Next.js API Route (`/api/customers`) |

---

## Project Structure

```
app/
├── page.tsx                  # Customers page UI
└── api/customers/route.ts    # Mock API data provider

components/
├── Sidebar.tsx
├── Topbar.tsx
├── CustomersHeader.tsx
├── CustomersToolbar.tsx
└── CustomersTable.tsx

store/
├── store.ts
├── hooks.ts
├── filtersSlice.ts
├── customersSlice.ts
└── uiSlice.ts
```

---

## Getting Started

```bash
git clone https://github.com/MrRanjan12/CRM-Dashboard.git
cd CRM-Dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What I Learned

- Structuring large-scale frontend apps with App Router and TypeScript
- Managing complex UI state with Redux Toolkit slices
- Combining global state (Redux) with server state (TanStack Query)
- Building reusable, type-safe component systems
- Handling CSV import/export in a React environment

---

## Direction

Next steps: backend integration with real API, authentication layer, pagination, and role-based access control.