import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const DashboardLoading = () => {
  return (
   <Center
    w="100%"
    h="100%"
   >
    <Spinner size="md"/>
   </Center>
  )
}

export default DashboardLoading
