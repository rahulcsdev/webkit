import React from "react";
import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  rem,
  Badge,
  Button,
} from "@mantine/core";
import { Roboto, Manrope } from "next/font/google";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
interface dataType {
  id: string;
  name: string;
  project: {
    name: string;
    id: string;
  };
  endDate: string;
  code: string;
  startDate: string;
  status: string;
}

interface props {
  data: dataType;
  openDetails: (id: string, type: string) => void;
}
const roboto = Roboto({ weight: "500", subsets: ["latin-ext"] });
const manrope = Manrope({ weight: "500", subsets: ["latin"] });
const MsCardGrid: React.FC<props> = ({ data, openDetails }) => {
  const { id, code, endDate, name, project, startDate, status } = data;
  let percentage = 0;

  let date_2 = new Date();

  const days = (date_1: Date, date_2: Date) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  switch (status) {
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
      ? "#F35421"
      : percentage >= 20 && percentage < 40
      ? "#5773FF"
      : percentage >= 40 && percentage < 60
      ? "#FFCF52"
      : percentage >= 60 && percentage < 80
      ? "#50C6B4"
      : "#50C878";
  return (
    <div className=" drop-shadow-md rounded-lg">
      <Card withBorder p="xl" radius="md">
        <div className="flex justify-between items-center">
          <Text className={`font-bold text-xl  capitalize ${roboto.className}`}>
            {name}
          </Text>

          <Badge>{days(new Date(), new Date(endDate))} days left</Badge>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div>
              <Text>{status}</Text>
              <Text fz="xs" color="dimmed">
                Status
              </Text>
            </div>
            <div>
              <Text>{new Date(startDate).toLocaleDateString()}</Text>
              <Text fz="xs" color="dimmed">
                Start date
              </Text>
            </div>
            <div>
              <Text>{project.name}</Text>
              <Text fz="xs" color="dimmed">
                Project Name
              </Text>
            </div>
          </div>

          <div>
            <RingProgress
              roundCaps
              thickness={6}
              size={120}
              sections={[{ value: percentage, color: bg }]}
              label={
                <div>
                  <Text ta="center" fz="lg">
                    {percentage.toFixed(0)}%
                  </Text>
                  <Text ta="center" fz="xs" c="dimmed">
                    progress
                  </Text>
                </div>
              }
            />
          </div>
        </div>
        <div className="flex items-center mt-1 gap-2 justify-start">
        <button
          onClick={()=>openDetails(id,'edit')}
          className={`px-2 py-1 rounded-md bg-transparent text-[#cf9700] hover:bg-[#fff2cf] transition-all delay-75 ease-in duration-100`}
        >
      <FiEdit size={16} />
        </button>
        <button
          onClick={()=>openDetails(id,"view")}
          className={`px-2 py-1 rounded-md  text-[#007ece] hover:bg-[#ceecff] transition-all delay-75 ease-in duration-100`}
        >
         <SlEye size={20} />
        </button>
        </div>
      </Card>
    </div>
  );
};

export default MsCardGrid;
