import { createStore } from "zustand";
import { Schema } from "./db";
import { createContext } from "react";

export interface EditState extends Schema {}

export const createEditStore = (data: Schema) => {
  return createStore<EditState>()((set) => ({
    ...data,
  }));
};

type EditStore = ReturnType<typeof createEditStore>;

export const EditContext = createContext<EditStore | null>(null);
