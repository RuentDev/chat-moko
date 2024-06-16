"use client";
import React from "react";
import TypingEffect from "../Messages/Components/TypingEffect";
import { getMessageSentTime } from "@/utils";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Hide,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConversationParticipant } from "@/utils/types";

interface ConversationButtonCardProps {
  index: number;
  participants: ConversationParticipant[];
  userId?: string | null;
  type: string;
  isTyping: boolean;
  unreadCount: number;
  time?: string;
  content?: string;
  onClick?: () => void;
}

const ConversationCard = (props: ConversationButtonCardProps) => {
  return (
    <Container
      maxW={{ sm: "100%" }}
      width="100%"
      height={70}
      border={0}
      transitionTimingFunction="ease-in-out"
      transitionDuration="500ms"
      _hover={{ backgroundColor: "#2C3E61" }}
      className=" ease"
    >
      <HStack gap={3} cursor="pointer" onClick={props.onClick}>
        <GridItem h="auto">
          <AvatarGroup size="md" max={2}>
            {props.participants.map((participant) => {
              if (props.userId !== participant.userId) {
                return (
                  <Avatar
                    key={participant.user.id}
                    src={participant.user.image}
                    name={`${participant.user.first_name} ${participant.user.last_name}`}
                    size="sm"
                  >
                    <AvatarBadge boxSize="1rem" bg="green.500" />
                  </Avatar>
                );
              }
            })}
          </AvatarGroup>
        </GridItem>
        <GridItem w="100%" h="auto">
          <VStack align="flex-start">
            {props.participants.map((participant) => {
              if (props.userId !== participant.userId) {
                return (
                  <Text fontSize="small" key={participant.user.id}>
                    {`${participant.user.first_name} ${participant.user.last_name}`}
                  </Text>
                );
              }
            })}
            {props.isTyping ? (
              <TypingEffect />
            ) : (
              <Text fontSize="xs">
                {props.content && props.content.substring(0, 20)}
                {props.content && props.content.length > 10 && "..."}
              </Text>
            )}
          </VStack>
        </GridItem>
        <GridItem w="40%" h="auto">
          <VStack align="flex-end">
            <Text fontSize="xs">
              {props.time && getMessageSentTime(props.time)}
            </Text>
            <Text fontSize="xs">{props.unreadCount}</Text>
          </VStack>
        </GridItem>
      </HStack>
    </Container>
  );
};

export default ConversationCard;
