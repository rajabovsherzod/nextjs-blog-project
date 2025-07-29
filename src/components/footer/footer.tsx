"use client";

import React from "react";
import { Box, Typography, Link, Container, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: "primary.main",
        color: "#fff",
        borderTop: "1px solid #444",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <Typography variant="body2" sx={{ my: 1 }}>
          © {new Date().getFullYear()} My App. All rights reserved.
        </Typography>

        {/* Center Links */}
        <Box sx={{ my: 1 }}>
          <Link
            href="/"
            color="inherit"
            sx={{ mx: 1.5, textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            href="/about"
            color="inherit"
            sx={{ mx: 1.5, textDecoration: "none" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            color="inherit"
            sx={{ mx: 1.5, textDecoration: "none" }}
          >
            Contact
          </Link>
        </Box>

        {/* Right Social Icons */}
        <Box sx={{ my: 1 }}>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://youtube.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            href="https://telegram.org"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <TelegramIcon />
          </IconButton>
          <IconButton
            href="https://x.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <XIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
