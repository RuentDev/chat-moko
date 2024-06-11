
"use client";
import {
  IconButton,
  Container,
  Image,
  Flex,
  Avatar,
  Hide,
  Show,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const path = location.pathname;
    if (path !== "/") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  },[]);

  return (
    <Container maxWidth="100%" maxHeight="100%" border={0}>
      <Flex
        width="100%"
        height={70}
        bg="#1A202C"
        position="relative"
        alignItems="center"
        justifyContent="space-between"
        padding={0}
        margin={0}
      >
        <Hide above="md">
          <IconButton
            aria-label="menu"
            as={HiMenu}
            backgroundColor="transparent"
          />
          <Container
            border={0}
            maxW="100%"
            margin={0}
            p={0}
          >
            <Flex 
              gap={3}
              w="100%"
              alignItems="center"
              justifyContent="end"
            >

          </Flex>
          </Container>
          </Hide>
      </Flex>
    </Container>
  );
};

export default Navbar;
