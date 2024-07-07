'use server';

import { ColorsFormData } from '@/components/forms/colors';
import { LoginInput } from '@/components/forms/login';
import { SignupInput } from '@/components/forms/signup';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { encrypt, getSession } from './auth';
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

  const dbUser = await db.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  await db.color.createMany({
    data: [
      {
        label: 'Primary',
        color: '#000000',
        userId: dbUser.id,
      },
      {
        label: 'Secondary',
        color: '#000000',
        userId: dbUser.id,
      },
      {
        label: 'Tertiary',
        color: '#000000',
        userId: dbUser.id,
      },
    ],
  });

  const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);
  const session = await encrypt({ user: dbUser, expires });

  cookies().set('session', session, { expires, httpOnly: true });

  return;
}

export async function login(formData: LoginInput) {
  try {
    const userExists = await db.user.findUnique({
      where: { email: formData.email },
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

    const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);
    const session = await encrypt({
      user: userExists,
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

export async function submitColor(formData: ColorsFormData) {
  const user = await getSession();

  if (!user) {
    throw new Error('You must be logged in to submit a color');
  }

  const colors = formData.colors.map((color) => ({
    id: color.id,
    label: color.label,
    color: color.color,
    userId: user.user.id,
  }));

  for (const color of colors) {
    await db.color.upsert({
      where: {
        id: color.id,
        userId: user.user.id,
      },
      update: {
        label: color.label,
        color: color.color,
      },
      create: {
        label: color.label,
        color: color.color,
        userId: user.user.id,
      },
    });
  }
}
