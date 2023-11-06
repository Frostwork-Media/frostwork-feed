import { getCategories } from "@/lib/db.remote";
import Link from "next/link";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";

export async function Nav() {
  const categories = await getCategories();
  const headersList = headers();
  const currentPath = headersList.get("next-url");
  return (
    <nav className="flex gap-4 justify-center bg-white shadow-sm sticky top-0 z-10 border-b">
      {categories.map((category) => (
        <Link
          key={category.slug}
          className={cn("px-4 py-3", {
            "bg-slate-100": currentPath?.slice(1) === category.slug,
          })}
          href={category.slug}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
