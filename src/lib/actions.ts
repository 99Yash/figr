'use server';

import { LoginInput } from '@/components/forms/login';
import { SignupInput } from '@/components/forms/signup';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { encrypt } from './auth';
import { db } from './db';

export async function signup(formData: SignupInput) {
  const user = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userExists = await db.user.findUnique({
    where: { email: user.email },
  });

  if (userExists) {
    throw new Error('Email already exists');
  }

  await db.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  const expires = new Date(Date.now() + 45 * 60 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set('session', session, { expires, httpOnly: true });

  return;
}

export async function login(formData: LoginInput) {
  try {
    const userExists = await db.user.findUnique({
      where: { email: formData.email },
      select: {
        name: true,
        password: true,
      },
    });

    if (!userExists) {
      throw new Error('Invalid email or password');
    }

    const passwordIsCorrect = await bcrypt.compare(
      formData.password,
      userExists.password
    );

    if (!passwordIsCorrect) {
      throw new Error('Invalid email or password');
    }

    const expires = new Date(Date.now() + 45 * 60 * 1000);
    const session = await encrypt({
      user: {
        email: formData.email,
        password: formData.password,
        name: userExists.name,
      },
      expires,
    });

    cookies().set('session', session, { expires, httpOnly: true });
  } catch (e) {
    throw new Error('Invalid email or password');
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}
