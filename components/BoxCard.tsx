import Image from "next/image";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import pic1 from "../assets/picOne.jpg";
import pic2 from "../assets/picTwo.jpg";
import { Manrope } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"] });

interface cardTypes {
  id: number;
  title: string;
  desc: string;
  bg: string;
  btn: string;
  percentage: number;
  img: number;
}
interface Props {
  data: cardTypes;
}

const BoxCard = (props: Props) => {
  const {
    data: { title, desc, bg, btn, percentage, img },
  } = props;
 
  const arr = new Array(img).fill(0);
  return (
    <div className="bg-white px-4 py-3 drop-shadow-md rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 justify-center">
          <div className="h-[100px] w-[100px]">
            <CircularProgressbar
              strokeWidth={6}
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: `${bg}`,
                pathColor: bg,
                trailColor: "#eee",
              })}
            />
          </div>
          <div className="">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.className}`}
            >
              {title}
            </h1>
            <p className={`text-base font-normal text-[#605C8D]`}>{desc}</p>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <div className="flex">
            {arr.map((item, index) => (
              <Image
                key={index}
                src={index % 2 == 0 ? pic1 : pic2}
                height={30}
                width={30}
                alt="image"
                className={`rounded-full -mr-3`}
              />
            ))}
          </div>
          <button
            className={`px-2 py-1 rounded-md bg-transparent text-[${bg}] hover:bg-[#e1e5f7] transition-all delay-75 ease-in duration-100`}
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxCard;
