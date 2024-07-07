import { getSession } from '@/lib/auth';
import { defaultColors, defaultRadii, defaultSpacing } from '@/lib/data';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Cards } from './cards';
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

      <div className="flex flex-col self-start gap-12 min-w-full">
        <Customizer
          colors={colors.length > 0 ? colors : defaultColors}
          radii={radii.length > 0 ? radii : defaultRadii}
          spacing={spacing.length > 0 ? spacing : defaultSpacing}
        />

        <Cards />
      </div>
    </section>
  );
}
