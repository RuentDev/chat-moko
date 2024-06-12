'use client'
import SideBars from "@/components/Sidebars";
import { Conversation } from "@/utils/types";
import { Container, Flex, Hide, Show } from "@chakra-ui/react";
import React, { useState } from "react";

const MessagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const [showConversationContainer, setShowConversationContainer] = useState(false); 

  const handleSelectedConversationClick = (conversation: Conversation) => {
    // console.log("Selected conversation:", conversation);
    setShowConversationContainer(!showConversationContainer)
  };
  
  return (
    <Container p={0} m={0} maxW="100%" height="100%" borderLeft={0} border={0}>
      <Flex maxW="100%" height="100%">
        <SideBars.Conversations 
         selectedConversationClick={handleSelectedConversationClick}
         />

        {/* Hide the conversation of participants*/}
        {showConversationContainer ? (
          <Show below="md">
            <Container padding={0} border={0} maxW="100%" height="100vh">
              {children}
            </Container>
          </Show>
        ) : (
          <Hide below="md">
            <Container padding={0} border={0} maxW="100%" height="100vh">
              {children}
            </Container>
          </Hide>
        )}
      </Flex>
    </Container>
  );
};

export default MessagesLayout;
