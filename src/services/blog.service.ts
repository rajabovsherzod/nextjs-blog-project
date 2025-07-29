import { request, gql } from "graphql-request";
import { BlogsType, CategoryType } from "@/interfaces/blogs.interface";

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
  }
};
