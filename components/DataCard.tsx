"use client"
import {Manrope,Roboto} from 'next/font/google'




const manrope=Manrope({subsets:['latin']})
const roboto=Manrope({weight:'400',subsets:['latin']})
interface cardData{
    icon:any
    title:string,
    subTitle:string
}
interface Props{
    data:cardData
}
const DataCard = (props:Props) => {
    const {data:{icon,title,subTitle}}=props;
  return (
    <div className={`bg-[#F8F7F7] p-5 rounded-lg  w-full`} >
       <div className="flex gap-5 justify-start items-center">
         <div className="">
            {icon}
         </div>
         <div className=" border-l-2 border-gray-300 px-4">
            <h1 className={`font-semibold text-[1.2em] text-[#140F49] ${manrope.className} `}>{title}</h1>
            <h3 className={`font-normal text-[#605C8D] text-base ${roboto.className}`}>{subTitle}</h3>
         </div>
       </div>
    </div>
  )
}

export default DataCard