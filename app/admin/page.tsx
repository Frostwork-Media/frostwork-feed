import { Editor } from "@/components/Editor";
import { loadEverything } from "@/lib/db.remote";

export default async function Page() {
  const data = await loadEverything();
  return <Editor data={data} />;
}

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
