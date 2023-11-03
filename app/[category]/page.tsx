import { DisplayPost } from "@/components/DisplayPost";
import { data } from "@/lib/db";
import { getCategoryBySlug, getPostsFromCategory } from "@/lib/db.remote";

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const data = await getData(params.category);
  console.log(data);
  return (
    <div className="pb-12">
      <h1
        className="
      text-center font-bold text-4xl py-8
      "
      >
        {data.category.title}
      </h1>
      <div className="grid gap-6 max-w-3xl mx-auto">
        {data.posts.map((post) => {
          return <DisplayPost key={post.id} post={post} />;
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
