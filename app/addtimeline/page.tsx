"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import DatePicker from "react-datepicker";
import { Textarea, NumberInput, Select, Button } from "@mantine/core";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import { randomId } from "@mantine/hooks";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../utils/data";
import { FiChevronDown, FiChevronRight, FiTrash } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../components/ModalProject";
import ProjectCard from "../components/ProjectCard";
import ProjectCardCol from "../components/ProjectCardCol";
import Footer from "../components/Footer";
import LayoutNav from "../components/LayoutNav";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });

const GET_TASKS = gql`
  query Query {
    tasks {
      name
      id
    }
  }
`;

const GET_PROJECTS = gql`
  query Projects {
    projects {
      name
      id
    }
  }
`;

const Add_TIMELINES = gql`
  mutation Mutation($data: [TimeEnteryCreateInput!]!) {
    createTimeEnteries(data: $data) {
      activities
      project {
        id
        name
      }
      task {
        id
        name
      }
      duration
      date
    }
  }
`;

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

  const [mutateFunction, { data: data3, loading, error }] =
    useMutation(Add_TIMELINES);

  const { data: data1 } = useQuery(GET_PROJECTS);

  const { data: data2 } = useQuery(GET_TASKS);


  useEffect(()=>{

    if(data3){
      console.log('data added',data3)
    }

  },data3)

  useEffect(() => {
    if (data1) {
      console.log(data1);
      setProjects(
        data1.projects.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
    if (data2) {
      console.log(data1);
      setTasks(
        data2.tasks.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
  }, [data1, data2]);

  console.log(data1);

  const form = useForm({
    initialValues: {
      entries: [{ project: "", task: "", duration: 0, activity: "", key: 0 }],
      date: new Date(),
    },

    validate: {
      entries: {
        project: (value) => (value ? null : "select project"),
        task: (value) => (value ? null : "select task"),
        duration: (value) => (value !== 0 ? null : "duration can not be zero"),
        activity: (value) => (value ? null : "add activity"),
      },
    },
  });

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
      duration: 0,
      activity: "",
      key: randomId(),
    });

    // const name: any = {
    //   ...form.values,
    //   id: "id" + new Date().getTime(),
    // };

    // setEntries([...entry, name]);
  };

  const saveAll = () => {
    console.log("here are all entries", form.values);

    const isEmpty  = form.values.entries.filter((item)=>item.task === '')

    if(isEmpty.length > 0){
      return alert('please select all fields')
    }

    const Mutatedata = form.values.entries.map((item) => {
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
      };
    });

    mutateFunction({
      variables: {
        data: Mutatedata
      },
    });
  };

  function handleCloseModal() {
    setShowModal(false);
  }
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                        />
                      </th>
                      <td className="px-6 py-4">
                        <Select
                          placeholder="choose Task"
                          searchable
                          dropdownPosition="top"
                          withinPortal
                          nothingFound="No options"
                          data={tasks}
                          {...form.getInputProps(`entries.${0}.task`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <NumberInput
                          defaultValue={18}
                          placeholder="choose duration"
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
                                />
                              </th>
                              <td className="px-6 py-4">
                                <Select
                                  placeholder="choose Task"
                                  searchable
                                  nothingFound="No options"
                                  data={tasks}
                                  {...form.getInputProps(
                                    `entries.${index}.task`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <NumberInput
                                  defaultValue={18}
                                  placeholder="choose duration"
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
                  type="submit"
                >
                  Add Time Entry
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ModalProject showModal={showModal} handleCloseModal={handleCloseModal} />
      <Footer />
    </LayoutNav>
  );
};

export default Projects;
