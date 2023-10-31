import { Editor } from "@/components/Editor";
import { loadEverything } from "@/lib/db.remote";
import Link from "next/link";

export default async function Page() {
  const data = await loadEverything();
  return (
    <>
      <div className="bg-black text-white p-4 text-lg flex justify-between">
        <span>
          Select a category to edit or delete it. When finished, click Publish.
        </span>
        <Link href="/">Exit</Link>
      </div>
      <Editor data={data} />
    </>
  );
}
