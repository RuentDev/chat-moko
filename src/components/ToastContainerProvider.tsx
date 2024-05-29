"use client"
import React, { FC } from "react";
import { createStandaloneToast } from '@chakra-ui/react'
export const { ToastContainer, toast } = createStandaloneToast()

interface ToastContainerProviderProps {
  children: React.ReactNode
};

const ToastContainerProvider = ({children}: ToastContainerProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
};

export default ToastContainerProvider;