import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  searchQuerySchema,
  signInSchema,
  signUpSchema,
} from "../schema/userSchema";
import { extractValidationErrors } from "../helpers/schemaError";
import AppResponse from "../helpers/AppResponse";
import { createChatSchema } from "../schema/chatSchema";

function createValidationMiddleware(
  schema: z.ZodObject<any, any, any> | z.ZodString
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const validationErrors = extractValidationErrors(error);
        next(new AppResponse(validationErrors, null, 400));
      }
    }
  };
}
export const validateSignUp = createValidationMiddleware(signUpSchema);
export const validateSignIn = createValidationMiddleware(signInSchema);
export const validateUserChat = createValidationMiddleware(createChatSchema);
