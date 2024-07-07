'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
    <div
      className="grid md:grid-cols-3 self-center"
      style={{ gap: config.spacing.value }}
    >
      <Card className="w-full">
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
                      borderColor: config.color.color,
                      color: config.color.color,
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
            id="email"
            className={cn(
              'block mb-2 w-full rounded-md px-3 border-0 py-1 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
              `ring-[${config.color.color}] focus-visible:ring-[${config.color.color}] focus:ring-[${config.color.color} focus:text-[${config.color.color}] focus-visible:ring-[${config.color.color}]`
            )}
            style={{
              borderColor: config.color.color,
              borderRadius: config.radius.value,
              color: config.color.color,
            }}
            placeholder="john@example.com"
            autoComplete="off"
          />
        </CardContent>
      </Card>

      <Card className="w-full relative">
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
              'w-5/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
            style={{
              backgroundColor: config.color.color,
              borderRadius: config.radius.value,
            }}
          >
            Create Account
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full relative">
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
    </div>
  );
}
