"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Manrope, Roboto } from "next/font/google";
import { timelineLinks, timelineFolder } from "../utils/data";

import "react-circular-progressbar/dist/styles.css";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { BsClipboardCheck, BsPersonPlus } from "react-icons/bs";
import { RxCube } from "react-icons/rx";
import { TbReport, TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { IoHomeOutline, IoPrint } from "react-icons/io5";

import { GiStairsGoal } from "react-icons/gi";
import Logo from "./Logo";
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "500", subsets: ["latin"] });

const navLinks = [
  {
    icon: <IoHomeOutline />,
    name: "dashboard",
    link: "home",
  },
  {
    icon: <IoPrint />,
    name: "projects",
    link: "projects",
  },
  {
    icon: <BsClipboardCheck />,
    name: "tasks",
    link: "tasks",
  },
  {
    icon: <BsPersonPlus />,
    name: "employees",
    link: "employees",
  },
  {
    icon: <GiStairsGoal />,
    name: "milestones",
    link: "milestones",
  },
  {
    icon: <RxCube />,
    name: "desk",
    link: "desk",
  },
];
const report = [
  {
    icon: <TbReportSearch />,
    name: "User Reports",
    link: "userreports",
  },
  {
    icon: <TbReport />,
    name: "Task Reports",
    link: "taskreports",
  },
];
const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const [timelineToggle, setTimelineToggel] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const changeState = (value: string) => {
    setActive(value);
  };

  return (
    <div className="bg-white drop-shadow-sm  h-full py-3">
      {/* Logo */}
      <div className="flex items-center py-6 justify-center w-full   sticky top-0 z-10 bg-white ">
        <Logo />
      </div>
      <div className="h-full pb-12 overflow-y-scroll ">
        <ul className=" flex flex-col items-start justify-center gap-2  w-full ">
          {navLinks.map((item, index) => (
            <li key={item.name} className="w-full">
              <Link
                href={`/${item.link}`}
                className="w-full"
                onClick={() => changeState(item.name)}
              >
                <div
                  className={`${
                    active === item.name
                      ? "border-l-4  border-primary  bg-orange-50 text-primary"
                      : "border-none  text-gray-600 "
                  } hover:text-primary hover:bg-orange-50 flex justify-start cursor-pointer  items-center gap-3 px-3 py-4 w-full  text-2xl`}
                >
                  {item.icon}
                  <h1
                    className={`  font-medium capitalize text-[1rem] ${roboto.className} `}
                  >
                    {item.name}
                  </h1>
                </div>
              </Link>
            </li>
          ))}

          {timelineFolder.icon && (
            <div
              onClick={() => setTimelineToggel(!timelineToggle)}
              className={`${
                active === timelineFolder.name
                  ? "border-l-4  border-primary  bg-orange-50 text-primary"
                  : "border-none  text-gray-600 "
              } hover:text-primary hover:bg-orange-50 flex justify-between   cursor-pointer  items-center gap-3 px-3 py-4 w-full `}
            >
              <div className="flex justify-start items-center">
                {timelineFolder.icon}
                <h1
                  className={`text-md font-medium mx-2 capitalize ${roboto.className} `}
                >
                  {timelineFolder.name}
                </h1>
              </div>

              <div className="">
                {timelineToggle ? (
                  <FiArrowDown className="text-2xl" />
                ) : (
                  <FiArrowRight className="text-2xl" />
                )}
              </div>
            </div>
          )}

          {timelineToggle &&
            timelineLinks.map((item, index) => (
              <Link
                href={`/${item.link}`}
                className={"w-full"}
                key={index}
                onClick={() => changeState(item.name)}
              >
                <div
                  key={index}
                  className={`${
                    active === item.name
                      ? "border-l-4  border-primary  bg-orange-50 text-primary"
                      : "border-none  text-gray-600 "
                  } hover:text-primary hover:bg-orange-50 flex justify-start cursor-pointer  items-center gap-3 px-3 py-4 w-full `}
                >
                  {item.icon}
                  <h1
                    className={`text-md font-medium capitalize ${roboto.className} `}
                  >
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))}
          <li
            className={`  font-medium capitalize text-[1rem] ${roboto.className} hover:text-primary
             hover:bg-orange-50 flex justify-start cursor-pointer 
             items-center gap-3 px-3 py-2 w-full text-gray-700 `}
            onClick={() => setOpenReport((prev) => !prev)}
          >
            <TbReportAnalytics size={22} /> Reports
            {openReport ? (
              <FiArrowDown size={22} />
            ) : (
              <FiArrowRight size={22} />
            )}
          </li>
          {openReport && (
            <div className=" w-full">
              {report.map((item, index) => (
                <li key={item.name} className=" w-full">
                  <Link
                    href={`/${item.link}`}
                    className="w-full"
                    onClick={() => changeState(item.name)}
                  >
                    <div
                      className={`${
                        active === item.name
                          ? "border-l-4    border-primary  bg-orange-50 text-primary"
                          : "border-none  text-gray-600 "
                      } px-6 hover:text-primary hover:bg-orange-50 flex justify-start cursor-pointer  items-center gap-3  py-1 w-full  text-2xl`}
                    >
                      {item.icon}
                      <h1
                        className={`  font-medium capitalize text-[1rem] ${roboto.className} `}
                      >
                        {item.name}
                      </h1>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
