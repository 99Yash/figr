import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const tabs = ['Colors', 'Typography', 'Components'];

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    return redirect('/');
  }

  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-semibold tracking-tighter">
        Welcome back, {session.user.name}
      </h1>
      <Tabs defaultValue="Colors" className="w-fit">
        <TabsList className="flex w-full justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Colors" className="w-full">
          <p>Colors</p>
        </TabsContent>
        <TabsContent value="Typography">
          <p>Typography</p>
        </TabsContent>
        <TabsContent value="Components">
          <p>Components</p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
