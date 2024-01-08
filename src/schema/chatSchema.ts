import { z } from "zod";

export const createChatSchema = z.object({
  recipientId: z
    .string()
    .trim()
    .refine((data) => data.length > 0, { message: "recipient id is required" }),
});

export const createGroupSchema = z.object({
  recipientId: z
    .string()
    .trim()
    .refine((data) => data.length > 0, { message: "recipient id is required" }),
  groupName: z
    .string()
    .trim()
    .refine((data) => data.length > 0, {
      message: "group name id is required",
    }),
});
