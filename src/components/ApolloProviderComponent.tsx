"use client"
import { client } from '@/apollo/apolloClient'
import { ApolloProvider } from '@apollo/client'
import React from 'react'

const ApolloProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloProviderComponent
