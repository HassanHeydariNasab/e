import type { Filter } from "mongodb";
import { GraphQLError } from "graphql";

import { Permission } from "@types";
import type { QueryResolvers, Product } from "@types";
import { ProductsCollection } from "@models";

export const productsInProductGroup: QueryResolvers["productsInProductGroup"] =
  async (_, { productId }, { permissions }) => {
    const modifiedFilterForProduct: Filter<Omit<Product, "_id">> = {
      _id: productId,
    };
    const modifiedFilterForProducts: Filter<Omit<Product, "_id">> = {};

    if (
      !permissions ||
      !(
        permissions.includes(Permission.Admin) ||
        permissions.includes(Permission.Product)
      )
    ) {
      modifiedFilterForProduct["isHidden"] = { $exists: false };
      modifiedFilterForProducts["isHidden"] = { $exists: false };
    }

    const product = await ProductsCollection.findOne(modifiedFilterForProduct);

    if (!product) {
      throw new GraphQLError("Product not found", {
        extensions: { http: { status: 404 } },
      });
    }

    modifiedFilterForProducts["productGroupId"] = product.productGroupId;

    const products = await ProductsCollection.find(
      modifiedFilterForProducts
    ).toArray();

    return products;
  };
