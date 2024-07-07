'use client';

import { cn, getColorFromCssValue } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';

export function InputSelect() {
  const config = useAppSelector((state) => state.config);

  const [paddingX, setPaddingX] = useState(2);
  const [paddingY, setPaddingY] = useState(2);

  const [borderColor, setBorderColor] = useState(config.color.color);
  const [textColor, setTextColor] = useState(config.color.color);
  const [bgColor, setBgColor] = useState(config.color.color);

  useEffect(() => {
    const hex = getColorFromCssValue(config.color.color);
    setBorderColor(hex);
    setTextColor(hex);
    setBgColor(hex);
  }, [config.color.color]);

  return (
    <div className="flex flex-col gap-7 w-1/3">
      <Card
        className="grow"
        style={{ borderColor: borderColor ?? config.color.color }}
      >
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Select
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger
              style={{
                borderColor,
                color: textColor,
                borderRadius: config.radius.value,
              }}
              className={cn('w-full')}
            >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {['apple', 'banana', 'blueberry', 'grapes', 'pineapple'].map(
                (item) => (
                  <SelectItem
                    style={{
                      backgroundColor: bgColor ?? config.color.color,
                      borderColor,
                      color: textColor,
                    }}
                    className="capitalize cursor-pointer my-0.5"
                    key={Math.random()}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Padding X{' '}
          </Label>
          <Slider
            min={0}
            max={100}
            value={[paddingX]}
            onValueChange={(e) => setPaddingX(e[0])}
            className="w-1/2"
          />
          <span className="text-xs text-muted-foreground">{paddingX} px</span>
        </div>
        <div className="flex items-center gap-2">
          <Label
            htmlFor="email"
            className="text-sm tracking-tight text-muted-foreground"
          >
            Padding Y
          </Label>
          <Slider
            min={0}
            max={100}
            value={[paddingY]}
            onValueChange={(e) => setPaddingY(e[0])}
            className="w-1/2"
          />
          <span className="text-xs text-muted-foreground">{paddingY} px</span>
        </div>
      </div>
      <div className="grid gap-2 w-full">
        <div className="flex gap-1 w-1/3">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Border
          </Label>
          <Input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-1/2 self-stretch"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: config.radius.value,
              color: borderColor,
            }}
            placeholder="john@example.com"
            autoComplete="off"
          />
          <span className="text-xs text-muted-foreground">
            {borderColor ?? config.color.color}
          </span>
        </div>
        <div className="flex items-center gap-2 w-1/2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Text
          </Label>
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-1/2"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: config.radius.value,
              color: textColor,
            }}
          />
          <span className="text-xs text-muted-foreground">{textColor}</span>
        </div>
        <div className="flex items-center gap-2 w-1/2">
          <Label className="text-sm tracking-tight text-muted-foreground">
            Background
          </Label>
          <Input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-1/2"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: config.radius.value,
              color: textColor,
            }}
          />
          <span className="text-xs text-muted-foreground">
            {bgColor ?? config.color.color}
          </span>
        </div>
      </div>
    </div>
  );
}
