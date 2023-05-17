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

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const manrope = Manrope({ weight: "500", subsets: ["latin"] });

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  designation: string;
  role: string;
  code: string;
  dateofjoining: Date;
  reportingmanager: string;
}

interface Props {
  data: UserData;
  openDetails: any;
}

const options = [
  { label: "Admin", value: "admin" },
  { label: "User Management", value: "userManagement" },
  { label: "Project Management", value: "projectManagement" },
  { label: "Task Management", value: "taskManagement" },
  { label: "Milestone Management", value: "milestoneManagement" },
  { label: "Time Entry Management", value: "timeEntryManagement" },
];

const EmployeesCardListView = (props: Props) => {
  const {
    data: {
      id,
      name,
      email,
      code,
      designation,
      role,
      dateofjoining,
      reportingmanager,
    },
    openDetails,
  } = props;

  const getRoleLabel = (role: string | string[]) => {
    if (Array.isArray(role)) {
      return role.map((value) => {
        const option = options.find((opt) => opt.value === value);
        return option ? option.label : "";
      });
    } else {
      const option = options.find((opt) => opt.value === role);
      return option ? option.label : "";
    }
  };

  const roleLabels = getRoleLabel(role);

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
                {name}
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
                {email}
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
                {code}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[20%]">
            <div>
              <div className="p-2 rounded-full cursor-pointer bg-[grey] text-xl text-white mr-4">
                <BsPersonCheck />
              </div>
            </div>
            <div className="mt-2">
              <p className={`mb-5 text-lg text-center  ${manrope.className}`}>
                {designation}
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
              <div
                className={`text-lg ${manrope.className} max-h-[70px] overflow-y-scroll`}
              >
                {roleLabels && Array.isArray(roleLabels) ? (
                  roleLabels.map((item) => (
                    <p key={item} className="mb-2 text-start">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="mb-2 text-start">Invalid role data</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 w-[5%]">
            <div>
              <div
                className="p-2 rounded-full cursor-pointer bg-[#5776ff] text-xl text-white mr-4 "
                onClick={() => openDetails(id)}
              >
                <MdOutlineModeEditOutline />
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesCardListView;
