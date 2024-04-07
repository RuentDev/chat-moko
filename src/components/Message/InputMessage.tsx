import React from "react";
import Icon from "../Icon";

const InputMessage = () => {
  return (
    <div className='chat-bottom-container w-full h-auto bg-[#282832] p-5 flex'>
      <div className='input-container flex items-center w-full h-auto bg-[#212229] rounded-full'>
        <div className='input-items flex justify-between w-full p-5'>
          {/* Left Items */}
          <div className='left-items w-full flex justify-start'>
            <Icon
              icon={{ prefix: 'fas', iconName: 'microphone' }}
              color='white'
              width={20}
              height={20}
            />
            <input
              placeholder='Add a comment...'
              type='text'
              className='ml-2 mr-5 outline-none w-full bg-transparent text-white'
            />
          </div>

          {/* Right Items */}
          <div className='right-items w-auto flex justify-end gap-3'>
            <Icon
              icon={{ prefix: 'fas', iconName: 'image' }}
              color='white'
              width={20}
              height={20}
            />

            <Icon
              icon={{ prefix: 'fas', iconName: 'face-smile' }}
              color='white'
              width={20}
              height={20}
            />
            <Icon
              icon={{ prefix: 'fas', iconName: 'location-arrow' }}
              color='white'
              width={20}
              height={20}
            />
            <Icon
              icon={{ prefix: 'fas', iconName: 'location-dot' }}
              color="white"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
