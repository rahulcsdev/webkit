import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { BiTask } from "react-icons/bi";
import ProgressBar from "../ProgressBar";
import Image from "next/image";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";
import { Card } from "@mantine/core";

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface projectCardTypes {
  status: string;
  startDate: string;
  projectType: string;
  projectManager: {
    name: string;
    id: string;
  };

  name: string;
  memberCount: number;
  member: [
    {
      id: string;
      name: string;
    },
    {
      id: string;
      name: string;
    },
    {
      id: string;
      name: string;
    }
  ];
  id: string;
  endDate: string;
}

interface Props {
  data: projectCardTypes;
}

const CardCarousal = ({ data }: Props) => {
  const {
    name,
    status,
    member,
    memberCount,
    projectManager,
    projectType,
    startDate,
    endDate,
    id,
  } = data;

  let percentage = 0;

  switch (status) {
    case "New":
      percentage = 5;
      break;
    case "Design Developement":
      percentage = 10;
      break;
    case "In Progress":
      percentage = 50;
      break;
    case "Testing":
      percentage = 70;
      break;
    case "Completed":
      percentage = 99;
      break;
    default:
      percentage = 0;
      break;
  }
  const bg =
    percentage > 0 && percentage < 20
      ? "#F35421"
      : percentage >= 20 && percentage < 40
      ? "#5773FF"
      : percentage >= 40 && percentage < 60
      ? "#FFCF52"
      : percentage >= 60 && percentage < 80
      ? "#50C6B4"
      : "#50C878";

  // const arr = new Array(image).fill(0);
  return (
    <>
      <Card className="bg-white drop-shadow-md rounded-xl p-5 my-2 mx-3 min-w-[350px]">
        <div className="flex justify-between items-center">
          <h2
            className={`text-[#140F49] capitalize ${manrope.className} font-semibold text-[1.2em] `}
          >
            {name}
          </h2>
          <h2
            className={`text-yellow-500 bg-yellow-100 ${manrope.className} font-semibold text-sm px-2 py-[1px] rounded-md lowercase `}
          >
            {status}
          </h2>
        </div>

        <div className="w-full mb-6 mt-6">
          <ProgressBar percentage={percentage} />
        </div>

        <div className="flex justify-between items-center">
          <p
            className={`text-green-400 flex items-center gap-2 px-2 py-1 rounded-md bg-green-50 text-base ${roboto.className} mt-1`}
          >
            <span className="font-medium">
              <FaCalendarPlus />
            </span>{" "}
            {new Date(startDate).toLocaleDateString()}
          </p>
          <p
            className={`text-red-400 flex items-center rounded-md gap-2 px-2 py-1 bg-red-50 text-base ${roboto.className} mt-1`}
          >
            <span className="font-medium">
              <FaCalendarMinus />
            </span>{" "}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex">
            <p className={`text-[#605C8D] text-base ${roboto.className} mt-1`}>
              <span className="font-medium">Manager :</span>{" "}
              {projectManager ? projectManager.name : "Non"}
            </p>

            {/* {arr.map((item, index) => (
              <Image
                key={index}
                src={index % 2 == 0 ? "/assets/picTwo.jpg" : "/assets/picTwo.jpg"}
                height={30}
                width={30}
                alt="image"
                className={`rounded-full -mr-3`}
              />
            ))} */}
          </div>
          <div className="grid grid-cols-2 gap-2 items-start justify-start ">
            {member.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`text-white text-sm px-2 py-1 rounded-md ${
                  index % 2 !== 0
                    ? "bg-[#FFCF52]"
                    : index % 3 !== 0
                    ? "bg-[#50C6B4]"
                    : "bg-[#51BBFE]"
                }`}
              >
                {item.name}
              </div>
            ))}

            {member.length > 3 && (
              <div className="px-2 text-xl rounded-full bg-gray-200">
                {memberCount - 3}+
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardCarousal;
