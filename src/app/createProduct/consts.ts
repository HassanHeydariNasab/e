import * as yup from "yup";

export const productGroupFormSchema = yup.object({
  name: yup.string().min(1, "Name is required"),
});

export type ProductGroupFormSchema = yup.InferType<
  typeof productGroupFormSchema
>;

export const productFormSchema = yup.object({
  attributeValues: yup
    .array()
    .of(
      yup.object({
        name: yup.string(),
        value: yup.string().required("Attribute value is requierd."),
      })
    ),
  defaultImageId: yup.string().length(24, "Select a valid item."),
  imageIds: yup.array().of(yup.string().length(24, "Select a valid item.")),
  name: yup.string().min(1, "Name is required"),
  price: yup
    .number()
    .min(0, "Price could not be negative.")
    .typeError("Price is required."),
  productGroupId: yup.string().min(24, "Product group is required"),
});

export type ProductFormSchema = yup.InferType<typeof productFormSchema>;
