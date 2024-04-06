"use client"
import React from 'react'
import Icon from '../Icon'

export type ArrowDownProps = {
  onClick: (e: any) => void
  label?: string
  className?: string
}

const ArrowDownButton = (props: ArrowDownProps) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}>
      <Icon icon={{ prefix: "fas", iconName: "caret-down" }} color="black" width={20} height={20} />
    </button>
  )
}

export default ArrowDownButton
