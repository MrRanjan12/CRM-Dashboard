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
  columns: Record<ColumnKey, boolean>;
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
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleColumn(state, action: PayloadAction<ColumnKey>) {
      const key = action.payload;
      state.columns[key] = !state.columns[key];
      console.log("Column toggled:", key, state.columns[key]);
    },
    setAllColumns(state, action: PayloadAction<boolean>) {
      Object.keys(state.columns).forEach((k) => {
        state.columns[k as ColumnKey] = action.payload;
      });
      console.log("Columns set all:", action.payload);
    },
  },
});

export const { toggleColumn, setAllColumns } = uiSlice.actions;
export default uiSlice.reducer;
