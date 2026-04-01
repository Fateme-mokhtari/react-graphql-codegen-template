import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const graphqlUrl =
  import.meta.env.VITE_GRAPHQL_URL ?? "https://rickandmortyapi.com/graphql";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: graphqlUrl }),
  cache: new InMemoryCache(),
});
