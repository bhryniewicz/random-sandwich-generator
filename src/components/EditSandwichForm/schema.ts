import { z } from "zod";

const sauceType = z.enum(["vege", "mayo"]);

export const sandwichSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Sandwich name have to contain at least one character",
  }),
  sandwich: z.object({
    bread: z
      .object({
        _id: z.string(),
        name: z.string(),
        flour: z.string(),
      })
      .required(),
    ingredients: z
      .array(
        z.object({
          _id: z.string(),
          name: z.string(),
        })
      )
      .min(1, {
        message: "At least one product must be chosen for your sandwich",
      })
      .max(3, {
        message: "You can choose up to 3 products for your sandwich",
      }),
    sauce: z
      .object({
        _id: z.string(),
        name: z.string(),
        type: sauceType,
      })
      .required(),
  }),
});

export type EditSandwichValues = z.infer<typeof sandwichSchema>;
