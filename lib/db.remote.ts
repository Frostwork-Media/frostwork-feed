import { Category, Post, Schema } from "./db";

if (!process.env.JSON_BIN_SECRET) throw new Error("Missing JSON_BIN_SECRET");

export const jbKey = process.env.JSON_BIN_SECRET;

const binId = "65400a5212a5d3765992a70e";
export async function getCategories() {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${binId}?meta=false`,
    {
      headers: {
        "X-Master-Key": jbKey,
        "X-JSON-Path": "categories.*",
      },
    }
  );

  const json = await response.json();
  return json as Category[];
}

export async function getPostsFromCategory(id: string) {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${binId}?meta=false`,
    {
      headers: {
        "X-Master-Key": jbKey,
        "X-JSON-Path": `$.posts[?(@.category == '${id}')]`,
      },
    }
  );

  const json = (await response.json()) as Post[];
  return json;
}

export async function getCategoryBySlug(id: string) {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${binId}?meta=false`,
    {
      headers: {
        "X-Master-Key": jbKey,
        "X-JSON-Path": `$.categories[?(@.slug == '${id}')]`,
      },
    }
  );

  const json = (await response.json()) as Category[];
  return json[0];
}

/** Loads the entire project */
export async function loadEverything() {
  const response = await fetch(
    `https://api.jsonbin.io/v3/b/${binId}?meta=false`,
    {
      headers: {
        "X-Master-Key": jbKey,
      },
    }
  );

  const json = (await response.json()) as Schema;
  return json;
}
