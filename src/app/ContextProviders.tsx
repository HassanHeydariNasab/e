"use client";

import type { FC, PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Toaster } from "react-hot-toast";

let token: string | null;

const setAuthorizationLink = setContext((operation, prevContext) => {
  if (token) return token;
  token = localStorage.getItem("token");
  return { headers: { authorization: token } };
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
