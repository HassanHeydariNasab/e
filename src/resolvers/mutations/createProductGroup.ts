import { GraphQLError } from "graphql";

import { Permission } from "@types";
import type { MutationResolvers } from "@types";
import { ProductGroupsCollection } from "@models";

export const createProductGroup: MutationResolvers["createProductGroup"] =
  async (_, { input: { name } }, { permissions }) => {
    if (
      !permissions ||
      !permissions.includes(Permission.Admin) ||
      !permissions.includes(Permission.Product)
    ) {
      throw new GraphQLError("Permission denied.", {
        extensions: { http: { status: 403 } },
      });
    }

    if ((await ProductGroupsCollection.countDocuments({ name })) !== 0) {
      throw new GraphQLError("Product Group with this name already exists.");
    }

    const { insertedId } = await ProductGroupsCollection.insertOne({
      name,
    });
    const productGroup = await ProductGroupsCollection.findOne({
      _id: insertedId,
    });
    if (productGroup === null) {
      throw new GraphQLError("Failed to create Product Group.");
    }
    return productGroup;
  };
