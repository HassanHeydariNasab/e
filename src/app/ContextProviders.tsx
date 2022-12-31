"use client";

import type { FC, PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Toaster } from "react-hot-toast";

export const tokenVar = makeVar<string | null>(localStorage.getItem("token"));

const setAuthorizationLink = setContext((operation, prevContext) => {
  if (tokenVar()) {
    return { headers: { authorization: tokenVar() } };
  }
  const savedToken = localStorage.getItem("token");
  tokenVar(savedToken);
  return { headers: { authorization: savedToken } };
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([setAuthorizationLink, httpLink]),
  });
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <Toaster />
    </ApolloProvider>
  );
};

export default ContextProviders;
