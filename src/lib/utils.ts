import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => {
      return issue.message;
    });
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Something went wrong, please try again later.';
  }
}

export function catchError(err: unknown) {
  toast.error(getErrorMessage(err));
}

export function getInitials(name: string) {
  const words = name.split(' ');
  const firstNameInitial = words[0] ? words[0][0] : '';
  const lastNameInitial = words.length > 1 ? words[words.length - 1][0] : '';

  return `${firstNameInitial.toLocaleUpperCase()}${lastNameInitial.toLocaleUpperCase()}`;
}

export const getColorFromCssValue = (cssColor: string) => {
  const div = document.createElement('div');
  div.style.color = cssColor;
  document.body.appendChild(div);

  const computedColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);

  const hex = rgbToHex(computedColor);
  return hex;
};

export const rgbToHex = (rgb: string): string => {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
