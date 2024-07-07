'use client';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { useState } from 'react';
import { Button as ButtonComponent } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export function Button() {
  const config = useAppSelector((state) => state.config);

  const [paddingX, setPaddingX] = useState(2);
  const [paddingY, setPaddingY] = useState(2);

  return (
    <div className="flex flex-col gap-7 w-1/3">
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
              'w-5/6 absolute justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
            style={{
              backgroundColor: config.color.color,
              borderRadius: config.radius.value,
              padding: `${paddingY}px ${paddingX}px`,
            }}
          >
            Create Account
          </ButtonComponent>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Padding X{' '}
          </Label>
          <Slider
            min={0}
            max={60}
            value={[paddingX]}
            onValueChange={(e) => setPaddingX(e[0])}
            className="w-1/2"
            style={
              {
                '-webkit-slider-runnable-track': {
                  background: config.color.color,
                },
                '-webkit-slider-thumb': {
                  background: config.color.color,
                },
                '--track-color': config.color.color,
                '--range-color': config.color.color,
                '--thumb-color': config.color.color,
              } as React.CSSProperties
            }
          />
          <span className="text-xs text-muted-foreground">{paddingX} px</span>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Padding Y
          </Label>
          <Slider
            min={0}
            max={60}
            value={[paddingY]}
            onValueChange={(e) => setPaddingY(e[0])}
            className="w-1/2"
          />
          <span className="text-xs text-muted-foreground">{paddingY} px</span>
        </div>
      </div>
    </div>
  );
}
