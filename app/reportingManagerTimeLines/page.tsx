"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, isNotEmpty } from "@mantine/form";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/utils/skeleton";
import { Textarea, Select, Modal, Group ,Badge} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "react-datepicker/dist/react-datepicker.css";
import client from "@/apolloClient";
import { Pagination } from "@mantine/core";

import { Manrope } from "next/font/google";

import { FiEdit } from "react-icons/fi";

import ModalProject from "../../components/project/ModalProject";
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });

import { getSpecificManagerTimeEntries, updateTimeEntry } from "@/services";

const ReportingManagerTimeEntries = () => {
  const [showModal, setShowModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const INITIAL_PAGE = 1;
  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = useState(INITIAL_PAGE);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [total, setTotal] = useState(0);

  


  const router = useRouter();

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

  const { data, loading,refetch } = useQuery(getSpecificManagerTimeEntries, {
    variables: {
      where: {
        reviewedBy: {
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

  // console.log(data);

  const [createProject, {}] = useMutation(updateTimeEntry);


  const getTotalLength = async (id: string) => {
    await client
      .query({
        query: getSpecificManagerTimeEntries,
        variables: {
          where: {
            reviewedBy: {
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
        // console.log("all enteries");
        setTotal(data?.timeEnteries.length);
        // console.log(data);
      });
  };




  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      form.setFieldValue("userId", userId);
      getTotalLength(userId)
    }
  }, []);



  function handleCloseModal() {
    setShowModal(false);
  }

  const changeStatus = async () => {
    if (form.validate().hasErrors) {
      return form.setFieldError("remark", "remark cannot be empty");
    }
    createProject({
      variables: {
        where: {
          id: form.values.id,
        },
        data: {
          reviewStatus: form.values.status,
          remarks: form.values.remark,
          task: {
            connect: {
              id: form.values.taskId,
            },
          },
        },
      },
      refetchQueries: [getSpecificManagerTimeEntries],
    }).then(() => {
      // console.log("j");
      close();
      // getTimeEntries()
    });
    // .catch((error) => console.log(error));
  };
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";

  const handlePageChange = (page: any) => {
    // console.log("page", page);

    setCurrentPage(page);
    refetch({
      where: {
        reviewedBy: {
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

  const getStatus = (status: string) => {
    if (status === "Pending") {
      return (
        <Badge  color="yellow"  variant="filled"  >
          {status}
        </Badge>
      );
    }

    if (status === "Approved") {
      return (
        <Badge  color="green" variant="filled"   >
          {status}
        </Badge>
      );
    }

    if (status === "Rejected") {
      return (
        <Badge  color="red" variant="filled"  >{status}</Badge>
      );
    }
  };


  console.log('r',data)
  
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return loading ? (
        <TableSkeleton/>
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
        <>
          <Modal opened={opened} onClose={close} centered>
       
            <Select
              placeholder="change status"
              label="status"
              withAsterisk
              withinPortal
              {...form.getInputProps(`status`)}
              data={[
                { value: "Pending", label: "Pending" },
                { value: "Approved", label: "Approved" },
                { value: "Rejected", label: "Rejected" },
              ]}
            />
            <Textarea
              className="mt-4"
              label="remark"
              placeholder="write remark"
              withAsterisk
              {...form.getInputProps(`remark`)}
            />
            <Group position="right">
              <button
                type="submit"
                onClick={() => changeStatus()}
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                submit
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
                Approval as Reporting Manager
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
                        Approval
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.timeEnteries.length === 0 && "no Time entries"}
                    {data?.timeEnteries.length > 0 &&
                      data.timeEnteries.map((item: any, index: number) => {
                        if (item.key === 0) {
                        } else {
                          return (
                            <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                              <td className="px-6 py-4">
                                {" "}
                                {item.userName.name}
                              </td>
                              <td className="px-6 py-4">{item.duration}</td>
                              <td className="px-6 py-4">{item.activities}</td>
                              <td className="px-6 py-4">
                                {" "}
                                {getStatus(item.reviewStatus)}{" "}
                              </td>
                              <td>
                                <button
                                  className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6`}
                                  type="button"
                                  onClick={() => {
                                    form.setFieldValue(
                                      "status",
                                      item.reviewStatus
                                    );
                                    form.setFieldValue("id", item.id);
                                    form.setFieldValue("taskId", item.task.id);
                                    form.setFieldValue("remark", "");
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
            <div className="my-5 flex items-center justify-center">
                  {
                    <Pagination
                      total={totalPages}
                      onChange={handlePageChange}
                      value={currentPage}
                    />
                  }
                </div>
          </div>
        </div>
        {/* 
        <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          refetch={refetch:any}
        /> */}
      </form>
    </LayoutNav>
  );
};

export default ReportingManagerTimeEntries;
