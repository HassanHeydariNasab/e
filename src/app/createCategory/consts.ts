import { z } from "zod";

export const formSchema = z.object({
  name: z.string().regex(/^.+$/, "Name is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
