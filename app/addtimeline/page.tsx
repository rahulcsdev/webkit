"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import DatePicker from "react-datepicker";
import { Textarea, NumberInput, Select, Button } from "@mantine/core";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";
import { randomId } from "@mantine/hooks";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight, FiTrash, FiCalendar } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/project/ModalProject";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectCardCol from "../../components/project/ProjectCardCol";
import Footer from "../../components/Footer";
import LayoutNav from "../../components/LayoutNav";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });
import client from "../../apolloClient/index";
import { DateInput } from "@mantine/dates";
import { getAuthData } from "../helper";
import {
  getProjects,
  addTimesheets,
  getProjectDetail,
  getspecficUser,
  getTasksOfSelectedProject,
  getSpecificManagerTimeEntries,
} from "@/services";

const AddTimeLine = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [entry, setEntries] = useState<Array<object>>([]);
  const [selectValue, setSelectValue] = useState<Array<string>>([]);
  const [projects, setProjects] = useState<Array<string>>([]);
  const [tasks, setTasks] = useState<Array<string>>([]);
  const router = useRouter();

  const [createTimesheets, {}] = useMutation(addTimesheets);

  
  const { refetch:refetchAuth} = getAuthData()


  const getReportingManagerId = async (item: any) => {
    return await client
      .query({
        query: getspecficUser,
        variables: {
          where: {
            id: localStorage.getItem("userId"),
          },
        },
      })
      .then((res: any) => {
        // console.log("res", res);
        return res.data?.user?.reportingManager.id;
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  const getProjectManagerId = async (item: any) => {
    return await client
      .query({
        query: getProjectDetail,
        variables: {
          where: {
            id: item.project,
          },
        },
      })
      .then((res: any) => {
        // console.log("res", res);
        return res.data?.project?.projectManager.id;
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  const getProjectsData = async () => {
    await client
      .query({
        query: getProjects,
      })
      .then((res: any) => {
        // console.log("res", res);
        setProjects(
          res.data.projects.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
        );
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  const getProjectsTasks = async (id: string) => {
    return await client
      .query({
        query: getTasksOfSelectedProject,
        variables: {
          where: {
            project: {
              id: {
                equals: id,
              },
            },
          },
        },
      })
      .then((res: any) => {
        // console.log("tasks", res);
        return res.data.tasks;
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  useEffect(() => {
     refetchAuth()
    const userId = localStorage.getItem("userId");
    if (userId) {
      form.setFieldValue("userId", userId);
    }
    getProjectsData();
  }, []);

  const form = useForm({
    initialValues: {
      userId: "",
      entries: [
        {
          project: "",
          task: "",
          tasks: [],
          duration: 0,
          activity: "",
          projectType: "",
          remarks: "",
          projectManager: "",
          key: 0,
        },
      ],
      date: new Date(),
    },

    validate: {
      entries: {
        project: (value) => (value ? null : "select project"),
        task: (value) => (value ? null : "select task"),
        duration: (value: any) =>
          value === 0 || value === "" ? "duration can not be zero" : null,
        activity: (value) => (value ? null : "add activity"),
      },
    },
  });

  const { refetch: refetch1 } = useQuery(getSpecificManagerTimeEntries, {
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

  const { refetch: refetch2 } = useQuery(getSpecificManagerTimeEntries, {
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
    },
  });

  const { refetch: refetch3 } = useQuery(getSpecificManagerTimeEntries, {
    variables: {
      where: {
        projectManager: {
          id: {
            equals: form.values.userId,
          }
        },
      },
      orderBy: [
        {
          date: "asc",
        },
      ],
    },
  });

  const getProjectType = async (id: string) => {
    return await client
      .query({
        query: getProjectDetail,
        variables: {
          where: {
            id: id,
          },
        },
      })
      .then((res: any) => {
        // console.log("res", res.data?.project?.projectType);
        return res.data?.project?.projectType;
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  const deleteEntry = (Id: string) => {
    // console.log("delete", Id);

    const FilteredArray = entry.filter((item: any) => item.id !== Id);

    setEntries(FilteredArray);
  };

  const addEntry = () => {
    // console.log('form',form.values)

    // console.log("form", form.values);
    form.insertListItem("entries", {
      project: "",
      task: "",
      tasks: [],
      duration: 0,
      activity: "",
      projectType: "",
      projectManager: "",
      key: randomId(),
    });
  };

  const saveAll = async () => {
    // console.log("here ", form.validate());

    if (form.validate().hasErrors) {
      return;
    } else {
      // console.log("no errors");

      const Mutatedata = form.values.entries.map(async (item) => {
        return {
          activities: item.activity,
          duration: item.duration.toString(),
          task: {
            connect: {
              id: item.task,
            },
          },
          date: form.values.date,
          project: {
            connect: {
              id: item.project,
            },
          },
          projectType: item.projectType,
          ...((item.projectType === "Internal project" ||
            localStorage.getItem("userId") ===
              (await getProjectManagerId(item))) && {
            reviewedBy: {
              connect: {
                id: await getReportingManagerId(item),
              },
            },
          }),
          ...((item.projectType === "Hourly cost project" ||
            item.projectType === "Fixed cost project") &&
            localStorage.getItem("userId") !==
              (await getProjectManagerId(item)) && {
              projectManager: {
                connect: {
                  id: await getProjectManagerId(item),
                },
              },
            }),
          userName: {
            connect: {
              id: localStorage.getItem("userId"),
            },
          },
          reviewStatus: "Pending",
          remarks: item.remarks,
        };
      });

      Promise.all(Mutatedata).then((values) => {
        // console.log(values);
        createTimesheets({
          variables: {
            data: values,
          },
        })
          .then((res: any) => {
            // console.log("timelines added", res);
            refetch1();
            refetch2();
            refetch3();
            setTimeout(() => {
              router.push("/timeline");
            }, 1000);
          })
          .catch((err) => {
            // console.log("err", err);
          });
      });
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  const getFilteredTasks = () => {
    // console.log("jj");
  };

  const selectProject = async (e: any, index: number) => {
    // console.log("number", index);

    form.setFieldValue(`entries.${index}.project`, e);
    form.setFieldValue(`entries.${index}.task`, "");

    const tasks = await getProjectsTasks(e);

    // console.log("tasks", tasks);

    const TasksDropDownData = tasks.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

    form.setFieldValue(`entries.${index}.tasks`, TasksDropDownData);

    const projectType = await getProjectType(e);

    form.setFieldValue(`entries.${index}.projectType`, projectType);
  };

  const clickS = "bg-secondary text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="px-5 py-6">
          {/* Second Navbar */}
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="flex items-center justify-between">
              <h1
                className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
              >
                Add Time Entry
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="relative"></div>

                <div className="relative">
                  <button
                    type="button"
                    className={`${clickS} px-3 py-2 rounded-lg capitalize mr-2`}
                    onClick={() => router.push("/timeline")}
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => saveAll()}
                    type="submit"
                    className={`${clickS} px-3 py-2 rounded-lg capitalize`}
                  >
                    Save Time Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-6">
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="mb-4">
   

              <div className="flex mx-5 my-4">
                <DateInput
                  {...form.getInputProps("date")}
                  styles={(theme) => ({
                    input: {
                      padding: "20px !important",
                      borderRadius: "12px !important",
                      width:"270px"
                    },
                  })}
                  placeholder="Date input"
                  label={<div className="flex" >  <FiCalendar  className="text-2xl"  />  <h4 className="mx-2" > select date </h4></div>}
                />
              </div>

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
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Activities
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-auto">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Select
                          placeholder="choose project"
                          className="z-40 ..."
                          searchable
                          nothingFound="No options"
                          data={projects}
                          dropdownPosition="top"
                          withinPortal
                          {...form.getInputProps(`entries.${0}.project`)}
                          styles={(theme) => ({
                            input: {
                              padding: "20px !important",
                              borderRadius: "12px !important",
                            },
                          })}
                          onChange={(e) => selectProject(e, 0)}
                        />
                      </th>
                      <td className="px-6 py-4">
                        <Select
                          placeholder="choose Task"
                          searchable
                          dropdownPosition="top"
                          withinPortal
                          nothingFound="No options"
                          styles={(theme) => ({
                            input: {
                              padding: "20px !important",
                              borderRadius: "12px !important",
                            },
                          })}
                          data={form.values.entries[0].tasks}
                          {...form.getInputProps(`entries.${0}.task`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <NumberInput
                          placeholder="choose duration"
                          type="number"
                          withAsterisk
                          styles={(theme) => ({
                            input: {
                              padding: "20px !important",
                              borderRadius: "12px !important",
                            },
                          })}
                          {...form.getInputProps(`entries.${0}.duration`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Textarea
                          placeholder="write here"
                          withAsterisk
                          styles={(theme) => ({
                            input: {
                              padding: "20px !important",
                              borderRadius: "12px !important",
                            },
                          })}
                          {...form.getInputProps(`entries.${0}.activity`)}
                        />
                      </td>
                    </tr>

                    {form.values.entries.length > 1 &&
                      form.values.entries.map((item: any, index) => {
                        if (item.key === 0) {
                        } else {
                          return (
                            <tr
                              key={item.key}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <Select
                                  placeholder="choose project"
                                  searchable
                                  nothingFound="No options"
                                  styles={(theme) => ({
                                    input: {
                                      padding: "20px !important",
                                      borderRadius: "12px !important",
                                    },
                                  })}
                                  data={projects}
                                  {...form.getInputProps(
                                    `entries.${index}.project`
                                  )}
                                  onChange={(e) => selectProject(e, index)}
                                />
                              </th>
                              <td className="px-6 py-4">
                                <Select
                                  placeholder="choose Task"
                                  searchable
                                  nothingFound="No options"
                                  styles={(theme) => ({
                                    input: {
                                      padding: "20px !important",
                                      borderRadius: "12px !important",
                                    },
                                  })}
                                  data={item.tasks}
                                  {...form.getInputProps(
                                    `entries.${index}.task`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <NumberInput
                                  placeholder="choose duration"
                                  styles={(theme) => ({
                                    input: {
                                      padding: "20px !important",
                                      borderRadius: "12px !important",
                                    },
                                  })}
                                  type="number"
                                  withAsterisk
                                  {...form.getInputProps(
                                    `entries.${index}.duration`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <Textarea
                                  placeholder="write here"
                                  styles={(theme) => ({
                                    input: {
                                      padding: "20px !important",
                                      borderRadius: "12px !important",
                                    },
                                  })}
                                  withAsterisk
                                  {...form.getInputProps(
                                    `entries.${index}.activity`
                                  )}
                                />
                              </td>
                              <td>
                                <button
                                  className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6`}
                                  onClick={(e) =>
                                    form.removeListItem("entries", index)
                                  }
                                >
                                  <FiTrash />
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>

                <button
                  className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6 mt-2`}
                  onClick={() => addEntry()}
                  type="button"
                >
                  Add Time Entry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />  */}
      </form>
    </LayoutNav>
  );
};

export default AddTimeLine;
