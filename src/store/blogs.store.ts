import { create } from 'zustand'
import { BlogsType, CategoryType } from "@/interfaces/blogs.interface";
import { devtools } from 'zustand/middleware'

interface BlogStoreType {
    blogs: BlogsType[]
    latestBlogs: BlogsType[]
    categories: CategoryType[]
    hydrated: boolean
    hydrate: (blogs: BlogsType[], latestBlogs: BlogsType[], categories: CategoryType[]) => void
}

export const useBlogStore = create<BlogStoreType>()(
  devtools((set) => ({
    blogs: [],
    latestBlogs: [],
    categories: [],
    hydrated: false,
    hydrate: (blogs, latestBlogs, categories) => set({
      blogs,
      latestBlogs,
      categories,
      hydrated: true
    }),
  }))
)
