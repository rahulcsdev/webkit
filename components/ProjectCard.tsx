import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiFillStar } from "react-icons/ai";
import { Manrope, Roboto } from "next/font/google";
import {GrEdit} from 'react-icons/gr'
import { FiEdit } from "react-icons/fi";
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
interface projectTypes   {
  status: string,
  startDate: string,
  projectType: string,
  projectManager: {
    name: string,
    id: string
  },
  projectDiscription: string,
  name: string,
  memberCount: number,
  member: [
    {
      id: string,
      name: string
    },
    {
      id: string,
      name: string
    },
    {
      id: string,
      name: string
    }
  ],
  id: string,
  endDate: string
}
interface Props {
  data: projectTypes,
  openDetais:any
}

const ProjectCard:React.FC<Props> = ({data,openDetais}) => {
 
  const {name,status,projectDiscription,member,memberCount,projectManager,projectType,startDate,endDate,id} =data;
 let percentage=0;
 
    switch(status){
      case 'New':
        percentage=5;
        break;
      case 'Design Developement':
        percentage=10;
        break;
      case 'In Progress':
        percentage=50;
        break;
      case 'Testing':
        percentage=70;
        break;
      case 'Completed':
        percentage=99;
        break;
        default:
          percentage=0;
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
      className={`bg-white drop-shadow-md p-5 rounded-lg h-[calc(100% - 30px)]`}
    >
      <div className="flex items-center justify-between">
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
        <AiFillStar className="text-yellow-400 text-xl" />
      </div>
      <div className="mt-4 pb-5 border-b-2 border-gray-200">
        <div className="flex justify-between items-center">

        <h2
          className={`text-[#140F49] ${manrope.className} font-semibold text-[1.2em] `}
        >
          {name}
        </h2>
        <h2
          className={`text-yellow-500 bg-yellow-100 ${manrope.className} font-semibold text-sm px-2 py-[1px] rounded-md lowercase `}
        >
          {status}
        </h2>
        </div>
           <div className="flex justify-between items-center">

        <p className={`text-green-400 text-base ${roboto.className} mt-1`}>
         <span className="font-medium" >P.SD:</span> {new Date(startDate).toLocaleDateString()}
        </p>
        <p className={`text-red-400 text-base ${roboto.className} mt-1`}>
         <span className="font-medium" >P.ED :</span> {new Date(endDate).toLocaleDateString()}
        </p>
           </div>
        <p className={`text-[#605C8D] text-base ${roboto.className} mt-1`}>
         <span className="font-medium" >Manager :</span> {projectManager?projectManager.name:'Non'}
        </p>
        <p className={`text-[#605C8D] text-base ${roboto.className} max-h-[70px] overflow-y-scroll mt-1`}>
          {projectDiscription}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-start">
      <div className="grid grid-cols-2 gap-2 items-start justify-start "> 
          {member.slice(0,3).map((item, index) => (
            <div key={index}
              className={`text-white text-sm px-2 py-1 rounded-md ${
                index % 2 == 0
                  ? "bg-sky-400 "
                  : index % 3 == 0
                  ? "bg-orange-600"
                  : "bg-yellow-500"
              }`}
            >
              {item.name}
            </div>
          ))}
        
          {
            member.length>3&&<div className="px-2 text-xl rounded-full bg-gray-200" >{memberCount-3}+</div>
          }
           
        
        </div>
        <button
          onClick={()=>openDetais(id)}
          className={`px-2 py-1 rounded-md bg-transparent text-[${bg}] hover:bg-[#e1e5f7] transition-all delay-75 ease-in duration-100`}
        >
      <FiEdit size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
