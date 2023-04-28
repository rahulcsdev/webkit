"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import ModalTasks from "../../components/ModalTasks";
import CardTask from "../../components/CardTask";
const Tasks = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
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

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
      <Navbar isScrolling={isScrolling} />
      <div className="rounded-3xl flex items-center w-[95%] mx-auto p-4   justify-between shadow-xl  ">
        <h1 className="font-semibold">Your Task</h1>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-2xl"
            onClick={() => setShowModal(true)}
          >
            New task
          </button>
        </div>
      </div>
      <ModalTasks showModal={showModal} handleCloseModal={handleCloseModal} />

      <div className="bg-white p-4 mt-4 shadow-md w-[95%] mx-auto rounded-3xl">
        <CardTask heading="heading" />
        <CardTask heading="heading" />
      </div>
    </div>
  );
};

export default Tasks;
