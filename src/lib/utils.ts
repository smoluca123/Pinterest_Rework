import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addPadToNumber = (number: number, padLength: number) => {
  return number.toString().padStart(padLength, '0');
};
