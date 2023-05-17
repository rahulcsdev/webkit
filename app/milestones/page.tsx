"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const LayoutNav = dynamic(() => import("@/components/LayoutNav"))
const ModalMs = dynamic(() => import("../../components/milestone/ModalMs"))
const MsCardGrid = dynamic(() => import("../../components/milestone/MsCardGrid"))
const MsCardCol = dynamic(() => import("../../components/milestone/MsCardCol"))
const EditModalMs = dynamic(() => import("../../components/milestone/EditModalMs"))
 
import { dropDown } from "../../utils/data";
import { Manrope } from "next/font/google";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
 
import client from "@/apolloClient";
import { getMilestone } from "@/services";
import { useQuery } from "@apollo/client";
import { Pagination } from "@mantine/core";

const manrope = Manrope({ subsets: ["latin"] });
const MildStone = () => {
 
  const ITEMS_PER_PAGE = 9;
const INITIAL_PAGE = 1;
const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState(true);
  const [status, setStatus] = useState('all')
  const [selectedFeild, setSelectedFeild] = useState<string | null >()
  const [mileData, setMileData] = useState([])
  const openDetails = (id: string) => {
    console.log(id)
    setSelectedFeild(id);
    setShowModalEdit(true);
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setSelectedFeild(null);
    setShowModalEdit(false);
  }
 
const { data, loading, error,refetch } = useQuery(getMilestone, {
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
  },
});
const handlePageChange = (page:any) => {
  setCurrentPage(page);
};

const fetchData=async()=>{
 
  client.query({
   query:getMilestone,
 
   variables:status==='all'?{}:{
     "where": {
       "status": {
         "equals": status
       }
     }
   },
   
 }).then(({data})=>{
  //  console.log(data);
 setTotal(data?.milestones?.length);
 })

}

useEffect(()=>{
fetchData();
},[status,currentPage]);

useEffect(()=>{
  setMileData(data?.milestones);
},[data,loading]);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const visibleTotal = currentPage === totalPages ? total % ITEMS_PER_PAGE : ITEMS_PER_PAGE;

  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="px-5 py-3 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.3em] font-bold ${manrope.className} `}
            >
              Your Milestones
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative">
                <div
                  className={`bg-gray-100 px-3   rounded-xl flex items-center gap-1 cursor-pointer`}
                  
                >
                  <p className="font-semibold text-base text-[#605C8D]">
                    Status :
                  </p>
                  <select
                  value={status}
                  onChange={(e)=>setStatus(e.target.value)}
                    className={`capitalize bg-transparent  outline-none border-none`}
                  >
                    {dropDown.map((item, index) => (
                      <option
                        key={index}
                        defaultValue="progress"
                        value={item.value}
                        className={`px-2 py-1`}
                      >
                        {item.label}
                      </option>
                    ))}
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
                  new Milestones
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Parts */}
        <div className="mt-5">
          {loading?<h1 className="">Loading...</h1>:mileData?.length===0?<h1 className="">No Data found</h1>:viewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
             {
              mileData?.map((item,index)=>(
                <MsCardGrid key={index} openDetails={openDetails} data={item} />

              ))
             }
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
                {
              mileData?.map((item,index)=>(
                <MsCardCol key={index} openDetails={openDetails} data={item} />

              ))
             }
            </div>
          )}
        </div>
        <div className="my-5 flex items-center justify-center">

<Pagination total={totalPages}   onChange={handlePageChange} value={currentPage} />
</div>
        
      </div>
      <ModalMs refetch={refetch} showModal={showModal} handleCloseModal={handleCloseModal} />
     {selectedFeild && <EditModalMs selectedFeild={selectedFeild} showModal={showModalEdit} handleCloseModal={handleCloseModalEdit}/>} 
    </LayoutNav>
  );
};

export default MildStone;
