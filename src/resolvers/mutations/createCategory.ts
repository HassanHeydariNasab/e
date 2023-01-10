import { GraphQLError } from "graphql";

import { MutationResolvers, Permission } from "@types";
import { CategoriesCollection } from "@models";

export const createCategory: MutationResolvers["createCategory"] = async (
  _,
  { input: { name, parentId, attributeKeys } },
  { permissions }
) => {
  if (!permissions || !permissions.includes(Permission.Admin)) {
    throw new GraphQLError("Permission denied.", {
      extensions: { http: { status: 403 } },
    });
  }

  if ((await CategoriesCollection.countDocuments({ name })) !== 0) {
    throw new GraphQLError("Category with this name already exists.");
  }
  if (
    parentId &&
    (await CategoriesCollection.countDocuments({
      _id: parentId,
    })) !== 1
  ) {
    throw new GraphQLError("Category with this parentId doesn't exist.");
  }

  const { insertedId } = await CategoriesCollection.insertOne({
    name,
    parentId,
    attributeKeys,
  });
  const category = await CategoriesCollection.findOne({ _id: insertedId });
  if (category === null) {
    throw new GraphQLError("Failed to create categroy.");
  }
  return category;
};
