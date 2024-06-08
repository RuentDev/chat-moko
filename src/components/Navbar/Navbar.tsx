"use client"
import {IconButton, Container, Image, Flex, Avatar, Hide, Show, Spinner } from "@chakra-ui/react"
import React from "react"
import { HiMenu } from "react-icons/hi"
import { IoSunnyOutline } from "react-icons/io5"
import SearchBox from "../Inputs/SearchBox"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
interface NavbarProps{

}


const Navbar:React.FC<NavbarProps> = ({}) => {
  const {data:session} = useSession()
  return (
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
        
          <Image 
            alt="chatmoko"
            src="/svgs/chatmoko-logo.svg" 
            width={70}
            height={70}
            position="absolute"
            left="50%"
            right="50%"
            top={"50%"}
            transform="translate(-50%, -50%)"
          />
        </Hide>

        <Show above="md">
          <Container border={0} m={0}>
            <SearchBox />
          </Container>
        </Show>

        <Container
          border={0}
          maxW="250px"
          margin={0}
          p={10}
        >
          <Flex 
            gap={3}
            w="100%"
            alignItems="center"
            justifyContent="end"
          >
            <IconButton 
              aria-label="theme"
              as={IoSunnyOutline}
              backgroundColor="transparent"
            />
            {session ? (
              <Avatar 
                name={session.user.name || "User"}
                src={session.user.image || ""}
                size="md"
              />
            ) : (
              <Spinner size="md" />
            )}
            
          </Flex>
        </Container>
      </Flex>
  )
}

export default Navbar