import MessagesCard from '@/components/Cards/MessagesCard'
import Image from 'next/image'
import React from 'react'


const chatButtons = [
  {
    id: 0,
    label: "video-call",
    icon: "/svgs/video.svg",
    link: "",
  },
  {
    id: 0,
    label: "phone-call",
    icon: "/svgs/phone.svg",
    link: "",
  },
  {
    id: 0,
    label: "options",
    icon: "/svgs/options.svg",
    link: "",
  },
]

const Chat = () => {
  return (
    <div className='single-chat w-full h-screen'>
      {/* TOP */}
      <div className="chat-details-container w-full h-auto bg-[#212229] p-5 flex">
        <div className="chat-details w-full flex gap-2">
          <div className="image-container w-[50px] h-[50px] bg-[#2A9DF4] rounded-full relative flex items-center justify-center text-white">
            {/* <Image /> */}
            JD
          </div>
          <div className="container flex flex-col gap-1">
            <p className='text-white text-md'>John Doe</p>
            <p className='text-green-500 italic text-xs '>John Typing...</p>
          </div>
        </div>
        {/* CHAT BUTTONS */}
        <ul className="buttons-container-list flex gap-5">
          {chatButtons.map((button) => {
            return (
              <li key={button.id} className='button-container flex items-center gap-2'>
                <button>
                  <Image src={button.icon} width={25} height={25} alt={button.label} />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* MESSAGES */}
      <div className="main-messages-container w-full h-auto">
        <MessagesCard />
      </div>

    </div>
  )
}

export default Chat
