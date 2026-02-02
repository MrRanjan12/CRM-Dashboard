import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import customersReducer from "./customersSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    customers: customersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
