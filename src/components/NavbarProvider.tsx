import React, { FC } from "react";
import iconButtons from "@/data/iconButtons.json";
import dynamic from "next/dynamic";
import {  Grid, GridItem,Show } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
const Sidebar = dynamic(() => import("./Sidebar/Sidebar"))

interface NavbarProviderProps {
  children: React.ReactNode
};

const NavbarProvider:FC<NavbarProviderProps> = ({children}) => {
  return(
    <Grid
      height={"100vh"}
      width={"100%"}
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(25, 1fr)'
    >
      <GridItem rowSpan={12} colSpan={1}>
        <Sidebar iconButtons={iconButtons}/>
      </GridItem>
      <GridItem rowSpan={12} colSpan={24} >
        {children}
      </GridItem>
    </Grid>
  )
};

export default NavbarProvider;