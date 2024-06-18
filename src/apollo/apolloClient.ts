import { ApolloClient, HttpLink, InMemoryCache, split, from } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";


const PROTOCOL = process.env.NEXT_PUBLIC_SERVER_PROTOCOL
const WS_PROTOCOL = process.env.NEXT_PUBLIC_SERVER_WS_PROTOCOL
const SERVER_LINK = process.env.NEXT_PUBLIC_SERVER_API_LINK

const httpLink = new HttpLink({
  uri: `${PROTOCOL}${SERVER_LINK}/graphql`,
  credentials: "include"
});


const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `${WS_PROTOCOL}${SERVER_LINK}/graphql`,
          connectionParams: async () => {
            const session = await getSession();
            return {
              session: session,
            }
          },
        })
      )
    : null;

const authLink = setContext( async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const session = await getSession()
  // const secret = process.env.NEXT_PUBLIC_SESSION_SECRET as string

  const token = `${document.cookie}`
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "Authorization": token ? `Bearer ${token}` : "",
    },
  };
});

const httpAuthLink = from([authLink, httpLink]);

const link =  typeof window !== "undefined" && wsLink !== null ? 
  split( ({ query }) => {
      const difinition = getMainDefinition(query);
      return (
        difinition.kind === "OperationDefinition" &&
        difinition.operation === "subscription"
      );
    },
    wsLink,
    httpAuthLink
  )
  : httpLink;

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
