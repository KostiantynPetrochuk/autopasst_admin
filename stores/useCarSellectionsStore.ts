import { create } from "zustand";
import { CarSelection } from "@/types";

type CarSelectionsState = {
  carSelections: CarSelection[];
  setCarSelections: (items: CarSelection[]) => void;
  setCarSelectionStatus: (id: number, status: CarSelection["status"]) => void;
};

export const useCarSelectionsStore = create<CarSelectionsState>((set) => ({
  carSelections: [],

  setCarSelections: (items) => set({ carSelections: items }),

  setCarSelectionStatus: (id, status) =>
    set((state) => {
      const updatedSelections = state.carSelections.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          status,
        };
      });

      return { carSelections: updatedSelections };
    }),
}));
