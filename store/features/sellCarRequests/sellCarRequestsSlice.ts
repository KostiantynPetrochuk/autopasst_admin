import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { SellCarRequest } from "@/types";

const initialState: SellCarRequest[] = [];

export const sellCarRequestsSlice = createSlice({
  name: "sellCarRequests",
  initialState,
  reducers: {
    setSellCarRequests: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    setSellCarRequestStatus: (
      state,
      action: PayloadAction<{ id: number; status: SellCarRequest["status"] }>
    ) => {
      const { id, status } = action.payload;
      const selection = state.find((item) => item.id === id);
      if (selection) {
        selection.status = status;
      }
    },
  },
});

export const { setSellCarRequests, setSellCarRequestStatus } =
  sellCarRequestsSlice.actions;

export const selectSellCarRequests = (state: RootState) => state.sellCarRequests;

export default sellCarRequestsSlice.reducer;
