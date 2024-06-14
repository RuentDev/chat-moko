"use client";
import React from "react";
import {
  Avatar,
  AvatarGroup,
  Container,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CiVideoOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { IconButton } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderMessageProps {
  participants: any[];
  onOptionsClick: () => void;
}

const HeaderMessage: React.FC<HeaderMessageProps> = ({
  participants,
  onOptionsClick,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

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
      icon: SlOptions,
      link: "",
    },
  ];

  return (
    <Container maxW="100%" maxH={100} border={0}>
      <Flex width="100%" padding="1rem">
        <Flex width="100%" gap={2}>
          <IconButton
            isRound
            aria-label="back-button"
            fontSize={25}
            right={5}
            icon={<Icon as={IoMdArrowRoundBack} />}
            title="Back"
            background="transparent"
            onClick={() => router.back()}
          />
          <AvatarGroup size="md" max={2}>
            {participants &&
              participants.map((participant) => {
                if (participant.user.id !== session?.user.id) {
                  return (
                    <Avatar
                      key={participant.id}
                      name={`${participant.user.first_name} ${participant.user.last_name}`}
                      src={participant.user.image}
                    />
                  );
                }
              })}
          </AvatarGroup>
          <Flex flexDirection="column" gap={1}>
            <Text>
              {participants &&
                participants.map((participant) => {
                  if (participant.user.id !== session?.user.id) {
                    return `${participant.user.first_name} ${participant.user.last_name}`;
                  }
                })}
            </Text>
            <Text fontStyle="italic" fontSize="xs" color="green.400">
              {participants &&
                participants.map((participant) => {
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
                backgroundColor="transparent"
                aria-label={button.label}
                icon={<Icon as={button.icon} />}
                isRound
                onClick={button.id === 2 ? onOptionsClick : undefined}
              />
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
};

export default HeaderMessage;
