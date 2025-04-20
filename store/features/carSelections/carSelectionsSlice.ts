import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { CarSelection } from "@/types";

const initialState: CarSelection[] = [];

export const carSelectionsSlice = createSlice({
  name: "carSelections",
  initialState,
  reducers: {
    setCarSelections: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    setCarSelectionStatus: (
      state,
      action: PayloadAction<{ id: number; status: CarSelection["status"] }>
    ) => {
      const { id, status } = action.payload;
      const selection = state.find((item) => item.id === id);
      if (selection) {
        selection.status = status;
      }
    },
  },
});

export const { setCarSelections, setCarSelectionStatus } =
  carSelectionsSlice.actions;

export const selectCarSelections = (state: RootState) => state.carSelections;

export default carSelectionsSlice.reducer;
