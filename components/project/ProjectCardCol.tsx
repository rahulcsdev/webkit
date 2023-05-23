import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { Manrope, Roboto } from "next/font/google";
import { FiEdit, FiEye, FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
interface projectTypes {
  status: string;
  startDate: string;
  projectType: string;
  projectManager: {
    name: string;
    id: string;
  };
  projectDiscription: string;
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
  data: projectTypes;
  openDetais: any;
}

const ProjectCardCol: React.FC<Props> = ({ data, openDetais }) => {
  const {
    name,
    status,
    projectDiscription,
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

  return (
    <div
      className={`bg-white drop-shadow-md p-5 rounded-lg h-[calc(100% - 30px)]`}
    >
      {/* Head */}
      <div className="flex justify-between items-center">
        <div className="flex  items-center gap-3 ">
          <div className="h-[100px] w-[100px]">
            <CircularProgressbar
              strokeWidth={6}
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: `${bg}`,
                pathColor: bg,
                trailColor: "#eee",
              })}
            />
          </div>
          <h2
            className={`text-[#140F49] ${manrope.className} font-semibold text-[1.2em] `}
          >
            {name}
          </h2>
        </div>
        <h2
          className={`text-yellow-500 bg-yellow-100 ${manrope.className} font-semibold text-sm px-2 py-[1px] rounded-md lowercase `}
        >
          {status}
        </h2>
      </div>
      {/* Middle */}
      <div className="mt-2">
        <div className="mt-4 pb-5 border-b-2 border-gray-200">
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
          <p className={`text-[#605C8D] text-base ${roboto.className} mt-1`}>
            <span className="font-medium">Manager :</span>{" "}
            {projectManager ? projectManager.name : "Non"}
          </p>
          <p className={`text-[#605C8D] text-base ${roboto.className} mt-1`}>
            <span className="font-medium">Project Type :</span> {projectType}
          </p>
        </div>
      </div>
      {/* Footer/Bottom */}
      <div className="mt-2 flex justify-between items-center">
        <div className="grid grid-cols-3 gap-2 items-start justify-start ">
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
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => openDetais(id, "edit")}
            className={`px-2 py-1 rounded-md bg-transparent text-primary hover:bg-orange-50 transition-all delay-75 ease-in duration-100`}
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={() => openDetais(id, "view")}
            className={`px-2 py-1 rounded-md  text-secondary hover:bg-blue-50 transition-all delay-75 ease-in duration-100`}
          >
            <SlEye size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardCol;
