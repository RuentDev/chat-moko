import React from 'react'


interface LoginButtonProps {
  children: React.ReactNode,
  mode?: "modal" | "redirect"
  asChild?: boolean
}


const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {

  const onClickHandler = () => {
    console.log("login clicked")
  }


  return (
    <span onClick={onClickHandler} className="cursor-pointer">
      {children}
    </span >
  )
}

export default LoginButton
