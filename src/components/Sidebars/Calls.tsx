"use client";
import { Avatar, Container, VStack, Image, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import UserProfile from "../UserProfile/UserProfile";
import SearchBox from "../Inputs/SearchBox";
import { useSession } from "next-auth/react";
import mockCallData from "@/data/mockCalls.json";

interface CallsProps {}

const Calls: FC<CallsProps> = (props) => {
  const { data: session } = useSession();

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
      <Container maxW="100%" border={0}>
        <UserProfile session={session} status="Active" />
      </Container>
      <Container maxW="100%" border={0}>
        <SearchBox />
      </Container>

      <Container border={0}>
        <VStack h="auto" w="100%" flexDirection="column" gap={5}>
          {/* Mock or Static data only */}
          {mockCallData.map((call) => {
            return (
              <Flex
                key={call.id}
                width="100%"
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="start"
                gap={3}
                cursor="pointer"
                transitionTimingFunction="ease-in-out"
                transitionDuration="200ms"
                _hover={{ backgroundColor: "#2C3E61" }}
              >
                <Avatar name={call.name} />

                <Flex display="flex" flexDirection="column" gap={1}>
                  <Text>{call.name}</Text>
                  <Flex gap={2}>
                    <Image
                      w={21}
                      h={21}
                      alt="ChatMoko"
                      src={`/images/${call.action}-call.png`}
                    />
                    <Text>{call.date}</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </Container>
    </Container>
  );
};

export default Calls;
