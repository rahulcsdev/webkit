import React from "react";
import { Text, Card, RingProgress, Badge } from "@mantine/core";
import { Roboto, Manrope } from "next/font/google";
import { FiEdit } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";
import { IoPrint } from "react-icons/io5";
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
const MsCardCol: React.FC<props> = ({ data, openDetails }) => {
  const { id, code, endDate, name, project, startDate, status } = data;
  let percentage = 0;
  const days = (date_1: Date, date_2: Date) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  const day = days(new Date(endDate), new Date());
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
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
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
                    status
                  </Text>
                </div>
              }
            />

            <div>
              <div className="flex items-center gap-2">
                <Text
                  className={`font-bold text-xl  capitalize ${roboto.className}`}
                >
                  {name}
                </Text>
              </div>
              <div className="flex items-center justify-start gap-4">
                <div>
                  <Text className="flex items-center gap-1">
                    {" "}
                    <BsCalendar2Check size={12} />{" "}
                    {new Date(startDate).toLocaleDateString()}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    Start date
                  </Text>
                </div>
                <div>
                  <Text className="flex items-center gap-1">
                    <BsCalendar2Check size={12} />
                    {new Date(endDate).toLocaleDateString()}
                  </Text>
                  <Text fz="xs" color="dimmed">
                    End date
                  </Text>
                </div>
              </div>
              <div>
                <Text className="flex items-center capitalize gap-1">
                  <IoPrint /> {project.name}
                </Text>
                <Text fz="xs" color="dimmed">
                  Project Name
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="">
              {status === "Completed" ? (
                <Badge color="green">{status}</Badge>
              ) : (
                <Badge color={day >= 0 ? "cyan" : "red"}>
                  {day >= 0 ? `${day} days left` : `Time limit exceed`}
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1 gap-2 justify-end">
              <button
                onClick={() => openDetails(id, "edit")}
                className={`px-2 py-1 rounded-md bg-transparent text-primary hover:bg-orange-50 transition-all delay-75 ease-in duration-100`}
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => openDetails(id, "view")}
                className={`px-2 py-1 rounded-md  text-secondary hover:bg-blue-50 transition-all delay-75 ease-in duration-100`}
              >
                <SlEye size={20} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MsCardCol;
