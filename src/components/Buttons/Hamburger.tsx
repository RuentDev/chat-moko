"use client"
import React from 'react'
// import Icon from '../Icon'

export type MenuButtonProps = {
  onClick: () => void
  label?: string
  className?: string
}

const MenuIconButton = (props: MenuButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
    >
      {/* <Icon icon={{ prefix: "fas", iconName: "bars" }} color="white" width={30} height={30} /> */}
      {props.label}
    </button>
  )
}

export default MenuIconButton
