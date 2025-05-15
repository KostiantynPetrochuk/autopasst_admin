import { create } from "zustand";
import { SellCarRequest } from "@/types";

type SellCarRequestsState = {
  sellCarRequests: SellCarRequest[];
  setSellCarRequests: (items: SellCarRequest[]) => void;
  setSellCarRequestStatus: (
    id: number,
    status: SellCarRequest["status"]
  ) => void;
};

export const useSellCarRequestsStore = create<SellCarRequestsState>((set) => ({
  sellCarRequests: [],

  setSellCarRequests: (items) => set({ sellCarRequests: items }),

  setSellCarRequestStatus: (id, status) =>
    set((state) => {
      const updated = state.sellCarRequests.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          status,
        };
      });

      return { sellCarRequests: updated };
    }),
}));
