"use client";

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
  Container,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { SidebarMessages } from "./Components";
import React, { useEffect, useState } from "react";
import { RootState, store } from "@/app-redux/store";
import IconBtn from "./Components/Buttons/IconButton";
import { signOut, useSession } from "next-auth/react";
import { setSelectedIcon } from "@/app-redux/features/navigationSlice";
import { useQuery } from "@apollo/client";
import {
  Conversation,
  ConversationQuery,
  GetConversationVariables,
} from "@/utils/types";
import ConvesationOperations from "@/graphql/operations/conversation";


interface SidebarProps {
  iconButtons: any[]
}

const Sidebar: React.FC<SidebarProps> = ({iconButtons}) => {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [buttons, setButtons] = useState(iconButtons);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const selectedIcon = useSelector( (state: RootState) => state.navigation.selectedIcon);

  // const { data, error, loading, subscribeToMore } = useQuery<ConversationQuery, GetConversationVariables>(ConvesationOperations.Queries.conversations);


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

    return () => {};
  }, []);

  const handleLogoutConfirm = () => {
    //Function when confirm button is clicked, to logout account
    signOut();
  };

  return (
    <nav id="navbar" className="dashboard-sidebar h-full flex">
      <Flex>
        {/* LEFTSIDE */}
          <Container
            px={1}
            py={3}
            width="85px"
            borderTop={0}
            borderBottom={0}
            borderLeft={0}
            position="relative"
          >
            {/* ICON */}
            <Image 
              w={70}
              alt="ChatMoko"
              src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
            />

            {/* Icon Buttons */}
            <UnorderedList margin="0" padding="0" marginTop={5}>
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
                        size={30}
                      />
                    </ListItem>
                  );
                })}

                {/* Logout Confirmation Modal */}
              </Flex>
            </UnorderedList>
            {/* Logout button */}
            <Container
              border={0}
              position="fixed"
              bottom={0}
            >
              <IconButton
                aria-label="logout-button"
                icon={<Icon as={CiLogout} />}
                onClick={onOpen}
                title="Logout"
                background="transparent"
              />
            </Container>
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

        {/*RIGHT SIDE COMPONENTS */}
        {selectedIcon.toLowerCase() === "messages" && ( <SidebarMessages session={session} />)}
      </Flex>
    </nav>
  );
};

export default Sidebar;
