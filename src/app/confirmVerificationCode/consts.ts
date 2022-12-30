import { z } from "zod";

export const formSchema = z.object({
  verificationCode: z.string().regex(/^\d{5}$/, "Verification code is invalid"),
});

export type FormSchema = z.infer<typeof formSchema>;
