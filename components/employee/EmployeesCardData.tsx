"use client"

import {useState , useEffect} from "react";
import { Roboto, Manrope } from "next/font/google";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";


const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const manrope = Manrope({ weight: "500", subsets: ["latin"] });

interface UserData {
  id: string;
  name: string;
  email: string;
  password:string;
  designation: string;
  code:string;
  role: string;
  dateofjoining: Date;
  reportingmanager: string;
}


interface Props {
  data: UserData;
}

const EmployeesCardData = (props: Props) => {
  const { data } = props;


  return (
    <>
      <div
        className={`p-5 max-w-md bg-white drop-shadow-md rounded-xl ${roboto.className}`}
      >
        <div className="flex items-center space-x-1">
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

        <div className="flex items-center space-x-1">
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

        <div className="flex items-center space-x-1">
          <div>
            <div className="p-2 rounded-full cursor-pointer bg-[#57ff97] text-xl text-white mr-4">
              <BsTelephone />
            </div>
          </div>
          <div className="mt-2">
            <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
              {data.code}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
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

        <div className="flex items-center space-x-1">
          <div>
            <div className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-4">
              <BsPersonLinesFill />
            </div>
          </div>
          <div className="mt-2">
            <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
              {data.role} <br/>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesCardData;