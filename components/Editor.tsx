"use client";

import { Category, Schema } from "@/lib/db";
import { EditContext, createEditStore } from "@/lib/editStore";
import { useRef, useState } from "react";
import { useEditStore } from "@/lib/useEditStore";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { PublishButton } from "./PublishButton";
import Link from "next/link";

export function Editor({ data }: { data: Schema }) {
  const store = useRef(createEditStore(data)).current;
  return (
    <EditContext.Provider value={store}>
      <EditInner />
    </EditContext.Provider>
  );
}

const btn = "bg-neutral-100 p-2 rounded px-4 hover:bg-neutral-200";
function EditInner() {
  const categories = useEditStore((state) => state.store.categories);
  const [activeCategory, setActiveCategory] = useState("");
  const active = categories.find((c) => c.slug === activeCategory);
  return (
    <>
      <div className="bg-black text-white p-4 text-lg flex justify-between">
        <span>
          Select a category to edit or delete it. When finished, click{" "}
          <PublishButton>Publish</PublishButton>.
        </span>
        <Link href="/">Exit</Link>
      </div>
      <div className="p-8 max-w-6xl mx-auto grid gap-8 content-start">
        <div className="flex gap-4 items-center">
          {categories.map((category) => (
            <button
              key={category.slug}
              className={cn(btn, {
                "bg-blue-500 text-white hover:bg-blue-500":
                  activeCategory === category.slug,
              })}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.title}
            </button>
          ))}
          <AddCategoryDialog setActiveCategory={setActiveCategory}>
            <button className={cn(btn, "bg-black text-white hover:bg-black")}>
              Add New Category
            </button>
          </AddCategoryDialog>
        </div>
        {active ? (
          <ActiveCategory
            {...active}
            key={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ) : null}
      </div>
    </>
  );
}

function ActiveCategory({
  title,
  slug,
  setActiveCategory,
}: Category & {
  setActiveCategory: (slug: string) => void;
}) {
  const [categoryName, setCategoryName] = useState(title);
  const [slugName, setSlugName] = useState(slug);
  const deleteCategory = useEditStore((state) => state.deleteCategory);
  return (
    <div className="p-4 bg-blue-50 rounded-lg max-w-lg grid gap-2">
      <h2 className="text-xl font-bold">Rename Category</h2>
      <Input value={categoryName} />
      <Input value={slugName} />
      <Hr />
      <h2 className="text-xl font-bold">Delete Category</h2>
      <button
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={() => {
          if (confirm("Are you sure you want to delete this category?")) {
            setActiveCategory("");
            deleteCategory(slug);
          }
        }}
      >
        Delete Category
      </button>
    </div>
  );
}

function Hr() {
  return <hr className="border-gray-600 border-t-4 my-4" />;
}
