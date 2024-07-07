'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { submitSpacing } from '@/lib/actions';
import { defaultSpacing } from '@/lib/data';
import { catchError, cn } from '@/lib/utils';
import ObjectID from 'bson-objectid';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const spacingItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.coerce.number().min(1).multipleOf(0.01, {
    message: 'Invalid value, must be a multiple of .01',
  }),
});

export type SpacingItem = z.infer<typeof spacingItemSchema>;

const spacingSchema = z.object({
  spacing: z.array(spacingItemSchema),
});

export type SpacingFormData = z.infer<typeof spacingSchema>;

export function Spacing({
  spacing: specifiedSpacing,
}: {
  spacing: SpacingFormData['spacing'];
}) {
  const form = useForm<SpacingFormData>({
    defaultValues: {
      spacing: specifiedSpacing.length > 0 ? specifiedSpacing : defaultSpacing,
    },
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'spacing',
  });

  async function onSubmit(data: SpacingFormData) {
    const formattedData = data.spacing.map((spacing) => ({
      id: spacing.id,
      label: spacing.label,
      value: Number(spacing.value),
    }));
    try {
      await submitSpacing({ spacing: formattedData });
      form.reset(form.getValues());
      toast.success('Values saved');
    } catch (e) {
      catchError(e);
    }
  }

  return (
    <Card className="w-full p-3.5">
      <CardHeader>
        <CardTitle>Spacing</CardTitle>
        <CardDescription>Pick spacing values for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`spacing.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Label
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The name of the variable
                      </FormDescription>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`spacing.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Value
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The value of the spacing in pixels
                      </FormDescription>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="number"
                          step={4}
                          placeholder="in px"
                          {...field}
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
                    id: new ObjectID().toHexString(),
                    label: `Spacing ${fields.length + 1}`,
                    value: 2,
                  })
                }
              >
                Add Spacing
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
