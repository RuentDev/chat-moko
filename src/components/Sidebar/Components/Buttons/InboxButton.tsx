import React from 'react'

const InboxButton = () => {
  return (
    <div className='inbox-button w-full h-auto flex gap-2 py-2'>
      {/* Image Container */}
      <div className="image-container w-[50px] h-[50px] flex items-center justify-center relative text-white rounded-full bg-red-500">
        JD
      </div>
      {/* Name Container */}
      <div className="name-container">
        <p>John Doe</p>
        <p className='text-xs italic text-green-500'>John Typing...</p>
      </div>
      {/* Time Container */}
    </div>
  )
}

export default InboxButton