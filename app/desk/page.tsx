"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown } from "../utils/data";
import { deskDropDown, deskCarousalData } from "../utils/data";
import { Popover, Button } from "@mantine/core";

import {
  FiChevronDown,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../components/ModalProject";
import DeskCarousal from "../components/DeskCarousel";
import DeskCardCarousal from "../components/DeskCardCarousel";

const manrope = Manrope({ subsets: ["latin"] });
const Desk = () => {
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
  const [isDeskExpand, setisDeskExpand] = useState(false);
  const [isDeskExpand1, setisDeskExpand1] = useState(false);
  const [isDeskExpand2, setisDeskExpand2] = useState(false);
  const [value, setValue] = useState("progress");
  const [deskValue, setdeskValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [opened, setOpened] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
      <Navbar isScrolling={isScrolling} />
      <div className="px-5 py-6">
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Desk
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative z-40 ... ">
                <Popover opened={isExpand} onChange={setIsExpand} withinPortal>
                  <Popover.Target>
                    <div
                      className={`bg-gray-100 px-3 p-2  rounded-xl flex items-center gap-1 cursor-pointer`}
                      onClick={() => setIsExpand((prev) => !prev)}
                    >
                      <p className="capitalize text-sm text-[#605C8D]">
                        {" "}
                        <span className="font-semibold text-base text-[#605C8D]">
                          Stauts
                        </span>{" "}
                        : {value}
                      </p>{" "}
                      {!isExpand ? <FiChevronRight /> : <FiChevronDown />}
                    </div>
                  </Popover.Target>

                  <Popover.Dropdown >
                    {dropDown.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setdeskValue(item.value)}
                        className="p-1 ... flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                      >
                        {item.icon}
                        <h1 className="">{item.name}</h1>
                      </div>
                    ))}
                  </Popover.Dropdown>
                </Popover>
              </div>
              <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
                <div className="p-2 rounded-full cursor-pointer bg-[#5773FF] text-xl text-white">
                  <RxDashboard />
                </div>
                <div className="p-2 text-xl  cursor-pointer rounded-full bg-gray-100 text-black">
                  <HiBars3 />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowModal(true)}
                  className={`bg-[#5773FF] text-white px-3 py-2 rounded-lg capitalize`}
                >
                  new project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white drop-shadow-md rounded-xl ]">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Open Projects ( 05 )
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <Popover
                opened={isDeskExpand}
                onChange={setisDeskExpand}
                withinPortal
              >
                <Popover.Target>
                  <div className="">
                    <FiMoreHorizontal
                      className="cursor-pointer"
                      onClick={() => setisDeskExpand((prev) => !prev)}
                    />
                  </div>
                </Popover.Target>

                <Popover.Dropdown >
                  {deskDropDown.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setdeskValue(item.value)}
                      className="p-1 ... flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                    >
                      {item.icon}
                      <h1 className="">{item.name}</h1>
                    </div>
                  ))}
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white drop-shadow-md rounded-xl relative ...">
          <div className="flex items-center justify-between relative ...">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              In Progress ( 03 )
            </h1>
            <div className="flex items-center gap-4 justify-center relative ...">
              <Popover
                opened={isDeskExpand1}
                onChange={setisDeskExpand1}
                withinPortal
              >
                <Popover.Target>
                  <div className="">
                    <FiMoreHorizontal
                      className="cursor-pointer"
                      onClick={() => setisDeskExpand1((prev) => !prev)}
                    />
                  </div>
                </Popover.Target>

                <Popover.Dropdown className="">
                  {deskDropDown.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setdeskValue(item.value)}
                      className="p-1 ... flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                    >
                      {item.icon}
                      <h1 className="">{item.name}</h1>
                    </div>
                  ))}
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white drop-shadow-md rounded-xl ">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Compeleted ( 05 )
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <Popover
                opened={isDeskExpand2}
                onChange={setisDeskExpand2}
                withinPortal
              >
                <Popover.Target>
                  <div className="">
                    <FiMoreHorizontal
                      className="cursor-pointer"
                      onClick={() => setisDeskExpand2((prev) => !prev)}
                    />
                  </div>
                </Popover.Target>

                <Popover.Dropdown className="">
                  {deskDropDown.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setdeskValue(item.value)}
                      className="p-1 ... flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                    >
                      {item.icon}
                      <h1 className="">{item.name}</h1>
                    </div>
                  ))}
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2">
        {/* Carousal part */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-1">
          {deskCarousalData.map((item, index) => (
            <DeskCardCarousal key={index} data={item} />
          ))}
        </div>
        <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Desk;
