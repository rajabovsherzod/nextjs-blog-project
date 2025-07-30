import { CategoryType } from "@/interfaces/categories.interface";
export interface BlogsType {
    excerpt: string;
    id: string;
    slug: string;
    title: string;
    description: {
      text: string
      html: string
    }
    createdAt: string;
    image: { url: string };
    author: {
      name: string;
      avatar: { url: string };
    };
    category: CategoryType
  }

  

  