import { z } from "zod";
const booleanLike = z.union([
    z.boolean(),
    z.enum(["true", "false"]).transform((value) => value === "true"),
]);
export const projectQuerySchema = z.object({
    category: z.string().optional(),
    featured: booleanLike.optional(),
    openSource: booleanLike.optional(),
    search: z.string().optional(),
});
export const courseQuerySchema = z.object({
    category: z.string().optional(),
    featured: booleanLike.optional(),
    level: z.string().optional(),
    search: z.string().optional(),
});
export const perkQuerySchema = z.object({
    category: z.string().optional(),
    verified: booleanLike.optional(),
    search: z.string().optional(),
});
