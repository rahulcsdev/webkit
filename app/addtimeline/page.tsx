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
import { FiChevronDown, FiChevronRight, FiTrash } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/ModalProject";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCol from "../../components/ProjectCardCol";
import Footer from "../../components/Footer";
import LayoutNav from "../../components/LayoutNav";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });
import client from "../../apolloClient/index";
import {
  getProjects,
  addTimesheets,
  getProjectDetail,
  getspecficUser,
  getTasksOfSelectedProject,
} from "@/services";

const Projects = () => {
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

  const getManagerId = async (item: any) => {
    if (
      item.projectType === "Hourly cost project" ||
      item.projectType === "Fixed cost project"
    ) {
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
          console.log("res", res);
          return res.data?.project?.projectManager.id;
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      return await client
        .query({
          query: getspecficUser,
          variables: {
            id: localStorage.getItem("userId"),
          },
        })
        .then((res: any) => {
          console.log("res", res);
          return res.data?.user?.reportingManager.id;
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const getProjectsData = async () => {
    await client
      .query({
        query: getProjects,
      })
      .then((res: any) => {
        console.log("res", res);
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
        console.log("err", err);
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
        console.log("tasks", res);
        return res.data.tasks;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  const form = useForm({
    initialValues: {
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
        duration: (value:any) => ( (value === 0  || value === '' ) ?  "duration can not be zero" : null),
        activity: (value) => (value ? null : "add activity"),
      },
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
        console.log("res", res.data?.project?.projectType);
        return res.data?.project?.projectType;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteEntry = (Id: string) => {
    console.log("delete", Id);

    const FilteredArray = entry.filter((item: any) => item.id !== Id);

    setEntries(FilteredArray);
  };

  const addEntry = () => {
    // // console.log('form',form.values)

    console.log("form", form.values);
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
    console.log("here ", form.validate());

    if(form.validate().hasErrors){
       return
    }

    else{
     console.log('no errors')
     
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
        reviewedBy: {
          connect: {
            id: await getManagerId(item),
          },
        },
        ...((item.projectType === "Hourly cost project" ||
          item.projectType === "Fixed cost project") && {
          projectManager: await getManagerId(item),
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
      console.log(values);
      client
      .mutate({
        mutation: addTimesheets,
        variables: {
          data: values,
        },
      })
      .then((res: any) => {
        console.log("timelines added", res);
        alert('timeline added')
      })
      .catch((err) => {
        console.log("err", err);
      });
    });
    }

  };

  function handleCloseModal() {
    setShowModal(false);
  }

  const getFilteredTasks = () => {
    console.log("jj");
  };

  const selectProject = async (e: any, index: number) => {
    console.log("number", index);

    form.setFieldValue(`entries.${index}.project`, e);
    form.setFieldValue(`entries.${index}.task`,"")

    const tasks = await getProjectsTasks(e);

    console.log("tasks", tasks);

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

  const clickS = "bg-[#5773FF] text-white";
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
                    className={`${clickS} px-3 py-2 rounded-lg capitalize mr-6`}
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
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
                Date
              </label>

              <DatePicker
                selected={form.values.date}
                // onChange={(date: any) => setStartDate(date)}
                {...form.getInputProps("date")}
                className="block w-1/2 ... ml-6 mb-6 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark"
              />

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
                          data={form.values.entries[0].tasks}
                          {...form.getInputProps(`entries.${0}.task`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <NumberInput
                          defaultValue={18}
                          placeholder="choose duration"
                          type="number"
                          withAsterisk
                          {...form.getInputProps(`entries.${0}.duration`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Textarea
                          placeholder="write here"
                          withAsterisk
                          {...form.getInputProps(`entries.${0}.activity`)}
                        />
                      </td>
                    </tr>

                    {form.values.entries.length > 1 &&
                      form.values.entries.map((item: any, index) => {
                        if (item.key === 0) {
                        } else {
                          return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <Select
                                  placeholder="choose project"
                                  searchable
                                  nothingFound="No options"
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
                                  data={item.tasks}
                                  {...form.getInputProps(
                                    `entries.${index}.task`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <NumberInput
                                  defaultValue={18}
                                  placeholder="choose duration"
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

        <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
        <Footer />
      </form>
    </LayoutNav>
  );
};

export default Projects;
