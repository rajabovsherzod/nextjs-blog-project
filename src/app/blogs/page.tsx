import React from 'react'
import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Content } from '@/components';
import { BlogService } from '@/services/blog.service';
import { Divider, Typography } from '@mui/material';

export const metadata: Metadata = {
    title: 'All Blogs',
    description: 'Explore a wide variety of articles and posts on different topics shared by our community.',
};

export default async function BlogsPage() {
    const { blogs } = await BlogService.getAllBlogs();
    const half = Math.ceil(blogs.length / 2);
    const firstHalf = blogs.slice(0, half);
    const secondHalf = blogs.slice(half);
    return (
        <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', my: 5 }}>
                <Typography
                    variant='h2'
                    component={'h1'}
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3, #4CAF50)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                    }}
                >
                    All Blogs
                </Typography>
                <Divider sx={{ mt: 2, width: '100px', mx: 'auto', height: '2px' }} />
        </Box>
        <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: {xs: 'column', md: 'row'}, gap: {md: '20px'}}}>
            <Content blogs={firstHalf} widthProps='50%'/>
            <Content blogs={secondHalf} widthProps='50%'/>
        </Box>
        </Container>
    )
}