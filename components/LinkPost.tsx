import { LinkPost as Post } from "@/lib/db";
import { Card } from "@tremor/react";
import ogs from "open-graph-scraper";

export async function LinkPost({ post }: { post: Post }) {
  const { title, description, siteName, image, favicon, rest } =
    await getPostData(post.url);
  return (
    <a href={post.url}>
      <Card className="flex p-0">
        <div className="w-[250px] shrink-0 p-1">
          <img
            src={image}
            className="h-full object-cover rounded"
            alt={title}
          />
        </div>
        <div className="flex-1 p-4 pl-2 grid gap-2 content-start">
          {siteName && (
            <header className="flex gap-1 items-center">
              {favicon && (
                <img src={favicon} className="w-6 h-6" alt={siteName} />
              )}
              <span className="text-sm font-bold text-neutral-500">
                {siteName}
              </span>
            </header>
          )}
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="line-clamp-3">{description}</p>
        </div>
      </Card>
    </a>
  );
}

async function getPostData(url: string) {
  const { result } = await ogs({ url });
  const {
    ogTitle: title,
    ogDescription: description,
    ogSiteName: siteName,
    ogImage,
    favicon: faviconPath,
    ...rest
  } = result;
  let image;
  if (ogImage && ogImage.length) {
    image = ogImage[0].url;
  }

  // Parse the url, and rebuild the absolute favicon path
  let favicon = "";
  if (faviconPath) {
    const { protocol, host } = new URL(url);
    favicon = `${protocol}//${host}${faviconPath}`;
  }

  return {
    title,
    description,
    siteName,
    favicon,
    image,
    rest,
  };
}
