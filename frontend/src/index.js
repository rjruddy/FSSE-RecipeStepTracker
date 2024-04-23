import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from '@apollo/client';

import App from "./App";

const client = new ApolloClient({
    uri: "/graphql/",
    cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('app'));

root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App /> 
      </ApolloProvider>
    </StrictMode>
);
