import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ColumnKey =
  | "name"
  | "customerName"
  | "phone"
  | "email"
  | "gender"
  | "brand"
  | "product"
  | "tier"
  | "status";

type UIState = {
  // ✅ Table columns visibility
  columns: Record<ColumnKey, boolean>;

  // ✅ Sidebar collapse (arrow button)
  sidebarCollapsed: boolean;
};

const initialState: UIState = {
  columns: {
    name: true,
    customerName: true,
    phone: true,
    email: true,
    gender: true,
    brand: true,
    product: true,
    tier: true,
    status: true,
  },

  // ✅ default sidebar open
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // ✅ Column toggle
    toggleColumn(state, action: PayloadAction<ColumnKey>) {
      const key = action.payload;
      state.columns[key] = !state.columns[key];
      console.log("Column toggled:", key, state.columns[key]);
    },

    // ✅ Select all / unselect all columns
    setAllColumns(state, action: PayloadAction<boolean>) {
      Object.keys(state.columns).forEach((k) => {
        state.columns[k as ColumnKey] = action.payload;
      });
      console.log("Columns set all:", action.payload);
    },

    // ✅ Sidebar toggle (Arrow button)
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      console.log("Sidebar collapsed:", state.sidebarCollapsed);
    },

    // ✅ Sidebar set manually
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
      console.log("Sidebar set:", state.sidebarCollapsed);
    },
  },
});

export const {
  toggleColumn,
  setAllColumns,
  toggleSidebar,
  setSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
