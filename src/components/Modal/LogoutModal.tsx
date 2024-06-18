import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

interface LogoutModalProps {
  onClick?: (e: any) => void;
  isModalOpen: boolean;
  onModalClose: () => void;
  size: string;
}

const LogoutModal = (props: LogoutModalProps) => {
  const handleLogoutConfirm = () => {
    // Function when confirm button is clicked, to logout account
    signOut();
  };
  return (
    <Modal isOpen={props.isModalOpen} onClose={props.onModalClose} size={props.size}>
      <ModalOverlay />
      <ModalContent className="mx-auto my-0 top-80">
        <ModalHeader className="text-xl font-bold">Confirm Logout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to log out?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={props.onModalClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleLogoutConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
