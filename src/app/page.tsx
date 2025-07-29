

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { BlogService } from '@/services/blog.service';
import { Hero, Content, Sidebar, Hydration } from '@/components';


export default async function Home() {
  // const { blogs, categories } = await BlogService.getAllBlogs();
  // const { blogs: latestBlogs } = await BlogService.getLatestBlogs();
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['blogs'],
      queryFn: BlogService.getAllBlogs,
    }),
    queryClient.prefetchQuery({
      queryKey: ['latest-blogs'],
      queryFn: BlogService.getLatestBlogs,
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: BlogService.getCategories
    })
  ])
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container maxWidth="xl">
        <Hero />
        <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: {xs: 'column', md: 'row'}, gap: {md: '20px'}}}>
          <Sidebar />
          <Content />
        </Box>
      </Container>
    </HydrationBoundary>
  );
}


