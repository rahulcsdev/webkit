"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/ModalProject";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCol from "../../components/ProjectCardCol";
import Footer from "../../components/Footer";
import LayoutNav from "../../components/LayoutNav";
const manrope = Manrope({ subsets: ["latin"] });
import {useRouter} from 'next/navigation'
const Projects = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  const router = useRouter()

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
              Time Entries
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative">
                <button
                  onClick={() => router.push('/addtimeline') }
                  className={`${clickS} px-3 py-2 rounded-lg capitalize`}
                >
                 New Time Entry

                </button>
              </div>
            </div>
          </div>
        </div>

 
      </div>
   <ModalProject showModal={showModal} handleCloseModal={handleCloseModal} />
   <Footer/>
 </LayoutNav>
     

   
  );
};

export default Projects;
