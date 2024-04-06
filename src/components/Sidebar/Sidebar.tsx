"use client"
import React from 'react'
import IconButton from './Components/Buttons/IconButton'
import iconButtons from '@/data/iconButtons.json'
import { useSelector } from 'react-redux'
import { RootState } from '@/app-redux/store'


const Sidebar = () => {

  const selectedIcon = useSelector((state: RootState) => state.navigation.selectedIcon)

  return (
    <nav className='dashboard-sidebar w-[400px] h-full flex'>
      <div className="left-side w-[70px] h-full bg-[#1D1E23]">
        <ul className="icons-container w-full h-auto flex flex-col items-center gap-7 py-5">
          {iconButtons.map((button) => {
            return (
              <li key={button.id}>
                <IconButton label={button.label} icon={button.icon} size={25} link={button.link}/>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="right-side w-full h-auto bg-[#212229] px-3 py-5">
        {/* HEADER */}
        <div className="heading-container w-full h-auto mb-5">
          <h3 className='text-white text-center'>{selectedIcon.replace("/", "")}</h3>
        </div>

        {/* COMPONENTS */}  

      </div>
    </nav>
  )
}

export default Sidebar
