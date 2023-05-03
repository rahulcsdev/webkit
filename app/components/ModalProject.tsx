import React, { useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";
import Multiselect from "multiselect-react-dropdown";
import { employeeData, projectsData } from "../utils/data";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  MultiSelect,
  NativeSelect,
  PasswordInput,
  Input,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });
const ModalProject = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    const getEmployeeInfo = () => {
      const info: string[] = [];
      for (let i = 0; i < employeeData.length; i++) {
        info.push(employeeData[i].name);
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
    },
  });
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
                  onSubmit={form.onSubmit((values) => console.log(values))}
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
                    <Input.Wrapper label="Project Mamager" required mx="auto">
                      <Input
                        required
                        placeholder="Enter Manager name"
                        {...form.getInputProps("projectManager")}
                        // sx={{padding:'2px 1px',backgroundColor:'green'}}
                      />
                    </Input.Wrapper>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        maw={400}
                        label="Start date"
                        placeholder="Start date"
                        {...form.getInputProps("startDate")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        label="End date"
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
                          { value: "react", label: "React" },
                          { value: "ng", label: "Angular" },
                          { value: "svelte", label: "Svelte" },
                          { value: "vue", label: "Vue" },
                        ]}
                        {...form.getInputProps("status")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <Select
                        label="Project Type"
                        placeholder="Pick one"
                        data={[
                          { value: "react", label: "React" },
                          { value: "ng", label: "Angular" },
                          { value: "svelte", label: "Svelte" },
                          { value: "vue", label: "Vue" },
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
