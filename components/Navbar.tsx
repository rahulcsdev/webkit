"use client"

import {useState,useEffect} from 'react'
import {Manrope} from 'next/font/google'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineEmail} from 'react-icons/md'
import {IoNotificationsOutline} from 'react-icons/io5'
import {FiChevronDown} from 'react-icons/fi'
import Image from 'next/image'
import girl from '../assets/girl.jpg'
const manrope=Manrope({subsets:['latin']})
interface Props{
  isScrolling:Boolean
}
const Navbar = (props:Props) => {
 
const {isScrolling}=props;
 
 
  return (
    <div className={`h-[80px] px-5 py-2 flex items-center justify-start transition-all z-10 duration-150 delay-100 ease-linear ${isScrolling?'bg-white drop-shadow-md':'bg-transparent'}  sticky top-0 `} >
       <div className="flex justify-between w-full items-center">
        <h1 className={`text-[#140F49] text-[1.2rem] font-semibold ${manrope.className} `} >Dashboard</h1>
        <div className="flex items-center   justify-center ">
          {/* searchbox */}
          <div className="flex items-stretch  rounded-md drop-shadow-md bg-white ">
            <input className={`bg-transparent border-none px-3 py-2  outline-none`} type='search' placeholder='search..'  />
            <div className={`bg-[#5773FF] text-white rounded-md flex items-center px-3 cursor-pointer`} >
               <HiOutlineSearch className='text-xl' />

            </div>
          </div>
          <div className="border-r-2 border-gray-400 px-5">
            <MdOutlineEmail className={` cursor-pointer text-2xl text-[#605C8D]`} />
          </div>
          <div className="border-r-2 border-gray-400 px-5">
            <IoNotificationsOutline className={`cursor-pointer text-2xl text-[#605C8D]`} />
          </div>
       
          <div className="px-5 flex items-center gap-3 cursor-pointer">
         <Image src={girl} alt='image' className={`rounded-full h-12 w-12`} />
         <h6 className={ `  text-base font-normal text-[#605C8D]`} >
         Savannah Nguyen
         </h6>
         <FiChevronDown className='text-base text-[#605C8D]'/>
          </div>

        </div>
       </div>
    </div>
  )
}

export default Navbar