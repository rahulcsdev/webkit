import React from 'react'
import {Roboto,Manrope} from 'next/font/google'
import ProgressBar from './ProgressBar';
 
const roboto = Roboto({weight:'400',subsets:['latin']});
const manrope = Manrope({weight:'500',subsets:['latin']});
interface cartType{
    id:number,
    title:string,
    cost:number,
    revenue:number,
    bg:string,
    color:string,
    type:string,
    sbg:string
 }
 interface Props{
    data:cartType
 }
const Card = (props:Props) => {
   
   const {data}=props;
  return (
    <div  className={`bg-white drop-shadow-md rounded-xl min-w-[280px]  p-5 flex flex-col ${roboto.className} `}>
    <div className="flex justify-between items-center">
    <h1 className={`text-[#140F49] text-xl font-medium ${manrope.className} `} >{data.title}</h1>
     <h1 className={`capitalize ${data.bg} ${data.color} text-sm font-semibold px-2 py-1 rounded-md`}>{data.type}</h1>
     
    </div>
    <p className={`text-[1.7em] text-[#140F49] font-medium ${manrope.className} `} >${data.cost}</p>
      <div className="">
        <div className="flex items-center justify-between my-2">
            <h1 className={` font-normal text-base capitalize text-[#605C8D]`} >Total revenue</h1>
            <h1 className={`text-base font-normal`} >{data.revenue}%</h1>
        </div>
        <ProgressBar percentage={data.revenue} color={data.bg} sbg={data.sbg} />
      </div>
    </div>
  )
}

export default Card