import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { FC } from "react";

export const ApolloClientProvider: FC = ({ children }) => {
  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
