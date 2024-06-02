"use client"
import React from 'react'
import Image from 'next/image'



interface IconButtonProps {
  icon: string
  size: number
  label: string
  isActive?: boolean
  onClick?: any
}

const IconButton = (props: IconButtonProps) => {

  return (
    <button
      title={props.label.toUpperCase()}
      onClick={props.onClick}
      aria-label={props.label}
      className={`sidebar-icon-button flex items-center justify-center p-3 rounded-full ease-in-out duration-300 ${props.isActive && "bg-[#2A9DF4]"} hover:bg-[#2A9DF4]`}
    >
      <Image 
        src={props.icon} 
        alt='button-icon' 
        height={props.size} 
        width={props.size} 
      />
    </button>
  )
}

export default IconButton