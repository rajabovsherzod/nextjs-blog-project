'use client';

import NProgress from 'nprogress';
import NextLink, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { usePathname } from 'next/navigation'; 
interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function CustomLink({ href, children, ...props }: CustomLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();

  const handleOnClick = () => {
    if (pathname !== href) {
      NProgress.start();
    }
  };

  return (
    <NextLink href={href} onClick={handleOnClick} {...props}>
      {children}
    </NextLink>
  );
}