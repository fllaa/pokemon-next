import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: string[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
  toggleFavorite: (name: string) => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  devtools(
    persist(
      (set) => ({
        favorites: [],
        addFavorite: (name) =>
          set((state) => ({
            favorites: [...state.favorites, name],
          })),
        removeFavorite: (name) =>
          set((state) => ({
            favorites: state.favorites.filter((f) => f !== name),
          })),
        toggleFavorite: (name) =>
          set((state) => {
            if (state.favorites.includes(name)) {
              return {
                favorites: state.favorites.filter((f) => f !== name),
              };
            } else {
              return {
                favorites: [...state.favorites, name],
              };
            }
          }),
      }),
      {
        name: "favorite",
      },
    ),
  ),
);
