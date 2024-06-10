"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import Message from "./Message";
import { useSession } from "next-auth/react";
import * as types from "@/utils/types";

interface MessagesWrapperProps {
  messages: types.Message[];
  participants: types.ConversationParticipant[];
}

const MessagesWrapper: React.FC<MessagesWrapperProps> = ({ messages }) => {
  const { data: session } = useSession();

  console.log(messages, session);

  return (
    <Flex
      flexDirection="column-reverse"
      gap={3}
      width="100%"
      height="100%"
      overflow="auto"
    >
      {messages &&
        messages.map((message, index) => (
          <Message
            key={`message${index}`}
            message={message}
            session={session}
          />
        ))}
    </Flex>
  );
};

export default MessagesWrapper;
