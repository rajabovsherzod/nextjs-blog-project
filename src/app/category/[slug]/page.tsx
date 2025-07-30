import React from 'react'
import { BlogService } from "@/services/blog.service";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Content, Hero, Sidebar } from '@/components';

interface CategoryDetailedParams {
    params: {
        slug: string
    }
}

export default async function CategoryDetailedPage({ params }: CategoryDetailedParams){
    const blogs = await BlogService.getDetailedCategory(params.slug)
    const { blogs: latestBlogs } = await BlogService.getLatestBlogs();
    const { categories } = await BlogService.getCategories();
    return (
        <Container maxWidth="xl">
                <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: {xs: 'column', md: 'row'}, gap: {md: '20px'}}}>
                  <Sidebar latestBlogs={latestBlogs} categories={categories} />
                  <Content blogs={blogs} widthProps='70%'/>
                </Box>
        </Container>
    )
}


