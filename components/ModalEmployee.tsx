import React  , { useState , useEffect} from "react";
import { Manrope, Roboto } from "next/font/google";
import { type, role } from "../utils/data";
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
import index from '../apolloClient/index';


interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}

const finduserRole=gql`query($where: UserWhereUniqueInput!){
  user(where: $where){
    id
    name
    role
  }
}`

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });

const ModalEmployee = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;

  const [roles, setRoles] = useState<Array<string>>([]);

  const { data: data1 } = useQuery(finduserRole);

  useEffect(() => {
    if (data1) {
      console.log(data1);
      setRoles(
        data1.roles.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
  }, [data1]);

  console.log(data1);

  const data = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'riot', label: 'Riot' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
  ];

  const form = useForm({
    initialValues: {
      entries: [{ roles:"", key: 0 }],
      name: "",
      email: "",
      password: "",
      code: "",
      designation: "",
      // role: "",
      dateofjoining: "",
      reportingmanager: "",
      date: new Date(),
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });


  const [value, setValue] = useState<Date | null>(null);

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

                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                        placeholder="Role"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        data={[
                          { value: "", label: "Reporting Manager" },
                          { value: "usermanagement", label: "User Management" },
                          { value: 'projectmanagement', label: 'Project Management' },
                          { value: 'taskmanagement', label: 'Task Management' },
                          { value: "milestonemanagement", label: "Milestone Management" },
                          { value: 'timeentrymanagement', label: 'TimeEntry Management' },
                        ]}
                        {...form.getInputProps("role")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                     
                    <DateInput
                        value={value}
                        onChange={setValue}
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
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                    <MultiSelect
                      data={data}
                      label="Role"
                      placeholder="Role"
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

                    {/* <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            /> */}

                    <Grid.Col
                      span={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Group position="right" mt="md">
                        <Button type="submit" size="lg" className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none">
                          Save
                        </Button>
                        <Button type="submit" size="lg" className="text-white px-6 bg-[#5773FF] rounded-md py-2 border-none">
                          Cancel
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
