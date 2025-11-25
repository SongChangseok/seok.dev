import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  completed: z.boolean().default(false),
  createdAt: z.string().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
