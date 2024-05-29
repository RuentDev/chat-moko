import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

export let serverLink: string | undefined = "";

const MODE = process.env.NODE_ENV;
const STAGING = process.env.NEXT_PUBLIC_SERVER_API_STAGING_LINK;
const DEVELOPMENT = process.env.NEXT_PUBLIC_SERVER_API_DEVELOPMENT_LINK;
const PRODUCTION = process.env.NEXT_PUBLIC_SERVER_API_PRODUCTION_LINK;

switch (MODE) {
  case "test":
    serverLink = STAGING;
    break;
  case "production":
    serverLink = PRODUCTION;
    break;
  case "development":
    serverLink = DEVELOPMENT;
    break;
  default:
    serverLink = DEVELOPMENT;
    break;
}

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}${serverLink}/graphql`,
  credentials: "include",
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   console.log(token, "token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `${process.env.NEXT_PUBLIC_SERVER_WS_PROTOCOL}${serverLink}/graphql`,
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const difinition = getMainDefinition(query);
          return (
            difinition.kind === "OperationDefinition" &&
            difinition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
