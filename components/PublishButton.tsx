"use client";

import { updateBin } from "@/lib/db.remote";
import { useEditStore } from "@/lib/useEditStore";

export function PublishButton({ children }: { children: React.ReactNode }) {
  const store = useEditStore((state) => state.store);

  return (
    <button
      className="p-1 px-2 bg-neutral-300 rounded-lg"
      onClick={() => {
        if (confirm("Are you sure you want to publish?")) {
          updateBin(store).then(() => {
            window.location.href = "/";
          });
        }
      }}
    >
      {children}
    </button>
  );
}
