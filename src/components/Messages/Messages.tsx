"use client";

import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import HeaderMessage from "./Components/HeaderMessage";
import InputMessage from "./Components/InputMessage";
import { useQuery } from "@apollo/client";
import MessagesWrapper from "./Components/MessagesWrapper";
import MessageOperations from "@/graphql/operations/message";
import ConversationOperations from "@/graphql/operations/conversation";

interface MessagesProps {
  id: string;
}

const Messages: FC<MessagesProps> = (props) => {
  const {
    data: messages,
    loading,
    subscribeToMore,
  } = useQuery(MessageOperations.Queries.messages, {
    variables: {
      conversationId: props.id,
    },
  });

  const { data: conversation, loading: conversationLoading } = useQuery(
    ConversationOperations.Queries.getConversation,
    {
      variables: {
        conversationId: props.id,
      },
    }
  );

  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          ...prev,
          messages: [newFeedItem, ...prev.messages],
        });
      },
    });
  };

  /*
    Execute subcription
  */
  useEffect(() => {
    subscribeToNewMessages();

    return () => {};
  }, []);

  if (loading && conversationLoading) {
    return (
      <Center width="100%" height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
     <Flex width="100%" height="100%" flexDirection="column">
      {conversation && (
          <HeaderMessage
            participants={conversation.getConversation.participants}
          />
        )}
        {messages && conversation && (
          <>
            <MessagesWrapper
              messages={messages.messages}
              participants={conversation.getConversation.participants}
            />
            <InputMessage />
          </>
        )}
     </Flex>
  );
};

export default Messages;
