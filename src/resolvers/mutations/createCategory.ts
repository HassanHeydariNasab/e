import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";

import { MutationResolvers, Permission } from "@types";
import { CategoriesCollection } from "@models";

export const createCategory: MutationResolvers["createCategory"] = async (
  _,
  { input: { name, parentId } },
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
    (await CategoriesCollection.countDocuments({
      _id: new ObjectId(parentId),
    })) !== 1
  ) {
    throw new GraphQLError("Category with this parentId doesn't exist.");
  }

  const { insertedId } = await CategoriesCollection.insertOne({
    name,
    parentId,
  });
  const category = await CategoriesCollection.findOne({ _id: insertedId });
  if (category === null) {
    throw new GraphQLError("Failed to create categroy.");
  }
  return category;
};
