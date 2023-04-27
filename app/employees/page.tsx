"use client"
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalEmployee from "../../components/ModalEmployee";


const manrope = Manrope({ subsets: ["latin"] });

const Employees = () => {
    const myDivRef = useRef<any>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
  
    const handleDateChange = (date: Date) => {
      setDate(date);
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const { current: myDiv } = myDivRef;
        if (myDiv.scrollTop > 0) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      };
  
      const { current: myDiv } = myDivRef;
      myDiv.addEventListener("scroll", handleScroll);
  
      return () => {
        myDiv.removeEventListener("scroll", handleScroll);
      };
    }, [myDivRef]);
  
    const [isExpand, setIsExpand] = useState(false);
     const [value,setValue]=useState('progress');
     const [showModal, setShowModal] = useState(false);
  
  function handleCloseModal(){
    setShowModal(false);
  }
  return (
    <>
     <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
    <Navbar isScrolling={isScrolling} />
    <div className="px-5 py-6">
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Your Projects
            </h1>
            <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
              <div className="p-2 rounded-full cursor-pointer bg-[#5773FF] text-xl text-white">
                <RxDashboard/>
              </div>
              <div className="p-2 text-xl  cursor-pointer rounded-full bg-gray-100 text-black">
                <HiBars3/>
              </div>
            </div>
             <div className="relative">
              <button onClick={()=>setShowModal(true)} className={`bg-[#5773FF] text-white px-3 py-2 rounded-lg capitalize`} >new project</button>
             </div>
            
            </div>
           
          </div>
        </div>
      </div>
      <ModalEmployee showModal={showModal} handleCloseModal={handleCloseModal} />

     {/* Employee Cards */}

     <div className="px-5 py-6">
     <div className="p-5 max-w-lg bg-white drop-shadow-md rounded-xl">
        <h4>Rubin Franci</h4>
        <p>rubinfranci@gmail.com</p>
        <div>
          <div></div>
        </div>
       <div className="border border-black">
       <button>Message</button>
       </div>
      </div>
     </div>

    </div>
    </>    
  )
}

export default Employees