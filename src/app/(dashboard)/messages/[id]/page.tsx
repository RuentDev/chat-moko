import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import Messages from "@/components/Messages";

const Chat = async ({ params }: { params: { id: string } }) => {
  return (
    <Flex color="white" width="100%" height="100%">
      {params.id === "new" ? (
        
        <Messages.NewMessage />

      ) : (
       
         <Flex width={"100%"} height={"100%"}>
          <Messages.Messages id={params.id} />
          {/* <Messages.ChatSettings /> */}
         </Flex>
      )}
    </Flex>
  );
};

export default Chat;
