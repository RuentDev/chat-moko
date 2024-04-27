import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from 'next-auth/react'

export let serverLink: string | undefined = ""

switch (process.env.NEXT_PUBLIC_SERVER_MODE) {
  case "STAGING":
    serverLink = process.env.NEXT_PUBLIC_SERVER_API_STAGING_LINK
    break;
  case "PRODUCTION":
    serverLink = process.env.NEXT_PUBLIC_SERVER_API_PRODUCTION_LINK
    break;
  case "DEVELOPMENT":
    serverLink = process.env.NEXT_PUBLIC_SERVER_API_DEVELOPMENT_LINK
    break;
  default:
    serverLink = process.env.NEXT_PUBLIC_SERVER_API_STAGING_LINK
    break;
}




const httpLink = new HttpLink({
  uri: `${serverLink}/graphql`,
  credentials: "include",
})

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
  url: `ws://localhost:4000/graphql/subscriptions`,
  connectionParams: async () => ({
    session: await getSession(),
  }),
})) : null;

const link = typeof window !== 'undefined' && wsLink !== null ? split(({ query }) => {
  const difinition = getMainDefinition(query);
  return (
    difinition.kind === 'OperationDefinition' && difinition.operation === 'subscription'
  )
}, wsLink, httpLink) : httpLink



export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})
