'use client';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function InputSelect() {
  const config = useAppSelector((state) => state.config);

  return (
    <Card className="relative flex-1">
      <CardHeader className="flex justify-between">
        <CardTitle className="font-semibold text-center text-lg tracking-tight">
          Select
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger
            style={{
              borderColor: config.color.color,
              borderRadius: config.radius.value,
            }}
            className={cn(
              'w-5/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
          >
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
