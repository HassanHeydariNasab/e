"use client";

import type { FC, PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
  ServerParseError,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { toast, Toaster } from "react-hot-toast";

//export const tokenVar = makeVar<string | null>(localStorage.getItem("token"));
export const tokenVar = makeVar<string | null>(null);

const setAuthorizationLink = setContext((operation, prevContext) => {
  if (tokenVar()) {
    return { headers: { authorization: tokenVar() } };
  }
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    tokenVar(savedToken);
    return { headers: { authorization: savedToken } };
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    // TODO global error handler (showing a toast, etc)
    // console.log({ graphQLErrors });
    toast.error(graphQLErrors[0].message);
  }
  if (networkError) {
    if ((networkError as ServerParseError)?.statusCode === 401) {
      window.localStorage.removeItem("token");
    }
  }
});

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, setAuthorizationLink, httpLink]),
    connectToDevTools: true,
  });
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <Toaster />
    </ApolloProvider>
  );
};

export default ContextProviders;
