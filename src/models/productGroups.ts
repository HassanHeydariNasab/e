import { db } from "@db";
import type { ProductGroup } from "@types";

export const ProductGroupsCollection =
  db.collection<ProductGroup>("productGroups");
