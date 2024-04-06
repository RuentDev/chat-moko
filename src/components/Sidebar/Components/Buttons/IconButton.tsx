"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setSelectedIcon } from '@/app-redux/features/navigationSlice'


interface IconButtonProps {
  icon: string
  size: number
  label: string
  link?: string
}

const IconButton = (props: IconButtonProps) => {

  const router = useRouter();
  const dispatch = useDispatch();


  const handleOnClick = (e: any) => {
    e.preventDefault()
    dispatch(setSelectedIcon(props.label  ))
    if(props.link){
      router.push(props.link)
    }
  }

  return (
    <button
      onClick={handleOnClick}
      className='sidebar-icon-button flex items-center justify-center'
    >
      <Image src={props.icon} alt='button-icon' height={props.size} width={props.size} />
    </button>
  )
}

export default IconButton