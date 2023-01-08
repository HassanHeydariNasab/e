import { Permission } from "@types";
import type { QueryResolvers } from "@types";
import { ProductGroupsCollection } from "@models";

export const productGroups: QueryResolvers["productGroups"] = async (
  _,
  __,
  { permissions }
) => {
  let filter = {};
  if (
    !permissions ||
    !(
      permissions.includes(Permission.Admin) ||
      permissions.includes(Permission.Product)
    )
  ) {
    filter = { isHidden: { $exists: false } };
  }
  const productGroups = await ProductGroupsCollection.find(filter, {
    sort: { name: 1 },
  }).toArray();
  return productGroups;
};
