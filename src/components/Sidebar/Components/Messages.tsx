"use client"
import Icon from '@/components/Icon'
import React from 'react'
import ConversationButton from './Buttons/ConversationButton'

import chats from '@/data/mockChats.json'
import { useRouter } from 'next/navigation'



const Messages = () => {

  const router = useRouter()

  const handleInboxButtonClick = (e: any, id: number) => {
    router.push(`/chat/${id}`)
  }


  return (
    <div className='sidebar-messages-component w-full h-auto'>
      {/* SEARCH BAR */}
      <div className="search-box-container w-full h-auto flex items-center justify-center bg-[#141619] p-2 rounded-md">
        <Icon icon={["fas", "magnifying-glass"]} width={20} height={20} color='white' />
        <input type="text" className="block w-full h-auto bg-transparent text-white text-sm search-box outline-none p-1" placeholder='Search...' />
      </div>
      <div className="messages-container w-full h-auto flex flex-col py-5">
        {/* PINNED MESSAGES */}
        <p className='text-xs text-white py-1 flex items-center gap-1'>
          <Icon icon={["fas", "map-pin"]} width={10} height={10} />
          Pinned Messages
        </p>
        <ul className="pinned-messages w-full h-auto">

          {chats.map((chat, index) => {

            if (chat.isPinned) {
              return (
                <ConversationButton
                  key={chat.id}
                  user={chat.user}
                  isTyping={chat.isTyping}
                  image={chat.image}
                  unreadCount={chat.unreadCount}
                  time={chat.latestUpdate}
                  content={chat.messageContent}
                  onClick={(e: any) => handleInboxButtonClick(e, chat.id)}
                />
              )
            }
          })}



        </ul>
        {/* ALL MESSAGES */}
        <p className='text-xs text-white py-1 flex items-center gap-1'>
          <Icon icon={["fas", "message"]} width={10} height={10} />
          All Messages
        </p>
        <ul className="all-messages">

        </ul>
      </div>

    </div>
  )
}

export default Messages
