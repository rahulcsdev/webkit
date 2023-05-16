"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState , useCallback } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
const ModalEmployee = dynamic(() => import("../../components/employee/ModalEmployee"));
const EmployeesCardData = dynamic(() => import("../../components/employee/EmployeesCardData"));
const EmployeesCardListView = dynamic(() => import("../../components/employee/EmployeeCardListView"));
const ModalEditEmployee = dynamic(() => import("../../components/employee/ModalEditEmployee"));
const LayoutNav = dynamic(() => import("@/components/LayoutNav"))
import { gql , useQuery } from "@apollo/client";
import client from "../../apolloClient/index";
import { getUser, getUserDetails } from "@/services";
 
import { Pagination } from "@mantine/core";
import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"] });


const Employees = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedFeild, setSelectedFeild] = useState<string | null>();
  const [total, setTotal] = useState(0);



  const openDetails = (id: string) => {
    setSelectedFeild(id);
    setShowModalEdit(true);
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setShowModalEdit(false);
    setSelectedFeild(null);
  }

  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";

  const [datas, setData] = useState([]);

  const ITEMS_PER_PAGE = 9;
const INITIAL_PAGE = 1;
const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const { data, loading, error, refetch } = useQuery(getUser, {
    client,
    variables: {
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
  });


  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };
 
  const fetchUser = async () => {
   client.query({
      query: getUser,
    }).then(({data})=>{
      setTotal(data?.users?.length);
      
    })
  };


  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  useEffect(()=>{
    setData(data?.users);
  },[data,loading]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const visibleTotal = currentPage === totalPages ? total % ITEMS_PER_PAGE : ITEMS_PER_PAGE;
  

  return (
    <LayoutNav>
    <div className="px-5 py-6">
       
        <div className="px-5 py-6">

        <div className="px-5 py-6">
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="flex items-center justify-between">
              <h1
                className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
              >
                Your Projects
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
                  <div
                    onClick={() => setViewMode(true)}
                    className={`p-2 rounded-full cursor-pointer text-xl ${
                      viewMode ? clickS : notClickS
                    }`}
                  >
                    <RxDashboard />
                  </div>
                  <div
                    onClick={() => setViewMode(false)}
                    className={`p-2 text-xl  cursor-pointer rounded-full ${
                      !viewMode ? clickS : notClickS
                    }`}
                  >
                    <HiBars3 />
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowModal(true)}
                    className={`bg-[#5773FF] text-white px-3 py-2 rounded-lg capitalize`}
                  >
                    New User
                  </button>
                </div>
              </div>
            </div>
          </div>
      

        {/* Employee Cards */}

        <div className="px-5 py-6 ">
          {loading?<h1 className="">Loading...</h1>:datas?.length==0?<h1 className="">No Data found</h1>:viewMode ? (
            <div className="grid grid-cols-3  gap-5">
              {datas && datas.map((item, index) => (
                <EmployeesCardData key={index} data={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {datas && datas.map((item, index) => (
                <EmployeesCardListView
                  openDetails={openDetails}
                  key={index}
                  data={item}
                />
              ))}
            </div>
          )}
        </div>
        <div className="my-5 flex items-center justify-center">
         <Pagination total={totalPages}   onChange={handlePageChange} value={currentPage} />
       </div>
      </div>
      </div>
      <ModalEmployee
        refetch={refetch}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />

      {selectedFeild && (
        <ModalEditEmployee
          fetchUser={fetchUser}
          id={selectedFeild}
          showEditModal={showModalEdit}
          handleCloseModal={handleCloseModalEdit}
        />
      )}
</div>
     
    </LayoutNav>
  );
};

export default Employees;
