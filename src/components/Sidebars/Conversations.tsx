"use client";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface ConversationProps {}

const Conversations: React.FC<ConversationProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data, loading, subscribeToMore } = useQuery<ConversationQuery>( ConvesationOperations.Queries.conversations);
  const [hideContainer, setHideContainer] = useState(false);
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    lg: false,
  });
  
  //Hide container if params has an id for lower of medium screens
  useEffect(() => {
    const match = pathname.match(/\/messages\/([a-f0-9-]{36})$/);
    if (match && isSmallScreen) {
      setHideContainer(!hideContainer);
    }

    return () => {
      setHideContainer(false);
    }
  }, [pathname, isSmallScreen]);

  const handleConvoCardClick = (conversation: Conversation) => {
    router.push(`/messages/${conversation.id}`);
  };

  const handleAddConversationBtnClick = () => {
    router.push("/messages/new");
  };

  if (!session) {
    return null;
  }

  return (
    <Container
      h="100%"
      maxH="100%"
      borderLeft={0}
      borderBottom={0}
      borderTop={0}
      maxW={{ 
        base: "100%",
        sm: 390,
        md: 390, 
        lg: 390 
      }}
      display={{
        base: hideContainer ? "none" : "block",
      }}
      position={{
        base: "absolute",
        sm: "absolute",
        md: "inherit",
        lg: "inherit",
      }}
      zIndex={{ 
        base: 100, 
        sm: 100 
      }}
    >
      <Container 
        p={0} 
        border={0} 
        width="100%" 
        maxW={{ 
          sm: "100%" 
        }}
      >
        <Inputs.SearchBox />
      </Container>

      <Flex h="auto" w="100%" flexDirection="column" gap={2}>
        {loading ? (
          <Center height="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          <UnorderedList 
            w="100%"
            h="100%"
            padding={0} 
            margin={0}
          >
            {data &&
              data.conversations.map(
                (conversation: Conversation, index: number) => {
                  const conveLen = conversation.messages.length
                  return (
                    <Cards.ConversationCard
                      index={index}
                      unreadCount={0}
                      isTyping={false}
                      key={conversation.id}
                      type={conversation.type}
                      userId={session?.user.id}
                      participants={conversation.participants}
                      onClick={() => handleConvoCardClick(conversation) }
                      time={ conveLen > 0 ? conversation.messages[0].createdAt : "" }
                      content={ conveLen > 0 ? conversation.messages[0].content : "" }
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
        icon={<BiMessageAdd />}
        aria-label={"add-new-message"}
        bg="transparent"
        title="New message"
        cursor="pointer"
        onClick={handleAddConversationBtnClick}
      />
    </Container>
  );
};

export default Conversations;
