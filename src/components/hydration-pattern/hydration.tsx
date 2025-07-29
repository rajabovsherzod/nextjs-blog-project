'use client'
import { useEffect } from 'react';
import { useBlogStore } from '@/store/blogs.store';
import { BlogsType, CategoryType } from '@/interfaces/blogs.interface';

interface HydrationProps {
  blogs: BlogsType[];
  latestBlogs: BlogsType[];
  categories: CategoryType[];
  children: React.ReactNode;
}

export default function Hydration({ blogs, latestBlogs, categories, children }: HydrationProps) {
  const hydrate = useBlogStore((state) => state.hydrate);

  useEffect(() => {
    hydrate(blogs, latestBlogs, categories);
  }, [blogs, latestBlogs, categories, hydrate]);

  return <>{children}</>;
}
