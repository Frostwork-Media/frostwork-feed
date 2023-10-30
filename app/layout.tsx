import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import Link from "next/link";

import "./globals.css";
import { data } from "@/lib/db";

export const metadata: Metadata = {
  title: "Frostwork Updates",
  description: "Keep up with the latest forecasting news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <nav className="flex gap-4 justify-center bg-neutral-50/50 sticky top-0 z-10 backdrop-blur">
          <Link href="/" className="p-4">
            Home
          </Link>
          {data.categories.map((category) => (
            <Link key={category.id} className="p-4" href={category.slug}>
              {category.title}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
