import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import Messages from "@/components/Messages";

const Chat = async ({ params }: { params: { id: string } }) => {
  return (
    <Flex color="white" width="100%" height="100%">
      {params.id === "new" ? (
        
        <Messages.NewMessage />

      ) : (
        <Container maxWidth={"100%"} maxHeight={"100%"} margin={10} padding={0}>
         <Flex width={"100%"} height={"100%"}>
          <Messages.Messages id={params.id} />
          {/* <Messages.ChatSettings /> */}
         </Flex>
        </Container>
      )}
    </Flex>
  );
};

export default Chat;
