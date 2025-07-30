import { BlogService } from "@/services/blog.service";
import Container from "@mui/material/Container";
import { Sidebar } from "@/components";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Avatar, Divider, Typography } from "@mui/material";
import { format } from "date-fns";

interface DetailedBlogPageProps {
  params: { slug: string };
}

export default async function DetailedBlogPage({ params }: DetailedBlogPageProps) {
  const blog = await BlogService.getDetailedBlog(params.slug);
  console.log("This is blog: ",blog)
  const { blogs: latestBlogs } = await BlogService.getLatestBlogs();
  const { categories } = await BlogService.getCategories();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          flexDirection: { xs: "column", md: "row" },
          gap: { md: "20px" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          {/* Asosiy rasm uchun Box */}
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, .5)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 8px 16px rgba(255, 255, 255, .1)",
              height: { xs: "30vh", lg: "50vh" },
              position: "relative",
            }}
          >
            <Image
              src={blog.image.url}
              alt={blog.title}
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Box>

          {/* Kontent (matn) uchun Box */}
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, .5)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 8px 16px rgba(255, 255, 255, .1)",
              marginTop: "20px",
            }}
          >
            <Typography variant="h3" component="h1">
              {blog.title}
            </Typography>
            <Typography variant="body1" color="gray" sx={{ marginTop: "10px" }}>
              {blog.excerpt}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
              <Box>
                <Typography variant="body1">{blog.author.name}</Typography>
                <Typography variant="body2" color="gray">
                  {format(new Date(blog.createdAt), "dd MMM, yyyy")}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ marginY: "20px" }} />
            {blog.description.html ? (
              <Box 
                sx={{ 
                  lineHeight: "1.8",
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    marginTop: '20px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  },
                  '& p': {
                    marginBottom: '15px'
                  },
                  '& ul, & ol': {
                    marginBottom: '15px',
                    paddingLeft: '20px'
                  },
                  '& li': {
                    marginBottom: '5px'
                  },
                  '& blockquote': {
                    borderLeft: '4px solid #ccc',
                    paddingLeft: '15px',
                    marginBottom: '15px',
                    fontStyle: 'italic'
                  },
                  '& code': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontSize: '0.9em'
                  },
                  '& pre': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    marginBottom: '15px'
                  }
                }}
                dangerouslySetInnerHTML={{ __html: blog.description.html }} 
              />
            ) : (
              <Typography sx={{ lineHeight: "1.8" }}>
                {blog.description.text}
              </Typography>
            )}
          </Box>
          </Box>
        <Sidebar latestBlogs={latestBlogs} categories={categories} />
      </Box>
    </Container>
  );
}