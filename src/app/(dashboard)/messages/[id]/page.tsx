import React from "react";
import ChatSettings from "@/components/Messages/Components/ChatSettings";
import { Flex } from "@chakra-ui/layout";
import { Messages } from "@/components";

const Chat = async () => {

  return (
      <Flex color="white" width="100%" height="100vh">
        <Messages />
        {/* CHAT SETTINGS RIGHT SIDE */}
      </Flex>
  );
};

export default Chat;

//<ChatSettings /> 