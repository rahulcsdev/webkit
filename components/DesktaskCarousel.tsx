import React from "react";
import {IoHomeOutline,IoPrint} from 'react-icons/io5'
import { Progress } from '@mantine/core';
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
    status:string
  }
  
interface Props {
  data: Task;
}
const DesktaskCarousel = (props: Props) => {
  const { data } = props;
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
  const bg =
    percentage > 0 && percentage < 20
      ? "#FFCF52"
      : percentage >= 20 && percentage < 30
      ? "#5773FF"
      : percentage >= 30 && percentage < 40
      ? "#F35421"
      : percentage >= 40 && percentage < 60
      ? "#50C6B4"
      : "#5773FF";
  return (
    <div
      className={`relative bg-white drop-shadow-md rounded-xl p-5 my-2  mx-5 ...  `}
    >
      <h1
        className={`text-[1.2em] mb-3  text-[#140F49] font-semibold whitespace-nowrap`}
      >
        {data.name}
      </h1>
      <div className="flex">
      <IoPrint className='text-2xl'/>
      <h1
        className={`text-[1.2em]  text-[#140F49] font-semibold whitespace-nowrap`}
      >
      {data.project.name}
      </h1>
      </div>
      <div>
      <Progress value={percentage} mt="md" size="lg" radius="xl" />
      </div>
      <div className="grid justify-items-end mt-4 ">
      <h1 style={{backgroundColor:`${bg}`,padding:"5px",borderRadius:"15px"}}>{data.status}</h1>
      </div>
    </div>
  );
};

export default DesktaskCarousel;
