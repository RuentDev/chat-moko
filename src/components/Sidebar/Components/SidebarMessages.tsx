"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ConversationCardButton } from "./Buttons";
import { useDispatch } from "react-redux";
import {
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  UnorderedList,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import ConvesationOperations from "@/graphql/operations/conversation";
import {
  Conversation,
  ConversationQuery,
  GetConversationVariables,
} from "@/utils/types";
import { setSelectedConversation } from "@/app-redux/features/conversationSlice";
import { SlMagnifier } from "react-icons/sl";
import SearchBox from "@/components/Inputs/SearchBox";
import UserProfile from "@/components/UserProfile/UserProfile";

interface SidebarMessagesProps {
  session: Session | null;
}

const SidebarMessages: React.FC<SidebarMessagesProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, error, loading, subscribeToMore } = useQuery<
    ConversationQuery,
    GetConversationVariables
  >(ConvesationOperations.Queries.conversations);

  const handleConversationCardBtnClick = (conversation: any) => {
    dispatch(setSelectedConversation(conversation));
    router.push(`/messages/${conversation.id}`);
  };

  const handleAddConversationBtnClick = () => {
    router.push("/messages/new");
  };

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <Container w={350} h="100%" borderLeft={0} borderBottom={0} borderTop={0} padding={0}>
      <UserProfile />
      <SearchBox />
      <Flex  h="100%" w="100%" flexDirection="column" gap={2}>
        {/* PINNED MESSAGES */}
        {/* <HStack>
          <Text fontSize='sm' >Pinned Messages</Text>
          <Icon as={CiMapPin} />
        </HStack> */}
        {/* <ul className="pinned-messages w-full h-auto">
        </ul> */}
        {/* ALL MESSAGES */}
        {loading ? (
          <Center height="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          <UnorderedList padding={0} margin={0}>
            {data && data.conversations.map((conversation: Conversation, index: number) => {
                return (
                  <ConversationCardButton
                    index={index}
                    unreadCount={0}
                    isTyping={false}
                    key={conversation.id}
                    type={conversation.type}
                    userId={props.session?.user.id}
                    participants={conversation.participants}
                    onClick={() => handleConversationCardBtnClick(conversation)}
                    time={conversation.messages.length > 0 ? conversation.messages[0].createdAt : ""}
                    content={conversation.messages.length > 0 ? conversation.messages[0].content : ""}
                  />
                );
              })}
          </UnorderedList>
        )}
      </Flex>
    </Container>
  );
};

export default SidebarMessages;
