import React, { FormEventHandler, useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Card,
  Image,
  Select,
  Grid,
  Flex,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { gql, useQuery, useMutation } from "@apollo/client";
import client from "../../apolloClient/index";
import {
  getUser,
  addNewUser,
  getUserDetails,
  getspecficUser,
  addUser,
  updateUser
} from "../../services";

interface formTypes {
  // id: string;
  name: string;
  email: string;
  password: string;
  designation: string;
  role: string;
  dateOfJoining: Date;
  reportingManager: string;
}

interface typeModal {
  showEditModal: Boolean;
  handleCloseModal: () => void;
  id: string;
  fetchUser: () => void;
}

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });

const ModalEditEmployee = (props: typeModal) => {
  const { fetchUser, showEditModal, handleCloseModal, id } = props;

  const [users, setUsers] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [details, setDetails] = useState<object>([]);
  const [loading, setLoading] = useState(false);

  const reportManager = [{ value: "", label: "Choose One", disabled: true }];

  const reportingManagerOptions = (users: any) => {
    for (let i = 0; i < users?.length; i++) {
      reportManager.push({
        value: users[i]?.id,
        label: users[i].name,
        disabled: false,
      });
    }
    setUsers(reportManager);
  };

  
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      designation: "",
      role: "",
      dateOfJoining: new Date(),
      reportingManager: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query:getspecficUser,
        variables: {
          where: {
            id: id,
          },
        },
      });
      // console.log(data);
      
      form.setFieldValue("name", data?.user.name);
      form.setFieldValue("email", data?.user.email);
      form.setFieldValue("designation", data?.user.designation);
      form.setFieldValue("role", data?.user.role);

      form.setFieldValue("dateOfJoining", new Date(data?.user.dateOfJoining));
      data.user.reportingManager &&
      form.setFieldValue("reportingManager", data?.user.reportingManager.id);

      setDetails(data?.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const getReportingReportingManger = async () => {
      const info: string[] = [];
      const { data } = await client.query({
        query:getUser,
      });
      // console.log(data)

      reportingManagerOptions(data.users);
      for (let i = 0; i < data?.users?.length; i++) {
        info.push(data?.users[i]?.name);
      }

      setOptions(info);
    };

    getReportingReportingManger();
  }, []);


  useEffect(() => {
    fetchDetails();
  
  }, [id]);

  const updateUserHandler = async (formData: formTypes) => {
    // console.log(formData);
    try {
      const { data } = await client.mutate({
        mutation: updateUser,
        variables: {
          where: {
            id: id,
          },
          data: {
            role: formData.role,
            reportingManager: {
              connect: {
                id: formData.reportingManager,
              },
            },
            name: formData.name,
            email: formData.email,
            designation: formData.designation,
            dateOfJoining:formData.dateOfJoining.toISOString(),         
          },
        },
        refetchQueries: [{ query: getUser }],
      })
      // console.log(data);
      handleCloseModal();
    } 
    catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      {showEditModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  Update User
                </h2>
              </div>
              <div className="p-4">
                <form onSubmit={form.onSubmit((values) => updateUserHandler(values))}>
                  <Grid>
                    <Grid.Col span={12}>
                      <TextInput
                        variant="filled"
                        label="Full Name"
                        placeholder="Full Name"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        //   style={{ width: "400px" }}
                        {...form.getInputProps("name")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        variant="filled"
                        label="Email"
                        placeholder="your@email.com"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        {...form.getInputProps("email")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        variant="filled"
                        label="designation"
                        placeholder="designation"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        {...form.getInputProps("designation")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <DateInput
                        label="Date of Joining"
                        placeholder="Date of Joining"
                        maw={400}
                        mx="auto"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        {...form.getInputProps("dateOfJoining")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <MultiSelect
                        data={[
                          { label: "Admin", value: "admin" },

                          { label: "User Management", value: "userManagement" },

                          {
                            label: "Project Management",
                            value: "projectManagement",
                          },
                          { label: "Task Management", value: "taskManagement" },

                          {
                            label: "Milestone Management",
                            value: "milestoneManagement",
                          },

                          {
                            label: "Time Entry Management",
                            value: "timeEntryManagement",
                          },
                        ]}
                        label="Role"
                        placeholder="Role"
                        searchable
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        {...form.getInputProps("role")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <Select
                        label="Reporting Manager"
                        variant="filled"
                        placeholder="Reporting Manager"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        data={users}
                        {...form.getInputProps("reportingManager")}
                      />
                    </Grid.Col>

                    <Grid.Col
                      span={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Group position="right" mt="md">
                        <Button
                          type="submit"
                          size="lg"
                          className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none"
                        >
                          Save
                        </Button>
                        <Button
                          size="lg"
                          className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none"
                          onClick={() => form.reset()}
                        >
                          Reset
                        </Button>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEditEmployee;
