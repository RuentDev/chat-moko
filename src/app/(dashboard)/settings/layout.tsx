import { Container, Flex } from "@chakra-ui/react";
import React from "react";


const MessagesLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Container 
      p={0} 
      m={0}
      maxW="100%"
      height="100%"
      borderLeft={0}
      border={0}
    >
    <Flex
      maxW="100%"
      height="100%"
    >
      {/* OTHER COMPONENT */}
      <Container 
        border={0}
        maxW='100%'
        height="100%"
      >
        {children}
      </Container>
     </Flex>
    </Container>
  );
};

export default MessagesLayout;
