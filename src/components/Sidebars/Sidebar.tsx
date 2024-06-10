"use client";
import {
  Flex,
  ListItem,
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
  Image,
  Container,
  Hide,
} from "@chakra-ui/react";

import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconBtn from "./Components/Buttons/IconButton";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
  iconButtons: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ iconButtons }) => {
  const router = useRouter();
  const [buttons, setButtons] = useState(iconButtons);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  // const { data, error, loading, subscribeToMore } = useQuery<ConversationQuery, GetConversationVariables>(ConvesationOperations.Queries.conversations);

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

  const handleLogoutConfirm = () => {
    //Function when confirm button is clicked, to logout account
    signOut();
  };

  return (
    <nav id="navbar" className="dashboard-sidebar h-full flex">
      <Hide below="md">
        <Flex>
          <Container
            px={1}
            py={3}
            w="85px"
            h="100%"
            borderTop={0}
            borderBottom={0}
            borderLeft={0}
            position="relative"
          >
            <Image
              w={70}
              alt="ChatMoko"
              src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
            />

            <UnorderedList m={0} p={0} w="100%" marginTop={5}>
              <Flex
                gap="5"
                w="100%"
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
                    onClick={onOpen}
                    title="Logout"
                    background="transparent"
                  />
                </ListItem>
              </Flex>
            </UnorderedList>
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
          </Container>
        </Flex>
      </Hide>
    </nav>
  );
};

export default Sidebar;
