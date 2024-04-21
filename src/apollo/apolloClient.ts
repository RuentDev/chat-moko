import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from 'graphql-ws'
export let serverLink: string | undefined = ""

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

const authLink = setContext((_: any, {headers}: any) => {
  return {
    headers: {
      ...headers,
      autorization: localStorage.getItem("token") || ""
    }
  }
});



const wsLink = new GraphQLWsLink(createClient({
  url: "ws://localhost:4000/graphql",
  // connectionParams: {
  //   authToken: 
  // }
}))

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const splitLink = split(({query}) => {
  const difinition = getMainDefinition(query)
  return (
    difinition.kind === "OperationDefinition" && difinition.operation === "subscription"
  )
}, 
  wsLink,
  authLink.concat(httpLink)
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
