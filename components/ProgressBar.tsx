


import React from 'react'

interface Props {
    percentage: number;
}
 const ProgressBar = (prop:Props) => {
    const {percentage}=prop;
    let bgColor='#b53209';
  let color='#fff'
 if(percentage<=30 && percentage>0){
  bgColor='#FFCF52';
  color='#000'
 }else if(percentage<=60 && percentage>30) {
  bgColor='#50C6B4';
  color='#fff'
 }
  else if(percentage<=100 && percentage>60) {
  bgColor='#51BBFE';
  color='#fff'
 } else{
  bgColor="#0023d0";
  color="#fff"
 }
   
     
    const progressStyle={
        width:`${percentage}%`,
        backgroundColor:bgColor
    }
  return (
    <div className='h-2 relative max-w-md rounded-full overflow-hidden' >
  <div className={`w-full h-full  bg-gray-200 absolute`}></div>
   <div className={`h-full absolute `} style={progressStyle} ></div>
    </div>
  )
}

export default ProgressBar