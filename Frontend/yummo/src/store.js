import { create } from "zustand";

export const useMerchantStore = create((set) => ({
  restaurants: [],
  selectedRestaurant: null,
  setRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),
  clear: () => set({ restaurants: [], selectedRestaurant: null }),
}));