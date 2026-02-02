import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Tier = "Premium" | "Gold" | "Silver" | "Browns";
export type Status = "New" | "Return" | "In-progress" | "Purchased";

export type Customer = {
  id: number;
  name: string;
  customerName: string;
  phone: string;
  email: string;
  gender: "Male" | "Female";
  brand: string;
  product: string;
  tier: Tier;
  status: Status;
  category: string;
  subcategory: string;
  avatar: string;
};

type CustomersState = {
  items: Customer[];
};

const initialState: CustomersState = {
  items: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.items = action.payload;
      console.log("Customers loaded:", action.payload.length);
    },

    // ✅ ADD: import multiple customers (CSV import)
    addCustomers(state, action: PayloadAction<Customer[]>) {
      state.items = [...action.payload, ...state.items];
      console.log("Customers imported:", action.payload.length);
    },

    // ✅ ADD: add single customer (Add modal)
    addCustomer(state, action: PayloadAction<Customer>) {
      state.items = [action.payload, ...state.items];
      console.log("Customer added:", action.payload);
    },

    updateCustomerStatus(
      state,
      action: PayloadAction<{ id: number; status: Status }>
    ) {
      const c = state.items.find((x) => x.id === action.payload.id);
      if (c) {
        c.status = action.payload.status;
        console.log("Status changed:", action.payload);
      }
    },
  },
});

export const {
  setCustomers,
  addCustomers,
  addCustomer,
  updateCustomerStatus,
} = customersSlice.actions;

export default customersSlice.reducer;
