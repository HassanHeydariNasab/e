import type { Filter, FindOptions } from "mongodb";

import { Permission, ProductGroup } from "@types";
import type { QueryResolvers } from "@types";
import { ProductGroupsCollection } from "@models";

export const productGroups: QueryResolvers["productGroups"] = async (
  _,
  { filter, options },
  { permissions }
) => {
  if (!filter) filter = {};
  if (!options) options = {};

  console.log({ filter, options });

  const modifiedFilter: Filter<Omit<ProductGroup, "_id">> = {
    ...(filter.categoryId && { categoryId: filter.categoryId }),
    ...(filter.isHidden
      ? { isHidden: true }
      : { isHidden: { $exists: false } }),
  };

  const modifiedOptions: FindOptions = {
    ...(options.skip && { skip: options.skip }),
    ...(options.limit && { limit: options.limit }),
    ...(options.sort
      ? { sort: options.sort as FindOptions["sort"] }
      : { sort: { createdAt: -1 } }),
  };
  if (
    !permissions ||
    !(
      permissions.includes(Permission.Admin) ||
      permissions.includes(Permission.Product)
    )
  ) {
    modifiedFilter.isHidden = { $exists: false };
  }
  const productGroups = await ProductGroupsCollection.find(
    modifiedFilter,
    modifiedOptions
  ).toArray();
  return productGroups;
};
