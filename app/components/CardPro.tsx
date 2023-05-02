import Image from 'next/image'
import React from 'react'
import ProgressBar from './ProgressBar'
import pic1 from "../assets/picOne.jpg";
import pic2 from "../assets/picTwo.jpg";
import pic3 from "../assets/pic3.jpg";

interface dataType{
    
        id:number,
        title:string,
        bg:string,
        sbg:string,
        percentage:number
     
}
interface Props{
    data:dataType
}
const CardPro = (props:Props) => {
    const {data}=props;
    
  return (
    <div className="flex flex-col mt-5">
    <div className="flex w-full gap-1 items-center justify-between">
      <h6 className={`whitespace-nowrap capitalize text-[#605C8D] text-base`}>{data.title}</h6>
      <div className="w-[80%] flex items-center gap-px">
        <div className="w-full">
          <ProgressBar percentage={data.percentage} color={data.bg} sbg={data.sbg} />
        </div>

        <p>{data.percentage}%</p>
      </div>
      <div className="flex">
        <Image
          src={pic1}
          height={30}
          width={30}
          alt="image"
          className={`rounded-full -mr-3`}
        />
        <Image
          src={pic2}
          height={30}
          width={30}
          alt="image"
          className={`rounded-full -mr-3`}
        />
        <Image
          src={pic3}
          height={30}
          width={30}
          alt="image"
          className={`rounded-full`}
        />
      </div>
    </div>
  </div>
  )
}

export default CardPro