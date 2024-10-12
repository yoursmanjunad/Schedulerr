import { z } from "zod";
export const usernameSchema = z.object({
    username: z.string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username can't be more than 20 characters" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" }),
  });