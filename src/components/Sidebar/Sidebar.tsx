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
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IconButton, Icon, Button } from "@chakra-ui/react";
import { SidebarMessages } from "./Components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [buttons, setButtons] = useState(iconButtons);
  const [navbarWidth, setNavbarWidth] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleShowConfirmationModal = () => {
    setConfirmationModal(true);
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

  return (
    <nav id="navbar" className="dashboard-sidebar h-full flex">
      <div className="left-side w-[70px] h-full py-5">
        <UnorderedList margin="0" padding="0">
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
                    size={20}
                  />
                </ListItem>
              );
            })}

            {/* Logout Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Logout</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure you want to log out? </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='green'>Confirm</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            
            {/* Logout button */}
            <div className="logout-btn absolute bottom-0">
              <IconButton
                aria-label="logout-button"
                icon={<Icon as={CiLogout} />}
                onClick={onOpen}
                title="Continue with Github"
                background="transparent"
              />
            </div>
          </Flex>
        </UnorderedList>
      </div>
      <div className={`right-side w-[300px] h-auto bg-[#212229] px-3 py-5`}>
        {/* COMPONENTS */}
        {selectedIcon.toLowerCase() === "messages" ? (
          <SidebarMessages session={session} />
        ) : null}
      </div>
    </nav>
  );
};

export default Sidebar;
