import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addPadToNumber = (number: number, padLength: number) => {
  return number.toString().padStart(padLength, '0');
};

export const formatRelativeDate = (from: Date) => {
  const currentDate = new Date();

  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true, locale: vi });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'MMM d', { locale: vi });
    } else {
      return formatDate(from, 'MMM d, yyyy', { locale: vi });
    }
  }
};
