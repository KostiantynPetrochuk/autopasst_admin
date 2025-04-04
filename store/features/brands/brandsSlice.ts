import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../";
import { Brand } from "@/types";

const initialState: Brand[] = [];

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      return action.payload;
    },
    addModelToBrand: (state, action) => {
      const { brandId, model } = action.payload;
      const brand = state.find((b) => b.id == brandId);
      if (brand) {
        brand.models.push(model);
      }
    },
    changeModelName: (state, action) => {
      const { brandId, modelId, modelName } = action.payload;
      const brand = state.find((b) => b.id === brandId);
      if (brand) {
        const model = brand.models.find((m) => m.id === modelId);
        if (model) {
          model.modelName = modelName;
        }
      }
    },
  },
});

export const { setBrands, addModelToBrand, changeModelName } =
  brandsSlice.actions;

export const selectBrands = (state: RootState) => state.brands;

export default brandsSlice.reducer;
