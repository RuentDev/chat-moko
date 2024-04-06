'use client'
import React from 'react';
import Image from 'next/image';

interface CaptureButtonProps {
    onClick?: () => void;
}

const CaptureButton = (props: CaptureButtonProps) => {
    return (
        <button
            className='flex items-center justify-center bg-gradient-to-b from-[#FFB029] to-[#FFCD29] w-[55px] h-55px] rounded-full border-[#FFA929] border-[3px] p-2 shadow-md shadow-gray-500/30 '
            onClick={props.onClick}
        >
            <Image className='invert w-auto h-auto' src="camera.svg" width={50} height={50} alt='camera' />
        </button>
    )
}

export default CaptureButton