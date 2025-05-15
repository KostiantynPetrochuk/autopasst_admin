import { create } from "zustand";
import { Brand, Model } from "@/types";

type BrandsState = {
  brands: Brand[];
  setBrands: (brands: Brand[]) => void;
  addModelToBrand: (brandId: number, model: Model) => void;
  changeModelName: (
    brandId: number,
    modelId: number,
    modelName: string
  ) => void;
};

export const useBrandsStore = create<BrandsState>((set) => ({
  brands: [],

  setBrands: (brands) => set({ brands }),

  addModelToBrand: (brandId, model) =>
    set((state) => {
      const updatedBrands = state.brands.map((brand) => {
        if (brand.id !== brandId) return brand;

        const updatedModels = Array.isArray(brand.models)
          ? [...brand.models, model]
          : [model];

        return {
          ...brand,
          models: updatedModels,
        };
      });

      return { brands: updatedBrands };
    }),

  changeModelName: (brandId, modelId, modelName) =>
    set((state) => {
      const updatedBrands = state.brands.map((brand) => {
        if (brand.id !== brandId) return brand;

        if (!Array.isArray(brand.models)) return brand;

        const updatedModels = brand.models.map((m) => {
          if (m.id !== modelId) return m;
          return {
            ...m,
            modelName,
          };
        });

        return {
          ...brand,
          models: updatedModels,
        };
      });

      return { brands: updatedBrands };
    }),
}));
