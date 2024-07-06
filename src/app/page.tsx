import { LoginForm } from '@/components/forms/login';
import { LogoutForm } from '@/components/forms/logout';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            Welcome back, {session.user.name}
          </h1>
          <LogoutForm />
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl tracking-tight font-semibold">
              Welcome to Identity
            </h1>
            <p className="text-muted-foreground tracking-tight text-sm">
              Identity is a design system generator for a software application.
              It allows you to create a design system effortlessly and quickly.
            </p>
          </div>
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </section>
      )}
    </main>
  );
}
