import React, { FC } from "react";
import iconButtons from "@/data/iconButtons.json";
import dynamic from "next/dynamic";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebars from "./Sidebars";
import Navbar from "./Navbar/Navbar";

interface NavbarProviderProps {
  children: React.ReactNode;
}

const NavbarProvider: FC<NavbarProviderProps> = ({ children }) => {
  return (
    <Grid
      height={"100vh"}
      width={"100%"}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(25, 1fr)"
    >
      {/* Side Bar */}
      <GridItem rowSpan={12} colSpan={1}>
        <Sidebars.Sidebar iconButtons={iconButtons} />
      </GridItem>

      {/* Nav Bar */}
      <GridItem colSpan={24}>
        <Navbar />
      </GridItem>
      
      <GridItem rowSpan={12} colSpan={24}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default NavbarProvider;
