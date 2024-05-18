import React from "react";
import ChatSettings from "@/components/Messages/Components/ChatSettings";
import { Flex } from "@chakra-ui/layout";
import { Messages } from "@/components";

const Chat = async ({ params }: { params: { id: string } }) => {
  return (
    <Flex color="white" width="100%" height="100vh">
      <Messages id={params.id} />

      <ChatSettings />
    </Flex>
  );
};

export default Chat;
