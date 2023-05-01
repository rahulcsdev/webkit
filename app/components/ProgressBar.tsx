import React from 'react'

interface Props {
    percentage: number;
    color: string;
    sbg:string
  }
const ProgressBar = (prop:Props) => {
    const {percentage,color,sbg}=prop;
    const progressStyle={
        width:`${percentage}%`
    }
  return (
    <div className='h-2 relative max-w-md rounded-full overflow-hidden' >
  <div className={`w-full h-full ${sbg?`${sbg}`:'bg-gray-200'} absolute`}></div>
   <div className={`h-full absolute ${color}`} style={progressStyle} ></div>
    </div>
  )
}

export default ProgressBar