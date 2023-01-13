import type { Filter, FindOptions } from "mongodb";

import { Permission, Product } from "@types";
import type { QueryResolvers } from "@types";
import { CategoriesCollection, ProductsCollection } from "@models";
import { childrenCategories } from "@services";

export const products: QueryResolvers["products"] = async (
  _,
  { filter, options },
  { permissions }
) => {
  if (!filter) filter = {};
  if (!options) options = {};

  const modifiedFilter: Filter<Omit<Product, "_id">> = {
    ...(filter.categoryId && { categoryId: filter.categoryId }),
    ...(filter.productGroupId && { productGroupId: filter.productGroupId }),
    ...(filter.attributeValues && { attributeValues: filter.attributeValues }),
    ...(filter.isHidden && { isHidden: true }),
  };

  const modifiedOptions: FindOptions = {
    ...(options.skip && { skip: options.skip }),
    ...(options.limit ? { limit: options.limit } : { limit: 12 }),
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
    modifiedFilter["isHidden"] = { $exists: false };
  }

  const categories = await CategoriesCollection.find().toArray();

  const children = childrenCategories(filter.categoryId, categories);
  modifiedFilter.categoryId = { $in: children };

  const products = await ProductsCollection.find(
    modifiedFilter,
    modifiedOptions
  ).toArray();
  return products;
};
