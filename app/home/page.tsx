"use client";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
import { boxCardData, cartData, dataDev, progressData } from "../../utils/data";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Card = dynamic(() => import("../../components/dashboard/Card"));
const CardPro = dynamic(() => import("../../components/dashboard/CardPro"));
const BoxCard = dynamic(() => import("../../components/dashboard/BoxCard"));
const CustomCalender = dynamic(() => import("../../components/CustomCalender"));
const DataCard = dynamic(() => import("../../components/dashboard/DataCard"));
const MyCarousal = dynamic(
  () => import("../../components/dashboard/MyCarousal")
);
const MilestonesCarousel = dynamic(
  () => import("../../components/dashboard/milestonesCarousel/MilestonesCarousel")
);
const TaskCarousel = dynamic(
  () => import("../../components/dashboard/taskCarousel/TaskCarousel")
);
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
import { getspecficUser } from "@/services";
import { useContext } from "react";
import { User_data } from "../context/context";
import client from "@/apolloClient";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  const { user, setUser }: any = useContext(User_data);

  const getUserData = async (id: string) => {
    const data = await client.query({
      query: getspecficUser,
      variables: {
        where: {
          id: id,
        },
      },
    });

    return data;
  };

  const router = useRouter();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    // console.log("in nav");
    const id = localStorage.getItem("userId");
    if (id) {
      const data = getUserData(id);

      data
        .then((res: any) => {
          if (res) {
            setUser(res.data.user);
            // console.log(res);
          }
        })
        .catch((err) => {
          // console.log("error",err);
        });
    }
  }, []);

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
                {progressData.map((item, index) => (
                  <CardPro key={index} data={item} />
                ))}
              </div>
            </div>
            {/* Cloud service team */}
            {boxCardData.map((item, index) => (
              <BoxCard key={index} data={item} />
            ))}
          </div>
          {/* Right part */}
          <div className="flex basis-2/5 px-5 py-3 ">
            <div className="  px-4 py-3 w-full rounded-xl bg-white drop-shadow-md">
              <CustomCalender onChange={handleDateChange} value={date} />
              <div className="mt-5  flex flex-col gap-5 items-center justify-center">
                {dataDev.map((item, index) => (
                  <DataCard key={index} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* First carousal  */}

        <div className="my-2 px-5">
          <h1
            className={`text-2xl text-center font-semibold text-[#140F49] ${manrope.className} mt-5`}
          >
            Current Projects
          </h1>
         
          <div className="w-full mt-5 flex items-center justify-center flex-col pb-5">
            <MyCarousal />
          </div>
        </div>

          {/* Second carousal  */}

          <div className="my-2 px-5">
          <h1
            className={`text-2xl text-center font-semibold text-[#140F49] ${manrope.className} mt-5`}
          >
            Current Milestones
          </h1>
         
          <div className="w-full mt-5 flex items-center justify-center flex-col pb-5">
           <MilestonesCarousel/>
          </div>
        </div>

        {/* Third carousal  */}

        <div className="my-2 px-5">
          <h1
            className={`text-2xl text-center font-semibold text-[#140F49] ${manrope.className} mt-5`}
          >
            Current Tasks
          </h1>
         
          <div className="w-full mt-5 flex items-center justify-center flex-col pb-5">
            <TaskCarousel/>
          </div>
        </div>


      </div>
    </LayoutNav>
  );
}
