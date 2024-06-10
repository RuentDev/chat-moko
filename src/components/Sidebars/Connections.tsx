"use client";
import React from "react";
import {  Container, VStack } from "@chakra-ui/react";
// import SearchBox from "../Inputs/SearchBox";
import { useSession } from "next-auth/react";
import UserProfile from "../UserProfile/UserProfile";

interface ConnectionsProps{}

const Connections = ({}: ConnectionsProps) => {
  const {data: session} = useSession()
  // const { data, error, loading, subscribeToMore } = useQuery(ConvesationOperations.Queries.conversations);
  
  const handleConversationCardBtnClick = (conversation: any) => {
   
  };

  const handleAddConversationBtnClick = () => {
  
  };


  return (
    <Container
      w={390}
      h="100%"
      m={0}
      p={0}
      borderLeft={0}
      borderBottom={0}
      borderTop={0}
      position="relative"
    >
      <Container
        maxW="100%"
        border={0}
      >
        <UserProfile session={session} status="Active" />
      </Container>
      <Container
        maxW="100%"
        border={0}
      >
       {/* <SearchBox /> */}
      </Container>
      <Container border={0}>
        <VStack h="auto" w="100%" flexDirection="column" gap={5}>
          <UserProfile 
            status="Active"
            name="Kimberly Grace Alba"
          />
          <UserProfile 
            status="Active"
            name="Lee Ryan Garcia"
          />
          <UserProfile 
            status="Away"
            name="Hibino Kafka"
          />
          <UserProfile 
            status="Do not disturb"
            name="Gon Freecs"
          />
          <UserProfile 
            status="Away"
            name="Killua Zoldyc"
          />
          <UserProfile 
            status="Away"
            name="John Doe"
          />
          <UserProfile 
            status="Active"
            name="James Eng"
          />
          {/* {loading ? (
            <Center height="100%">
              <Spinner size="xl" />
            </Center>
          ) : (
            <UnorderedList padding={0} margin={0}>
              {data &&
                data.conversations.map(
                  (conversation: Conversation, index: number) => {
                    return (
                      <ConversationCardButton
                        index={index}
                        unreadCount={0}
                        isTyping={false}
                        key={conversation.id}
                        type={conversation.type}
                        userId={session?.user.id}
                        participants={conversation.participants}
                        onClick={() =>
                          handleConversationCardBtnClick(conversation)
                        }
                        time={
                          conversation.messages.length > 0
                            ? conversation.messages[0].createdAt
                            : ""
                        }
                        content={
                          conversation.messages.length > 0
                            ? conversation.messages[0].content
                            : ""
                        }
                      />
                    );
                  }
                )}
            </UnorderedList>
          )} */}
        </VStack>
      </Container>
    </Container>
  );
};

export default Connections;
