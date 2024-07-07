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

export function Cards() {
  return (
    <div className="grid md:grid-cols-3 gap-2 self-center">
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle className="font-semibold text-center text-lg tracking-tight">
            Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="gender" className="text-sm font-semibold">
            Radio items
          </Label>
          <RadioGroup
            className="flex items-center text-xs gap-2 mb-4"
            id="gender"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem defaultChecked value="all" />
              <Label
                htmlFor="all"
                className="text-sm tracking-tight text-muted-foreground"
              >
                Not Specify
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" />
              <Label
                htmlFor="male"
                className="text-sm tracking-tight text-muted-foreground"
              >
                Male
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" />
              <Label
                htmlFor="female"
                className="text-sm tracking-tight text-muted-foreground"
              >
                Female
              </Label>
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
          <Label htmlFor="gender" className="text-sm font-semibold">
            Select
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
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
