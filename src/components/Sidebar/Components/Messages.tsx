import Icon from '@/components/Icon'
import React from 'react'

const Messages = () => {
  return (
    <div className='sidebar-messages-component w-full h-auto'>
      {/* SEARCH BAR */}
      <div className="search-box-container w-full h-auto flex items-center justify-center bg-[#141619] p-2 rounded-md">
        <Icon icon={["fas", "magnifying-glass"]} width={20} height={20} color='white' />
        <input type="text" className="block w-full h-auto bg-transparent text-white text-sm search-box outline-none p-1" placeholder='Search...' />
      </div>
      <div className="messages-container w-full h-auto">
        {/* PINNED MESSAGES */}
        <ul className="pinned-messages">

        </ul>
        {/* ALL MESSAGES */}
        <ul className="all-messages">

        </ul>
      </div>

    </div>
  )
}

export default Messages
