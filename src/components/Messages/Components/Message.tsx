import { getMessageSentTime } from "@/utils";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { FC } from "react";
import * as types from "@/utils/types";

interface MessageProps {
  message: types.Message;
  session: Session | null;
}

const isUserSender = (userId?: string, message?: any) => {
  if (userId && message && message?.senderId === userId) {
    return true;
  } else {
    return false;
  }
};

const Message: FC<MessageProps> = ({ message, session }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems={`${
        isUserSender(session?.user.id, message) ? "end" : "start"
      }`} // Change this
      justifyContent="end"
      padding="1rem"
      gap="2"
    >
      <Flex
        gap="3"
        flexDirection={`${
          isUserSender(session?.user.id, message) ? "row" : "row-reverse"
        }`}
      >
        <Flex
          gap="3"
          alignItems="end"
          justifyContent="end"
          flexDirection={`${
            isUserSender(session?.user.id, message) ? "row-reverse" : "row"
          }`}
        >
          <Text as={"p"} fontSize="sm">
            {message.user.name}
          </Text>
          <Text as={"p"} fontSize="xs">
            {getMessageSentTime(message.createdAt)}
          </Text>
        </Flex>

        <Avatar
          size="sm"
          name={message.user.name || ""}
          src={message.user.image || ""}
        />
      </Flex>
      <Text
        as="p"
        bg="blue.400"
        fontSize="sm"
        padding="1rem"
        borderRadius="10px"
        maxWidth="70%"
      >
        {message.content}
      </Text>
    </Flex>
  );
};

export default Message;
