import React from 'react'

const MessagesCard = () => {
  return (
    <div className='message-card p-5'>
      <div className="container flex gap-3">
        {/* PROFILE ICON */}
        <div className="image-container w-[50px] h-[50px] rounded-full bg-blue-200 flex items-center justify-center">
          {/* IMAGE */}
          JD
        </div>
        <div className="chat-details w-auto h-auto flex justify-center item-center gap-2">
          {/* NAME */}
          <div className="name text-white text-sm font-semibold">John Doe</div>
          {/* DATE */}
          <div className="time text-white text-xs">14:00 PM</div>
        </div>
      </div>
      {/* MESSAGE */}
    </div>
  )
}

export default MessagesCard
