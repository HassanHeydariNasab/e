import { AttributeType } from "@types";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().regex(/^.+$/, "Name is required"),
  attributeKeys: z.array(
    z.object({ name: z.string(), type: z.nativeEnum(AttributeType) })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
