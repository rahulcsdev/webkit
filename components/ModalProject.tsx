"use client";
import React, { useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";
import client from "../apolloClient/index";
import { gql } from "@apollo/client";
import { employeeData, projectsData } from "../utils/data";
import { MultiSelect, Input, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const ModalProject = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
  const [options, setOptions] = useState<any>([]);
  const [users, setUsers] = useState([]);
  const managerOp = [];
  const getManagerOptions = () => {
    for (let i = 0; i < users.length; i++) {
      managerOp.push({ value: users[i].id, lable: users[i].name });
    }
    return managerOp;
  };

  useEffect(() => {
    const getEmployeeInfo = async () => {
      const info: string[] = [];
      const { data } = await client.query({
        query: gql`
          query Query {
            users {
              id
              name
            }
          }
        `,
      });
      // console.log(data)
      setUsers(data.users);
      for (let i = 0; i < data?.users?.length; i++) {
        info.push(data?.users[i]?.name);
      }
      setOptions(info);
    };

    getEmployeeInfo();
  }, []);
  const form = useForm({
    initialValues: {
      projectName: "",
      projectManager: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      type: "",
      members: [],
      desc: "",
      code: "",
    },
  });
  interface formTypes {
    projectName: string;
    projectManager: string;
    startDate: Date;
    endDate: Date;
    status: string;
    type: string;
    members: Array<string>;
    desc: string;
    code: string;
  }
  const createProject = async (formData: formTypes) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white max-h-[550px] overflow-y-scroll rounded-lg w-[500px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  New Project
                </h2>
              </div>
              <div className="p-4">
                <form
                  action=""
                  onSubmit={form.onSubmit((values) => createProject(values))}
                >
                  <div className="relative w-full">
                    <Input.Wrapper label="Project Name" required mx="auto">
                      <Input
                        required
                        placeholder="Enter yout Project name"
                        {...form.getInputProps("projectName")}
                        // sx={{padding:'2px 1px',backgroundColor:'green'}}
                      />
                    </Input.Wrapper>
                  </div>
                  <div className="relative w-full">
                    <Select
                      label="Project Manager"
                      placeholder="Pick one"
                      data={getManagerOptions}
                      {...form.getInputProps("projectManager")}
                    />
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <DateInput
                        mx="auto"
                        maw={400}
                        label="Start Date"
                        placeholder="Start date"
                        {...form.getInputProps("startDate")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DateInput
                        mx="auto"
                        label="End Date"
                        placeholder="End date"
                        {...form.getInputProps("endDate")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <Select
                        label="Status"
                        placeholder="Pick one"
                        data={[
                          { label: "New", value: "New" },

                          {
                            label: "Design Developement",
                            value: "Design Developement",
                          },

                          { label: "In Progress", value: "In Progress" },

                          { label: "Testing", value: "Testing" },

                          { label: "Completed", value: "Completed" },
                        ]}
                        {...form.getInputProps("status")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <Select
                        label="Project Type"
                        placeholder="Pick one"
                        data={[
                          {
                            label: "Internal project",
                            value: "Internal project",
                          },

                          {
                            label: "Hourly cost project",
                            value: "Hourly cost project",
                          },

                          {
                            label: "Fixed cost project",
                            value: "Fixed cost project",
                          },
                        ]}
                        {...form.getInputProps("type")}
                      />
                    </div>
                  </div>
                  <MultiSelect
                    data={options}
                    label="Members"
                    mx="auto"
                    searchable
                    placeholder="Pick all members you like"
                    {...form.getInputProps("members")}
                  />
                  <Input.Wrapper label="Project Description" required mx="auto">
                    <Input
                      required
                      placeholder="Enter your Project description"
                      {...form.getInputProps("desc")}
                      // sx={{padding:'2px 1px',backgroundColor:'green'}}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Project Code" required mx="auto">
                    <Input
                      required
                      placeholder="Enter your Project Code Link"
                      {...form.getInputProps("code")}
                      // sx={{padding:'2px 1px',backgroundColor:'green'}}
                    />
                  </Input.Wrapper>
                  <div className="flex items-center justify-center mt-4 gap-4 ">
                    <button
                      type="submit"
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => form.reset()}
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProject;
