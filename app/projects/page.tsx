"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/ModalProject";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardCol from "@/components/ProjectCardCol";
import Footer from "@/components/Footer";
import LayoutNav from "@/components/LayoutNav";
const manrope = Manrope({ subsets: ["latin"] });
const Projects = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const handleDateChange = (date: Date) => {
    setDate(date);
  };

 

  function handleCloseModal() {
    setShowModal(false);
  }
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
 <LayoutNav>
 <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
            >
              Your Projects
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative">
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
                {isExpand && (
                  <div className="mt-2 absolute -bottom-28 p-3 left-0 rounded-xl flex bg-white drop-shadow-lg flex-col gap-2">
                    {dropDown.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setValue(item.value)}
                        className=" flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                      >
                        {item.icon}
                        <h1 className="">{item.name}</h1>
                      </div>
                    ))}
                  </div>
                )}
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
                  new project
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {viewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {projectsData.map((data, index) => (
                <ProjectCard key={index} data={data} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
              {projectsData.map((data, index) => (
                <ProjectCardCol key={index} data={data} />
              ))}
            </div>
          )}
        </div>
      </div>
   <ModalProject showModal={showModal} handleCloseModal={handleCloseModal} />
   <Footer/>
 </LayoutNav>
     

   
  );
};

export default Projects;
