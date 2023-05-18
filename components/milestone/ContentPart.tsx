import client from '@/apolloClient';
import { getMilestone } from '@/services';
import { useQuery } from '@apollo/client';
import { Pagination } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import ModalMs from './ModalMs';
import dynamic from 'next/dynamic';
const MsCardGrid = dynamic(() => import("./MsCardGrid"));
const MsCardCol = dynamic(() => import('./MsCardCol'));
 
interface props {
    viewMode: Boolean;
    openDetails: any;
    openViewMode: any;
    status: string;
    showModal:any;
    handleCloseModal:any;
  }
const ContentPart:React.FC<props> = ({  viewMode,
    openDetails,
    openViewMode,
    status,
    showModal,
    handleCloseModal
    }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [mileData, setMileData] = useState([])
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
          const totalPages = Math.ceil(total / 9);
        
  return (
    <div>
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
  <ModalMs refetch={refetch} showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  )
}

export default ContentPart