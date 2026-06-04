import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, "Topic must be at least 4 characters long")
    .max(100, "Topic cannot exceed 100 characters")
    .transform((value) => value.trim().replace(/\s+/g, " ")),

  type: z.enum(["mcq", "open_ended"]),

  amount: z.coerce
    .number()
    .int("Amount must be a whole number")
    .min(1, "At least 1 question is required")
    .max(20, "Maximum 20 questions allowed"),
});