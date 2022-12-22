import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import type { Resolvers } from "../../__generated__/resolvers-types";

const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
  },
};

const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
