"use client";
import { Container, Flex, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface NewMessageProps {}

const NewMessage: FC<NewMessageProps> = (props) => {
  return (
    <Flex width="100%" height="100vh" flexDirection="column" padding="1rem">
      <Flex alignItems="center" justifyContent="center" gap="1">
        <Text>To: </Text>
        <Input
          value=""
          size='md'
          autoFocus
          onChange={() => {}}
        />
      </Flex>
    </Flex>
  );
};

export default NewMessage;
