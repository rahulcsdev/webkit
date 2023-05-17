import React  , { useState , useEffect} from "react";
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
  MultiSelect
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from '@mantine/dates';
import { gql, useQuery, useMutation } from "@apollo/client";
import client from '../../apolloClient/index';
import { addNewUser , getUser, getUserDetails, getspecficUser } from '../../services';


interface typeModal {
  showModal: Boolean;
  handleCloseModal: ()=>void;
  refetch:any
}

interface formTypes {
  name: string;
  email: string;
  password:string;
  designation: string;
  role: string;
  dateOfJoining: Date;
  reportingManager: string;
};


const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });

const ModalEmployee = (props: typeModal) => {
  const { showModal, handleCloseModal  , refetch  } = props;

  const [users, setUsers] = useState<any>([])
  const [options, setOptions] = useState<any>([]);

  const reportManager=[
    { value: "", label: "Choose One",disabled: true  },
  ];

  const reportingManagerOptions=(users:any)=>{
    // console.log(users);
    for (let i = 0; i < users?.length; i++) {
      reportManager.push({value: users[i]?.id,label:users[i].name,disabled:false});
    }
    setUsers(reportManager);
  }
  
    useEffect(() => {
      const getReportingReportingManger = async() => {
        const info: string[] = [];
        const {data}=await client.query({
          query:getUser
          });

          reportingManagerOptions(data.users);
        for (let i = 0; i < data?.users?.length; i++) {
          info.push(data?.users[i]?.name);
        }
        
        setOptions(info);
      };
  
      getReportingReportingManger();
    }, []);


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

  const [createUser, { loading, data, error }] = useMutation(addNewUser);

  const handleSubmit = (formData:formTypes) => {
    // console.log(formData);

    createUser({
      variables: {
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          designation: formData.designation,
          role: formData.role,
          dateOfJoining: formData.dateOfJoining.toISOString(),
          reportingManager: {
            connect: {
              id: formData.reportingManager
            }
          }
        }
      },
      refetchQueries: [{ query: getUser }],
      onCompleted:()=>{
        refetch();
      }
    })
    .then(() => handleCloseModal())
    .catch((error) => console.log(error));
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
            <div className="bg-white rounded-lg w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  New User
                </h2>
              </div>
              <div className="p-4">

                <form onSubmit={form.onSubmit((values) =>handleSubmit(values))}>
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
                        label="Password"
                        placeholder="Password"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        {...form.getInputProps("password")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        variant="filled"
                        label="Designation"
                        placeholder="Designation"
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
                        { label: 'Admin', value: 'admin' },
      
                        { label: 'User Management', value: 'userManagement' },
                       
                        { label: 'Project Management', value: 'projectManagement' },
                        { label: 'Task Management', value: 'taskManagement' },
                       
                        { label: 'Milestone Management', value: 'milestoneManagement' },
                       
                        { label: 'Time Entry Management', value: 'timeEntryManagement' },
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

                    <Grid.Col
                      span={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Group position="right" mt="md">
                        <Button type="submit" size="lg" className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none">
                        {loading?'Creating...':'Create'}
                        </Button>
                        <Button size="lg" className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none"  onClick={() => form.reset()} >
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

export default ModalEmployee;
