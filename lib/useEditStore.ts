// Mimic the hook returned by `create`
import { useContext } from "react";
import { useStore } from "zustand";
import { EditContext, EditState } from "./editStore";

export function useEditStore<T>(selector: (state: EditState) => T): T {
  const store = useContext(EditContext);
  if (!store) throw new Error("Missing EditContext.Provider in the tree");
  return useStore(store, selector);
}
