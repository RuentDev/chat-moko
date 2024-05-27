"use client";
import React from "react";
import TypingEffect from "./TypingEffect";
import { getMessageSentTime } from "@/utils";
import {
  Avatar,
  AvatarGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConversationParticipant } from "@/utils/types";

interface ConversationButtonCardProps {
  participants: ConversationParticipant[];
  userId?: string | null;
  type: string;
  isTyping: boolean;
  unreadCount: number;
  time?: string;
  content?: string;
  onClick?: () => void;
}

const ConversationCardButton = (props: ConversationButtonCardProps) => {
  return (
    <HStack gap={3} cursor="pointer" onClick={props.onClick}>
      <GridItem w="20%" h="auto">
        <AvatarGroup size='md' max={2}>
          {props.participants.map((participant) => {
            if (props.userId !== participant.userId) {
              return (
                  <Avatar
                    key={participant.user.id}
                    src={participant.user.image}
                    name={`${participant.user.first_name} ${participant.user.middle_name} ${participant.user.last_name}`}
                  />
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
                 {`${participant.user.first_name} ${participant.user.middle_name} ${participant.user.last_name}`}
                </Text>
              );
            }
          })}
          {props.isTyping ? (
            <TypingEffect />
          ) : (
            <Text fontSize="xs">
              {props.content && props.content.substring(0, 20)}{props.content && props.content.length > 10 && "..." }
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
  );
};

export default ConversationCardButton;
