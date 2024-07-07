'use client';

import { logout } from '@/lib/actions';
import { catchError, getInitials } from '@/lib/utils';
import { User } from '@prisma/client';
import { Edit3Icon, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Logout } from './forms/auth/logout';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function UserNav({ user }: { user: User }) {
  const initials = getInitials(user.name ?? 'Figr User');
  const email = user.email;

  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    setIsLoading(true);
    try {
      await logout();
    } catch (e) {
      catchError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-xs" onClick={onClick}>
          <Link href="/dashboard" className="flex w-full items-center">
            <Edit3Icon className="mr-2 size-3.5" aria-hidden="true" />
            Dashboard
          </Link>
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-xs">
          <Link href="/view" className="flex w-full items-center">
            <LayoutDashboard className="mr-2 size-3.5" aria-hidden="true" />
            View Design
          </Link>
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
