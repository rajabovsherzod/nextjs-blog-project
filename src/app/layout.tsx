import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from './providers';
import { Navbar, Footer, ProgressBar } from '@/components';
import { Box } from '@mui/material';
import { Suspense } from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | ShareMe',
    default: 'ShareMe - Blog for Everyone',
  },
  description: 'The best blog platform for sharing and discovering new ideas and stories.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="body">
        <Providers>
          <Navbar />
          <main>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <Box
              className="main"
              sx={{
                pt: { xs: 1, sm: 2 },
                px: { xs: 1, sm: 2, md: 3 },
                pb: { xs: 3, sm: 4, md: 5 },
                flex: 1,
                minHeight: 'auto',
              }}
            >
              {children}
            </Box>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}