// src/hooks/useBlogs.ts
import { useQuery } from '@tanstack/react-query'
import { BlogService } from '@/services/blog.service';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: BlogService.getAllBlogs,
    staleTime: 5 * 60 * 1000, // 5 daqiqa
  })
}

export const useLatestBlogs = () => {
  return useQuery({
    queryKey: ['latest-blogs'],
    queryFn: BlogService.getLatestBlogs,
  })
}