import { LoginForm } from '@/components/forms/login';
import { SignupForm } from '@/components/forms/signup';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl tracking-tighter font-semibold">
            Welcome to Identity
          </h1>
          <p className="text-muted-foreground tracking-tight text-sm">
            Identity is a design system generator for a software application. It
            allows you to create a design system effortlessly and quickly.
          </p>
        </div>
        <div className="w-full space-y-4 max-w-md">
          <SignupForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs font-medium uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
