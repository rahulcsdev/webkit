"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../utils/data";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../components/ModalProject";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectCardCol from "@/app/components/ProjectCardCol";
import Footer from "@/app/components/Footer";
import LayoutNav from "@/app/components/LayoutNav";
import EditModalProject from "@/app/components/EditModalProject";
 
const manrope = Manrope({ subsets: ["latin"] });
const Projects = () => {
 
  const [isExpand, setIsExpand] = useState(false);
 
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  
  const [viewMode, setViewMode] = useState(true);
 
  const [selectedFeild, setSelectedFeild] = useState<string>()
 const openDetails=(title:string)=>{
   setSelectedFeild(title)
   setShowModalEdit(true);

 }

  function handleCloseModal() {
    setShowModal(false);
  }
  
  function handleCloseModalEdit() {
    setShowModalEdit(false);
  }
  
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
 <LayoutNav>
 <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="px-5 py-3 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
            >
              Your Projects
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative">
                <div
                  className={`bg-gray-100 px-3   rounded-xl flex items-center gap-1 cursor-pointer`}
                  onClick={() => setIsExpand((prev) => !prev)}
                >
                  <p className="font-semibold text-base text-[#605C8D]">Status :</p>
                  <select className={`capitalize bg-transparent  outline-none border-none`} >
                  {
                    dropDown.map((item,index)=>(
                      <option key={index} defaultValue='progress' value={item.value} className={`px-2 py-1`} >{item.name}</option>
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
                <ProjectCard  openDetais={openDetails}  key={index} data={data} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
              {projectsData.map((data, index) => (
                <ProjectCardCol openDetails={openDetails}  key={index} data={data} />
              ))}
            </div>
          )}
        </div>
      </div>
   <ModalProject  showModal={showModal} handleCloseModal={handleCloseModal} />
   <EditModalProject title={selectedFeild} showModal={showModalEdit} handleCloseModal={handleCloseModalEdit}/>
     
   <Footer/>
 </LayoutNav>
     

   
  );
};

export default Projects;
