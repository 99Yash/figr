'use client';

import { logout } from '@/lib/actions';
import { useState } from 'react';
import { Button } from '../ui/button';

export function LogoutForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logout();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Button disabled={isLoading} type="submit">
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && 'Logout'}
      </Button>
    </form>
  );
}
