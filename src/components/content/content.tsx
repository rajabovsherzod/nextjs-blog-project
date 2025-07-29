"use client"
import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import Image from "next/image";
import { useBlogStore } from "@/store/blogs.store";
import { BlogService } from '@/services/blog.service'
import { useQuery } from '@tanstack/react-query'
import { BlogsType } from "@/interfaces/blogs.interface";

const Content = () => {
  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: BlogService.getAllBlogs,
  })
  return (
    <Box
      sx={{width: {xs: '100%', md: '70%'}, minHeight: "5000px", marginTop: {xs: '20px', md: '0px'}}}
      padding={"20px"}
      border={"1px solid gray"}
      borderRadius={"8px"}
    >
      <Box gap={'20px'}>
          {data?.blogs.map(item => (
            <Box key={item.image.url} sx={{ backgroundColor: 'rgba(0, 0, 0, .5)', padding: '20px', marginTop: '20px', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)'}}>
              <Box position={'relative'} width={'100%'} sx={{ height: {xs: '25vh', md: '50vh'}}}>
                  <Image src={item.image.url} alt={item.title} fill style={{ objectFit: 'cover', borderRadius: '10px'}}/>
              </Box>
              <Typography variant='h4' marginTop={'30px'}>{item.title}</Typography>
              <Typography variant='body1' color={'gray'}>{item.excerpt}</Typography>
              <Divider sx={{ marginTop: '25px'}}/>
              <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: '20px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '24px',
                    padding: '8px 16px',
                    width: 'fit-content'
                  }}
                >
                  <Avatar
                    src={item.author.avatar.url}
                    alt={item.author.name}
                    sx={{
                      width: 36,
                      height: 36,
                      border: '2px solid rgba(255,255,255,0.2)'
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: 1.2
                      }}
                    >
                      {item.author.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem'
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString('en-EN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Content;

