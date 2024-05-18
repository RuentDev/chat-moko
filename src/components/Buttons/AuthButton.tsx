"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

interface LoginButtonProps {
  label: string
}


const AuthButton = (props: LoginButtonProps) => {

  const onClickHandler = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/auth/signup" })

  }


  return (
    <button
      onClick={onClickHandler}
      className="cursor-pointer border p-1 m-1"
    >
      {props.label}
    </button >
  )
}

export default AuthButton
