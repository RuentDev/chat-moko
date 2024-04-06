import { ApolloClient, InMemoryCache } from "@apollo/client"

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


export const client = new ApolloClient({
  uri: `${serverLink}/graphql`,
  cache: new InMemoryCache(),
})
