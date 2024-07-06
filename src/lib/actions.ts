'use server';

import { LoginInput } from '@/components/forms/login';
import { cookies } from 'next/headers';
import { encrypt } from './auth';

export async function login(formData: LoginInput) {
  // Verify credentials && get the user

  const user = {
    email: formData.email,
    password: formData.password,
  };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
}
