"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown } from "../../utils/data";
import {Pagination} from '@mantine/core'
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/project/ModalProject";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectCardCol from "@/components/project/ProjectCardCol";
import Footer from "@/components/Footer";
import LayoutNav from "@/components/LayoutNav";
import EditModalProject from "@/components/project/EditModalProject";
import client from '../../apolloClient/index'
import { gql, useQuery } from "@apollo/client";
import { getProjectList } from "@/services";
const manrope = Manrope({ subsets: ["latin"] });



const Projects = () => {
  
const ITEMS_PER_PAGE = 9;
const INITIAL_PAGE = 1;
const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [status, setStatus] = useState('all')
  const [viewMode, setViewMode] = useState(true);
  const [total, setTotal] = useState(0);

// Condition for status
 


  const { data, loading, error,refetch } = useQuery(getProjectList, {
    client,
    variables:status==='all'? {
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }: {
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
       "where": {
        "status": {
          "equals": status
        }
      }
    }
  });
  // Without all
  // const { data, loading, error } = useQuery(getProjectList, {
  //   client,
  //   variables:{
  //     skip: (currentPage - 1) * ITEMS_PER_PAGE,
  //     take: ITEMS_PER_PAGE,
  //      "where": {
  //       "status": {
  //         "equals": status
  //       }
  //     }
  //   }
  // });
 
  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };
 
  
 
  const fetchData=async()=>{
 
       client.query({
        query:getProjectList,
      
        variables:status==='all'?{}:{
          "where": {
            "status": {
              "equals": status
            }
          }
        },
        
      }).then(({data})=>{
        console.log(data);
      setTotal(data?.projects?.length);
      })
  
  }

  useEffect(()=>{
    fetchData();
    // refetch()
  },[status,currentPage]);


  useEffect(()=>{
    console.log(data)
    setProjects(data?.projects);
  },[data,loading]);
  
 

 
  const [selectedFeild, setSelectedFeild] = useState<string | null >()
 const openDetails=(title:string)=>{
   setSelectedFeild(title)
   setShowModalEdit(true);

 }
 
  function handleCloseModal() {
    setShowModal(false);
   
  }
  
  function handleCloseModalEdit() {
    setShowModalEdit(false);
    setSelectedFeild(null);
  }
  // console.log(total)
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const visibleTotal = currentPage === totalPages ? total % ITEMS_PER_PAGE : ITEMS_PER_PAGE;
  // console.log(visibleTotal)
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
                  new project
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {loading?<h1 className="">Loading...</h1>:projects?.length==0?<h1 className="">No Data found</h1>:viewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {projects?.map((data, index) => (
                <ProjectCard  openDetais={openDetails}  key={index} data={data} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
              {projects?.map((data, index) => (
                <ProjectCardCol openDetais={openDetails}  key={index} data={data}  />
              ))}
            </div>
          )}
        </div>
       <div className="my-5 flex items-center justify-center">

         <Pagination total={totalPages}   onChange={handlePageChange} value={currentPage} />
       </div>
      
 
       
   
      </div>
   <ModalProject refetch={refetch}   showModal={showModal} handleCloseModal={handleCloseModal}  />
  {selectedFeild&& <EditModalProject   id={selectedFeild} showModal={showModalEdit} handleCloseModal={handleCloseModalEdit}/> } 
     
   
 </LayoutNav>
     

   
  );
};

export default Projects;
