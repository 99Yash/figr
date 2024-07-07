'use client';

import { submitRadius } from '@/lib/actions';
import { defaultRadii } from '@/lib/data';
import { catchError, cn } from '@/lib/utils';
import ObjectID from 'bson-objectid';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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

const radiusItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.coerce.number().min(1).multipleOf(0.01, {
    message: 'Invalid value, must be a multiple of .01',
  }),
});

const radiusSchema = z.object({
  radii: z.array(radiusItemSchema),
});

export type RadiusFormData = z.infer<typeof radiusSchema>;

export function Radius({
  radius: userRadius,
}: {
  radius: z.infer<typeof radiusSchema>['radii'];
}) {
  const form = useForm<RadiusFormData>({
    defaultValues: {
      radii: userRadius.length > 0 ? userRadius : defaultRadii,
    },
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'radii',
  });

  async function onSubmit(data: RadiusFormData) {
    const formattedData = data.radii.map((radius) => ({
      id: radius.id,
      label: radius.label,
      value: Number(radius.value),
    }));
    try {
      await submitRadius({ radii: formattedData });
      form.reset(form.getValues());
      toast.success('Radius saved');
    } catch (e) {
      catchError(e);
    }
  }

  return (
    <Card className="w-full p-3.5">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Pick border radius for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`radii.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Label
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The name of the variable
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
                  name={`radii.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Value
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        The value of the radius in pixels
                      </FormDescription>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="number"
                          step={0.05}
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
                    label: `Radius ${fields.length + 1}`,
                    value: 8,
                  })
                }
              >
                Add Radius
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
