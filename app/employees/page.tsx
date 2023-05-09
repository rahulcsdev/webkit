"use client"
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalEmployee from "../../components/ModalEmployee";
import { employeesData } from "../../utils/data";
import EmployeesCardData from "../../components/EmployeesCardData";
import EmployeesCardListView from "../../components/EmployeeCardListView";
import { gql } from "@apollo/client";
import client from '../../apolloClient/index';




const manrope = Manrope({ subsets: ["latin"] });

interface UserData {
  id: string;
  name: string;
  email: string;
  code: string;
  designation: string;
  role:string;
  dateOfJoining:string;
}



const Employees = () => {
    const myDivRef = useRef<any>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState(true);



  
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
     const [value,setValue]=useState('progress');
     const [showModal, setShowModal] = useState(false);

   
  
  function handleCloseModal(){
    setShowModal(false);
  }
  const clickS = "bg-[#5773FF] text-white";
const notClickS = "bg-gray-100 text-black";



const [datas, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: gql`
          query Query {
            users {
              id
              name
              email
              code
              designation
              role
              dateOfJoining
            }
          }
        `,
      });
      setData(data.users);
      console.log(data.users);
      
    };

    fetchData();
  }, []);


  return (
    <>
     <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
    <Navbar isScrolling={isScrolling} />
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
              <div  onClick={() => setViewMode(true)} className={`p-2 rounded-full cursor-pointer text-xl ${viewMode ? clickS : notClickS
                  }`}>
                <RxDashboard/>
              </div>
              <div  onClick={() => setViewMode(false)} className={`p-2 text-xl  cursor-pointer rounded-full ${!viewMode ? clickS : notClickS}`}>
                <HiBars3/>
              </div>
            </div>
             <div className="relative">
              <button onClick={()=>setShowModal(true)} className={`bg-[#5773FF] text-white px-3 py-2 rounded-lg capitalize`} >New User</button>
             </div>
            
            </div>
           
          </div>
        </div>
      </div>
      <ModalEmployee showModal={showModal} handleCloseModal={handleCloseModal} />

     {/* Employee Cards */}

     <div className="px-5 py-6 ">
     {viewMode ? (
     <div className="grid grid-cols-3  gap-5">
     {datas.map((item, index) => (
          <EmployeesCardData key={index} user={item} />
        ))}
     </div>
       ) : (
        <div className="grid grid-cols-1 gap-5">
        {employeesData.map((item, index) => (
             <EmployeesCardListView key={index} data={item} index={index}  />
           ))}
        </div>
         )}
     </div>

    

    </div>
    </>    
  )
}

export default Employees