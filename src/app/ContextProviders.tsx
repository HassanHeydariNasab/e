"use client";

import type { FC, PropsWithChildren } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ContextProviders;
