import * as yup from "yup";

export const productsFilterFormSchema = yup.object({
  sort: yup.string(),
  attributeValues: yup.array(
    yup.object({
      name: yup.string().required(),
      value: yup.string(),
    })
  ),
});

export type ProductsFilterFormSchema = yup.InferType<
  typeof productsFilterFormSchema
>;
