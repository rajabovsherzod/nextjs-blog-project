import { request, gql } from "graphql-request";
import { BlogsType } from "@/interfaces/blogs.interface";
import { CategoryType } from "@/interfaces/categories.interface";

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogService = {
  async getAllBlogs(): Promise<{ blogs: BlogsType[]}> {
    const query = gql`
      query GetBlogs {
        blogs(stage: PUBLISHED) {
          excerpt
          id
          slug
          title
          description {
            text
            html
          }
          createdAt
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
        }
      }
    `;

    const result = await request<{ blogs: BlogsType[] }>(endpoint, query);
    return result;
  },

  async getLatestBlogs(): Promise<{ blogs: BlogsType[]}> {
    const query = gql`
      query GetLatestBlog {
        blogs(last: 2) {
          id
          slug
          title
          description {
            text
            html
          }
          createdAt
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
        }
      }
    `;
    const result = await request<{ blogs: BlogsType[] }>(endpoint, query);
    return result;
  },

  async getCategories(): Promise<{ categories: CategoryType[]}> {
    const query = gql`
      query GetCategories {
        categories {
          label
          slug
        }
      }
    `;
    
    try {
      const result = await request<{ categories: CategoryType[]}>(endpoint, query);
      console.log('Categories result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getDetailedBlog(slug: string) {
    const query = gql`
      query GetDetailedBlog($slug: String!) {
        blog(where: { slug: $slug }) {
          excerpt
          id
          slug
          title
          description {
            text
            html
          }
          createdAt
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
        }
      }
    `
    const result = await request<{ blog: BlogsType}>(endpoint, query, { slug })
    return result.blog
  },

  async getDetailedCategory(slug: string) {
    const query = gql`
      query GetBlogsWithCategory($slug: String!) {
        blogs(where: {category: { slug:$slug}}) {
          excerpt
          id
          slug
          title
          description {
            text
            html
          }
          createdAt
          image {
            url
          }
          author {
            name
          avatar {
            url
          }
        }
          category {
            label
            slug
          }
        }
      }
    `
    const result = await request<{ blogs: BlogsType[]}>(endpoint, query, { slug })
    return result.blogs
  },

  async getCategory(slug: string) {
    const query = gql`
      query GetCategory($slug: String!) {
        category(where: { slug: $slug }) {
          label
          slug
        }
      }
    `
    const result = await request<{ category: CategoryType}>(endpoint, query, { slug })
    return result.category
  }
};
