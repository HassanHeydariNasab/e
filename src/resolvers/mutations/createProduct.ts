import { GraphQLError } from "graphql";

import { Permission } from "@types";
import type { MutationResolvers } from "@types";
import { ImagesCollection, ProductsCollection } from "@models";
import { imagePath } from "@services";

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
    },
  },
  { permissions }
) => {
  if (
    !permissions ||
    !permissions.includes(Permission.Admin) ||
    !permissions.includes(Permission.Product)
  ) {
    throw new GraphQLError("Permission denied.", {
      extensions: { http: { status: 403 } },
    });
  }

  if ((await ProductsCollection.countDocuments({ name })) !== 0) {
    throw new GraphQLError("Product with this name already exists.");
  }

  const defaultImage = await ImagesCollection.findOne({
    _id: defaultImageId,
  });
  if (defaultImage === null) {
    throw new GraphQLError("Default image doesn't exist.");
  }

  const { insertedId } = await ProductsCollection.insertOne({
    attributeValues,
    createdAt: new Date(),
    defaultImagePath: imagePath(defaultImage._id),
    imageIds,
    name,
    categoryId,
    price,
    productGroupId,
  });
  const product = await ProductsCollection.findOne({
    _id: insertedId,
  });
  if (product === null) {
    throw new GraphQLError("Failed to create Product.");
  }
  return product;
};
