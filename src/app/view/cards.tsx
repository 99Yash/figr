'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store';

export function Cards() {
  const config = useAppSelector((state) => state.config);

  return (
    <div className="grid md:grid-cols-3 gap-2 self-center">
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="gender" className="text-sm mb-0.5 font-semibold">
            Radio items
          </Label>
          <RadioGroup
            className="flex items-center text-xs gap-2 mb-4"
            id="gender"
          >
            <div className="flex items-center gap-2">
              {['Male', 'Female'].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <RadioGroupItem
                    style={{
                      borderColor: config.color.color,
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
          <Label htmlFor="email" className="text-sm font-semibold">
            Text
          </Label>
          <input
            id="email"
            className="block mb-2 w-full rounded-md px-3 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="john@example.com"
            autoComplete="off"
          />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Button
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant={'outline'}
            size="sm"
            className={cn(
              'w-full'
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
            Create Account
            {/* {theme.label} */}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Select
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
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
    </div>
  );
}
