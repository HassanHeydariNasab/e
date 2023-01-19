import * as yup from "yup";

export const sortOptions = [
  {
    label: "Most Recent",
    value: JSON.stringify({ createdAt: -1 }),
  },
  { label: "Oldest", value: JSON.stringify({ createdAt: 1 }) },
];

export const productsFilterFormSchema = yup.object({
  sort: yup.string().oneOf(sortOptions.map((sortOption) => sortOption.value)),
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
