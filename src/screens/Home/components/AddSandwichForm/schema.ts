import { z } from "zod";

export const addSandwichSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Sandwich name have to contain at least one character",
  }),
});

export type AddSandwichValues = z.infer<typeof addSandwichSchema>;
