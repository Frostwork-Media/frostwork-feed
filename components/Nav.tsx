import { getCategories } from "@/lib/db.remote";
import Link from "next/link";

export async function Nav() {
  const categories = await getCategories();

  return (
    <nav className="flex gap-4 justify-center bg-background/80 sticky top-0 z-10 backdrop-blur">
      <Link href="/" className="p-4">
        Home
      </Link>
      {categories.map((category) => (
        <Link key={category.slug} className="p-4" href={category.slug}>
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
