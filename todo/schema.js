import {z} from "zod";

export const createTodoSchema = z.object({
    title: z.string(),
    description: z.string().min(3),
    status: z.enum(["pending", "completed", "in-progress"]),
});

export const updateTodoSchema = z.object({
    title: z.string().optional(),
    description: z.string().min(3).optional(),
    status: z.enum(["pending", "completed", "in-progress"]).optional(),
});