import { z } from "zod";

const schema = z.object({
  name: z.string(),
  sandwich: z.object({
    bread: z.string(),
  }),
});

export type EditSandwichValues = z.infer<typeof schema>;
