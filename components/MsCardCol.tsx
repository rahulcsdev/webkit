import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { Roboto,Manrope } from 'next/font/google'
interface dataType{
  name:string,
  project:string,
  startDate:string,
  endDate:string,
  status:string
}

interface props{
  data:dataType
}
const roboto=Roboto({weight:'400',subsets:['latin']})
const manrope=Manrope({weight:'600',subsets:['latin']})
const MsCardCol = (props:props) => {
  const {data}=props;
  const formatDate=(date:string)=>{
const dateNew=new Date(date);
return dateNew.toLocaleDateString();
  }
  return (
    <div className='bg-white drop-shadow-md rounded-lg px-4 py-2' >
      <div className="flex justify-between items-center">
        <h1 className={`text-xl font-semibold text-[#140F49] ${manrope.className} `}>{data.name}</h1>
        <div className="flex gap-1 justify-center items-center">
          <div className="p-2 cursor-pointer bg-green-200 rounded-full flex items-center justify-center text-green-600">
            <BiEditAlt/>
          </div>
          <div className="p-2 cursor-pointer bg-red-200 rounded-full flex items-center justify-center text-red-600">
            <BsFillTrash3Fill/>
          </div>
        
        </div>
      
      </div>
      <div className={`${roboto.className} text-gray-900`}>
            <h6 className={`text-md font-normal`}> <span className={`font-medium text-gray-600`}>Project Name :</span> {data.project}</h6>
            <h6 className={`text-md font-normal`}> <span className={`font-medium text-gray-600`}>Start Date :</span> {formatDate(data.startDate)}</h6>
            <h6 className={`text-md font-normal`}> <span className={`font-medium text-gray-600`}>End Date :</span> {formatDate(data.endDate)}</h6>
            <h6 className={`text-md font-normal`}> <span className={`font-medium text-gray-600`}>Status :</span> {data.status}</h6>
           </div>
    </div>
  )
}

export default MsCardCol