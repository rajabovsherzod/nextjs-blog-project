import { BlogService } from '@/services/blog.service';
import { Box, Container } from '@mui/material';
import { Content, Sidebar } from '@/components';
import type { Metadata } from 'next';

interface CategoryDetailedPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: CategoryDetailedPageProps): Promise<Metadata> {
    const category = await BlogService.getCategory(params.slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: category.label,
        description: `Find all the latest articles and posts related to ${category.label}.`,
    };
}

export default async function CategoryDetailedPage({ params }: CategoryDetailedPageProps) {
    const blogs = await BlogService.getDetailedCategory(params.slug);
    const { blogs: latestBlogs } = await BlogService.getLatestBlogs();
    const { categories } = await BlogService.getCategories();

    return (
        <Container maxWidth='xl'>
            <Box sx={{ display: 'flex', marginTop: '20px', flexDirection: { xs: 'column', md: 'row' }, gap: { md: '20px' } }}>
                <Sidebar latestBlogs={latestBlogs} categories={categories} />
                <Content blogs={blogs} widthProps='70%' />
            </Box>
        </Container>
    );
}