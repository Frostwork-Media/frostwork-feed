export type Category = {
  id: string;
  title: string;
  slug: string;
};

export interface BasePost {
  id: string;
  category: string;
}

export type MetaforecastPost = BasePost & {
  type: "metaforecast";
  slug: string;
};

export type LinkPost = BasePost & {
  type: "link";
  url: string;
};

export type Post = MetaforecastPost | LinkPost;

export type Schema = {
  categories: Category[];
  posts: Post[];
};

export const data: Schema = {
  categories: [
    {
      id: "xxx",
      title: "US Elections",
      slug: "us-elections",
    },
    {
      id: "yyy",
      title: "Israel-Palestine",
      slug: "israel-palestine",
    },
  ],
  posts: [
    {
      id: "mmz",
      category: "xxx",
      type: "metaforecast",
      slug: "manifold-DyWQzCTTlssqFl2EMho0",
    },
    {
      id: "asldkf",
      category: "xxx",
      type: "link",
      url: "https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece",
    },
    {
      id: "zzz",
      category: "xxx",
      type: "metaforecast",
      slug: "betfair-1.190717853",
    },
    {
      id: "mmm",
      category: "xxx",
      type: "link",
      url: "https://www.democracynow.org/2023/9/14/naomi_klein_doppelganger",
    },
    {
      id: "mmx",
      category: "xxx",
      type: "link",
      url: "https://www.cnn.com/2023/10/07/middleeast/sirens-israel-rocket-attack-gaza-intl-hnk/index.html",
    },
    {
      id: "mmd",
      category: "xxx",
      type: "metaforecast",
      slug: "rootclaim-shireen-abu-akleh",
    },
  ],
};
