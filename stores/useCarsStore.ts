import { create } from "zustand";
import { Car } from "@/types";

type CarsState = {
  cars: Car[];
  setCars: (cars: Car[]) => void;
};

export const useCarsStore = create<CarsState>((set) => ({
  cars: [],

  setCars: (cars) => set({ cars }),
}));
