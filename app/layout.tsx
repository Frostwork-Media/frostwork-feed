import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import Link from "next/link";

import "./globals.css";
import { data } from "@/lib/db";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { Footer } from "@/components/Footer";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Frostwork Feed",
  description: "Keep up with the latest forecasting news",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AuthProvider session={session}>
          <>
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
            <Footer />
          </>
        </AuthProvider>
      </body>
    </html>
  );
}
