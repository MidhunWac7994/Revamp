import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`,
  cache: new InMemoryCache(),
});

// console.log("API Endpoint:", import.meta.env.VITE_API_ENDPOINT);

export default client;
