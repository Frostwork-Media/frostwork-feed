"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@tremor/react";
import { LinkPost, Post } from "@/lib/db";
import { nanoid } from "nanoid";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEditStore } from "@/lib/useEditStore";
import { useQuery } from "@tanstack/react-query";
import { searchMetaforecast } from "@/lib/metaforcastApi";
import { Question } from "@/lib/metaforecast-types";
import { cn } from "@/lib/utils";

export function AddPostDialog({
  children,
  categorySlug,
}: {
  children: ReactNode;
  categorySlug: string;
}) {
  const [postType, setPostType] = useState<string>("link");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const reset = useCallback(() => {
    setPostType("link");
    setLinkUrl("");
  }, []);
  const addPost = useEditStore((state) => state.addPost);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");

  // Submit is disabled if the post type is link and the url is empty
  // or the post type is metaforecast and the slug is empty
  const disabled =
    (postType === "link" && linkUrl.length === 0) ||
    (postType === "metaforecast" && slug.length === 0);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Post</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            // get form data
            const formData = new FormData(e.target as HTMLFormElement);
            const postType = formData.get("postType");
            if (postType === "link") {
              const url = formData.get("url");
              const post: LinkPost = {
                id: nanoid(),
                type: "link",
                url: url as string,
                category: categorySlug,
              };
              addPost(post);
              setOpen(false);
            } else if (postType === "metaforecast") {
              const post: Post = {
                id: nanoid(),
                type: "metaforecast",
                slug,
                category: categorySlug,
              };
              addPost(post);
              setOpen(false);
            }
          }}
        >
          <p className="text-sm text-neutral-600">Select the Post Type</p>
          <Select value={postType} onValueChange={setPostType} name="postType">
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="metaforecast">Metaforecast</SelectItem>
            </SelectContent>
          </Select>
          {postType === "link" ? (
            <Input
              required
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              name="url"
            />
          ) : (
            <MetaforecastSearch slug={slug} setSlug={setSlug} />
          )}
          <Button
            disabled={disabled}
            className={cn({
              "opacity-50 cursor-not-allowed": disabled,
            })}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MetaforecastSearch({
  slug,
  setSlug,
}: {
  slug: string;
  setSlug: (slug: string) => void;
}) {
  const [search, setSearch] = useState("");
  // Unset any selected slug if the search changes
  useEffect(() => {
    setSlug("");
  }, [search, setSlug]);
  const searchQuery = useQuery({
    queryKey: ["search", search],
    enabled: search.length > 3,
    queryFn: async () => {
      const data = await searchMetaforecast(search);
      return data as Question[];
    },
  });
  return (
    <div>
      <p className="text-sm mb-1">
        Type at least 3 characters to search metaforecast:
      </p>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <h2 className="font-bold mt-3">Results</h2>
      <div className="h-[300px] overflow-auto border rounded my-2 shadow-inner">
        {searchQuery.isLoading ? (
          <p>Loading...</p>
        ) : searchQuery.isError ? (
          <p>Error: {searchQuery.error.message}</p>
        ) : searchQuery.data ? (
          searchQuery.data.map((question) => (
            <button
              key={question.id}
              className={cn(
                "text-sm text-left w-full leading-normal px-4 py-3 hover:bg-neutral-100 border-b",
                {
                  "bg-neutral-200 hover:bg-neutral-200": slug === question.id,
                }
              )}
              onClick={() => setSlug(question.id)}
            >
              <h3>{question.title}</h3>
            </button>
          ))
        ) : null}
      </div>
    </div>
  );
}
