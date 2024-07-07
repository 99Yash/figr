'use client';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { useState } from 'react';
import { Button as ButtonComponent } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export function Button() {
  const config = useAppSelector((state) => state.config);

  const [paddingX, setPaddingX] = useState(2);
  const [paddingY, setPaddingY] = useState(2);

  const [borderColor, setBorderColor] = useState(config.color.color);
  const [textColor, setTextColor] = useState(config.color.color);

  return (
    <div className="flex flex-col gap-7 w-1/3">
      <Card style={{ borderColor: borderColor ?? config.color.color }}>
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Button
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ButtonComponent
            variant={'outline'}
            size="sm"
            className={cn('justify-start w-full')}
            style={{
              backgroundColor: config.color.color,
              borderRadius: config.radius.value,
              color: textColor,
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
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center gap-1 w-1/2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Border
          </Label>
          <Input
            type="color"
            value={borderColor ?? config.color.color}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-1/2"
            style={{
              borderRadius: config.radius.value,
              color: borderColor,
            }}
            placeholder="john@example.com"
            autoComplete="off"
          />
          <span className="text-xs text-muted-foreground">{borderColor}</span>
        </div>
        <div className="flex items-center gap-2 w-1/2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Text
          </Label>
          <Input
            type="color"
            value={textColor ?? config.color.color}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-1/2"
            style={{
              borderRadius: config.radius.value,
              color: textColor,
            }}
          />
          <span className="text-xs text-muted-foreground">{textColor}</span>
        </div>
      </div>
    </div>
  );
}
