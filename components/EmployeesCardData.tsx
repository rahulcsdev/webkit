"use client"

import {useState , useEffect} from "react";
import { Roboto, Manrope } from "next/font/google";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { gql } from "@apollo/client";
import client from '../apolloClient/index';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const manrope = Manrope({ weight: "500", subsets: ["latin"] });

interface employeeCartType {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  code: string;
  designation: string;
  role:string;
  dateOfJoining:string;
}


interface Props {
  data: employeeCartType;
  user: UserData;
}

const EmployeesCardData = (props: Props) => {
  const {  user } = props;

  // const [datas, setData] = useState<UserData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await client.query({
  //       query: gql`
  //         query Query {
  //           users {
  //             id
  //             name
  //             email
  //             code
  //             designation
  //             role
  //             dateOfJoining
  //           }
  //         }
  //       `,
  //     });
  //     setData(data.users);
  //     console.log(data.users);
      
  //   };

  //   fetchData();
  // }, []);


  return (
    <>
      {/* <div className={`p-5 max-w-md bg-white drop-shadow-md rounded-xl ${roboto.className}`}>
   <h4 className={`mb-3 text-2xl text-center ${manrope.className}`}>{data.name}</h4>
        <p className={`mb-5 text-lg text-center  ${manrope.className}`}>{data.email}</p>
        <div>
          <div className="mb-3 flex justify-center items-center">
            <div className="p-2 rounded-full cursor-pointer bg-[#ff7957] text-xl text-white mr-7 "><IoMailOpenOutline/></div>
            <div className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-7 "><BiMessageRounded/></div>
            <div className="p-2 rounded-full cursor-pointer bg-[#57ff97] text-xl text-white mr-7"><BsTelephone/></div>
          </div>
        </div> */}
      {/* <div className="border-t-2 border-gray-200 pt-5 flex justify-center">
       <button className="bg-blue-500 hover:bg-blue-600 text-white text-base font-normal py-2 px-4 rounded-md text-center">Message</button>
       </div> */}
      {/* </div> */}

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
              {user.name}
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
              {user.email}
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
              {user.code}
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
              {user.designation}
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
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesCardData;
