"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "@/app-redux/store";
import { useRouter } from "next/navigation";
import iconButtons from "@/data/iconButtons.json";
import IconButton from "./Components/Buttons/IconButton";
import { setSelectedIcon } from "@/app-redux/features/navigationSlice";

import { Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SidebarMessages } from "./Components";
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [buttons, setButtons] = useState(iconButtons);
  const [navbarWidth, setNavbarWidth] = useState(0);
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
                  <IconButton
                    {...button}
                    onClick={(e: any) => handleOnClick(e, button)}
                    size={20}
                  />
                </ListItem>
              );
            })}
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
