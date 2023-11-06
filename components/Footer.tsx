"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Footer() {
  const session = useSession();
  const year = new Date().getFullYear();
  return (
    <footer className="p-4 flex gap-4 justify-center text-sm">
      <span className="font-bold">Curated by Nathan Young</span>
      <span>{year}</span>
      <Link href="/admin" className="text-blue-500 hover:underline">
        Admin
      </Link>
      {session.status === "authenticated" ? (
        <button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/`,
            })
          }
          className="text-blue-500 hover:underline"
        >
          Sign Out
        </button>
      ) : null}
    </footer>
  );
}
