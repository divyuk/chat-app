import { z } from "zod";

export const signUpSchema = z.object({
  fullname: z.string(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .refine((data) => data.length > 0, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .refine((data) => data.length > 0, { message: "Password is required" }),
  username: z
    .string()
    .trim()
    .refine((data) => data.length > 0, { message: "Username is required" }),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .refine((data) => data.length > 0, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .refine((data) => data.length > 0, { message: "Password is required" }),
});

export const searchQuerySchema = z.object({
  search: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: "Search term should be alphabetic",
    })
    .optional(),
});
