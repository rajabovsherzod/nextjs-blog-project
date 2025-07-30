"use client"
import React, { Fragment } from "react";
import { Box, Typography, Button, Divider, Avatar } from "@mui/material";
import Image from "next/image";
import { SidebarProps } from './sidebar.props';
import Link from "next/link";

const Sidebar = ({ latestBlogs, categories }: SidebarProps) => {
  return (
    <Box sx={{ width: {xs: '100%', md: '30%'} }}>
      <Box sx={{ position: "sticky", top: "100px" }}>
        <Box
          padding={"20px"}
          border={"1px solid gray"}
          borderRadius={"8px"}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", color: "white" }}
          >
            Latest Blog
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {latestBlogs.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.title}>
                  <Fragment key={item.title}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      width={80}
                      height={80}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "white",
                        fontSize: "0.875rem",
                        lineHeight: 1.3,
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      <Avatar
                        src={item.author.avatar.url}
                        alt={item.author.name}
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: "0.875rem",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "gray",
                          fontSize: "0.8rem",
                          lineHeight: 1.4,
                          fontWeight: 500,
                        }}
                      >
                        {item.author.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.7rem",
                        lineHeight: 1.4,
                        display: "block",
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString("en-EN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  sx={{
                    marginTop: "5px",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </Fragment>
              </Link>
            ))}
          </Box>
        </Box>
        <Box padding={"20px"}  marginTop={"20px"} border={"1px solid gray"} borderRadius={"8px"}>
          <Typography variant="h5">Category</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
          >
            {categories.map((nav) => (
              <Fragment key={nav.slug}>
                <Link href={`/category/${nav.slug}`}>
                  <Button
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      hight: "50px",
                      color: "white",
                    }}
                  >
                    {nav.label}
                  </Button>
                </Link>
                <Divider sx={{ marginTop: "5px" }} />
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;