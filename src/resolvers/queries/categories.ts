import { Permission } from "@types";
import type { QueryResolvers } from "@types";
import { CategoriesCollection } from "@models";

export const categories: QueryResolvers["categories"] = async (
  _,
  __,
  { permissions }
) => {
  let filter = {};
  if (!permissions || !permissions.includes(Permission.Admin)) {
    filter = { isHidden: { $exists: false } };
  }
  const categories = await CategoriesCollection.find(filter).toArray();
  return categories;
};
