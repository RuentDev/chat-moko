import { NextPage } from "next";
import { auth } from "../../auth";
import {
  Avatar,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  Button,
  Image,
  Box,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Forms } from "@/components";
import { IoSunnyOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { Show, Hide } from "@chakra-ui/react";

const DashboardPage: NextPage = async () => {
  const session = await auth();

  return (
      <main className="w-full h-full">
      <Hide above="md">
      <VStack width="100%" padding="0.5rem" bg="#081E40">
        <Container
          width="100%"
          display="flex"
          justifyContent="space-between"
          maxW="sm"
          padding={2}
        >
          {/* Menu icon for small screen */}
          <Show below="md">
            <Box position="absolute" left={3}>
              <Button
                bg="transparent"
                _hover={{
                  borderColor: "none",
                }}
              >
                <HiMenu fontSize={40} />
              </Button>
            </Box>
          </Show>

          {/* Chat Moko Logo */}
          <Show below="sm">
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              justifyItems="center"
            >
              <Image
                width="80px"
                alt="Chat Moko"
                src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
              />
            </Box>
          </Show>

          <Box display="flex" position="absolute" justifyContent='center' alignItems='center' right={6} gap={1}>
            <IconButton
              isRound
              bg="transparent"
              aria-label="theme"
              icon={<IoSunnyOutline color="#ffffff" size="40" />}
            />
            {session && session.user && (
              <Avatar
                width="45px"
                height="45px"
                name={session.user.name || ""}
                src={session.user.image || ""}
              />
            )}
          </Box>
        </Container>
        <Flex
          width="90%"
          alignItems="center"
          justifyContent="center"
        >
          <Forms.SearchForm />
        </Flex>
      </VStack>
      </Hide>

      <Center width="100%" height="90%">
        <Flex
          gap={5}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="h3" fontSize={{ base: 20, lg: 35 }}>
            Welcome Back, {session?.user.name}
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
    </main>
  );
};

export default DashboardPage;
