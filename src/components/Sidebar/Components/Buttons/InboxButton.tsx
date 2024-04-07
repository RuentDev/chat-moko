import React from 'react'




const InboxButton = () => {
  return (
    <div className='inbox-button w-full h-auto flex justify-between py-2 cursor-pointer'>
      <div className="image-name-container w-full h-auto flex gap-2">
        {/* Image Container */}
        <div className="image-container w-[50px] h-[50px] flex items-center justify-center relative text-white rounded-full bg-red-500">
          JD
        </div>
        {/* Name Container */}
        <div className="name-container">
          <p>John Doe</p>
          <p className='text-xs italic text-green-500'>John Typing...</p>
        </div>
      </div>
      {/* Time Container */}
      <div className="time-container w-auto h-full flex flex-col justify-center items-center">
        <p className='text-white text-xs block w-[60px] h-full'>12:00 PM</p>
        <p className='unread-count w-3 h-3 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>2</p>
      </div>
    </div>
  )
}

export default InboxButton