import React from "react";
import {IoHomeOutline,IoPrint} from 'react-icons/io5'
import { Progress } from '@mantine/core';
import {BsCalendarDate,BsCalendarDateFill} from 'react-icons/bs'
interface Project {
    __typename: string;
    name: string;
    status: string;
  }
  
  interface Task {
    id: string;
    name: string;
    project: Project;
    __typename: string;
    status:string;
    startDate: string;
    endDate:string;
  }
  
interface Props {
  data: Task;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}
const DesktaskCarousel = (props: Props) => {
  const { data } = props;
 
  const  startDate= formatDate(data.startDate)
  const endDate=formatDate(data.endDate)
  let percentage = 0;
  switch (data.status) {
    case "Open":
      percentage = 5;
      break;
    case "Document Analysis":
      percentage = 10;
      break;
    case "In Progress":
      percentage = 50;
      break;
    case "Code Review":
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
        className={`text-[1.2em] mb-3  text-[#140F49] font-semibold whitespace-nowrap`}
      >
        {data.name}
      </h1>
      <div className="flex mt-2">
      <IoPrint className='text-2xl mt-1'/>
      <h1
        className={`text-[1.2em]   text-[#140F49] font-semibold whitespace-nowrap ml-2`}
      >
      {data.project.name}
      </h1>
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

export default DesktaskCarousel;
