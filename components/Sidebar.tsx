"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Manrope, Roboto } from "next/font/google";
import { timelineLinks, timelineFolder } from "../utils/data";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
import { BsClipboardCheck, BsPersonPlus } from "react-icons/bs";
import { RxCube } from "react-icons/rx";
import { IoHomeOutline, IoPrint } from "react-icons/io5";

import { GiStairsGoal } from "react-icons/gi";
const navLinks = [
  {
    icon: <IoHomeOutline />,
    name: "dashboard",
    link: "",
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
const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const [timelineToggle, setTimelineToggel] = useState(false);

  const changeState = (value: string) => {
    setActive(value);
  };
  const percentage = 66;
  return (
    <div className="bg-white drop-shadow-sm  h-full py-3">
      {/* Logo */}
      <div className="flex items-center py-3 justify-center gap-3 sticky top-0 z-10 bg-white ">
        <Image src="/assets/logo.svg" height={30} width={30} alt="logo" />
        <h3
          className={`text-3xl font-extrabold  text-[#140F49] ${manrope.className} `}
        >
          WEBKIT
        </h3>
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
                      ? "border-l-4  border-[#5773FF]  bg-sky-50  text-[#5773FF]"
                      : "border-none  text-gray-600 "
                  } hover:text-[#5773FF] hover:bg-sky-50  flex justify-start cursor-pointer  items-center gap-3 px-3 py-4 w-full  text-2xl`}
                >
                  {item.icon}
                  <h1
                    className={`text-md font-medium capitalize text-[1rem] ${roboto.className} `}
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
                  ? "border-l-4  border-[#5773FF]  bg-sky-50  text-[#5773FF]"
                  : "border-none  text-gray-600 "
              } hover:text-[#5773FF] hover:bg-sky-50  flex justify-between items-center cursor-pointer  items-center gap-3 px-3 py-4 w-full `}
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
                      ? "border-l-4  border-[#5773FF]  bg-sky-50  text-[#5773FF]"
                      : "border-none  text-gray-600 "
                  } hover:text-[#5773FF] hover:bg-sky-50  flex justify-start cursor-pointer  items-center gap-3 px-3 py-4 w-full `}
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
        </ul>
        <div className="mt-6 flex items-center justify-center flex-col">
          <h1
            className={`text-xl font-medium text-center text-gray-700 ${roboto.className} `}
          >
            Task Performed
          </h1>
          <div className="h-[120px] w-[120px] mt-6">
            <CircularProgressbar
              strokeWidth={6}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
          <div className="flex flex-col gap-3 items-center justify-center mt-4">
            <div className="flex items-center gap-4">
              <input type="radio" name="perform" className="h-5 w-5" />
              <h1>Performed task</h1>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" name="perform" className="h-5 w-5" />
              <h1>Incomplete task</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
