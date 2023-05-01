"use client";
import React, { useState } from "react";
import { Roboto, Manrope } from "next/font/google";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalEditEmployee from "./ModalEditEmployee";
import { employeesData } from "@/utils/data";
// import { useRouter } from 'next/router';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const manrope = Manrope({ weight: "500", subsets: ["latin"] });

interface employeeCartType {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  reportingmanager : string;
}

interface Props {
  data: employeeCartType;
  index?: number; // Define index here
}

const EmployeesCardListView = (props: Props) => {
  const { data, index = 0 } = props;
  // const router = useRouter();

  const [showEditModal, setShowEditModal] = useState(false);

  function handleCloseModal() {
    setShowEditModal(false);
  }

  const handleEdit = (
    id: number,
    name: string,
    email: string,
    phone: string,
    designation: string,
    reportingmanager :string
  ) => {
    localStorage.setItem("Name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("Phone", phone);
    localStorage.setItem("Designation", designation);
    localStorage.setItem("Reportingmanager",reportingmanager);
    localStorage.setItem("id", id.toString());

    setShowEditModal(true);
    console.log(index);

    console.log(designation);
  };

  return (
    <>
      <div
        className={`p-5 max-w-full bg-white drop-shadow-md rounded-xl ${roboto.className}`}
      >
        <div className="flex flex-row">
          <div className="flex items-center space-x-1 w-[20%]">
            <div>
              <div className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-4 ">
                <BiMessageRounded />
              </div>
            </div>
            <div className="mt-2">
              <h4 className={`mb-3 text-2xl text-center ${manrope.className}`}>
                {data.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[25%]">
            <div>
              <div className="p-2 rounded-full cursor-pointer bg-[#ff7957] text-xl text-white mr-4 ">
                <IoMailOpenOutline />
              </div>
            </div>
            <div className="mt-2">
              <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
                {data.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[20%]">
            <div>
              <div className="p-2 rounded-full cursor-pointer bg-[#57ff97] text-xl text-white mr-4">
                <BsTelephone />
              </div>
            </div>
            <div className="mt-2">
              <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
                {data.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[25%]">
            <div>
              <div className="p-2 rounded-full cursor-pointer bg-[grey] text-xl text-white mr-4">
                <BsPersonCheck />
              </div>
            </div>
            <div className="mt-2">
              <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
                {data.designation}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[10%]">
            <div>
              {/* {
             employeesData.map((item , index)=>(
              <div className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-4 " onClick={()=>handleEdit(item.id,item.name , item.phone , item.email)}>
              <MdOutlineModeEditOutline   />
            </div>
             ))
            } */}

              <div
                className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-4 "
                onClick={() =>
                  handleEdit(
                    data.id,
                    data.name,
                    data.email,
                    data.phone,
                    data.designation,
                    data.reportingmanager
                  )
                }
              >
                <MdOutlineModeEditOutline />
              </div>
            </div>

            <div>
              <div className="p-2 rounded-full cursor-pointer  bg-[#ff7957] text-xl text-white mr-4">
                <RiDeleteBin5Line />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEditEmployee
        showEditModal={showEditModal}
        handleCloseModal={handleCloseModal}
        employee={employeesData[index]}
      />
    </>
  );
};

export default EmployeesCardListView;
