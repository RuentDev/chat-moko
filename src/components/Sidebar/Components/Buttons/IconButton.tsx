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

const IconButton = ({icon, size, label, isActive, onClick}: IconButtonProps) => {

  return (
    <button
      title={label.toUpperCase()}
      onClick={onClick}
      aria-label={label}
      className={`sidebar-icon-button flex items-center justify-center p-2 rounded-full ease-in-out duration-300 ${isActive && "bg-[#2A9DF4]"} hover:bg-[#2A9DF4]`}
    >
      <Image 
        src={icon} 
        alt='button-icon' 
        height={size} 
        width={size} 
        priority
        objectPosition='center'
        className={`w-[${size}px] h-[${size}px]`}
      />
    </button>
  )
}

export default IconButton