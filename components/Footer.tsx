"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Footer() {
  const session = useSession();
  return (
    <footer className="p-4 flex gap-2 justify-center">
      <span>Created by Nathan Young</span>
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
      ) : (
        <Link href="/admin" className="text-blue-500 hover:underline">
          Admin
        </Link>
      )}
    </footer>
  );
}
