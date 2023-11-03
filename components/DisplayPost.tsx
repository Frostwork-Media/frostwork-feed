import { Post } from "@/lib/db";
import { LinkPost } from "./LinkPost";
import { MetaforecastPost } from "./MetaforecastPost";

export function DisplayPost({ post }: { post: Post }) {
  if (post.type === "link") {
    return <LinkPost key={post.id} post={post} />;
  } else if (post.type === "metaforecast") {
    return <MetaforecastPost key={post.id} post={post} />;
  }
}
