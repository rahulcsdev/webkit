import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { BiTask } from "react-icons/bi";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import pic1 from "../public/assets/picOne.jpg";
import pic2 from "../public/assets/picTwo.jpg";
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
interface cardType {
  title: string;
  date: string;
  percentage: number;
  bg: string;
  sbg: string;
  btn: string;
  image: number;
  color: string;
}
interface Props {
  data: cardType;
}
const DeskCardCarousal = (props: Props) => {
  const { data } = props;
  console.log("m", data);
  const arr = new Array(data.image).fill(0);
  return (
    <div
      className={`relative bg-white drop-shadow-md rounded-xl p-5 my-2  mx-5 ...  `}
    >
      <h1
        className={`text-[1.2em] mb-3 ${manrope.className} text-[#140F49] font-semibold whitespace-nowrap`}
      >
        {data.title}
      </h1>
      <div className="flex items-center justify-start gap-3 mb-[1.2rem]">
        <BiTask className="text-[#605C8D]" />
        <p
          className={`text-base text-[#605C8D] font-normal ${manrope.className}`}
        >
          {data.date}
        </p>
      </div>
      <div className="w-full mb-8">
        <ProgressBar
          percentage={data.percentage}
          color={data.bg}
          sbg={data.sbg}
        />
      </div>
      <div className="flex justify-between items-center">
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
          className={`px-2 ${roboto.className} text-base py-1 rounded-md ${data.sbg} text-[${data.color}] border-none outline-none`}
        >
          {data.btn}
        </button>
      </div>
    </div>
  );
};

export default DeskCardCarousal;
