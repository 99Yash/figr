import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSession } from '@/lib/auth';
import { defaultColors, defaultRadii, defaultSpacing } from '@/lib/data';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Customizer } from './customizer';

export default async function Page() {
  const session = await getSession();

  if (!session) redirect('/');

  const colors = await db.color.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      label: true,
      color: true,
    },
  });

  const radii = await db.radius.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      label: true,
      value: true,
    },
  });

  const spacing = await db.spacing.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      label: true,
      value: true,
    },
  });

  return (
    <section className="flex flex-col gap-4 items-center justify-center mx-12">
      <div className="flex flex-col gap-1.5 items-center justify-center">
        <h1 className="text-3xl font-semibold tracking-tighter">Playground</h1>
        <p className="text-muted-foreground text-sm tracking-tight">
          Gauge your designs and view them here.
        </p>
        <Link className="text-sm tracking-tight underline" href="/dashboard">
          Dashboard
        </Link>
      </div>

      <div className="flex flex-col self-start gap-12 w-full">
        <Customizer
          colors={colors.length > 0 ? colors : defaultColors}
          radii={radii.length > 0 ? radii : defaultRadii}
          spacing={spacing.length > 0 ? spacing : defaultSpacing}
        />

        <div className="grid grid-cols-3 gap-2 self-center ">
          <Card className="w-full">
            <CardHeader className="flex justify-between">
              <CardTitle className="font-semibold tracking-tight">
                Sign in
              </CardTitle>
              <CardDescription className="text-xs">
                Enter your email to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <input
                id="email"
                className="block mb-2 w-full rounded-md px-3 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="john@example.com"
                autoComplete="off"
              />
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
        </div>
      </div>
    </section>
  );
}
