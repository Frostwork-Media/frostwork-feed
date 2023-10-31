import { createStore } from "zustand";
import { Schema } from "./db";
import { createContext } from "react";

export interface EditState {
  store: Schema;
  addCategory(title: string, slug: string): void;
  deleteCategory(slug: string): void;
}

export const createEditStore = (data: Schema) => {
  return createStore<EditState>()((set) => ({
    store: data,
    addCategory(title, slug) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          categories: [...state.store.categories, { title, slug }],
        },
      }));
    },
    deleteCategory(slug) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: state.store.posts.filter((p) => p.category !== slug),
          categories: state.store.categories.filter((c) => c.slug !== slug),
        },
      }));
    },
  }));
};

type EditStore = ReturnType<typeof createEditStore>;

export const EditContext = createContext<EditStore | null>(null);
