export interface BlogsType {
    excerpt: string;
    id: string;
    slug: string;
    title: string;
    createdAt: string;
    image: { url: string };
    author: {
      name: string;
      avatar: { url: string };
    };
    category: CategoryType
  }
  
  export interface CategoryType {
    label: string;
    slug: string;
  }
  