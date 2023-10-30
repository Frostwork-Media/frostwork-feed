import { LinkPost } from "@/components/LinkPost";
import { MetaforecastPost } from "@/components/MetaforecastPost";
import { data } from "@/lib/db";
import { getCategoryBySlug, getPostsFromCategory } from "@/lib/db.remote";

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const data = await getData(params.category);
  return (
    <div className="bg-neutral-50 pb-12">
      <h1
        className="
      text-center font-bold text-4xl py-8
      "
      >
        {data.category.title}
      </h1>
      <div className="grid gap-6 max-w-3xl mx-auto">
        {data.posts.map((post) => {
          if (post.type === "link") {
            return <LinkPost key={post.id} post={post} />;
          } else if (post.type === "metaforecast") {
            return <MetaforecastPost key={post.id} post={post} />;
          }
        })}
      </div>
    </div>
  );
}

async function getData(slug: string) {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsFromCategory(slug),
  ]);
  return { category, posts };
}

export async function generateStaticParams() {
  return data.categories.map((category) => ({
    category: category.slug,
  }));
}
