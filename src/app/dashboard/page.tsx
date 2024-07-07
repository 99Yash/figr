import { Colors } from '@/components/forms/colors';
import { Radius } from '@/components/forms/radius';
import { Spacing } from '@/components/forms/spacing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const tabs = ['Colors', 'Radius', 'Spacing'];

export default async function Dashboard() {
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
    <section className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-semibold tracking-tighter">
        Welcome back, {session.user.name}
      </h1>
      <Tabs
        defaultValue="Colors"
        className="w-full flex flex-col gap-4 items-center justify-center"
      >
        <TabsList className="flex w-fit justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Colors" className="w-3/4">
          <Colors colors={colors} />
        </TabsContent>
        <TabsContent value="Radius" className="w-3/4">
          <Radius radius={radii} />
        </TabsContent>
        <TabsContent value="Spacing" className="w-3/4">
          <Spacing spacing={spacing} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
