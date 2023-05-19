import React from "react";
import {BsCalendarDate,BsCalendarDateFill} from 'react-icons/bs'
import { Progress } from '@mantine/core';
import {FcBusinessman} from "react-icons/fc";

type ProjectMember = {
  id: string;
  name: string;
  __typename: string;
};

type Project = {
  endDate: string;
  id: string;
  member: ProjectMember[];
  memberCount: number;
  name: string;
  projectDescription: string;
  projectManager: {
    id: string;
    name: string;
    __typename: string;
  };
  projectType: string;
  startDate: string;
  status: string;
  __typename: string;
};
interface Props {
  data: Project;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

const DeskCardCarousal = (props: Props) => {
  const { data } = props;
  
  const  startDate= formatDate(data.startDate)
  const endDate=formatDate(data.endDate)
  let percentage = 0;
  switch (data.status) {
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
  const lineBarcolor=percentage > 0 && percentage < 20
  ? "#f35421"
  : percentage >= 20 && percentage < 30
  ? "#51bbfe"
  : percentage >= 30 && percentage < 40
  ? "#5773ff"
  : percentage >= 40 && percentage < 70
  ? "#50c6b4"
  : percentage >= 70 && percentage < 99
  ? "#00A300"
  : "#000075";
 const textColor=percentage > 0 && percentage < 20
 ? "#f35421"
 : percentage >= 20 && percentage < 30
 ? "#007ece"
 : percentage >= 30 && percentage < 40
 ? "#3955dd"
 : percentage >= 40 && percentage < 70
 ? "#339284"
 : percentage >= 70 && percentage < 99
 ? "#00A300"
 : "#000075";
 
  const bg =
    percentage > 0 && percentage < 20
      ? "#fccfc1"
      : percentage >= 20 && percentage < 30
      ? "#ceecff"
      : percentage >= 30 && percentage < 40
      ? "#d0d8ff"
      : percentage >= 40 && percentage < 70
      ? "#ceefea"
      : percentage >= 70 && percentage < 99
      ? "#8AFF8A"
      : "#8A8AFF";

  return (
    <div
      className={`relative bg-white drop-shadow-md rounded-xl p-5 my-2  mx-5 ...  `}
    >
      <h1
        className={`text-[1.2em]  text-[#140F49] font-semibold whitespace-nowrap`}
      >
        {data.name}
      </h1>
      <div className="flex mt-2">
        <FcBusinessman className='text-xl mt-1 color-[#8B8B8B]'/>
        <h5
        className={`text-[#8B8B8B] font-semibold whitespace-nowrap ml-2 mt-1`}
      >
      {data?.projectManager?.name}
      </h5>
      </div>
      <div className="flex mt-2">
        <BsCalendarDate className='text-xl mt-1 color-[#8B8B8B]'/>
        <h5
        className={`text-[#8B8B8B] font-semibold whitespace-nowrap ml-2 mt-1`}
      >
      {startDate}
      </h5>
      </div>
      <div className="flex mt-2">
        <BsCalendarDateFill className='text-xl mt-1'/>
        <h5
        className={`text-[#8B8B8B] font-semibold whitespace-nowrap ml-2 mt-1`}
      >
      {endDate}
      </h5>
      </div>
      <div>
      <Progress value={percentage} mt="md" size="lg" radius="xl" color={lineBarcolor} bg={bg}/>
      </div>
      <div className="grid justify-items-end mt-4 ">
      <h1 style={{backgroundColor:`${bg}`,padding:"10px",borderRadius:"15px",color:`${textColor}`}}>{data.status}</h1>
      </div>
    </div>
  );
};

export default DeskCardCarousal;
