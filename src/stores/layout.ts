import { create } from "zustand";

export interface LayoutStore {
  isGrid: boolean;
  toggleLayout: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isGrid: true,
  toggleLayout: () => set((state) => ({ isGrid: !state.isGrid })),
}));
