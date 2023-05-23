"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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
import { TableSkeleton } from "@/utils/skeleton";
import {
  ColorSchemeProvider,
  Pagination,
  Badge,
  Tooltip,
  Text,
} from "@mantine/core";
import client from "@/apolloClient";

const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
const manrope = Manrope({ subsets: ["latin"] });
import { getSpecificManagerTimeEntries, updateTimeEntry } from "@/services";
import { useRouter } from "next/navigation";
const TimeEntries = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const INITIAL_PAGE = 1;
  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = useState(INITIAL_PAGE);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [total, setTotal] = useState(0);

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

  const getStatus = (status: string) => {
    if (status === "Pending") {
      return (
        <Badge color="yellow" variant="filled">
          {status}
        </Badge>
      );
    }

    if (status === "Approved") {
      return (
        <Badge color="green" variant="filled">
          {status}
        </Badge>
      );
    }

    if (status === "Rejected") {
      return (
        <Badge color="red" variant="filled">
          {status}
        </Badge>
      );
    }
  };

  const { data, loading, refetch } = useQuery(getSpecificManagerTimeEntries, {
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
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    },
  });

  // console.log("data", data);

  const router = useRouter();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handlePageChange = (page: any) => {
    console.log("page", page);

    setCurrentPage(page);
    refetch({
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
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    });
  };

  const getTotalLength = async (id: string) => {
    await client
      .query({
        query: getSpecificManagerTimeEntries,
        variables: {
          where: {
            userName: {
              id: {
                equals: id,
              },
            },
          },
          orderBy: [
            {
              date: "asc",
            },
          ],
        },
      })
      .then(({ data }) => {
        console.log("all enteries");
        setTotal(data?.timeEnteries.length);
        console.log(data);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      form.setFieldValue("userId", userId);

      refetch({
        where: {
          userName: {
            id: {
              equals: userId,
            },
          },
        },
        orderBy: [
          {
            date: "asc",
          },
        ],
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      });

      getTotalLength(userId);
    }
  }, []);

  function handleCloseModal() {
    setShowModal(false);
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // console.log(total);

  const clickS = "bg-secondary text-white";
  const notClickS = "bg-gray-100 text-black";
  return loading ? (
    <TableSkeleton />
  ) : (
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
                className={`text-secondary text-[1.2em] font-semibold ${manrope.style} `}
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
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
              <thead className="capitalize bg-[#F8F7F7] font-semibold text-[1em] text-[#140F49]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    createdBy
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Activities
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                     Reviewed By
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Remark
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="rounded">
                {data?.timeEnteries.length === 0 && "no Time entries"}
                {data?.timeEnteries.length > 0 &&
                  data.timeEnteries.map((item: any, index: number) => {
                    if (item.key === 0) {
                    } else {
                      return (
                        <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                          >
                            {item.project?.name}
                          </th>
                          <td className="px-6 py-4 text-center">{item.task?.name}</td>
                          <td className="px-6 py-4 text-center">
                            {item?.date?.slice(0, 10)}
                          </td>
                          <td className="px-6 py-4 text-center"> {item.userName.name}</td>
                          <td className="px-6 py-4 text-center">{item.duration}</td>
                          <td className="px-6 py-4 text-center">
                            {" "}
                            <Tooltip
                              multiline
                              color="blue"
                              width={200}
                              offset={10}
                              withArrow
                              transitionProps={{ duration: 200 }}
                              label={item.activities}
                            >
                              <Text truncate w={60}>
                                {item.activities}
                              </Text>
                            </Tooltip>{" "}
                          </td>
                          <td className="px-6 py-4 text-center">{item?.projectManager?.name ? item?.projectManager?.name : item?.reviewedBy?.name }</td>
                          <td className="px-6 py-4 text-center">{item.remarks}</td>
                          <td className="px-6 py-4 text-center">
                            {" "}
                            {getStatus(item.reviewStatus)}
                          </td>
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
            <div className="my-5 flex items-center justify-center">
              {
                <Pagination
                  total={totalPages}
                  onChange={handlePageChange}
                  value={currentPage}
                  styles={(theme) => ({
                    control: {
                      "&[data-active]": {
                        backgroundColor: "#006180",
                      },
                    },
                  })}
                />
              }
            </div>
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

export default TimeEntries;
