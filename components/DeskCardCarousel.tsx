import React from "react";
interface cardType {
  name: string;
  startDate: string;
  percentage: number;
  bg: string;
  sbg: string;
  btn: string;
  image: number;
  status:String;
  color: string;
}
interface Props {
  data: cardType;
}
const DeskCardCarousal = (props: Props) => {
  const { data } = props;
  let percentage = 0;
  switch (data.status) {
    case "New":
      percentage = 5;
      break;
    case "Design Developement":
      percentage = 10;
      break;
    case "In Progress":
      percentage = 50;
      break;
    case "Testing":
      percentage = 70;
      break;
    case "Completed":
      percentage = 99;
      break;
    default:
      percentage = 0;
      break;
  }
  const bg =
    percentage > 0 && percentage < 20
      ? "#FFCF52"
      : percentage >= 20 && percentage < 30
      ? "#5773FF"
      : percentage >= 30 && percentage < 40
      ? "#F35421"
      : percentage >= 40 && percentage < 60
      ? "#50C6B4"
      : "#5773FF";


  return (
    <div
      className={`relative bg-white drop-shadow-md rounded-xl p-5 my-2  mx-5 ...  `}
    >
      <h1
        className={`text-[1.2em]  text-[#140F49] font-semibold whitespace-nowrap`}
      >
        {data.name}
      </h1>
      <div className="grid justify-items-end ">
       <h1 style={{backgroundColor:`${bg}`,padding:"5px",borderRadius:"15px"}}>{data.status}</h1>
      </div>
    </div>
  );
};

export default DeskCardCarousal;
