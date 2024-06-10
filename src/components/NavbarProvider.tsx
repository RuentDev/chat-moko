"use client"
import React, { FC, useEffect, useState } from "react";
import iconButtons from "@/data/iconButtons.json";
import dynamic from "next/dynamic";
import { Grid, GridItem, Show, Hide } from "@chakra-ui/react";
import Sidebars from "./Sidebars";
import Navbar from "./Navbar/Navbar";
import { usePathname } from "next/navigation";

interface NavbarProviderProps {
  children: React.ReactNode;
}

const NavbarProvider: FC<NavbarProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const path = `${pathname}`
    if (path !== "/") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <Grid
      height={"100vh"}
      width={"100%"}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(25, 1fr)"
    >
      {/* Side Bar */}
      <Hide below="md">
        <GridItem rowSpan={12} colSpan={1}>
          <Sidebars.Sidebar iconButtons={iconButtons} />
        </GridItem>
      </Hide>

      {/* Nav Bar */}
      {showNavbar && (
        <Show above="sm">
          <GridItem colSpan={24}>
            <Navbar />
          </GridItem>
        </Show>
      )}

      <GridItem rowSpan={12} colSpan={24}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default NavbarProvider;
