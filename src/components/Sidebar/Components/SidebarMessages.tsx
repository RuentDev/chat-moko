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
} from "@chakra-ui/react";
import { Session } from "next-auth";
import ConvesationOperations from "@/graphql/operations/conversation";
import { TiMessages } from "react-icons/ti";
import {
  Conversation,
  ConversationQuery,
  GetConversationVariables,
} from "@/utils/types";
import { setSelectedConversation } from "@/app-redux/features/conversationSlice";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineLibraryAdd } from "react-icons/md";

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

  if (loading) {
    return (
      <Center height="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <div className="sidebar-messages-component w-full h-auto">
      {/* SEARCH BAR */}

      <Container height="50px" bg={"bg-[#141619]"} padding={0}>
        <Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SlMagnifier size={20} />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Conversation"
              borderColor="transparent"
              focusBorderColor="transparent"
              _hover={{
                borderColor: "none",
              }}
              fontSize="small"
            />
          </InputGroup>
          <IconButton
            size="md"
            isRound
            fontSize="20px"
            onClick={handleAddConversationBtnClick}
            aria-label="add-message"
            backgroundColor="transparent"
            icon={<Icon as={MdOutlineLibraryAdd} />}
          />
        </Flex>
      </Container>

      <Flex flexDirection="column" gap={2}>
        {/* PINNED MESSAGES */}
        {/* <HStack>
          <Text fontSize='sm' >Pinned Messages</Text>
          <Icon as={CiMapPin} />
        </HStack> */}
        {/* <ul className="pinned-messages w-full h-auto">
        </ul> */}
        {/* ALL MESSAGES */}
        <HStack>
          <Text fontSize="sm">All Messages</Text>
          <Icon as={TiMessages} />
        </HStack>
        <UnorderedList padding={0} margin={0}>
          {data &&
            data.conversations.map((conversation: Conversation) => {
              return (
                <ConversationCardButton
                  key={conversation.id}
                  userId={props.session?.user.id}
                  participants={conversation.participants}
                  type={conversation.type}
                  isTyping={false}
                  unreadCount={0}
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
                  onClick={() => handleConversationCardBtnClick(conversation)}
                />
              );
            })}
        </UnorderedList>
      </Flex>
    </div>
  );
};

export default SidebarMessages;
