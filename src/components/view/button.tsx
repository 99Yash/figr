'use client';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { Button as ButtonComponent } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function Button() {
  const config = useAppSelector((state) => state.config);

  return (
    <Card className="relative flex-1">
      <CardHeader className="flex justify-between">
        <CardTitle className="font-semibold text-center text-lg tracking-tight">
          Button
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ButtonComponent
          variant={'outline'}
          size="sm"
          className={cn(
            'w-5/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          )}
          style={{
            backgroundColor: config.color.color,
            borderRadius: config.radius.value,
          }}
        >
          Create Account
        </ButtonComponent>
      </CardContent>
    </Card>
  );
}
