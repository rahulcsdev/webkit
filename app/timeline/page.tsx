"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight, FiEdit } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/project/ModalProject";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectCardCol from "../../components/project/ProjectCardCol";
import Footer from "../../components/Footer";
import { useForm, isNotEmpty } from "@mantine/form";
import { gql, useMutation, useQuery } from "@apollo/client";

import LayoutNav from "../../components/LayoutNav";
const manrope = Manrope({ subsets: ["latin"] });
import { getSpecificManagerTimeEntries, updateTimeEntry } from "@/services";
import { useRouter } from "next/navigation";
const Projects = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  const form = useForm({
    initialValues: {
      status: "",
      remark: "",
      taskId: "",
      id: "",
      userId: "",
    },

    validate: {
      remark: isNotEmpty("remark cannot be empty"),
    },
  });

  const { data } = useQuery(getSpecificManagerTimeEntries, {
    variables: {
      where: {
        userName: {
          id: {
            equals: form.values.userId,
          },
        },
      },
      orderBy: [
        {
          date: "asc",
        },
      ],
    },
  });

  const router = useRouter();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    // console.log("l");
    const userId = localStorage.getItem("userId");
    if (userId) {
      form.setFieldValue("userId", userId);
    }
  }, []);

  function handleCloseModal() {
    setShowModal(false);
  }
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <form
        onSubmit={form.onSubmit(
          (values, _event) => {
            // console.log("h", values, _event);
          },
          (validationErrors, _values, _event) => {
            // console.log(validationErrors);
          }
        )}
      >
        <div className="px-5 py-6">
          {/* Second Navbar */}
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="flex items-center justify-between">
              <h1
                className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
              >
                Time Entries
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="relative">
                  <button
                    onClick={() => router.push("/addtimeline")}
                    className={`${clickS} px-3 py-2 rounded-lg capitalize`}
                  >
                    New Time Entry
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white drop-shadow-md rounded-xl rounded mt-8">
            {data?.timeEnteries.length === 0 && "no Time entries"}

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3">
                    date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    createdBy
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Activities
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="rounded">
                {data?.timeEnteries.length > 0 &&
                  data.timeEnteries.map((item: any, index: number) => {
                    if (item.key === 0) {
                    } else {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.project?.name}
                          </th>
                          <td className="px-6 py-4">{item.task?.name}</td>
                          <td className="px-6 py-4">
                            {item.date.slice(0, 10)}
                          </td>
                          <td className="px-6 py-4"> {item.userName.name}</td>
                          <td className="px-6 py-4">{item.duration}</td>
                          <td className="px-6 py-4">{item.activities}</td>
                          <td className="px-6 py-4">{item.reviewStatus}</td>
                          <td>
                            {item.reviewStatus === "Rejected" && (
                              <button
                                className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6`}
                                type="button"
                                onClick={() =>
                                  router.push(`/edittimeline/${item.id}`)
                                }
                              >
                                <FiEdit />
                              </button>
                            )}
                          </td>
                          <td></td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          refetch={refetch}
        /> */}
      </form>
    </LayoutNav>
  );
};

export default Projects;
