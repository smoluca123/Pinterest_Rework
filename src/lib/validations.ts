import { z } from "zod";

const requiredString = z.string().min(1, "Required");

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

export const pinCreateSchema = z.object({
  name: requiredString,
  slug: requiredString,
  description: z.string().optional(),
  images: z
    .array(z.custom<File>())
    .refine((files) => files?.length > 0, "Files is required")
    .refine((files) => files?.length <= 5, "Max 5 files allowed")
    .refine((files) => {
      if (files) {
        return Array.from(files).every((file) =>
          file.type.startsWith("image/"),
        );
      }
      return true;
    }, "Only images are allowed"),
});

export const pinUpdateSchema = z.object({
  name: requiredString,
  slug: requiredString,
  description: z.string().optional(),
});

export type PinUpdateValues = z.infer<typeof pinUpdateSchema>;
export type PinCreateValues = z.infer<typeof pinCreateSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
