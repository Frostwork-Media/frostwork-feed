"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { useEditStore } from "@/lib/useEditStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { slugify } from "../lib/slugify";

export function AddCategoryDialog({
  children,
  setActiveCategory,
}: {
  children: React.ReactNode;
  setActiveCategory: (slug: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setSlug(slugify(e.target.value));
    },
    []
  );
  const addCategory = useEditStore((state) => state.addCategory);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Enter the title and slug of your new category.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <FormField title="Title">
            <Input value={title} onChange={onTitleChange} />
          </FormField>
          <FormField title="Slug">
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </FormField>
          <DialogClose
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            onClick={() => {
              addCategory(title, slug);
              setTitle("");
              setSlug("");
              setActiveCategory(slug);
            }}
          >
            Add
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm uppercase tracking-wide font-medium text-neutral-400">
        {title}
      </span>
      {children}
    </label>
  );
}
