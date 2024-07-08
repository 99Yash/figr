'use client';

import { ColorItem } from '@/components/forms/app/colors';
import { RadiusItem } from '@/components/forms/app/radius';
import { SpacingItem } from '@/components/forms/app/spacing';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { setColor, setRadius, setSpacing } from '@/store/config.slice';
import { PaletteIcon } from 'lucide-react';
import { useEffect } from 'react';

export function Customizer({
  colors,
  radii,
  spacing,
}: {
  colors: ColorItem[];
  radii: RadiusItem[];
  spacing: SpacingItem[];
}) {
  const dispatch = useAppDispatch();

  const config = useAppSelector((state) => state.config);

  useEffect(() => {
    dispatch(setColor(colors[0]));
    dispatch(setRadius(radii[0]));
    dispatch(setSpacing(spacing[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onColorChange = (col: ColorItem) => {
    dispatch(setColor(col));
  };

  const onRadiusChange = (rad: RadiusItem) => {
    dispatch(setRadius(rad));
  };

  const onSpacingChange = (spac: SpacingItem) => {
    dispatch(setSpacing(spac));
  };

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
              {colors.map((color) => {
                const isActive = color.id === config.color.id;
                return (
                  <Button
                    variant={'outline'}
                    size="sm"
                    key={color.id}
                    onClick={() => {
                      onColorChange(color);
                    }}
                    className={cn(
                      'justify-start',
                      isActive && 'border-[1px] border-primary'
                    )}
                  >
                    <span
                      className={cn(
                        'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary] border border-slate-300'
                      )}
                      style={
                        {
                          '--theme-primary': `${color.color}`,
                        } as React.CSSProperties
                      }
                    />
                    {color.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <h2 className="font-medium tracking-tighter text-sm">
              Radius
              <span className="text-muted-foreground text-xs"> (px)</span>
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {radii.map((radius) => {
                const isActive = radius.id === config.radius.id;
                return (
                  <Button
                    variant={'outline'}
                    size="sm"
                    key={radius.id}
                    onClick={() => {
                      onRadiusChange(radius);
                    }}
                    className={cn(isActive && 'border-[1px] border-primary')}
                  >
                    {radius.value}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <h2 className="font-medium tracking-tighter text-sm">
              Spacing
              <span className="text-muted-foreground text-xs"> (px)</span>
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {spacing.map((spacing) => {
                const isActive = spacing.id === config.spacing.id;
                return (
                  <Button
                    variant={'outline'}
                    size="sm"
                    key={spacing.id}
                    onClick={() => {
                      onSpacingChange(spacing);
                    }}
                    className={cn(isActive && 'border-[1px] border-primary')}
                  >
                    {spacing.value}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
