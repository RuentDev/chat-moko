"use client"
import React, { useState } from "react";
import sampleChatData from "@/data/testchat.json";
import Icon from "../Icon";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS_MESSAGES } from "@/schema/schema";
import { getMessageSentTime } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app-redux/store";


export type Message = {
  attachment_thumb_url: string
  attachment_url: string
  content: string
  createdAt: string
  deletedAt?: string
  id: string
  senderId: string
  type: string
  updatedAt?: string
}

const Message = () => {
  const [showMoreIcon, setShowMoreIcon] = useState(null);
  const selectedConversation = useSelector((state: RootState) => state.navigation.selectedConversation)
  const params = useParams()
  
  const {data, error, loading} = useQuery(
    GET_CONVERSATIONS_MESSAGES,
    {
      variables: {
        userId: params && params.id
      }
    }
  )

  if(loading){
    // return loading component
  }


  const messages = data ? data.getAllConversationMessages : []

  const handleMouseEnter = (messageID:any) => {
    setShowMoreIcon(messageID)
  }

  const userID = "07416a8d-2304-42e7-9d9a-ca18119ae567"

  return (
    <div className='message-container overflow-auto flex flex-col gap-10 p-5'>
      {/* Person information includes name and time of chat */}
      {messages && messages.map((chat: Message) => {
        return(
          <div key={chat.id} className='user-seperator-container'>
          <div key={chat.id} className={`message-details flex items-center ${chat.content ? 'justify-end' : 'justify-start'}`}>
            {/* User name and time of the message was sent for the logged-in user */}
            {/* <div className={`chat-nametime flex ml-5 gap-6 text-white ${chat.content ? 'flex-row-reverse -mr-3' : 'flex-row hidden'}`}>
              <p className='text-lg'>{chat.content ? 'You' : null}</p>
              <p className='opacity-45 text-xs mt-2'>{getMessageSentTime(chat.createdAt)}</p>
            </div> */}
            
            {/* User profile image */}
            {/* <div className={`image-container w-[50px] h-[50px] bg-[#2A9DF4] rounded-full ml-10 ${chat.content ? 'mr-5' : ''}`}></div> */}

            {/* User name and time of the message was sent for the other users */}
            {/* <div className={`chat-nametime flex ml-5 gap-6 text-white ${chat.content ? 'flex-row-reverse hidden' : 'flex-row'}`}>
              <p className='text-lg'>{chat.content ? 'You' : null}</p>
              <p className='opacity-45 text-xs mt-2'>{getMessageSentTime(chat.createdAt)}</p>
            </div> */}
          </div>

          {/* Chat contexts */}
          <div className={`chatbox-container flex items-center ${chat.senderId === userID ? 'justify-end' : 'justify-start'}`}>
            <div 
              onMouseEnter={() => handleMouseEnter(chat.id)}  
              className={`chats-message flex items-center p-5 w-auto h-auto text-white rounded-b-lg rounded-l-lg ${chat.senderId === userID ?'bg-blue-500' : 'bg-[#1e1f23] rounded-b-lg rounded-r-lg ml-28'}`}
              >
              {chat.content}
            </div>
            {/* {showMoreIcon === chat.id && (
              <Icon
                className="more-vertical cursor-pointer"
                icon={{ prefix: "fas", iconName: "ellipsis-vertical" }}
                color="white"
                width={5}
                height={5}
              />
            )} */}
          </div>
        </div>
        )
      })}
    </div>
  );
};

export default Message;
