"use client";
import { useForm, isNotEmpty } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Textarea, NumberInput, Select, Button } from "@mantine/core";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../../utils/data";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../../components/project/ModalProject";
import ProjectCard from "../../../components/project/ProjectCard";
import ProjectCardCol from "../../../components/project/ProjectCardCol";
import Footer from "../../../components/Footer";
import { gql, useMutation, useQuery } from "@apollo/client";
import client from "@/apolloClient";
import LayoutNav from "../../../components/LayoutNav";
const manrope = Manrope({ subsets: ["latin"] });
import {
  getSpecificManagerTimeEntries,
  updateTimeEntry,
  getAll,
  getTimesheetDetails,
  getProjects,
  getTasksOfSelectedProject,
  getProjectDetail,
  updateTimesheet,
  getspecficUser,
} from "@/services";
import { useRouter } from "next/navigation";
import { get } from "http";

const EditTimeEntry = ({ params }: any) => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  const [updateTimeEntry, {}] = useMutation(updateTimesheet);

  const form = useForm({
    initialValues: {
      project: "",
      task: "",
      duration: 0,
      activity: "",
      timesheetId: "",
      projects: [],
      tasks: [],
      projectType: "",
      userId: "",
    },
    validate: {
      project: (value) => (value ? null : "select project"),
      task: (value) => (value ? null : "select task"),
      duration: (value: any) =>
        value === 0 || value === "" ? "duration can not be zero" : null,
      activity: (value) => (value ? null : "add activity"),
    },
  });

  const { data } = useQuery(getTimesheetDetails, {
    variables: {
      where: {
        id: form.values.timesheetId,
      },
    },
  });

  const getReportingManagerId = async () => {
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

  const getProjectManagerId = async (projectId: string) => {
    return await client
      .query({
        query: getProjectDetail,
        variables: {
          where: {
            id: projectId,
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
    return await client
      .query({
        query: getProjects,
      })
      .then((res: any) => {
        // console.log("res", res);

        const projectsData = res.data.projects.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

        return projectsData;
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
        const tasksData = res.data.tasks.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        return tasksData;
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

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

  const selectProject = async (e: any) => {
    form.setFieldValue(`project`, e);
    form.setFieldValue(`task`, "");
    const tasks = await getProjectsTasks(e);
    form.setFieldValue(`tasks`, tasks);
    const projectType = await getProjectType(e);
    form.setFieldValue(`projectType`, projectType);
  };

  const getProjectsAndTasksSelectedData = async (data: any) => {
    const Allprojects = await getProjectsData();
    const tasks = await getProjectsTasks(data?.timeEntery?.project.id);

    form.setFieldValue("projects", Allprojects);
    form.setFieldValue("tasks", tasks);
  };

  useEffect(() => {
    if (params.id) {
      form.setFieldValue("timesheetId", params.id);
    }

    const userId = localStorage.getItem("userId");
    if (userId) {
      form.setFieldValue("userId", userId);
    }

    if (data) {
      console.log("data", data);
      getProjectsAndTasksSelectedData(data);

      form.setFieldValue("project", data?.timeEntery.project.id);
      form.setFieldValue("task", data?.timeEntery.task.id);
      form.setFieldValue("activity", data?.timeEntery.activities);
      form.setFieldValue("projectType", data?.timeEntery.projectType);
      form.setFieldValue("duration", parseInt(data?.timeEntery.duration));
    }
  }, [data]);

  const saveTimeSheetDetails = async () => {
    // console.log("save", form.values);

    if (form.validate().hasErrors) {
      return;
    } else {
      const formatteddata: any = {
        activities: form.values.activity,
        duration: form.values.duration.toString(),
        task: {
          connect: {
            id: form.values.task,
          },
        },

        project: {
          connect: {
            id: form.values.project,
          },
        },
        projectType: form.values.projectType,
        ...((form.values.projectType === "Internal project" ||
          localStorage.getItem("userId") ===
            (await getProjectManagerId(form.values.project))) && {
          reviewedBy: {
            connect: {
              id: await getReportingManagerId(),
            },
          },
        }),
        ...((form.values.projectType === "Hourly cost project" ||
          form.values.projectType === "Fixed cost project") &&
          localStorage.getItem("userId") !==
            (await getProjectManagerId(form.values.project)) && {
            projectManager: {
              connect: {
                id: await getProjectManagerId(form.values.project),
              },
            },
          }),
        reviewStatus: "Pending",
      };

      // console.log("formattedData", formatteddata);

      //removing default manger

      if (formatteddata.reviewedBy?.connect) {
        formatteddata.projectManager = {
          disconnect: true,
        };
      }
      if (formatteddata.projectManager?.connect) {
        formatteddata.reviewedBy = {
          disconnect: true,
        };
      }

      // console.log("format1", formatteddata);

      updateTimeEntry({
        variables: {
          data: formatteddata,
          where: {
            id: form.values.timesheetId,
          },
        },
      })
        .then((res: any) => {
          console.log("timeline updated", res);
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
    }
  };

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
                Edit Time Entry
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="relative">
                  <button
                    onClick={() => router.push("/timeline")}
                    className={`${clickS} px-3 py-2 rounded-lg capitalize`}
                  >
                    back
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white drop-shadow-md rounded-xl my-8 px-8 py-4">
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
                {form.values?.tasks?.length > 0 && (
                  <tr>
                    <td className="px-6 py-4">
                      <Select
                        placeholder="choose project "
                        searchable
                        withAsterisk
                        // label="select project"
                        styles={(theme) => ({
                          input: {
                            padding: "20px !important",
                            borderRadius: "12px !important",
                          },
                        })}
                        nothingFound="No options"
                        data={form.values.projects}
                        {...form.getInputProps(`project`)}
                        onChange={(e) => selectProject(e)}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Select
                        placeholder="choose Task"
                        searchable
                        dropdownPosition="bottom"
                        // label="select task"
                        styles={(theme) => ({
                          input: {
                            padding: "20px !important",
                            borderRadius: "12px !important",
                          },
                        })}
                        withinPortal
                        withAsterisk
                        nothingFound="No options"
                        data={form.values.tasks}
                        {...form.getInputProps(`task`)}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <NumberInput
                        placeholder="choose duration"
                        // label="select duration"
                        styles={(theme) => ({
                          input: {
                            padding: "20px !important",
                            borderRadius: "12px !important",
                          },
                        })}
                        type="number"
                        // withAsterisk
                        {...form.getInputProps(`duration`)}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Textarea
                        placeholder="write here"
                        // label="create activity"
                        // withAsterisk
                        styles={(theme) => ({
                          input: {
                            padding: "20px !important",
                            borderRadius: "12px !important",
                          },
                        })}
                        {...form.getInputProps(`activity`)}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={() => saveTimeSheetDetails()}
              type="submit"
              className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6 mb-4 m`}
            >
              Save Time Entry
            </button>
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

export default EditTimeEntry;
