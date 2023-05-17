import { dropDown } from '@/utils/data'
import { Manrope } from 'next/font/google';
import React from 'react'
import { HiBars3 } from 'react-icons/hi2';
import { RxDashboard } from 'react-icons/rx';


interface typesProps{
    setStatus:any;
    status:string;
    setViewMode:any;
    viewMode:Boolean;
    setShowModal:any;
    title:string
}
const manrope = Manrope({ subsets: ["latin"] });
const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
const SecondNav:React.FC<typesProps> = ({setStatus,status,viewMode,setViewMode,setShowModal,title}) => {
  return (
    <div className="px-5 py-3 bg-white drop-shadow-md rounded-xl">
    <div className="flex items-center justify-between">
      <h1
        className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
      >
        Your {title}
      </h1> 
      <div className="flex items-center gap-4 justify-center">
        <div className="relative">
          <div
            className={`bg-gray-100 px-3   rounded-xl flex items-center gap-1 cursor-pointer`}
          
          >
            <p className="font-semibold text-base text-[#605C8D]">Status :</p>
            <select  value={status}  onChange={(e)=>setStatus(e.target.value)} className={`capitalize bg-transparent max-w-xl outline-none border-none`} >
            {
              dropDown.map((item,index)=>(
                <option key={index} defaultValue='progress' value={item.value} className={`px-2 py-1`} >{item.label}</option>
              ))
            }
            </select>
          
          
          </div>
    
        </div>
        <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
          <div
            onClick={() => setViewMode(true)}
            className={`p-2 rounded-full cursor-pointer  text-xl ${
              viewMode ? clickS : notClickS
            } `}
          >
            <RxDashboard />
          </div>
          <div
            onClick={() => setViewMode(false)}
            className={`p-2 text-xl  cursor-pointer rounded-full ${
              !viewMode ? clickS : notClickS
            } `}
          >
            <HiBars3 />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowModal(true)}
            className={`${clickS} px-3 py-2 rounded-lg capitalize`}
          >
            new {title}
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SecondNav