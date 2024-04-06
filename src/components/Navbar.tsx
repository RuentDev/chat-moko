"use client"
import React, { use, useState } from 'react'
import { Hamburger, ArrowDownButton } from './Buttons';
import NavbarData from '../data/navbardata.json';
import navbarBottomList from '../data/navdata.json';
import CartButton from './Buttons/CartButton';
import UserProfile from './UserProfile/UserProfile';
import Image from 'next/image';
import profile from '../../public/images/ID YOURS logo.png'


const Navbar = () => {
    const [navbarData, setNavbarData] = useState(NavbarData)
    const [menuOpened, setMenuOpened] = useState(true);
    const [isModalClicked, setisModalClicked] = useState(true);

    const toggleNavBar = () => {
        setMenuOpened(!menuOpened);
    }

    const handleClickSubItem = (e: any, id: number) => {

    }

    const handleClickArrowSm = (e: any, id: number) => {

        const listCopy = navbarData.slice()

        listCopy.forEach((item) => {
            if (item.id == id) {
                item.isSelected = !item.isSelected
            }
        })

        setNavbarData(prevState => prevState = listCopy)
    }

    const handleClickArrowLg = (e: any, id: number) => {
        setisModalClicked(false)
        const listCopy = navbarData.slice()

        listCopy.forEach((item) => {
            if (item.id == id) {
                item.isSelected = !item.isSelected
            }
        })

        setNavbarData(prevState => prevState = listCopy)
    }

    return (
        <nav className='fixed w-full bg-yellow-400 z-[1000]'>
            <div className='flex justify-between w-full mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='w-full flex items-center justify-between h-14'>
                    {/* Navbar Items Container */}
                    <Hamburger
                        onClick={toggleNavBar}
                        className='lg:hidden'
                    />
                    {/* LEFT SIDE LOGO */}
                    <div className='image-container flex justify-center items-center w-[80px] h-[45px] ml-20' >
                        <Image src={profile} alt="" className='w-auto h-auto' width={100} height={100} priority />
                    </div>
                    {/* CENTER NAVITEMS */}
                    <div className='flex flex-row gap-x-10'>
                        {navbarData.map((item) => (
                            <ul
                                key={item.id}
                                className='hidden lg:block uppercase'
                            >
                                {item.label}
                                <ArrowDownButton onClick={(e: any) => handleClickArrowLg(e, item.id)} />

                                {/* Dropdown Sub Items */}
                                <div className={isModalClicked ? "overflow-hidden lg:block flex flex-col fixed top-1/2 opacity-0 w-[15 %] h-[50%] rounded-lg bg-[#836C46B8] shadow-lg shadow-black backdrop-blur-3xl p-10 ease-in -translate-y-full transition-all" :
                                    "overflow-hidden lg:block flex flex-col fixed top-16 w-[15 %] h-[50%] rounded-lg bg-[#836C46B8] shadow-lg shadow-black opacity-85 backdrop-blur-3xl p-10 duration-300 ease-in -translate-y-0 transition-all"}>
                                    <ul className=''>
                                        {item.isSelected && item.subItems?.map((subItem) => {
                                            return (
                                                <li
                                                    className='mt-2 cursor-pointer font-medium text-sm normal-case text-white'
                                                    key={subItem.id}
                                                    onClick={(e) => handleClickSubItem(e, subItem.id)}
                                                >
                                                    {subItem.label}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </ul>
                        ))}
                        {navbarBottomList.map((item) => (
                            <ul
                                key={item.id}
                                className='hidden cursor-pointer text-white lg:block'
                            >
                                {item.label}
                            </ul>
                        ))}
                    </div>

                    {/* RIGHT SIDE USER PROFILE */}
                    <div className='flex justify-center items-center'>
                        <CartButton />
                    </div>

                    <div className='lg:block '>
                        <UserProfile />
                    </div>

                    {/* Sidebar for Mobile/Small Screen */}

                    <div className={menuOpened ? "sidebar-container z-50 overflow-hidden lg:hidden fixed -left-2 lg:left-7 top-16 lg:w-[20%] w-[96%] h-[92%] rounded-lg bg-[#836C46B8] shadow-lg shadow-black p-10 duration-500 ease-out -translate-x-full transition-all" :
                        "overflow-hidden lg:hidden fixed left-2 lg:left-7 top-16 lg:w-[20%] w-[96%] h-[92%] rounded-2xl bg-[#816636] bg-opacity-[80%] shadow-md shadow-black p-10 duration-500 ease-out -translate-x-0 transition-all"}>
                        <div className='py-2 text-[#413923] font-medium text-lg font-sans'>
                            {navbarData.map((item) => (
                                <ul
                                    key={item.id}
                                >
                                    <div className='flex flex-col mt-5'>
                                        <div className='flex justify-between uppercase'>
                                            {item.label}
                                            <ArrowDownButton
                                                className='min-w-[60px] h-[50px] -translate-x-30 -translate-y-3'
                                                onClick={(e: any) => handleClickArrowSm(e, item.id)} />
                                        </div>
                                        <div className='flex flex-col ml-10 -mt-5 justify-between h-full w-screen text-white'>
                                            <ul className=''>
                                                {item.isSelected && item.subItems?.map((subItem) => {
                                                    return (
                                                        <li
                                                            className='mt-2 cursor-pointer font-medium text-sm'
                                                            key={subItem.id}
                                                            onClick={(e) => handleClickSubItem(e, subItem.id)}
                                                        >
                                                            {subItem.label}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            ))}
                            {navbarBottomList.map((item) => (
                                <ul
                                    key={item.id}
                                >
                                    <div className='flex flex-col mt-5 text-white cursor-pointer'>
                                        {item.label}
                                    </div>
                                </ul>
                            ))}

                        </div>
                    </div>

                </div>
            </div>

        </nav>
    )
}

export default Navbar