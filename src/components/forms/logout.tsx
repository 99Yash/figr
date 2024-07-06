'use client';

import { logout } from '@/lib/actions';
import { catchError } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';

export function Logout() {
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
    <Button variant={'ghost'} className="flex h-7 w-full" onClick={onClick}>
      <span className="text-sm text-muted-foreground">Log out</span>
    </Button>
  );
}
