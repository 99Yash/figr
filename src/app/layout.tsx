import { Providers } from '@/components/provider';
import { Toaster } from '@/components/ui/toaster';
import { UserNav } from '@/components/user-menu';
import { getSession } from '@/lib/auth';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { cn } from '../lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Identity',
  description: 'Design system generator for a software application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <Providers>
      <html lang="en">
        <body
          className={
            (cn('bg-gray-50 dark:bg-gray-900 antialiased'), inter.className)
          }
        >
          {' '}
          {session && (
            <div className="flex items-center justify-between my-2">
              <Link
                href={'/'}
                className="text-xl tracking-tight font-semibold ml-12"
              >
                Identity
              </Link>
              <div className="flex items-center justify-end m-12">
                <UserNav user={session.user} />
              </div>
            </div>
          )}
          <Toaster />
          <Analytics />
          {children}
        </body>
      </html>
    </Providers>
  );
}
