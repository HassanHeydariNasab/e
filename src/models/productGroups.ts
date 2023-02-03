import { db } from "@db";
import type { ProductGroup, ProductGroupModel } from "@types";

export const ProductGroupsCollection =
  db.collection<Omit<ProductGroup, "_id">>("productGroups");
