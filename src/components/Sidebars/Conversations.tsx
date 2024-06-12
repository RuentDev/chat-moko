"use client";
import React, { useState } from "react";
import ConvesationOperations from "@/graphql/operations/conversation";
import { Conversation, ConversationQuery } from "@/utils/types";
import {
  Flex,
  Center,
  Spinner,
  UnorderedList,
  IconButton,
  Container,
  Hide,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiMessageAdd } from "react-icons/bi";
import { Inputs, Cards, UserProfile } from "@/components";
import { setSelectedConversation } from "@/app-redux/features/conversationSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

interface ConversationProps {
  selectedConversationClick: (conversation: Conversation) => void;
}

const Conversations: React.FC<ConversationProps> = ({
  selectedConversationClick,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data, loading, subscribeToMore } = useQuery<ConversationQuery>(
    ConvesationOperations.Queries.conversations
  );
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const [hideContainer, setHideContainer] = useState(false);

  const handleConversationCardBtnClick = (conversation: Conversation) => {
    dispatch(setSelectedConversation(conversation));
    selectedConversationClick(conversation);
    router.push(`/messages/${conversation.id}`);
    if (isSmallScreen) {
      setHideContainer(!hideContainer);
    }
  };

  const handleAddConversationBtnClick = () => {
    router.push("/messages/new");
  };

  if (!session) {
    return null;
  }

  return (
    (!hideContainer && (
      <Container
      w={{ base: "100%", md: "100%", lg: 390 }}
      h="100%"
      m={0}
      p={0}
      borderLeft={0}
      borderBottom={0}
      borderTop={0}
      position="relative"
      borderWidth={{ base: 0, lg: 1 }}
      paddingTop={-10}
    >
      <Container border={0} width="100%">
        <Flex
          width="100%"
          gap={3}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Hide below="md">
            <UserProfile session={session} status="Active" />
          </Hide>
          <Inputs.SearchBox />
        </Flex>
      </Container>
      <Flex h="auto" w="100%" flexDirection="column" gap={2}>
        {loading ? (
          <Center height="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          <UnorderedList padding={0} margin={0}>
            {data &&
              data.conversations.map(
                (conversation: Conversation, index: number) => {
                  return (
                    <Cards.ConversationCard
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
        )}
      </Flex>

      <IconButton
        isRound
        bottom={3}
        right={4}
        size="lg"
        padding={3}
        position="absolute"
        as={BiMessageAdd}
        aria-label={"add-new-message"}
        bg="transparent"
        title="New message"
        cursor="pointer"
        onClick={handleAddConversationBtnClick}
      />
    </Container>
    ))
  );
};

export default Conversations;
