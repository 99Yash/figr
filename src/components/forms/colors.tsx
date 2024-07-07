'use client';

import { submitColor } from '@/lib/actions';
import { colorNames } from '@/lib/data';
import ObjectId from 'bson-objectid';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { catchError, cn } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Loading } from '../ui/loading';
import { AutoComplete } from '../utils/auto-complete';

const colorItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
});

const colorsSchema = z.object({
  colors: z.array(colorItemSchema),
});

export type ColorsFormData = z.infer<typeof colorsSchema>;

export function Colors({
  colors: userColors,
}: {
  colors: Array<{ id: string; label: string; color: string }>;
}) {
  const form = useForm<ColorsFormData>({
    defaultValues: {
      colors: userColors,
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'colors',
  });

  async function onSubmit(data: ColorsFormData) {
    try {
      await submitColor(data);
      toast.success('Colors saved');
    } catch (e) {
      catchError(e);
    }
  }

  return (
    <Card className="w-full p-3.5">
      <CardHeader>
        <CardTitle>Colors</CardTitle>
        <CardDescription>Pick colors for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`colors.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Label
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The name of the color
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`colors.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Color
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The value of the color
                      </FormDescription>
                      <FormControl>
                        <AutoComplete
                          options={colorNames}
                          placeholder="Enter text, hex, or hsl"
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          disabled={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className="flex justify-between gap-2 items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({
                    id: new ObjectId().toHexString(),
                    label: `Color ${fields.length + 1}`,
                    color: '#000000',
                  })
                }
              >
                Add Color
              </Button>
              <Button
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                variant={'outline'}
                type="submit"
                className="w-fit"
              >
                {form.formState.isSubmitting ? (
                  <Loading
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
