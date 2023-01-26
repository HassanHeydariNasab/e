import * as yup from "yup";

export const attributeOptionsFormSchema = yup.mixed();
export type AttributeOptionsFormSchema = yup.InferType<
  typeof attributeOptionsFormSchema
>;
