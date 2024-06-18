"use client";
import {
  Flex,
  ListItem,
  UnorderedList,
  useDisclosure,
  IconButton,
  Icon,
  Container,
} from "@chakra-ui/react";
import LogoutModal from "../Modal/LogoutModal";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconBtn from "./Components/Buttons/IconButton";
import Image from "next/image";
interface SidebarProps {
  iconButtons: any[]
}

const Sidebar: React.FC<SidebarProps> = ({iconButtons}) => {
  
  const router = useRouter();
  const [buttons, setButtons] = useState(iconButtons);
  const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();

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

  return (
    <nav id="navbar" className="dashboard-sidebar h-full flex">
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
          width={70}
          height={70}
          alt="ChatMoko"
          priority={true}
          className="w-auto h-auto"
          src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
        />

        <UnorderedList 
          m={0}
          p={0}
          mt={5}
          w="100%"
        >
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
                onClick={onModalOpen}
                title="Logout"
                background="transparent"
              />
            </ListItem>
          </Flex>
        </UnorderedList>
        
        {/* Logout Modal */}
        <LogoutModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          size="md"
        />
      </Container>
    </nav>
  );
};

export default Sidebar;
