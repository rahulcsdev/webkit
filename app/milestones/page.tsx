"use client";
import client from "@/apolloClient";
import dynamic from "next/dynamic";
 
import { MILESTONE_QUERY, getMilestone } from "@/services";
import { useQuery } from "@apollo/client";
import { Pagination } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SecondNav from "@/components/SecondNav";
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
const ModalMs = dynamic(() => import("@/components/milestone/ModalMs"));
 
const EditModalMs = dynamic(
  () => import("../../components/milestone/EditModalMs")
);
 
const ContentPart = dynamic(() => import("@/components/milestone/ContentPart"));

const MildStone = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const ITEMS_PER_PAGE = 9;
  const INITIAL_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [viewMode, setViewMode] = useState(true);
  const [status, setStatus] = useState("all");
  const [total, setTotal] = useState(0);
  const [mileData, setMileData] = useState([])
  const [selectedFeild, setSelectedFeild] = useState<string | null>();

  const openDetails = (id: string) => {
 
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
          skip: (currentPage - 1) * 9,
          take: 9,
        }: {
          skip: (currentPage - 1) * 9,
          take: 9,
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
         query:MILESTONE_QUERY,
       
         variables:status==='all'?{}:{
           "where": {
             "status": {
               "equals": status
             }
           }
         },
         
       }).then(({data})=>{
   
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
        
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
      
        <SecondNav
          setShowModal={setShowModal}
          setStatus={setStatus}
          setCurrentPage={setCurrentPage}
          setViewMode={setViewMode}
          status={status}
          viewMode={viewMode}
          title="Milestone"
        />
        {/* View Parts */}
        <ContentPart
         
         openDetails={openDetails}
         milestones={mileData}
         loading={loading}
         viewMode={viewMode}
        />
              <div className="my-5 flex items-center justify-center">

<Pagination total={totalPages}   onChange={handlePageChange} value={currentPage} />
</div>
 {
  showModal &&<ModalMs refetch={refetch} showModal={showModal} handleCloseModal={handleCloseModal} />
 }
      </div>

      {selectedFeild && (
        <EditModalMs
          selectedFeild={selectedFeild}
          showModal={showModalEdit}
          handleCloseModal={handleCloseModalEdit}
        />
      )}
    </LayoutNav>
  );
};

export default MildStone;