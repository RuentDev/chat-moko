"use client"

import Image from 'next/image'
import React from 'react'
import TypingEffect from './TypingEffect'

type User = {
  fname: string,
  lname: string,
  age: number
}

interface InboxButtonProps{
  user: User
  image?: string
  isTyping: boolean
  unreadCount: number
  time: string
  content: string
  onClick?: any
}


const InboxButton = (props: InboxButtonProps) => {
  
  return (
    <div onClick={props.onClick} className='inbox-button w-full h-auto flex justify-between p-2 cursor-pointer ease-in-out duration-300 hover:bg-[#1D1E23]'>
      <div className="image-name-container w-full h-auto flex gap-2">
        {/* Image Container */}
        <div className="image-container w-[50px] h-[50px] flex items-center justify-center relative text-white rounded-full bg-red-500">
          {props.image ? null : `${props.user.fname[0]}${props.user.lname[0]}`.toUpperCase() }
        </div>
        {/* Name Container */}
        <div className="name-container flex flex-col gap-2">
          <p className={` text-white ${props.unreadCount > 0 ? "font-[700]" : ""}`}>{props.user.fname} {props.user.lname}</p>

          <div className={`text-xs flex flex-item ${props.isTyping ? "text-green-500 italic": "text-white"}`}>

            {props.isTyping && <TypingEffect />}

            {!props.isTyping && `${props.content.substring(0, 20)}...`}
          </div>
          
        </div>
      </div>
      {/* Time Container */}
      <div className="time-container w-[70px] h-full relative">
        <p className='text-white text-xs block w-auto h-full float-right'>{props.time}</p>
        {props.unreadCount > 0 ? <p className='unread-count w-4 h-4 my-2 float-right bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>{props.unreadCount}</p> : null}
      </div>
    </div>
  )
}

export default InboxButton