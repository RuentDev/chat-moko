import React, { FC } from "react";
import iconButtons from "@/data/iconButtons.json";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./Sidebar/Sidebar"))

interface NavbarProviderProps {
  children: React.ReactNode
};

const NavbarProvider:FC<NavbarProviderProps> = ({children}) => {
  return(
    <main className="dashboard-layout w-full h-screen flex gap-[2px]">
      <Sidebar iconButtons={iconButtons}/>
      {children}
    </main>
  )
};

export default NavbarProvider;