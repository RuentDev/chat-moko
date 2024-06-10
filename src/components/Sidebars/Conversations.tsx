"use client";
import React from "react";
import ConvesationOperations from "@/graphql/operations/conversation";
import {
  Conversation,
  ConversationQuery,
} from "@/utils/types";
import {
  Flex,
  Center,
  Spinner,
  UnorderedList,
  IconButton,
  Container,
} from "@chakra-ui/react";
// import { BiMessageAdd } from "react-icons/bi";
// import SearchBox from "../Inputs/SearchBox";
import ConversationCardButton from "../Messages/Components/Buttons/ConversationCardButton";
import { setSelectedConversation } from "@/app-redux/features/conversationSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile/UserProfile";

interface ConversationProps{}

const Conversations = ({}: ConversationProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data, error, loading, subscribeToMore } = useQuery<ConversationQuery>(ConvesationOperations.Queries.conversations, {
    onCompleted: (res) => {
      console.log(res)
    },
    onError: (err) => {
      console.log(err.message)
    }
  });
  
  const handleConversationCardBtnClick = (conversation: any) => {
    dispatch(setSelectedConversation(conversation));
    router.push(`/messages/${conversation.id}`);
  };

  const handleAddConversationBtnClick = () => {
    router.push("/messages/new");
  };


  if(!session){
    return null
  }

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
        <Container border={0}>
          <Flex gap={3} flexDirection="column" justifyContent="center" alignItems="center">
            <UserProfile session={session} status="Active"/>
            {/* <SearchBox /> */}
          </Flex>
        </Container>
      {/* <Show above="md">
      </Show> */}
      <Flex h="auto" w="100%" flexDirection="column" gap={2}>
        {loading ? (
          <Center height="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          <UnorderedList padding={0} margin={0}>
            {data &&  data.conversations.map(
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
        )}
      </Flex>

      <IconButton
        isRound
        bottom={3}
        right={4}
        size="lg"
        padding={3}
        position="absolute"
        // as={BiMessageAdd}
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
