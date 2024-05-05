"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { ConversationCardButton } from './Buttons'
import { useDispatch } from 'react-redux'
import { setSelectedConversation } from '@/app-redux/features/navigationSlice'
import { Center, Container, Flex, HStack, Icon, Spinner, Text, UnorderedList } from '@chakra-ui/react'
import { Session } from 'next-auth'
import ConvesationOperations from '@/graphql/operations/conversation'
import { TiMessages } from "react-icons/ti";
import { CiMapPin } from "react-icons/ci";
import { GetConversation, GetConversationVariables } from '@/utils/types'

interface SidebarMessagesProps {
 session: Session
}

const Messages: React.FC<SidebarMessagesProps> = (props) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const { data, error, loading } = useQuery<GetConversation, GetConversationVariables>(ConvesationOperations.Queries.getConvesations, {
    variables: {
      userId: props.session.user.id
    }
  })

  const handleConversationCardButtonClick = (chat: any) => {
    dispatch(setSelectedConversation(chat))
    router.push(`/messages/${chat.id}`)
  }

  if(loading){
    return (
      <Center height="100%">
        <Spinner size='xl' />
      </Center>
    )
  }

  return (
    <div className='sidebar-messages-component w-full h-auto'>
      {/* SEARCH BAR */}

      <Container height="50px" bg={"bg-[#141619]"}>
        <input type="text" className="block w-full h-auto bg-transparent text-white text-sm search-box outline-none p-1" placeholder='Search...' />
      </Container>

     <Flex flexDirection="column" gap={2}>
      {/* PINNED MESSAGES */}
        {/* <HStack>
          <Text fontSize='sm' >Pinned Messages</Text>
          <Icon as={CiMapPin} />
        </HStack> */}
        {/* <ul className="pinned-messages w-full h-auto">
        </ul> */}
        {/* ALL MESSAGES */}
        <HStack>
          <Text fontSize='sm' >All Messages</Text>
          <Icon as={TiMessages} />
        </HStack>
        <UnorderedList padding={0} margin={0}>
          {data && data.getConversation.map((chat: any) => {
            return (
             <ConversationCardButton
                key={chat.id}
                user={chat.participants[1].user}
                isTyping={false}
                unreadCount={0}
                time={chat.messages[0].createdAt}
                content={chat.messages[0].content}
                onClick={() => handleConversationCardButtonClick(chat)}
              />
            )
          })}
        </UnorderedList>
     </Flex>
    </div>
  )
}

export default Messages
