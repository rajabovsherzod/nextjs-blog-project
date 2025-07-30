import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Content, Hero, Sidebar } from '@/components';
import { BlogService } from '@/services/blog.service';

export default async function Home() {
  const { blogs: latestBlogs } = await BlogService.getLatestBlogs();
  const { categories } = await BlogService.getCategories();
  const { blogs } = await BlogService.getAllBlogs();

  return (
      <Container maxWidth="xl">
        <Hero blogs={latestBlogs}/>
        <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: {xs: 'column', md: 'row'}, gap: {md: '20px'}}}>
          <Sidebar latestBlogs={latestBlogs} categories={categories} />
          <Content blogs={blogs} />
        </Box>
      </Container>
  );
}