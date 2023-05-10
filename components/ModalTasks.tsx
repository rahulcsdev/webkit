import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { useForm } from "@mantine/form";
import { TextInput, Select, Box, Button, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMutation } from "@apollo/client";
import { addTask } from "../services";

interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
  project?: Array<{}>;
  milestones?: Array<{}>;
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });

const ModalTasks = (props: typeModal) => {
  const { showModal, handleCloseModal, milestones, project } = props;
  const [createTask, { data, error, loading }] = useMutation(addTask);
  const mileStoneArr = milestones?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });
  const ProjectArr = project?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  const formData = useForm({
    initialValues: {
      task: "",
      project: "",
      priority: "",
      status: "",
      task_type: "",
      start_date: "",
      end_date: "",
      mileStone: "",
      estimate_Time: "",
      description: " ",
    },
  });

  const formSubmitHandler = (value: any) => {
    console.log(value);
    createTask({
      variables: {
        data: {
          name: value?.task,
          discription: value?.description,

          estimateTime: value?.estimate_Time,
          project: {
            connect: {
              id: value?.project,
            },
          },
          priority: value?.priority,
          status: value?.status,
          milestone: {
            connect: {
              id: value?.mileStone,
            },
          },
          endDate: value?.end_date,
          startDate: value?.start_date,
          taskType: value?.task_type,
        },
      },
    });
  };
  // console.log("form data", formData);

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
            <div className="bg-white rounded-2xl w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200  px-3">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  New Task
                </h2>
              </div>
              <div className="p-4 ">
                <form
                  className="grid grid-cols-2 place-content-center  gap-4 "
                  onSubmit={formData.onSubmit(formSubmitHandler)}
                >
                  <TextInput
                    label="Task"
                    placeholder="Enter your task name"
                    radius="md"
                    {...formData.getInputProps("task")}
                  />
                  <Select
                    label="Project"
                    placeholder="select Project "
                    radius="md"
                    data={ProjectArr}
                    {...formData.getInputProps("project")}
                  />
                  <Box className="col-span-2 grid grid-cols-3 gap-5 place-content-center">
                    <Select
                      label="Priority"
                      placeholder="priority"
                      radius="md"
                      data={[
                        { label: "Urgent", value: "Urgent" },

                        { label: "High", value: "High" },

                        { label: "Medium", value: "Medium" },

                        { label: "No priority", value: "No priority" },

                        { label: "Backlog", value: "Backlog" },
                      ]}
                      {...formData.getInputProps("priority")}
                    />
                    <Select
                      label="Status"
                      placeholder="select status"
                      radius="md"
                      data={[
                        { label: "Open", value: "Open" },
                        {
                          label: "Document Analysis",
                          value: "Document Analysis",
                        },
                        { label: "In Progress", value: "In Progress" },

                        { label: "Code Review", value: "Code Review" },

                        { label: "Completed", value: "Completed" },
                      ]}
                      {...formData.getInputProps("status")}
                    />
                    <Select
                      label="Task type"
                      placeholder="select task type"
                      radius="md"
                      data={[
                        { value: "Frontend", label: "Frontend" },
                        { value: "Backend", label: "Backend" },
                        { value: "Bug", label: "Bug" },
                      ]}
                      {...formData.getInputProps("task_type")}
                    />
                  </Box>
                  <div className=" col-span-2 flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        maw={400}
                        label="Start date"
                        placeholder="Start date"
                        {...formData.getInputProps("start_date")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        label="End date"
                        placeholder="End date"
                        {...formData.getInputProps("end_date")}
                      />
                    </div>
                  </div>
                  <Select
                    label="MileStone"
                    placeholder="select MileStone "
                    radius="md"
                    data={mileStoneArr}
                    {...formData.getInputProps("mileStone")}
                  />
                  <TextInput
                    label="Estimate Time"
                    placeholder="Enter Estimate time"
                    radius="md"
                    {...formData.getInputProps("estimate_Time")}
                  />

                  <Textarea
                    label="Desciption"
                    placeholder="Enter description"
                    radius="md"
                    {...formData.getInputProps("description")}
                  />
                  <Box className="col-span-2  flex justify-center items-center">
                    <Button type="submit" radius="md" className="bg-blue-500">
                      Save
                    </Button>
                    <Button
                      radius="md"
                      className="px-4 py-2 mx-4 bg-blue-500 "
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTasks;
