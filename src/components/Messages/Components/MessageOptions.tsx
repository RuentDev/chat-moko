"use client";
import React, { useState } from "react";
// import Icon from "../Icon";
import {
  Box,
  Flex,
  Avatar,
  AvatarGroup,
  Text,
  IconButton,
  Button,
  Grid,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FaPencilAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { IoMdPin } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import { RootState } from "@/app-redux/store";
import { useSelector } from "react-redux";
import mockImages from "@/data/mockImages.json";

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
  participants: [];
}

const MessageOptions = () => {
  const { data: session } = useSession();

  const conversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  return (
    <Flex
      width="306px"
      borderLeft="1px"
      borderColor="#2C3E61"
      display="flex"
      flexDirection="column"
    >
      {/* User avatar and full name */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        flexDirection="column"
        width="100%"
        height="320px"
        p={5}
        borderBottom="1px"
        borderColor="#2C3E61"
      >
        {conversation?.participants.map((participant) => {
          if (participant.user.id !== session?.user.id) {
            return (
              <Avatar
                size="xl"
                key={participant.id}
                name={`${participant.user.first_name} ${participant.user.last_name}`}
                src={`${participant.user.image}`}
              />
            );
          }
        })}
        <Flex
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={1}
        >
          <Text>
            {conversation?.participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.first_name} ${participant.user.last_name}`;
              }
            })}
          </Text>
          <IconButton
            isRound
            backgroundColor="transparent"
            aria-label="Edit Name"
            size="md"
            icon={<FaPencilAlt />}
          />
        </Flex>
      </Box>

      {/* User email and address */}
      <Box
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
            {conversation?.participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                console.log(participant.user)
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
            {conversation?.participants.map((participant) => {
              if (participant.user.id !== session?.user.id) {
                return `${participant.user.phone}`;
              }
            })}
          </Text>
        </Flex>
      </Box>

      {/* User's Media */}
      <Box width="100%" height="200px">
        <Flex display="flex" justifyContent="space-between" p={3}>
          <Text as="b">Media</Text>
          <Button variant="link">
            <Text as="u">Show All</Text>
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
          <Text as="b">Files</Text>
          <Button variant="link">
            <Text as="u">Show All</Text>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MessageOptions;
