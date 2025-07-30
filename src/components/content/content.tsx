"use client"
import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import Image from "next/image";
import { calculateEstimatedTimeToRead } from '@/helpers/time.format';
import Link from 'next/link';
import { ContentProps } from "./content.props";

const Content = ({ blogs, widthProps }: ContentProps) => {
  return (
    <Box
      sx={{width: {xs: '100%', md: `${widthProps}`}, marginTop: {xs: '20px', md: '0px'}}}
      padding={"20px"}
      border={"1px solid gray"}
      borderRadius={"8px"}
    >
      <Box gap={'20px'}>
          {blogs.map(item => (
            <Link key={item.id} href={`/blog/${item.slug}`}>
                <Box  sx={{ backgroundColor: 'rgba(0, 0, 0, .5)', padding: '20px', marginTop: '20px', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)'}}>
                <Box position={'relative'} width={'100%'} sx={{ height: {xs: '25vh', lg: '50vh'}}}>
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
                        {' •'} {calculateEstimatedTimeToRead(item.description.text)} min read
                      </Typography>
                    </Box>
                  </Box>
              </Box>
              </Link>
            ))}
      </Box>
    </Box>
  );
};

export default Content;