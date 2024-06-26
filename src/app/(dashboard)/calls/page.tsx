import { Center, Flex, Button, Text, Image } from '@chakra-ui/react'
import React from 'react'

const ChatPage = () => {
  return (
  <Center width="100%" height="100%">
    <Flex
      gap={5}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text as="h3" fontSize={{ base: 20, lg: 35 }}>
        Start Conversation
      </Text>

      <Image
        width={{ base: "219px", lg: "369px" }}
        alt="Chat Moko"
        objectFit="cover"
        src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
      />

      <Text as="h3" fontSize={{ base: 20, lg: 35 }}>
        Start Conversation with your contacts
      </Text>

      <Text
        width={{ base: "350px", lg: "656px" }}
        fontSize={{ base: 12, lg: 23 }}
        as="p"
        textAlign="center"
      >
        There are many variations of passages of Lorem Ipsum available,but
        the majority have suffered alteration in some form
      </Text>

      <Flex gap={10}>
        <Button color="#ffffff" bg="#2A9DF4" borderBottomRightRadius={0}>
          Call Now
        </Button>
        <Button
          colorScheme="#2A9DF4"
          variant="outline"
          borderBottomLeftRadius={0}
        >
          Start Chat
        </Button>
      </Flex>
    </Flex>
  </Center>
  )
}
export default ChatPage