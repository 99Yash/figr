'use client';

import { logout } from '@/lib/actions';
import { catchError } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Loading } from '../ui/loading';

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
    <Button type="submit" disabled={isLoading} onClick={onClick}>
      {isLoading ? <Loading /> : 'Logout'}
    </Button>
  );
}
