import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from "@apollo/client/utilities";
import { PrismaClient } from "@prisma/client";
import { createClient } from "graphql-ws";
import { getSession } from 'next-auth/react'

export let serverLink: string | undefined = ""

let prisma: any

if (!prisma) {
  prisma = new PrismaClient();
}




const MODE = process.env.NEXT_PUBLIC_SERVER_MODE
const STAGING = process.env.NEXT_PUBLIC_SERVER_API_STAGING_LINK
const DEVELOPMENT = process.env.NEXT_PUBLIC_SERVER_API_DEVELOPMENT_LINK
const PRODUCTION = process.env.NEXT_PUBLIC_SERVER_API_PRODUCTION_LINK

switch (MODE) {
  case "STAGING":
    serverLink = STAGING
    break;
  case "PRODUCTION":
    serverLink = PRODUCTION
    break;
  case "DEVELOPMENT":
    serverLink = DEVELOPMENT
    break;
  default:
    serverLink = DEVELOPMENT
    break;
}

const httpLink = new HttpLink({
  uri: `${serverLink}/graphql`,
  credentials: "include",
})

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
  url: `ws://localhost:4000/graphql`,
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


export { prisma };