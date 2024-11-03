import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(4000).catch(4000),
  })
  .parse(import.meta.env);
