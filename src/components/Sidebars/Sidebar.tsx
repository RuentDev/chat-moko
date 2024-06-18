"use client";
import {
  Flex,
  ListItem,
  UnorderedList,
  useDisclosure,
  IconButton,
  Icon,
  Container,
  Avatar,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import LogoutModal from "../Modal/LogoutModal";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconBtn from "./Components/Buttons/IconButton";
import { IoSunnyOutline } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  iconButtons: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ iconButtons }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [buttons, setButtons] = useState(iconButtons);
  const [hideContainer, setHideContainer] = useState(false);
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    lg: false,
  });
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

   //Hide container if params has an id for lower of medium screens
   useEffect(() => {
    const match = pathname.match(/\/messages\/([a-f0-9-]{36})$/);
    if (match && isSmallScreen) {
      setHideContainer(!hideContainer);
    }

    return () => {
      setHideContainer(false);
    }
  }, [pathname, isSmallScreen]);

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
        display={{base:(hideContainer ? 'none' : 'block')}}
      >
        <Image
          width={70}
          height={70}
          alt="ChatMoko"
          priority={true}
          className="w-auto h-auto"
          src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
        />

        <UnorderedList m={0} p={0} mt={5} w="100%">
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
              <Flex
                gap={3}
                marginBottom={5}
                w="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
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
