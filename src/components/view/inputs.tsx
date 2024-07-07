'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn, getColorFromCssValue } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

export function Inputs() {
  const config = useAppSelector((state) => state.config);
  const [paddingX, setPaddingX] = useState(8);
  const [paddingY, setPaddingY] = useState(12);
  const [borderColor, setBorderColor] = useState(config.color.color);
  const [textColor, setTextColor] = useState(config.color.color);

  useEffect(() => {
    const hex = getColorFromCssValue(config.color.color);
    setBorderColor(hex);
    setTextColor(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.color.color]);

  return (
    <div className="flex flex-col w-1/3 gap-7">
      <Card
        className="min-h-[300px]"
        style={{ borderColor: borderColor ?? config.color.color }}
      >
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Input (Text & Radio)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            className="flex items-center text-xs gap-2 mb-4"
            id="gender"
          >
            <div className="flex  flex-col gap-2">
              {['Male', 'Female', 'Transgender'].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <RadioGroupItem
                    style={{
                      borderColor,
                      color: textColor,
                    }}
                    defaultChecked
                    value={item}
                  />
                  <Label
                    htmlFor={item}
                    className="text-sm tracking-tight text-muted-foreground"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
          <Input
            autoFocus
            id="email"
            className={cn(
              'block mb-2 w-full rounded-md px-3 border-0 py-1 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
              `ring-none focus-visible:ring-none focus:ring-[${config.color.color} focus:text-[${config.color.color}] focus-visible:ring-[${config.color.color}]`
            )}
            style={{
              border: `1px solid ${borderColor ?? config.color.color}`,
              borderRadius: config.radius.value,
              color: textColor,
              padding: `${paddingY}px ${paddingX}px`,
            }}
            placeholder="john@example.com"
            autoComplete="off"
          />
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
          <Label className="text-sm tracking-tight text-muted-foreground">
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
              value={textColor ?? config.color.color}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-1/2"
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: config.radius.value,
                color: textColor,
              }}
              placeholder="john@example.com"
              autoComplete="off"
            />
            <span className="text-xs text-muted-foreground">{textColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
