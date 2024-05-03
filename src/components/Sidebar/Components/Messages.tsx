"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { GET_CONVERSATIONS } from '@/graphql/schema'
import { useQuery, useSubscription } from '@apollo/client'
import { ConversationCardButton } from './Buttons'
import { useDispatch } from 'react-redux'
import { setSelectedConversation } from '@/app-redux/features/navigationSlice'
import { UnorderedList } from '@chakra-ui/react'

interface SidebarMessagesProps {
  // any props that come into this component
}

const Messages: React.FC<SidebarMessagesProps> = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const { data, error, loading } = useQuery(GET_CONVERSATIONS, {
    variables: {
      userId: "07416a8d-2304-42e7-9d9a-ca18119ae567"
    }
  })

  const handleConversationCardButtonClick = (chat: any) => {
    dispatch(setSelectedConversation(chat))
    router.push(`/chat/${chat.id}`)
  }

  return (
    <div className='sidebar-messages-component w-full h-auto'>
      {/* SEARCH BAR */}
      <div className="search-box-container w-full h-auto flex items-center justify-center bg-[#141619] p-2 rounded-md">
        {/* <Icon icon={["fas", "magnifying-glass"]} width={20} height={20} color='white' /> */}
        <input type="text" className="block w-full h-auto bg-transparent text-white text-sm search-box outline-none p-1" placeholder='Search...' />
      </div>
      <div className="messages-container w-full h-auto flex flex-col py-5">
        {/* PINNED MESSAGES */}
        <p className='text-xs text-white py-1 flex items-center gap-1'>
          {/* <Icon icon={["fas", "map-pin"]} width={10} height={10} /> */}
          Pinned Messages
        </p>
        <ul className="pinned-messages w-full h-auto">
        </ul>
        {/* ALL MESSAGES */}
        <p className='text-xs text-white py-1 flex items-center gap-1'>
          {/* <Icon icon={["fas", "message"]} width={10} height={10} /> */}
          All Messages
        </p>
        <UnorderedList padding={0} margin={0}>
          {data && data.getConversation.map((chat: any) => {
            return (
              <ConversationCardButton
                key={chat.id}
                user={chat.participants[1]}
                isTyping={false}
                unreadCount={0}
                time={chat.createdAt}
                content={chat.messages[0].content}
                onClick={() => handleConversationCardButtonClick(chat)}
              />
            )
          })}
        </UnorderedList>
      </div>

    </div>
  )
}

export default Messages
