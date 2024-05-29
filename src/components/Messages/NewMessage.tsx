"use client";
import { Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";

interface NewMessageProps {}

const NewMessage: FC<NewMessageProps> = (props) => {
  const [addUserInput, setAddUserInout] = React.useState("");
  const [addUsers, setAddUsers] = React.useState<string[]>([]);

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddUserInout(value)
  }

  return (
    <Flex width="100%" height="100vh" flexDirection="column" padding="1rem">
      <form action="">
        <Flex alignItems="center" justifyContent="center" gap="1">
          <Text width="auto">To: asdasd</Text>
          <Input
            value={addUserInput}
            size='md'
            autoFocus
            type="text"
            onChange={handleUserInputChange}
            // border={"none"}
            // outline={"none"}
          />
        </Flex>
      </form>
    </Flex>
  );
};

export default NewMessage;
