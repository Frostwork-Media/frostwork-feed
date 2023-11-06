import { createStore } from "zustand";
import { Post, Schema } from "./db";
import { createContext } from "react";

export interface EditState {
  store: Schema;
  addCategory(title: string, slug: string): void;
  deleteCategory(slug: string): void;
  deletePost(id: string): void;
  movePostUp(id: string): void;
  movePostDown(id: string): void;
  updateCategoryTitle(slug: string, title: string): void;
  updateCategorySlug(slug: string, newSlug: string): void;
  addPost(post: Post): void;
  moveCategoryUp(slug: string): void;
  moveCategoryDown(slug: string): void;
}

export const createEditStore = (data: Schema) => {
  return createStore<EditState>()((set, get) => ({
    store: data,
    addCategory(title, slug) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          categories: [...state.store.categories, { title, slug }],
        },
      }));
    },
    deleteCategory(slug) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: state.store.posts.filter((p) => p.category !== slug),
          categories: state.store.categories.filter((c) => c.slug !== slug),
        },
      }));
    },
    deletePost(id) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: state.store.posts.filter((p) => p.id !== id),
        },
      }));
    },
    movePostUp(id) {
      set((state) => {
        const postIndex = state.store.posts.findIndex((p) => p.id === id);
        if (postIndex === 0) {
          return state;
        }

        const post = state.store.posts[postIndex];
        const previousPost = state.store.posts[postIndex - 1];

        return {
          ...state,
          store: {
            ...state.store,
            posts: state.store.posts.map((p, index) => {
              if (index === postIndex) {
                return previousPost;
              }
              if (index === postIndex - 1) {
                return post;
              }
              return p;
            }),
          },
        };
      });
    },
    movePostDown(id) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: state.store.posts.map((p) => {
            if (p.id === id) {
              const index = state.store.posts.findIndex((p) => p.id === id);
              if (index === state.store.posts.length - 1) {
                return p;
              }
              return state.store.posts[index + 1];
            }
            return p;
          }),
        },
      }));
    },
    updateCategoryTitle(slug, title) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          categories: state.store.categories.map((c) => {
            if (c.slug === slug) {
              return { ...c, title };
            }
            return c;
          }),
        },
      }));
    },
    updateCategorySlug(slug, newSlug) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: state.store.posts.map((p) => {
            if (p.category === slug) {
              return { ...p, category: newSlug };
            }
            return p;
          }),
          categories: state.store.categories.map((c) => {
            if (c.slug === slug) {
              return { ...c, slug: newSlug };
            }
            return c;
          }),
        },
      }));
    },
    addPost(post) {
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          posts: [...state.store.posts, post],
        },
      }));
    },
    moveCategoryUp(slug) {
      set((state) => {
        const index = state.store.categories.findIndex((c) => c.slug === slug);
        if (index === 0) {
          return state;
        }

        const category = state.store.categories[index];
        const previousCategory = state.store.categories[index - 1];

        return {
          ...state,
          store: {
            ...state.store,
            categories: state.store.categories.map((c, i) => {
              if (i === index) {
                return previousCategory;
              }
              if (i === index - 1) {
                return category;
              }
              return c;
            }),
          },
        };
      });
    },
    moveCategoryDown(slug) {
      set((state) => {
        const index = state.store.categories.findIndex((c) => c.slug === slug);
        if (index === state.store.categories.length - 1) {
          return state;
        }

        const category = state.store.categories[index];
        const nextCategory = state.store.categories[index + 1];

        return {
          ...state,
          store: {
            ...state.store,
            categories: state.store.categories.map((c, i) => {
              if (i === index) {
                return nextCategory;
              }
              if (i === index + 1) {
                return category;
              }
              return c;
            }),
          },
        };
      });
    },
  }));
};

type EditStore = ReturnType<typeof createEditStore>;

export const EditContext = createContext<EditStore | null>(null);
