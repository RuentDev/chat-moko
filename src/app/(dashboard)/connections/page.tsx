
import { Container } from '@chakra-ui/react'
import React from 'react'

const Users = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())

  return (
    <Container
      maxW="100%"
      maxH="100%"
    >
      Connections
    </Container>
  )
}

export default Users
