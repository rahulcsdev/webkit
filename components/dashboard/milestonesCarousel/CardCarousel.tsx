import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { BiTask } from "react-icons/bi";
import ProgressBar from "../../ProgressBar";
import Image from "next/image";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";
import { Card } from "@mantine/core";

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface dataType    {
    id: string,
    name:string,
    project: {
      name: string,
      id: string
    },
    endDate: string,
    startDate: string,
    status: string
  }


interface Props {
  data: dataType;
}

const CardCarousal = ({ data }: Props) => {

    const {id,endDate,name,project,startDate,status}=data;

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
          <h6 className={`text-[#605C8D] text-base ${roboto.className} mt-1`}><span className={`font-medium`}>Project :</span> {project?.name}</h6>
          {/* <h6 className={`text-md font-normal px-2 py-1 bg-[#50C6B4] rounded-md`}>{project.name}</h6> */}
          </div>

          {/* <h6 className={`text-md font-normal px-2 py-1 bg-[#51BBFE] rounded-md`}>{code}</h6>  */}
        </div>
      </Card>
    </>
  );
};

export default CardCarousal;
