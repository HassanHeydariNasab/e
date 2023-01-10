import * as yup from "yup";

export const formSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{5,20}$/, "Phone number is invalid")
    .required(),
});

export type FormSchema = yup.InferType<typeof formSchema>;
