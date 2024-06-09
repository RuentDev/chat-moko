"use client";

import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import HeaderMessage from "./Components/HeaderMessage";
import InputMessage from "./Components/InputMessage";
import MessageOptions from "./Components/MessageOptions";
import { useQuery } from "@apollo/client";
import MessagesWrapper from "./Components/MessagesWrapper";
import MessageOperations from "@/graphql/operations/message";
import ConversationOperations from "@/graphql/operations/conversation";
import { useSelector } from "react-redux";
import { RootState } from "@/app-redux/store";

interface MessagesProps {
  id: string;
}

const Messages: FC<MessagesProps> = (props) => {
  const isMessageOptionsOpen = useSelector( (state: RootState) => state.navigation.isMessageOptionsOpen);

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
        return Object.assign({}, prev, {  ...prev, messages: [newFeedItem, ...prev.messages]});
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
    <Flex width="100%" height="100%">
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
      {isMessageOptionsOpen && (
        <Flex>
          <MessageOptions />
        </Flex>
      )}
      </Flex>
  );
};

export default Messages;
