import { AttributeKind } from "@types";
import * as yup from "yup";

export const formSchema = yup
  .object({
    name: yup.string().min(1),
    attributeKeys: yup
      .array(
        yup.object({
          name: yup.string().min(1, "Attribute name is required."),
          kind: yup
            .string()
            .matches(
              new RegExp(`^${AttributeKind.Number}|${AttributeKind.String}$`),
              "Select a type for the attribute."
            ),
        })
      )
      .required(),
  })
  .strict();

export type FormSchema = yup.InferType<typeof formSchema>;
