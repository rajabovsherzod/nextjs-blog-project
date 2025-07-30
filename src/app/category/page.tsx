import React from 'react';
import type { Metadata } from 'next'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { BlogService } from '@/services/blog.service';
import { Button, Divider, Typography } from '@mui/material';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'All Categories',
    description: 'Browse all available categories and find topics that interest you.',
};

export default async function CategoryPage() {
    const { categories } = await BlogService.getCategories();

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
                    All Categories
                </Typography>
                <Divider sx={{ mt: 2, width: '150px', mx: 'auto', height: '2px' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 5 }}>
                {categories.map(category => (
                    <Button
                        key={category.slug}
                        component={Link}
                        href={`/category/${category.slug}`}
                        variant="contained"
                        size='large'
                    >
                        {category.label}
                    </Button>
                ))}
            </Box>
        </Container>
    );
}