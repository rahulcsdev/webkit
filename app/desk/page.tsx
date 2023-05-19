"use client";
import React, { useEffect, useRef, useState } from "react";
import { Manrope } from "next/font/google";
import { dropDown } from "../../utils/data";
import { Popover, Button } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import { getProjectList ,getTasks,getMilestone} from "@/services";
import client from '../../apolloClient/index';
import dynamic from "next/dynamic"
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));

import {
  FiChevronDown,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
const  DeskCardCarousal = dynamic(() => import("../../components/desk/DeskCardCarousel"));
const DesktaskCarousel= dynamic(() => import("../../components/desk/DesktaskCarousel"));
const DeskMilestoneCarousel=dynamic(() => import("../../components/desk/DeskMilestoneCarousel"));

const manrope = Manrope({ subsets: ["latin"] });
const Desk = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  


  const projectData= useQuery(getProjectList, {
    client,
    variables:{
      "orderBy": [
        {
          "id": "desc"
        }
      ]
    }
});
// console.log(projectData?.data?.projects)
// const reverseprojectData= projectData?.data?.projects.reverse();
  const mileStoneData = useQuery(getMilestone, {
    client,
    variables:{
      "orderBy": [
        {
          "id": "desc"
        }
      ]
    }
  });
  const taskData = useQuery(getTasks, {
    client,
    variables:{
      "orderBy": [
        {
          "id": "desc"
        }
      ]
    }
  });

  //console.log(projectData?.data?.projects)
  // console.log(mileStoneData?.data?.milestones)
  //console.log(taskData?.data?.tasks)
   
  const [isExpand, setIsExpand] = useState(false);
  const [isDeskExpand, setisDeskExpand] = useState(false);
  const [isDeskExpand1, setisDeskExpand1] = useState(false);
  const [isDeskExpand2, setisDeskExpand2] = useState(false);
  const [value, setValue] = useState("progress");

  return (
    <LayoutNav>
      <div className="px-5 py-6">
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Desk
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative z-40 ... ">
                <Popover opened={isExpand} onChange={setIsExpand} withinPortal>
                  <Popover.Target>
                    <div
                      className={`bg-gray-100 px-3 p-2  rounded-xl flex items-center gap-1 cursor-pointer`}
                      onClick={() => setIsExpand((prev) => !prev)}
                    >
                      <p className="capitalize text-sm text-[#605C8D]">
                        {" "}
                        <span className="font-semibold text-base text-[#605C8D]">
                          Stauts
                        </span>{" "}
                        : {value}
                      </p>{" "}
                      {!isExpand ? <FiChevronRight /> : <FiChevronDown />}
                    </div>
                  </Popover.Target>

                  <Popover.Dropdown >
                    {dropDown.map((item:any, index:any) => (
                      <div
                        key={index}
                       
                        className="p-1 ... flex items-center justify-start gap-3 scale-1 delay-100 duration-150 transition-transform hover:scale-105 cursor-pointer"
                      >
                        {item.icon}
                        <h1 className="">{item.name}</h1>
                      </div>
                    ))}
                  </Popover.Dropdown>
                </Popover>
              </div>
              <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
                <div className="p-2 rounded-full cursor-pointer bg-[#5773FF] text-xl text-white">
                  <RxDashboard />
                </div>
                <div className="p-2 text-xl  cursor-pointer rounded-full bg-gray-100 text-black">
                  <HiBars3 />
                </div>
              </div>
              <div className="relative">
                <button
                  className={`bg-[#5773FF] text-white px-3 py-2 rounded-lg capitalize`}
                >
                  new project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white drop-shadow-md rounded-xl ]">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
               Projects 
            </h1>
          </div>
        </div>
        <div className="p-5 bg-white drop-shadow-md rounded-xl relative ...">
          <div className="flex items-center justify-between relative ...">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Tasks
            </h1>
          </div>
        </div>
        <div className="p-5 bg-white drop-shadow-md rounded-xl ">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className} `}
            >
              Milestone
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3  gap-3">
        {/* Carousal part */}
        <div className=" flex flex-col  gap-1">
          {projectData?.data?.projects.map((item:any, index:any) => (
            <DeskCardCarousal key={index} data={item} />
          ))}
        </div>
        <div className=" flex flex-col  gap-1">
          {taskData?.data?.tasks.map((item:any, index:any) => (
            <DesktaskCarousel key={index} data={item} />
          ))}
        </div>
        <div className=" flex flex-col gap-1">
          {mileStoneData?.data?.milestones.map((item:any, index:any) => (
            <DeskMilestoneCarousel key={index} data={item} />
          ))}
        </div>
        {/* <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        /> */}
      </div>
      </LayoutNav>
  );
};

export default Desk;
