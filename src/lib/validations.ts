import { z } from 'zod';

const requiredString = z.string().min(1, 'Required');

export const signInSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export const signUpSchema = z.object({
  fullName: requiredString,
  email: requiredString.email(),
  age: z.coerce.number().int(),
  username: requiredString,
  password: requiredString,
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
