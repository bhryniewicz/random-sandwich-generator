import { z } from "zod";

const sauceType = z.enum(["vege", "mayo"]);

export const editFormSchema = z.object({
  name: z.string().min(1),
  sandwich: z.object({
    bread: z.object({
      _id: z.string(),
      name: z.string(),
      flour: z.string(),
    }),
    ingredients: z.array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    ),
    sauce: z.object({
      _id: z.string(),
      name: z.string(),
      type: sauceType,
    }),
  }),
});

export type EditSandwichValues = z.infer<typeof editFormSchema>;
