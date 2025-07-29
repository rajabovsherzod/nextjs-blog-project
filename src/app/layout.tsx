// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { Providers } from "./providers"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import { Box } from "@mui/material"

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "My App",
  description: "My Next.js App with MUI and Roboto",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="body">
        <Providers>
          <Navbar />
          <Box
            className="main"
            sx={{
              pt: { xs: 1, sm: 2 },
              px: { xs: 1, sm: 2, md: 3 },
              pb: { xs: 3, sm: 4, md: 5 },
              flex: 1,
              minHeight: "auto",
            }}
          >
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}