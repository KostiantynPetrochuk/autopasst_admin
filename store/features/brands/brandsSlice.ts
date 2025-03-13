import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../";
import { Brand } from "@/types";

const initialState: Brand[] = [];

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    addModelToBrand: (state, action) => {
      const { brandId, model } = action.payload;
      const brand = state.find((b) => b.ID == brandId);
      if (brand) {
        brand.Models.push(model);
      }
    },
  },
});

export const { setBrands, addModelToBrand } = brandsSlice.actions;

export const selectBrands = (state: RootState) => state.brands;

export default brandsSlice.reducer;
