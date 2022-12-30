import { z } from "zod";

export const formSchema = z.object({
  phoneNumber: z.string().regex(/^\+?\d{5,20}$/, "Phone number is invalid"),
});

export type FormSchema = z.infer<typeof formSchema>;
