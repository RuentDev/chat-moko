"use client";
import React from "react";
// import Icon from "../Icon";
import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  Button,
  Grid,
  Container,
  AvatarGroup,
  Icon,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import mockImages from "@/data/mockImages.json";
import { ConversationParticipant } from "@/utils/types";
import { useRouter } from "next/navigation";

const attachmentOptions = [
  {
    id: 0,
    label: "Document",
    icon: "/svgs/document.svg",
    filecount: "129",
    link: "",
  },
  {
    id: 1,
    label: "Photo",
    icon: "/svgs/photo.svg",
    filecount: "938",
    link: "",
  },
  {
    id: 2,
    label: "Videos",
    icon: "/svgs/videos.svg",
    filecount: "96",
  },
  {
    id: 3,
    label: "Other Files",
    icon: "/svgs/other-files.svg",
    filecount: "171",
    link: "",
  },
];

interface HeaderMessageProps {
  participants: ConversationParticipant[];
}

const MessageOptions: React.FC<HeaderMessageProps> = ({ participants }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Container
      maxW={{ base: "100%", sm: "100%", md: "100%", lg: 350 }}
      maxH="100%"
      borderTop={0}
      borderRight={0}
      borderBottom={0}
      p={3}
    >
      <Flex
        gap={5}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          width="100%"
          display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
          alignItems="start"
        >
          <IconButton
            isRound
            aria-label="back-button"
            fontSize={40}
            left={1}
            icon={<Icon as={IoMdArrowRoundBack} />}
            title="Back"
            background="transparent"
            onClick={() => router.back()}
          />
        </Flex>
        
        {/* User avatar and full name */}
        <AvatarGroup size="lg" max={2}>
          {participants &&
            participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return (
                  <Avatar
                    key={participant.id}
                    name={`${participant.user.first_name} ${participant.user.last_name}`}
                    src={`${participant.user.image}`}
                  />
                );
              }
            })}
        </AvatarGroup>
        <Flex
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={1}
        >
          <Text as="p" fontSize="medium">
            {participants &&
              participants.map((participant) => {
                if (participant.user.id !== session?.user.id) {
                  return `${participant.user.first_name} ${participant.user.last_name}`;
                }
              })}
          </Text>
          <IconButton
            isRound
            backgroundColor="transparent"
            aria-label="Edit Name"
            size="xs"
            icon={<FaPencilAlt />}
          />
        </Flex>
        <Text as="p" fontSize="smaller">
          {participants &&
            participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.email}`;
              }
            })}
        </Text>

        {/* User email and address */}
        {/* <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        p={5}
        width="100%"
        height="122px"
        borderBottom="1px"
        borderColor="#2C3E61"
      >
        <Flex display="flex" alignItems="center">
          <IconButton
            isRound
            backgroundColor="transparent"
            aria-label="Email"
            size="md"
            icon={<IoMailSharp />}
          />
          <Text>
            {participants && participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.email}`;
              }
            })}
          </Text>
        </Flex>

        <Flex display="flex" alignItems="center">
          <IconButton
            isRound
            backgroundColor="transparent"
            aria-label="Address"
            size="md"
            icon={<IoMdPin />}
          />
          <Text>
            {participants && participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.phone}`;
              }
            })}
          </Text>
        </Flex>
      </Box> */}

        {/* User's Media */}
        <Box width="100%" height="200px">
          <Flex display="flex" justifyContent="space-between" p={3}>
            <Text as="b" fontSize="smaller">
              Media
            </Text>
            <Button variant="link">
              <Text as="u" fontSize="smaller">
                Show All
              </Text>
            </Button>
          </Flex>
          <Grid
            templateColumns="repeat(3, 2fr)"
            alignItems="center"
            height="100%"
          >
            {/* STILL STATIC IMAGES */}
            {mockImages.slice(0, 6).map((image) => {
              return (
                <Box
                  key={image.id}
                  width="70px"
                  height="70px"
                  backgroundColor="transparent"
                  borderWidth="1px"
                  borderColor="white"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml={4}
                >
                  <IconButton
                    isRound
                    backgroundColor="transparent"
                    aria-label="Address"
                    size="4xl"
                    icon={<GoFileMedia />}
                  />
                </Box>
              );
            })}
          </Grid>
        </Box>

        {/* User's Files */}
        <Box width="100%" mt={10}>
          <Flex display="flex" justifyContent="space-between" p={3}>
            <Text as="b" fontSize="smaller">
              Files
            </Text>
            <Button variant="link">
              <Text as="u" fontSize="smaller">
                Show All
              </Text>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default MessageOptions;
