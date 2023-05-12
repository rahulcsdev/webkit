"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import DatePicker from "react-datepicker";
import {
  Textarea,
  NumberInput,
  Select,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";
import { randomId } from "@mantine/hooks";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight, FiEdit } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/ModalProject";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCol from "../../components/ProjectCardCol";
import Footer from "../../components/Footer";
import LayoutNav from "../../components/LayoutNav";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });
import client from "../../apolloClient/index";
import {
  getTimeEntriesWhenIamAreportingManager,
  updateTimeEntry,
} from "@/services";

const Projects = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [taskid, setTaskId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [TimeLines, setTimelines] = useState<Array<string>>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [remark, setRemark] = useState<string>('');
  const router = useRouter();

  const getTimeEntries = async () => {
    await client
      .query({
        query: getTimeEntriesWhenIamAreportingManager,
        variables: {
          where: {
            reviewedBy: {
                id: {
                  equals: localStorage.getItem("userId"),
                },
            },
          },
        },
      })
      .then((res: any) => {
        console.log("res", res);
        setTimelines(res.data.timeEnteries);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getTimeEntries();
  }, []);

  function handleCloseModal() {
    setShowModal(false);
  }

  const changeStatus = async () => {
    console.log(value);

    try {
      const data = await client.mutate({
        mutation: updateTimeEntry,
        variables: {
          where: {
            id: id,
          },
          data: {
            reviewStatus: value,
            remarks:remark,
            task: {
              connect: {
                id: taskid,
              },
            },
          },
        },
      });

      if (data?.data?.updateTimeEntery) {
        console.log("s",data?.data?.updateTimeEntery);
        close();
        await client.refetchQueries({
          include: ["getTimeEntriesWhenIamAreportingManager"],
        });
        getTimeEntries();
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <>
        <Modal opened={opened} onClose={close} centered>
          change status
          <Select
            placeholder="change status"
            withinPortal
            value={value}
            onChange={setValue}
            data={[
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
            ]}
          />
              <Textarea
      placeholder="Your Remark"
      value={remark}
      onChange={(e)=>setRemark(e.target.value)}
      label="Your Remark"
      withAsterisk
    />
          <Group position="right">
            <button
              type="button"
              onClick={() => changeStatus()}
              className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              save
            </button>
          </Group>
        </Modal>
      </>
      <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
            >
              Reporting Manager Time Entries
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative"></div>

              <div className="relative">
                <button
                  className={`${clickS} px-3 py-2 rounded-lg capitalize mr-6`}
                  onClick={() => router.push("/timeline")}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="mb-4">
            {/* 
      <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
                Date
              </label>
              <DatePicker
                selected={form.values.date}
                // onChange={(date: any) => setStartDate(date)}
                {...form.getInputProps("date")}
                className="block w-1/2 ... ml-6 mb-6 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark"
              /> */}

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                      change status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {TimeLines.length > 0 &&
                    TimeLines.map((item: any, index) => {
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
                            <td className="px-6 py-4">{item.date.slice(0,10)}</td>
                            <td className="px-6 py-4"> {item.userName.name}</td>
                            <td className="px-6 py-4">{item.duration}</td>
                            <td className="px-6 py-4">{item.activities}</td>
                            <td className="px-6 py-4">{item.reviewStatus}</td>
                            <td>
                              <button
                                className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6`}
                                onClick={() => {
                                  setValue(item.reviewStatus);
                                  setId(item.id);
                                  setTaskId(item.task.id);
                                  open();
                                }}
                              >
                                <FiEdit />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalProject showModal={showModal} handleCloseModal={handleCloseModal} />
      <Footer />
    </LayoutNav>
  );
};

export default Projects;
