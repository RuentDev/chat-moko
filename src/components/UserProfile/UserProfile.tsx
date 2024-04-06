'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../../public/images/ID YOURS logo.png'

interface UserIconProps {
    image?: string
}

const UserProfile = (props: UserIconProps) => {
    return (
        <div className='user-profile-container w-[40px] h-[40px] bg-white rounded-full'>
            <div className='image-container relative w-full h-full' >
                <Image src='user-icon.svg' alt="" className='absolute w-auto h-auto' width={100} height={100} priority />
            </div>
        </div>
    )
}

export default UserProfile