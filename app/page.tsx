"use client"
import { Manrope } from "next/font/google";
import { boxCardData, cartData, dataDev, progressData } from "./utils/data";
import Card from "./components/Card";
import {useState} from 'react'
import CardPro from "./components/CardPro";
 
import BoxCard from "./components/BoxCard";
import CustomCalender from "./components/CustomCalender";
import DataCard from "./components/DataCard";
import MyCarousal from "./components/MyCarousal";
 
import LayoutNav from "@/app/components/LayoutNav";
import Footer from "@/app/components/Footer";
 

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() { 
 
  const [date, setDate] = useState<Date>(new Date());

const handleDateChange=(date:Date)=>{
  setDate(date);
}
 
 
  return (
    <LayoutNav>
       <div className="px-5 py-6">
      <div className="flex items-stretch justify-center w-full flex-wrap gap-5">
        {cartData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      {/* second Part */}
      <div className="flex flex-1 flex-row mt-6 gap-2">
        {/* Left part */}
        <div className="flex flex-col gap-4 basis-3/5 px-5 py-3 ">
          {/* Progress part */}
          <div className="bg-white drop-shadow-md rounded-xl px-4 overflow-hidden py-3">
            <h1
              className={`text-[#140F49] font-semibold text-[1.44em] ${manrope.className} `}
            >
              Overview Progress
            </h1>
            {/* Cards */}
            <div className="flex flex-col gap-4 ">
            {
              progressData.map((item,index)=>(
              <CardPro key={index} data={item} />
              ))
            }
            </div>
          
          </div>
        {/* Cloud service team */}
        {
           boxCardData.map((item,index)=>(
            <BoxCard key={index} data={item} />
           ))
        }
       
        </div>
        {/* Right part */}
        <div className="flex basis-2/5 px-5 py-3 ">
          <div className="  px-4 py-3 w-full rounded-xl bg-white drop-shadow-md">
              <CustomCalender onChange={handleDateChange} value={date} />
              <div className="mt-5  flex flex-col gap-5 items-center justify-center">
                {
                  dataDev.map((item,index)=>(
                    <DataCard  key={index} data={item} />
                  ))
                }
              </div>
          </div>
        </div>
      </div>
      {/* Third part carousal  */}

      <div className="my-2 px-5">
        <h1 className={`text-2xl font-semibold text-[#140F49] ${manrope.className}`}>Current Projects</h1>
        {/* Carousal part */}
        <div className="w-full mt-5 flex items-center justify-center flex-col pb-5">
        <MyCarousal />
        </div>
      
      </div>

    </div>
    <Footer  />
    </LayoutNav>
  );
}
