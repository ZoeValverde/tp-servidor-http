import { z } from "zod";

export const QuerySchema = z.object({
  filter: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});