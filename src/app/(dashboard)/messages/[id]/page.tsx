import React from "react";
import { Flex } from "@chakra-ui/react";
import Messages from "@/components/Messages";

const Chat = async ({ params }: { params: { id: string } }) => {
  return (
    <Flex color="white" width="100%" height="100%">
      {params.id === "new" ? ( <Messages.NewMessage />  ) : ( <Messages.Messages id={params.id} /> )}
    </Flex>
  );
};

export default Chat;
