"use client";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HeaderMessage from "./Components/HeaderMessage";
import Inputs from "@/components/Inputs";
import MessageOptions from "./Components/MessageOptions";
import { useQuery } from "@apollo/client";
import MessagesWrapper from "./Components/MessagesWrapper";
import MessageOperations from "@/graphql/operations/message";
import ConversationOperations from "@/graphql/operations/conversation";
import { Session } from "next-auth";
import { useCookies } from "next-client-cookies";
import { usePathname } from "next/navigation";

interface MessagesProps {
  id: string;
  session?: Session | null;
}

const Messages = ({ id, session }: MessagesProps) => {
  // const isMessageOptionsOpen = useSelector( (state: RootState) => state.navigation.isMessageOptionsOpen);
  const pathname = usePathname();
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsSmall, setShowOptionsSmall] = useState(false);
  const cookies = useCookies();
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  const {
    data: messages,
    loading: messageLoading,
    subscribeToMore,
  } = useQuery(MessageOperations.Queries.messages, {
    // context: {
    //   headers: {
    //     cookie:
    //   }
    // },
    variables: {
      conversationId: id,
    },
  });

  const { data: conversation, loading: conversationLoading } = useQuery(
    ConversationOperations.Queries.getConversation,
    {
      variables: {
        conversationId: id,
      },
    }
  );

  useEffect(() => {
  }, [isSmallScreen, pathname]);

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

  if (messageLoading && conversationLoading) {
    return null;
  }

  const handleOptionsClick = () => {
    const match = pathname.match(/\/messages\/([a-f0-9-]{36})$/);
    if (match && isSmallScreen) {
      setShowOptionsSmall(!showOptionsSmall);
    } else {
      setShowOptions(!showOptions);
    }
  };

  return (
    <Flex width="100%" height="100%">
      <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        display={{
          base: showOptionsSmall ? "none" : "block",
          sm: showOptionsSmall ? "none" : "block",
          md: "flex",
          lg: "flex",
        }}
      >
        <HeaderMessage
          participants={conversation?.getConversation?.participants}
          onOptionsClick={handleOptionsClick}
        />
        <MessagesWrapper
          messages={messages.messages}
          participants={conversation?.getConversation?.participants}
        />
        <Inputs.InputMessage
          conversationId={id}
          user={session?.user}
          participants={conversation?.getConversation?.participants}
        />
      </Flex>
      {(showOptionsSmall || showOptions) && (
        <MessageOptions
          participants={conversation?.getConversation?.participants}
        />
      )}
    </Flex>
  );
};

export default Messages;
