"use client";
import React, { useEffect } from "react";
import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import { CiVideoOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";
import { IconButton } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import ConversationMutation from "@/graphql/operations/conversation";
import { useParams } from "next/navigation";
import MessageOperations from "@/graphql/operations/message";
import { useSelector } from "react-redux";
import { RootState } from "@/app-redux/store";
import { useSession } from "next-auth/react";

interface HeaderMessage {}

const chatButtons = [
  {
    id: 0,
    label: "video-call",
    icon: CiVideoOn,
    link: "",
  },
  {
    id: 1,
    label: "phone-call",
    icon: FiPhone,
    link: "",
  },
  {
    id: 2,
    label: "options",
    icon: SlOptionsVertical,
    link: "",
    action: () => {
      console.log("clicked");
    },
  },
];

const HeaderMessage: React.FC<HeaderMessage> = (props) => {
  const { data: session } = useSession();
  const conversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  return (
    <Flex width="100%" padding="1rem">
      <Flex width="100%" gap={2}>
        <Flex position="relative" alignItems="center" justifyContent="center">
          <Avatar size="md" name="John Doe" />
        </Flex>
        <Flex flexDirection="column" gap={1}>
          <Text>
            {conversation?.participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.first_name} ${participant.user.last_name}`;
              }
            })}
          </Text>
          <Text fontStyle="italic" fontSize="xs" color="green.400">
            {conversation?.participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.first_name}`;
              }
            })}{" "}
            Typing...
          </Text>
        </Flex>
      </Flex>
      {/* CHAT BUTTONS */}
      <Flex className="buttons-container-list flex gap-1">
        {chatButtons.map((button) => {
          return (
            <IconButton
              key={button.id}
              onClick={() => {}}
              backgroundColor="transparent"
              aria-label={button.label}
              icon={<Icon as={button.icon} />}
              isRound
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default HeaderMessage;
