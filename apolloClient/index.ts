import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const enchancedFetch = (url: string, init: RequestInit): Promise<Response> => {
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response);
};

const httpLink = createHttpLink({
  uri: `${process.env.PORT}/api/graphql`,
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
  fetch: enchancedFetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
