import { GraphQLError } from "graphql";

import { Permission, Product } from "@types";
import type { MutationResolvers } from "@types";
import { ProductsCollection } from "@models";

export const createProduct: MutationResolvers["createProduct"] = async (
  _,
  {
    input: {
      name,
      categoryId,
      price,
      productGroupId,
      attributeValues,
      imageIds,
      defaultImageId,
      quantity,
    },
  },
  { permissions }
) => {
  if (
    !permissions ||
    !(
      permissions.includes(Permission.Admin) ||
      permissions.includes(Permission.Product)
    )
  ) {
    throw new GraphQLError("Permission denied.", {
      extensions: { http: { status: 403 } },
    });
  }

  if ((await ProductsCollection.countDocuments({ name })) !== 0) {
    throw new GraphQLError("Product with this name already exists.");
  }

  const { insertedId } = await ProductsCollection.insertOne({
    attributeValues,
    createdAt: new Date(),
    defaultImageId,
    imageIds,
    name,
    categoryId,
    price,
    productGroupId,
    quantity,
    description: "some description",
  });
  const product = await ProductsCollection.findOne({
    _id: insertedId,
  });
  if (product === null) {
    throw new GraphQLError("Failed to create Product.");
  }
  return product;
};
