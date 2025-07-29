export interface BlogsType {
    excerpt: string;
    id: string;
    slug: string;
    title: string;
    description: {
      text: string
    }
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
  