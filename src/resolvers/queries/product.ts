import type { Filter } from "mongodb";
import { GraphQLError } from "graphql";

import { Permission } from "@types";
import type { QueryResolvers, Product } from "@types";
import { ProductsCollection } from "@models";

export const product: QueryResolvers["product"] = async (
  _,
  { productId },
  { permissions }
) => {
  const modifiedFilter: Filter<Omit<Product, "_id">> = { _id: productId };

  if (
    !permissions ||
    !(
      permissions.includes(Permission.Admin) ||
      permissions.includes(Permission.Product)
    )
  ) {
    modifiedFilter["isHidden"] = { $exists: false };
  }

  const product = await ProductsCollection.findOne(modifiedFilter);

  if (!product) {
    throw new GraphQLError("Product not found", {
      extensions: { http: { status: 404 } },
    });
  }

  return product;
};
