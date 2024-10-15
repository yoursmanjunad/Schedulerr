import { z } from "zod";
export const usernameSchema = z.object({
    username: z.string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username can't be more than 20 characters" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" }),
  });


  export const eventSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be 100 characters or less"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description must be 500 characters or less"),
    duration: z.number().int().positive("Duration must be a positive number"),
  
    isPrivate: z.boolean(),
  });
  
  export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    additionalInfo: z.string().optional(),
  });