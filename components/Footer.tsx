import React from 'react'
import { Roboto } from 'next/font/google'
const roboto=Roboto({weight:'400',subsets:['latin']})
const Footer = () => {
  return (
    <div className='bg-white px-4 py-2 w-full drop-shadow-sm'>
        <div className={`flex justify-between items-center ${roboto.className} `}>
            <div className="flex items-center gap-3 text-[#605C8D] text-base">
                <p className="">Privacy Policy </p>
                <p className="">Terms of Use</p>
            </div>
            <div className="flex items-center gap-1">
                <p className="text-[#605C8D] text-base">2023©</p>
                <p className="text-[#5773FF]">Webkit.</p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer