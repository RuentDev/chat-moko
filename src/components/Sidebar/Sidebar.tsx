import React from 'react'
import Image from 'next/image'
import { Icon } from '..'
import Messages from './Components/Messages'

const iconsButtons = [
  {
    id: 0,
    label: "Home",
    icon: "/svgs/home.svg",
    link: "",
  },
  {
    id: 1,
    label: "Notifications",
    icon: "/svgs/message-notif.svg",
    link: "",
  },
  {
    id: 2,
    label: "Files",
    icon: "/svgs/folder.svg",
    link: "",
  },
  {
    id: 3,
    label: "Contacts",
    icon: "/svgs/phone.svg",
    link: "",
  },
  {
    id: 4,
    label: "Messages",
    icon: "/svgs/messages.svg",
    link: "",
  },
  {
    id: 5,
    label: "Users",
    icon: "/svgs/users.svg",
  },
  {
    id: 6,
    label: "Settings",
    icon: "/svgs/gear.svg",
    link: "",
  },
]


const Sidebar = () => {
  return (
    <nav className='dashboard-sidebar w-[400px] h-screen flex'>
      <div className="left-side w-[70px] h-full bg-[#1D1E23]">
        <ul className="icons-container w-full h-auto flex flex-col items-center gap-7 py-5">
          {iconsButtons.map((button) => {
            return (
              <li key={button.id}>
                <Image src={button.icon} width={25} height={25} alt={button.label} />
              </li>
            )
          })}
        </ul>
      </div>
      <div className="right-side w-[80%] h-full bg-[#212229] px-3 py-5">
        {/* HEADER */}
        <div className="heading-container w-full h-auto mb-5">
          <h3 className='text-white text-center'>Messages</h3>
        </div>
        {/* COMPONENTS */}
        <Messages />
      </div>
    </nav>
  )
}

export default Sidebar
