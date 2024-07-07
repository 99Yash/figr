'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PaletteIcon } from 'lucide-react';

export function Customizer({
  colors,
  radii,
  spacing,
}: {
  colors: { id: string; label: string; color: string }[];
  radii: { id: string; label: string; value: number }[];
  spacing: { id: string; label: string; value: number }[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="w-fit">
          <PaletteIcon className="mr-1 size-3.5 text-yellow-600" />
          Customize
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-40 w-[340px] rounded-[12px]">
        <div className="flex flex-col gap-0.5 mb-6 justify-center">
          <h1 className="font-semibold tracking-tighter">Customize</h1>
          <p className="text-muted-foreground text-xs tracking-tight">
            Customize styles & colors.
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-0.5 justify-center">
            <h2 className="font-medium tracking-tighter text-sm">Colors</h2>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={color.id}
                  onClick={() => {
                    // setConfig({
                    //   ...config,
                    //   theme: theme.name,
                    // })
                  }}
                  className={cn(
                    'justify-start'
                    // isActive && 'border-2 border-primary'
                  )}
                  // style={
                  //   {
                  //     '--theme-primary': `hsl(${
                  //       theme?.activeColor[mode === 'dark' ? 'dark' : 'light']
                  //     })`,
                  //   } as React.CSSProperties
                  // }
                >
                  <span
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary] border border-slate-300'
                    )}
                    style={{
                      backgroundColor: color.color,
                    }}
                  >
                    {/* {isActive && <CheckIcon className="h-4 w-4 text-white" />} */}
                  </span>
                  {color.label}
                  {/* {theme.label} */}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <h2 className="font-medium tracking-tighter text-sm">
              Radius (px)
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {radii.map((radius) => (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={radius.id}
                  // onClick={() => {
                  // 	setConfig({
                  // 		...config,
                  // 		radius: parseFloat(value),
                  // 	})
                  // }}
                  className={
                    cn()
                    // config.radius === parseFloat(value) &&
                    // 'border-2 border-primary'
                  }
                >
                  {radius.value}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <h2 className="font-medium tracking-tighter text-sm">
              Spacing (px)
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {spacing.map((spacing) => (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={spacing.id}
                  // onClick={() => {
                  //   setConfig({
                  //     ...config,
                  //     radius: parseFloat(value),
                  //   });
                  // }}
                  className={
                    cn()
                    // config.radius === parseFloat(value) &&
                    // 'border-2 border-primary'
                  }
                >
                  {spacing.value}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
