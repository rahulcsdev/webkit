import React from 'react'
import {Roboto,Manrope} from 'next/font/google'
import ProgressBar from '../ProgressBar';
 
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
const Card:React.FC<Props> = ({data}) => {
  let bgColor='#b53209';
  let color='#fff'
 if(data.revenue<=30 && data.revenue>0){
  bgColor='#FFCF52';
  color='#000'
 }else if(data.revenue<=60 && data.revenue>30) {
  bgColor='#50C6B4';
  color='#fff'
 }
  else if(data.revenue<=100 && data.revenue>60) {
  bgColor='#51BBFE';
  color='#fff'
 } else{
  bgColor="#0023d0";
  color="#fff"
 }
  return (
    <div  className={`bg-white drop-shadow-md rounded-xl min-w-[280px]  p-5 flex flex-col ${roboto.className} `}>
    <div className="flex justify-between items-center">
    <h1 className={`text-[#140F49] text-xl font-medium ${manrope.className} `} >{data.title}</h1>
     <h1 style={{backgroundColor:bgColor,color:color}} className={`capitalize   text-sm font-semibold px-2 py-1 rounded-md`}>{data.type}</h1>
     
    </div>
    <p className={`text-[1.7em] text-[#140F49] font-medium ${manrope.className} `} >${data.cost}</p>
      <div className="">
        <div className="flex items-center justify-between my-2">
            <h1 className={` font-normal text-base capitalize text-[#605C8D]`} >Total revenue</h1>
            <h1 className={`text-base font-normal`} >{data.revenue}%</h1>
        </div>
        <ProgressBar percentage={data.revenue}  />
      </div>
    </div>
  )
}

export default Card