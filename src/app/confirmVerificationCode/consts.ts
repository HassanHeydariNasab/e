import * as yup from "yup";

export const formSchema = yup.object({
  verificationCode: yup
    .string()
    .matches(/^\d{5}$/, "Verification code is invalid"),
});

export type FormSchema = yup.InferType<typeof formSchema>;
