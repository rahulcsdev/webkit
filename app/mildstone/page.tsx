"use client"
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";

const Mildstone = () => {
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
    <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
    <Navbar isScrolling={isScrolling} />
         

    </div>
  )
}

export default Mildstone