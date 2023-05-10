import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { useForm } from "@mantine/form";
import { TextInput, Select, Box, Button, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
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
  console.log("milestone", milestones);
  const formData = useForm({
    initialValues: {
      task: "",
      project: "",
      priority: "",
      status: "",
      task_type: "",
      state_date: "",
      end_date: "",
      mileStone: "",
      estimate_Time: "",
      description: " ",
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
                  onSubmit={formData.onSubmit((values) => console.log(values))}
                >
                  <TextInput
                    label="Task"
                    placeholder="Enter your task name"
                    radius="md"
                    {...formData.getInputProps("task")}
                  />
                  <Select
                    label="Project"
                    placeholder="Enter Project Name"
                    radius="md"
                    // data={project?.map((item: any, index: number) => {
                    //   value: item?.name,
                    //   label:item?.name
                    // })}
                    data={[
                      { value: "urgent", label: "Urgent" },
                      { value: "high", label: "High" },
                      { value: "no priority", label: "No Priority" },
                      { value: "backlog", label: "BackLog" },
                    ]}
                    {...formData.getInputProps("priority")}
                  />
                  <Box className="col-span-2 grid grid-cols-3 gap-5 place-content-center">
                    <Select
                      label="Priority"
                      placeholder="priority"
                      radius="md"
                      data={[
                        { value: "urgent", label: "Urgent" },
                        { value: "high", label: "High" },
                        { value: "no priority", label: "No Priority" },
                        { value: "backlog", label: "BackLog" },
                      ]}
                      {...formData.getInputProps("priority")}
                    />
                    <Select
                      label="Status"
                      placeholder="select status"
                      radius="md"
                      data={[
                        { value: "active", label: "active" },
                        { value: "delay", label: "delay" },
                        { value: "close", label: "close" },
                      ]}
                      {...formData.getInputProps("status")}
                    />
                    <Select
                      label="Task type"
                      placeholder="select task type"
                      radius="md"
                      data={[
                        { value: "frontend", label: "Frontend" },
                        { value: "backend", label: "backend" },
                        { value: "bug", label: "bug" },
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
                  <TextInput
                    label="MileStone"
                    placeholder="mileStone"
                    radius="md"
                    {...formData.getInputProps("mileStone")}
                  />
                  <TextInput
                    label="Estimate Time"
                    placeholder="Enter Estimate time"
                    radius="md"
                    {...formData.getInputProps("estimate_Time")}
                  />
                  <TextInput
                    label="Project Manager"
                    placeholder="Project Manager"
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
