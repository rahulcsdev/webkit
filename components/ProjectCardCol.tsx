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
    data:dataTypes
 }


const ProjectCardCol = (props:Props) => {
    const {data:{title,desc,percentage,btn,people}}=props;
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
        <div className="mt-4 flex justify-between flex-col items-center">
        <div className="flex">
            {arr.map((item, index) => (
              <Image
                key={index}
                src={index % 2 == 0 ? pic1 : pic2}
                height={30}
                width={30}
                alt="image"
                className={`rounded-full -mr-3`}
              />
            ))}
          </div>
          <button
            className={`px-2 py-1 rounded-md bg-transparent text-[${bg}] hover:bg-[#e1e5f7] transition-all delay-75 ease-in duration-100`}
          >
            {btn}
          </button>
        </div>
        </div>
    </div>
  )
}

export default ProjectCardCol