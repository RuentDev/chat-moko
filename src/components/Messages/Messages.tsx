"use client"

import { Center, Flex, Spinner } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import HeaderMessage from "./Components/HeaderMessage";
import InputMessage from "./Components/InputMessage";
import { useQuery } from "@apollo/client";
import MessageOperations from '@/graphql/operations/message'
import { useParams } from "next/navigation";
import MessagesWrapper from "./Components/MessagesWrapper";

interface MessagesProps {
};

const Messages:FC<MessagesProps> = (props) => {

  const params = useParams()

  const {data, error, loading, subscribeToMore} = useQuery(MessageOperations.Queries.messages, 
    {
      variables:{
        conversationId: params && params.id ? params.id : ""
      }
    }
  )

  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
      updateQuery: (prev, {subscriptionData}) => {
        if(!subscriptionData.data) return prev
        const newFeedItem =   subscriptionData.data.messageSent
        return Object.assign({}, prev, {  ...prev , messages: [newFeedItem, ...prev.messages]})
      }
    })
  }

  /*
    Execute subcription
  */ 
  useEffect(() => {

    subscribeToNewMessages()

    return () => {

    }
  }, [])

  if(!data && loading){
    return(
      <Center width="100%" height="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }
  
  return (
    <Flex width="100%" height="100vh" flexDirection="column">
      {/* TOP */} 
      <HeaderMessage  />
        {data && <MessagesWrapper messages={data.messages} />}
      <InputMessage />
    </Flex>
  )
};

export default Messages;