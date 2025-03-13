import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { Order } from "@/types";

const initialState: Order[] = [];

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default ordersSlice.reducer;
