"use client"
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { BlogService } from '@/services/blog.service';
import { useQuery } from '@tanstack/react-query'
import { calculateEstimatedTimeToRead } from '@/helpers/time.format'

// Dynamically import Carousel with SSR disabled
const Carousel = dynamic(
  () => import("react-multi-carousel").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <Box sx={{ 
        height: { xs: '40vh', md: "70vh" },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)'
      }}>
        <CircularProgress />
      </Box>
    )
  }
);

const responsive = {
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export default function Hero() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: BlogService.getAllBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <Box sx={{ 
        height: { xs: '40vh', md: "70vh" },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)'
      }}>
        <CircularProgress color="inherit" sx={{ color: 'white !important' }} />
      </Box>
    );
  }

  if (isError || !data?.blogs?.length) {
    return null; 
  }

  return (
    <Box
      sx={{
        height: { xs: '40vh', md: "70vh" },
        width: "100%",
        position: "relative",
      }}
    >
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item"
        containerClass="carousel-container"
      >
        {data.blogs.map((item) => (
          <Box
            key={item.id || item.title}
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: '40vh', md: "70vh" },
              padding: "0 8px",
            }}
          >
            {/* Background Image with priority for first slide */}
            <Image
              src={item.image.url}
              alt={item.title}
              fill
              priority={data.blogs.indexOf(item) === 0} // Only preload first image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              quality={85}
              style={{
                objectFit: "cover",
              }}
            />
            
            {/* Dark overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
            
            {/* Content */}
            <Box
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { 
                  xs: "0 20px", 
                  sm: "0 30px", 
                  md: "0 50px", 
                  lg: "0 80px" 
                },
                maxWidth: { 
                  xs: "100%", 
                  sm: "80%", 
                  md: "70%", 
                  lg: "60%" 
                },
                zIndex: 1,
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                fontWeight={600}
                sx={{
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                  marginBottom: { xs: 1, sm: 1.5, md: 2 },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                }}
              >
                {item.title}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                    md: "1.125rem",
                    lg: "1.25rem",
                  },
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  opacity: 0.9,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {item.excerpt}
              </Typography>
              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "8px", sm: "10px", md: "12px" },
                  marginTop: { xs: 1, sm: 1.5, md: 2 },
                  padding: { xs: "8px 12px", sm: "10px 16px", md: "12px 20px" },
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "25px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  maxWidth: "fit-content",
                }}
              >
                <Avatar
                  alt={item.author.name}
                  src={item.author.avatar.url}
                  sx={{
                    width: { xs: 32, sm: 36, md: 40, lg: 44 },
                    height: { xs: 32, sm: 36, md: 40, lg: 44 },
                    border: "2px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      color: "white",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.author.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="time"
                    dateTime={item.createdAt}
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      display: 'block',
                      marginTop: '5px'
                    }}
                  >
                    {new Date(item.createdAt).toLocaleDateString('en-EN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} 
                     {' •'} {calculateEstimatedTimeToRead(item.description.text)} min read
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}