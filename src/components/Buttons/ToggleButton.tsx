'use client'
import React, { useState } from 'react';

interface ToggleButtonProps {
  onToggle?: (value: boolean) => void
  value?: boolean
}

const ToggleButton = (props: ToggleButtonProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = (cb?: (v: any) => any, value?: boolean) => {
    setIsChecked(prev => {
      const newState = !prev;

      if (cb) {
        cb(value)
      }

      return newState
    });

  };


  return (
    <button
      onClick={() => toggleSwitch(props.onToggle, isChecked)}
      className={`absolute flex items-center justify-between px-3 h-8 rounded-full w-40 bg-[#696969] ${isChecked ? 'bg-[#696969]' : 'bg-[#696969]'
        }`}
    >
      <span
        className={`absolute flex items-center justify-center text-xs left-0 w-20 h-8 text-white font-bold bg-[#FFCD29] rounded-full shadow transform transition-transform ${isChecked ? 'translate-x-full' : ''
          }`}
      >
        {!isChecked ? 'Try On' : '360 View'}
      </span>
      <span className={`flex items-center justify-between text-xs font-bold ${isChecked ? 'text-[#9D9898]' : ''}`}>
        {isChecked && 'Try On'}
      </span>
      <span className={`flex items-center justify-between text-xs font-bold ${isChecked ? '' : 'text-[#9D9898]'}`}>
        {!isChecked && '360 View'}
      </span>

    </button>

  );
};

export default ToggleButton;
