"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app-redux/store'
import Messages from './Components/Messages'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import iconButtons from '@/data/iconButtons.json'
import IconButton from './Components/Buttons/IconButton'
import { setSelectedIcon } from '@/app-redux/features/navigationSlice'

const Sidebar = () => {

  const [buttons, setButtons] = useState(iconButtons)

  const selectedIcon = useSelector((state: RootState) => state.navigation.selectedIcon)
  const router = useRouter();
  const dispatch = useDispatch();


  const handleOnClick = (e: any, button: any) => {
    e.preventDefault()
    const buttonCopy = iconButtons.slice()
    
    buttonCopy.forEach((item) => {
      if(item.id === button.id){
        item.isActive = true
        dispatch(setSelectedIcon(item.label.toUpperCase()))
        router.push(item.link)
      }else{
        item.isActive = false
      }
    })

    setButtons(buttonCopy)

  }


  return (
    <nav className='dashboard-sidebar w-auto h-full flex'>
      <div className="left-side w-[70px] h-full bg-[#1D1E23]">
        <ul className="icons-container w-full h-auto flex flex-col items-center gap-5 py-3">
          {iconButtons.map((button) => {
            return (
              <li key={button.id}>
                <IconButton {...button} onClick={(e: any) => handleOnClick(e, button)} size={20} />
              </li>
            )
          })}
        </ul>
      </div>
      <div className="right-side w-[330px] h-auto bg-[#212229] px-3 py-5">
        {/* HEADER */}
        <div className="heading-container w-full h-auto mb-5">
          <h3 className='text-white text-center'>{selectedIcon.replace("/", "")}</h3>
        </div>

        {/* COMPONENTS */}  
        {selectedIcon.toLowerCase() === "messages" ? <Messages /> : null}
      </div>
    </nav>
  )
}

export default Sidebar
