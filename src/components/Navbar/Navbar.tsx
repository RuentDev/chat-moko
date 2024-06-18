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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  ListItem,
  UnorderedList,
  Icon,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoSunnyOutline } from "react-icons/io5";
import SearchBox from "../Inputs/SearchBox";
import { signOut, useSession } from "next-auth/react";
import IconBtn from "../../components/Sidebars/Components/Buttons/IconButton";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import LogoutModal from "../Modal/LogoutModal";

interface NavbarProps {
  iconButtons: any[];
}

const Navbar: React.FC<NavbarProps> = ({ iconButtons }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [buttons, setButtons] = useState(iconButtons);
  const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure();
  const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();

  useEffect(() => {
    const path = location.pathname;
    if (path !== "/") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, []);

  const handleOnClick = (e: any, button: any) => {
    e.preventDefault();
    const buttonCopy = iconButtons.slice();

    buttonCopy.forEach((item) => {
      if (item.id === button.id) {
        item.isActive = true;
        router.push(item.link);
      } else {
        item.isActive = false;
      }
    });

    setButtons(buttonCopy);
  };

  useEffect(() => {
    // const paths: string[] = urlPath.split("/")
    const path = location.pathname;
    const paths = path.split("/");

    const buttonCopy = iconButtons.slice();

    const button = buttonCopy.find(
      (item) => item.link.replace("/", "") === paths[1]
    );

    buttonCopy.forEach((item) => {
      if (button && item.id === button.id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    setButtons(buttonCopy);

    return () => {};
  }, []);

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
            icon={<HiMenu />}
            backgroundColor="transparent"
            onClick={onDrawerOpen}
          />

          <Image
            alt="chatmoko"
            src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
            width={70}
            position="absolute"
            left="50%"
            right="50%"
            top={"50%"}
            transform="translate(-50%, -50%)"
          />

          <Drawer
            placement="left"
            onClose={onDrawerClose}
            isOpen={isDrawerOpen}
            size="xs"
          >
            <DrawerOverlay />
            <DrawerContent maxWidth="120px" backgroundColor="#1A202C">
              <DrawerHeader>
                <Image
                  w={70}
                  alt="ChatMoko"
                  src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
                />
              </DrawerHeader>
              <DrawerBody>
                <UnorderedList m={0} p={0} marginTop={5}>
                  <Flex
                    gap="5"
                    h="100%"
                    flexDirection="column"
                    alignItems="center"
                    listStyleType="none"
                  >
                    {buttons.map((button) => {
                      return (
                        <ListItem key={button.id}>
                          <IconBtn
                            {...button}
                            onClick={(e: any) => handleOnClick(e, button)}
                            size={30}
                          />
                        </ListItem>
                      );
                    })}
                    {/* Logout button */}
                    <ListItem position="absolute" bottom={3}>
                      <IconButton
                        isRound
                        aria-label="logout-button"
                        icon={<Icon as={CiLogout} />}
                        onClick={onModalOpen}
                        title="Logout"
                        background="transparent"
                      />
                    </ListItem>
                  </Flex>
                </UnorderedList>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <LogoutModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          size="xs"
          />
        </Hide>

        {showNavbar && (
          <Show above="md">
            <Container border={0} m={0} p={0}>
              <SearchBox />
            </Container>
          </Show>
        )}

        <Container border={0} maxW="100%" margin={0} p={0}>
          <Flex gap={3} w="100%" alignItems="center" justifyContent="end">
            <IconButton
              aria-label="theme"
              icon={<IoSunnyOutline />}
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
    </Container>
  );
};

export default Navbar;
