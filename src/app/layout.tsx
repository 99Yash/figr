import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Identity',
  description: 'Design system generator for a software application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          (cn('bg-gray-50 dark:bg-gray-900 antialiased'), inter.className)
        }
      >
        {children}
      </body>
    </html>
  );
}
