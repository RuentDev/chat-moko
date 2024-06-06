"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "@/app-redux/store";
import { useRouter } from "next/navigation";
import iconButtons from "@/data/iconButtons.json";
import IconBtn from "./Components/Buttons/IconButton";
import { setSelectedIcon } from "@/app-redux/features/navigationSlice";
import { CiLogout } from "react-icons/ci";
import {
  Flex,
  ListItem,
  Stack,
  UnorderedList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Icon,
  Button,
  Box,
  Show,
  Image,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { SidebarMessages } from "./Components";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [buttons, setButtons] = useState(iconButtons);
  const [navbarWidth, setNavbarWidth] = useState(0);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data: session } = useSession();
  const selectedIcon = useSelector(
    (state: RootState) => state.navigation.selectedIcon
  );
  const router = useRouter();

  const handleOnClick = (e: any, button: any) => {
    e.preventDefault();
    const buttonCopy = iconButtons.slice();

    buttonCopy.forEach((item) => {
      if (item.id === button.id) {
        item.isActive = true;
        store.dispatch(setSelectedIcon(item.label));
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
        store.dispatch(setSelectedIcon(item.label));
      } else {
        item.isActive = false;
      }
    });
    setButtons(buttonCopy);

    const navbar = document.getElementById("navbar");
    const width = navbar?.clientWidth;
    if (width) setNavbarWidth(width);

    window.addEventListener("resize", (e) => {
      if (width) {
        setNavbarWidth(width);
      }
    });

    return () => {};
  }, []);

  const handleLogoutConfirm = () => {
    //Function when confirm button is clicked, to logout account
    signOut();
  };

  return (
    <nav id="navbar" className="dashboard-sidebar h-full flex">
      {/* LEFTSIDE */}
      <Show above="lg">
        <Stack
          padding="0.5rem"
          borderLeft="1px"
          borderRight="1px"
          borderColor="#2C3E61"
        >
          {/* Chat Moko Logo */}
          {/* Show for large screens */}
          <Show above="sm">
            <Image
              width="90px"
              alt="Chat Moko"
              src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
            />
          </Show>

          {/* Icon Buttons */}
          <UnorderedList margin="0" marginTop="10" padding="0">
            <Flex
              gap="5"
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
                      size={25}
                    />
                  </ListItem>
                );
              })}

              {/* Logout Confirmation Modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="mx-auto my-0 top-80">
                  <ModalHeader className="text-xl font-bold">
                    Confirm Logout
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>Are you sure you want to log out?</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="green" onClick={handleLogoutConfirm}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Logout button */}
              <Box position={"absolute"} bottom={0}>
                <IconButton
                  aria-label="logout-button"
                  icon={<Icon as={CiLogout} />}
                  onClick={onOpen}
                  title="Logout"
                  background="transparent"
                />
              </Box>
            </Flex>
          </UnorderedList>
        </Stack>
      </Show>

      {/*RIGHT SIDE COMPONENTS */}
      <Show above="md">
        {selectedIcon.toLowerCase() === "messages" && (
          <Box
            width="352px"
            height="auto"
            backgroundColor="#1A202C"
            padding="0.5rem"
            borderLeft="1px"
            borderRight="1px"
            borderColor="#2C3E61"
            px={3}
            py={5}
          >
            <SidebarMessages session={session} />
          </Box>
        )}
      </Show>
    </nav>
  );
};

export default Sidebar;
