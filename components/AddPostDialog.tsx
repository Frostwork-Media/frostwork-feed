"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { ReactNode, useCallback, useState } from "react";
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
            <MetaforecastSearch />
          )}
          <Button>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MetaforecastSearch() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <p>Type to search metaforecast:</p>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}
