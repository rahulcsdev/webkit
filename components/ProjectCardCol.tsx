import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { Manrope,Roboto } from 'next/font/google';
import Image from 'next/image';
import pic1 from "../assets/picOne.jpg";
import pic2 from "../assets/picTwo.jpg";
const manrope=Manrope({subsets:['latin']});
const roboto=Roboto({weight:'400',subsets:['latin']});
interface dataTypes  {
    title:string,
    desc:string,
    percentage:number,
    btn:string,
    people:number
 }
 interface Props{
    data:dataTypes,
    openDetails:any
 }


const ProjectCardCol = (props:Props) => {
    const {data:{title,desc,percentage,btn,people},openDetails}=props;
     const bg=percentage>0&&percentage<20?'#FFCF52':percentage>=20&&percentage<30?"#5773FF":percentage>=30&&percentage<40?"#F35421":percentage>=40&&percentage<60?"#50C6B4":'#5773FF'
     const arr = new Array(people).fill(0);
  return (
    <div className={`bg-white drop-shadow-md p-5 rounded-lg h-[calc(100% - 30px)]`} >
         <div className="flex items-center gap-2 justify-between">
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
         
        <div className="mt-4 pb-5 ">
          <h2 className={`text-[#140F49] ${manrope.className} font-semibold text-[1.2em] `}>{title}</h2>
          <p className={`text-[#605C8D] text-base ${roboto.className} mt-1`}>{desc}</p>
        </div>
        <div className="mt-4 gap-2 flex justify-between flex-col items-center">
        <div className="flex">
            {arr.slice(0,3).map((item, index) => (
              <div
              className={`text-white text-sm px-2 py-1 rounded-md ${
                index % 2 == 0
                  ? "bg-sky-400 "
                  : index % 3 == 0
                  ? "bg-orange-600"
                  : "bg-yellow-500"
              }`}
            >
              Rahul
            </div>
            ))}
          </div>
          <button
          onClick={()=>openDetails(title)}
            className={`px-2 py-1 rounded-md bg-transparent text-[${bg}] hover:bg-[#e1e5f7] transition-all delay-75 ease-in duration-100`}
          >
            view
          </button>
        </div>
        </div>
    </div>
  )
}

export default ProjectCardCol