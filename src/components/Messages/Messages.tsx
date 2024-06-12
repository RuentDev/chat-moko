"use client";
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import HeaderMessage from "./Components/HeaderMessage";
import Inputs from "@/components/Inputs";
import MessageOptions from "./Components/MessageOptions";
import { useQuery } from "@apollo/client";
import MessagesWrapper from "./Components/MessagesWrapper";
import MessageOperations from "@/graphql/operations/message";
import ConversationOperations from "@/graphql/operations/conversation";
import { Session } from "next-auth";
import { useCookies } from 'next-client-cookies';

interface MessagesProps {
  id: string;
  session?: Session | null
}

const Messages = ({id, session}: MessagesProps) => {
  // const isMessageOptionsOpen = useSelector( (state: RootState) => state.navigation.isMessageOptionsOpen);

  const cookies = useCookies()
  const { data: messages,  loading: messageLoading,  subscribeToMore } = useQuery(MessageOperations.Queries.messages, {
    // context: {
    //   headers: {
    //     cookie: 
    //   }
    // },
    variables: {
      conversationId: id,
    }
  });

  const { data: conversation , loading: conversationLoading } = useQuery(ConversationOperations.Queries.getConversation, {
      variables: {
        conversationId: id,
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

  if (messageLoading && conversationLoading) {
    return null
  }

  return (
    <Flex width="100%" height="100%">
      <Flex width="100%" height="100%" flexDirection="column">
        <HeaderMessage 
          participants={conversation?.getConversation?.participants} 
        />
        <MessagesWrapper
          messages={messages.messages}
          participants={conversation?.getConversation?.participants}
        />
        <Inputs.InputMessage conversationId={id} user={session?.user} participants={conversation?.getConversation?.participants}/>
      </Flex>
      <MessageOptions participants={conversation?.getConversation?.participants} />
    </Flex>
  );
};

export default Messages;
