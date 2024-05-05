"use client"
import React from 'react'
import { Avatar, Flex, Icon, Text } from '@chakra-ui/react';
import { CiVideoOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";
import { IconButton } from '@chakra-ui/react'

interface HeaderMessage{

}

const chatButtons = [
    {
      id: 0,
      label: "video-call",
      icon: CiVideoOn,
      link: "",
    },
    {
      id: 1,
      label: "phone-call",
      icon: FiPhone,
      link: "",
    },
    {
      id: 2,
      label: "options",
      icon: SlOptionsVertical,
      link: "",
      action: () => {
        console.log('clicked')
      }
    },
];
  
const HeaderMessage: React.FC<HeaderMessage> = (props) => {
  const handleButtonClick = (action: any) => {
    if (action) {
      action();
    }
  };


  return (
    <Flex width="100%" padding="1rem">
      <Flex width="100%" gap={2}>
        <Flex position="relative" alignItems="center" justifyContent="center">
          <Avatar size="md" name="John Doe" />
        </Flex>
        <Flex flexDirection="column" gap={1}>
          <Text>John Doe</Text>
          <Text fontStyle='italic' fontSize="xs" >John Typing...</Text>
        </Flex>
      </Flex>
        {/* CHAT BUTTONS */}
        <Flex className='buttons-container-list flex gap-1'>
          {chatButtons.map((button) => {
            return (
              <IconButton 
                key={button.id} 
                onClick={() => {}}
                backgroundColor="transparent"
                aria-label={button.label}
                icon={<Icon as={button.icon}/>}
                isRound
              />
            );
          })}
        </Flex>
    </Flex>
      
  )
}

export default HeaderMessage