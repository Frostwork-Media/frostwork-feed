"use client";

import { Schema } from "@/lib/db";
import { EditContext, createEditStore } from "@/lib/editStore";
import { useRef } from "react";
import { useEditStore } from "@/lib/useEditStore";

export function Editor({ data }: { data: Schema }) {
  const store = useRef(createEditStore(data)).current;
  return (
    <EditContext.Provider value={store}>
      <EditInner />
    </EditContext.Provider>
  );
}

const btn = "text-lg bg-neutral-100 p-2 rounded px-4 hover:bg-neutral-200";
function EditInner() {
  const categories = useEditStore((state) => state.categories);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex gap-4 items-center">
        {categories.map((category) => (
          <button key={category.slug} className={btn}>
            {category.title}
          </button>
        ))}
        <button className={btn}>Add New Category</button>
      </div>
    </div>
  );
}
