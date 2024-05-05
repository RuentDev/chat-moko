"use client"
import React from 'react'
import TypingEffect from './TypingEffect'
import { getMessageSentTime } from '@/utils'
import { Avatar, Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react'

type User = {
  first_name: string
  last_name: string
  middle_name: string
  image?: string
}

interface ConversationButtonCardProps{
  user: User
  isTyping: boolean
  unreadCount: number
  time: string
  content: string
  onClick?: () => void
}

const ConversationCardButton = (props: ConversationButtonCardProps) => {

  return (
    <HStack gap={3} cursor="pointer" onClick={props.onClick}>
      <GridItem w='20%' h="auto">
        <Avatar name={`${props.user.first_name}`} src={props.user.image} />
      </GridItem>
      <GridItem w='100%' h="auto">
        <VStack align="flex-start">
          <Text fontSize='sm' fontWeight={600}>{props.user.first_name}</Text>
          {props.isTyping ? <TypingEffect /> : <Text fontSize='xs' >{props.content.substring(0, 20)}...</Text>}
        </VStack>
      </GridItem>
      <GridItem w='40%' h="auto" >
        <VStack align="flex-end">
          <Text fontSize='xs'>{getMessageSentTime(props.time)}</Text>
          <Text fontSize='xs'>{props.unreadCount}</Text>
        </VStack>
      </GridItem>
    </HStack>
  )
}

export default ConversationCardButton;
