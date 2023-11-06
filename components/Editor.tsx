"use client";

import { Category, Post, Schema } from "@/lib/db";
import { EditContext, createEditStore } from "@/lib/editStore";
import { useRef, useState } from "react";
import { useEditStore } from "@/lib/useEditStore";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { PublishButton } from "./PublishButton";
import Link from "next/link";
import { Button } from "@tremor/react";
import { AddPostDialog } from "./AddPostDialog";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";

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
  const posts = useEditStore((state) => state.store.posts);
  const [activeCategory, setActiveCategory] = useState("");
  const active = categories.find((c) => c.slug === activeCategory);
  return (
    <>
      <div className="bg-neutral-200 font-bold p-4 text-lg flex justify-between">
        <span>
          Select a category to edit or delete it. When finished editing, click{" "}
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
                "bg-purple-500 text-white hover:bg-purple-500":
                  activeCategory === category.slug,
              })}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.title}
            </button>
          ))}
          <AddCategoryDialog setActiveCategory={setActiveCategory}>
            <button className={cn(btn, "bg-black text-white hover:bg-black")}>
              Add Category
            </button>
          </AddCategoryDialog>
        </div>
        {active ? (
          <ActiveCategory
            {...active}
            key={activeCategory}
            setActiveCategory={setActiveCategory}
            posts={posts.filter((p) => p.category === activeCategory)}
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
  posts,
}: Category & {
  setActiveCategory: (slug: string) => void;
  posts: Post[];
}) {
  const deleteCategory = useEditStore((state) => state.deleteCategory);
  const updateCategoryTitle = useEditStore(
    (state) => state.updateCategoryTitle
  );
  const moveCategoryUp = useEditStore((state) => state.moveCategoryUp);
  const moveCategoryDown = useEditStore((state) => state.moveCategoryDown);
  return (
    <div className="grid sm:grid-cols-2 gap-4 content-start items-start">
      <div className="grid gap-2">
        <SectionTitle>Category</SectionTitle>
        <div className="p-4 border-purple-500 border-2 bg-purple-50 rounded-lg max-w-lg grid gap-2 content-start">
          <div className="flex gap-1">
            <Button
              color="purple"
              onClick={() => moveCategoryUp(slug)}
              icon={IconArrowLeft}
            >
              Move
            </Button>
            <Button
              color="purple"
              onClick={() => moveCategoryDown(slug)}
              icon={IconArrowRight}
              iconPosition="right"
            >
              Move
            </Button>
          </div>
          <h2 className="text-xl font-bold">Rename</h2>
          <Input
            value={title}
            onChange={(e) => {
              updateCategoryTitle(slug, e.target.value);
            }}
          />
          <h2 className="text-xl font-bold">Delete</h2>
          <div className="flex justify-end">
            <Button
              color="red"
              onClick={() => {
                if (confirm("Are you sure you want to delete this category?")) {
                  setActiveCategory("");
                  deleteCategory(slug);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <header className="flex gap-4 items-center">
          <SectionTitle>Posts</SectionTitle>
          <AddPostDialog categorySlug={slug}>
            <Button color="teal">Add Post</Button>
          </AddPostDialog>
        </header>
        {posts.map((post) => (
          <PostBlock key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

function Hr() {
  return <hr className="border-gray-600 border-t-4 my-4" />;
}

function PostBlock({ post }: { post: Post }) {
  const deletePost = useEditStore((state) => state.deletePost);
  const movePostUp = useEditStore((state) => state.movePostUp);
  const movePostDown = useEditStore((state) => state.movePostDown);
  return (
    <div
      className={cn("border-2 rounded-lg overflow-hidden", {
        "border-blue-500": post.type === "link",
        "border-green-500": post.type === "metaforecast",
      })}
    >
      <span
        className={cn("font-bold block text-sm p-3", {
          "bg-blue-50": post.type === "link",
          "bg-green-50": post.type === "metaforecast",
        })}
      >
        {post.type}
      </span>
      <div className="grid gap-2 p-2">
        {post.type === "link" ? (
          <a
            href={post.url}
            className="font-mono text-sm underline hover:text-blue-500"
          >
            {post.url}
          </a>
        ) : (
          <a
            href={`https://metaforecast.org/questions/${post.slug}`}
            className="font-mono text-sm underline hover:text-blue-500"
          >
            {post.slug}
          </a>
        )}
        <div className="flex justify-end gap-1">
          <Button onClick={() => movePostUp(post.id)} icon={IconArrowUp}>
            Move
          </Button>
          <Button onClick={() => movePostDown(post.id)} icon={IconArrowDown}>
            Move
          </Button>
          <Button
            color="red"
            onClick={() => {
              if (confirm("Are you sure you want to delete this post?")) {
                deletePost(post.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
