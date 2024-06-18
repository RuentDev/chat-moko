import React from "react";
import { Flex } from "@chakra-ui/react";
import Messages from "@/components/Messages";
import { auth } from "@/auth";

const Chat = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  return (
    <Flex 
      color="white" 
      width="100%" 
      height="100%"
    >
      {params.id === "new" ? ( 
        <Messages.NewMessage />  
      ) : ( 
        <Messages.Messages 
          id={params.id} 
          session={session} 
        /> 
      )}
    </Flex>
  );
};

export default Chat;
