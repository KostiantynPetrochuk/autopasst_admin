import { create } from "zustand";
import { Order } from "@/types";

type OrdersState = {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
};

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),
}));
