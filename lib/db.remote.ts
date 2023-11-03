"use server";

import { binId, jbKey } from "./constants";
import { Category, Post, Schema } from "./db";

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

/** Sends a put request to update the entire bin */
export const updateBin = async (data: Schema) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": jbKey,
    },
    body: JSON.stringify(data),
  });

  const json = (await response.json()) as Schema;
  return json;
};
