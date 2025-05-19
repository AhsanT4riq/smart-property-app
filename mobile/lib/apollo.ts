// mobile/lib/apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

// Your backend GraphQL API URL
const API_URL = "http://localhost:4000";

// Create the HTTP link to your GraphQL API
const httpLink = createHttpLink({
  uri: API_URL,
});

// Auth link for adding token to requests
const authLink = setContext(async (_, { headers }) => {
  // Get the token from secure storage
  const token = await SecureStore.getItemAsync("clerk-session");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
