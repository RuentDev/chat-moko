"use client"
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React from 'react'
const Icon = (props: FontAwesomeIconProps) => {
  return (
    <FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} width={props.width} height={props.height} className='w-auto h-auto cursor-pointer' />
  )
}

export default Icon