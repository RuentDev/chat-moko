"use client"
import React, { useState } from "react";
import sampleChatData from "@/data/testchat.json";
import Icon from "../Icon";

const Message = () => {

  const [showMoreIcon, setShowMoreIcon] = useState(null);

  const handleMouseEnter = (messageID:any) => {
    setShowMoreIcon(messageID)
  }

  return (
    <div className='message-container overflow-auto flex flex-col gap-10 p-5'>
      {/* Person information includes name and time of chat */}
      {sampleChatData.map((chat) => (
        <div key={chat.id} className='user-seperator-container'>
          <div key={chat.id} className={`message-details flex items-center ${chat.isLoggedIn ? 'justify-end' : 'justify-start'}`}>

             {/* User name and time of the message was sent for the logged-in user */}
             <div className={`chat-nametime flex ml-5 gap-6 text-white ${chat.isLoggedIn ? 'flex-row-reverse -mr-3' : 'flex-row hidden'}`}>
              <p className='text-lg'>{chat.isLoggedIn ? 'You' : chat.name}</p>
              <p className='opacity-45 text-xs mt-2'>{chat.time}</p>
            </div>
            
            {/* User profile image */}
            <div className={`image-container w-[50px] h-[50px] bg-[#2A9DF4] rounded-full ml-10 ${chat.isLoggedIn ? 'mr-5' : ''}`}></div>

            {/* User name and time of the message was sent for the other users */}
            <div className={`chat-nametime flex ml-5 gap-6 text-white ${chat.isLoggedIn ? 'flex-row-reverse hidden' : 'flex-row'}`}>
              <p className='text-lg'>{chat.isLoggedIn ? 'You' : chat.name}</p>
              <p className='opacity-45 text-xs mt-2'>{chat.time}</p>
            </div>
          </div>

          {/* Chat contexts */}
          <div className={`chatbox-container flex ${chat.isLoggedIn ? 'flex-row-reverse gap-5' : 'flex-row gap-5'}`}>
          <div onMouseEnter={() => handleMouseEnter(chat.id)}  className={`chats-message flex items-center p-5 w-auto h-auto text-white ${chat.isLoggedIn ? 'bg-blue-500 rounded-b-lg rounded-l-lg mr-24' : 'bg-[#1e1f23] rounded-b-lg rounded-r-lg ml-28'}`}>
            {chat.message}
          </div>
            {showMoreIcon === chat.id && (
              <Icon
                className="more-vertical cursor-pointer"
                icon={{ prefix: "fas", iconName: "ellipsis-vertical" }}
                color="white"
                width={5}
                height={5}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
