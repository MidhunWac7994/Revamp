import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const authtoken = localStorage.getItem("liwan_auth_token");
  const token = JSON.parse(authtoken);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log("API Endpoint:", import.meta.env.VITE_API_ENDPOINT);

export default client;
