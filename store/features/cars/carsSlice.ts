import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { Car } from "@/types";

const initialState: Car[] = [];

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { setCars } = carsSlice.actions;

export const selectCars = (state: RootState) => state.cars;

export default carsSlice.reducer;
