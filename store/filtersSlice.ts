import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Tab = "All" | "New" | "Return" | "In-progress" | "Purchased";

export type FiltersState = {
  activeTab: Tab;
  category: string;
  subcategory: string;
  brand: string;
  product: string;
  searchType: string; // "Name" | "Email" | "Phone" etc
  search: string;
};

const initialState: FiltersState = {
  activeTab: "All",
  category: "None",
  subcategory: "None",
  brand: "None",
  product: "None",
  searchType: "None",
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<Tab>) {
      state.activeTab = action.payload;
      console.log("Tab selected:", action.payload);
    },
    setFilter(
      state,
      action: PayloadAction<{ key: keyof FiltersState; value: string }>
    ) {
      const { key, value } = action.payload;
      // @ts-expect-error key safe
      state[key] = value;
      console.log("Filter changed:", key, value);
    },
    resetFilters(state) {
      Object.assign(state, initialState);
      console.log("Reset filter");
    },
  },
});

export const { setTab, setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
