import Image from 'next/image'
import React from 'react'
import ProgressBar from '../ProgressBar'
 

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
          <ProgressBar percentage={data.percentage}  />
        </div>

        <p>{data.percentage}%</p>
      </div>
      <div className="flex">
        <Image
          src="/assets/picTwo.jpg"
          height={30}
          width={30}
          alt="image"
          className={`rounded-full -mr-3`}
        />
        <Image
          src="/assets/picTwo.jpg"
          height={30}
          width={30}
          alt="image"
          className={`rounded-full -mr-3`}
        />
        <Image
          src="/assets/picTwo.jpg"
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