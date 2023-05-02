import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { useForm } from "@mantine/form";
import { TextInput, Select, Box, Button, Textarea } from "@mantine/core";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });
const ModalTasks = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
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
                {/* <form className="grid grid-cols-2 place-content-center  ">
                  <div className="my-2 flex flex-col">
                    <label htmlFor="task" className="my-2 font-semibold">
                      Task
                    </label>
                    <input
                      type="text"
                      id="task"
                      placeholder="Enter your task name"
                      className="mr-4 p-3 w-[90%] rounded-2xl bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="my-2 flex flex-col">
                    <label htmlFor="project" className="my-2 font-semibold">
                      Project
                    </label>
                    <input
                      type="text"
                      name=""
                      id="project"
                      placeholder="Project name"
                      className="mr-4 p-3 rounded-2xl w-[90%]  bg-[#eee] focus:bg-white "
                    />
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-5 place-content-center  ">
                    <div className="my-2 flex flex-col ">
                      <label htmlFor="priority" className="my-2 font-semibold">
                        Priority
                      </label>
                      <select
                        defaultValue=""
                        className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-2xl border-[#E0E2DB]`}
                      >
                        {[
                          "urgent",
                          "High",
                          "medium",
                          "No priority",
                          "Backlog",
                        ].map((item: any, index) => (
                          <option
                            disabled={item.value === ""}
                            key={index}
                            className={`text-sm text-[#605C8D] py-3 p-3`}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="my-2 flex flex-col">
                      <label htmlFor="status" className="my-2 font-semibold">
                        Status
                      </label>
                      <input
                        type="text"
                        placeholder="status"
                        className="rounded-2xl p-3  bg-[#eee] focus:bg-white"
                      />
                    </div>

                    <div className="my-2 flex flex-col">
                      <label htmlFor="task-type" className="my-2 font-semibold">
                        Task type
                      </label>
                      <select
                        defaultValue=""
                        className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3  border-[#E0E2DB] rounded-2xl mr-4`}
                      >
                        {["Frontend", "Backend", "Bug"].map(
                          (item: any, index) => (
                            <option
                              disabled={item.value === ""}
                              key={index}
                              className={`text-sm text-[#605C8D] py-3 p-3`}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="my-2 flex flex-col">
                    <label htmlFor="start-date" className="my-2 font-semibold">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name=""
                      id="start date"
                      placeholder="state date"
                      className="mr-6 rounded-2xl p-3 w-[90%]  bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="my-2 flex flex-col">
                    <label htmlFor="end-date" className="my-2 font-semibold">
                      End Date
                    </label>
                    <input
                      type="date"
                      placeholder="End date"
                      className="mr-6 rounded-2xl p-3  w-[90%] bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="my-2 flex flex-col">
                    <label htmlFor="mileStone" className="my-2 font-semibold">
                      mileStone
                    </label>
                    <input
                      type="text"
                      placeholder="mileStone"
                      className="rounded-2xl p-3 w-[90%] bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="my-2 flex flex-col">
                    <label
                      htmlFor="estimate-time"
                      className="my-2 font-semibold"
                    >
                      Estimate Time
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Estimate Time"
                      className="mr-6 rounded-2xl p-3 w-[90%] bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="my-2 flex flex-col">
                    <label htmlFor="description" className="my-2 font-semibold">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter Description "
                      className="rounded-2xl p-2 w-[90%]  bg-[#eee] focus:bg-white"
                    />
                  </div>
                  <div className="col-span-2  flex justify-center items-center">
                    <button
                      type="submit"
                      className="px-4 py-2 my-4 bg-blue-500 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 mx-4 bg-blue-500 rounded-lg"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form> */}
                <form
                  className="grid grid-cols-2 place-content-center  gap-4 "
                  onSubmit={formData.onSubmit((values) => console.log(values))}
                >
                  <TextInput
                    label="Task"
                    placeholder="Enter your task name"
                    {...formData.getInputProps("task")}
                  />
                  <TextInput
                    label="Project"
                    placeholder="Enter Project name"
                    {...formData.getInputProps("project")}
                  />
                  <Box className="col-span-2 grid grid-cols-3 gap-5 place-content-center">
                    <Select
                      label="Priority"
                      placeholder="priority"
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
                      data={[
                        { value: "frontend", label: "Frontend" },
                        { value: "backend", label: "backend" },
                        { value: "bug", label: "bug" },
                      ]}
                      {...formData.getInputProps("task_type")}
                    />
                  </Box>
                  <TextInput
                    label="MileStone"
                    placeholder="mileStone"
                    {...formData.getInputProps("mileStone")}
                  />
                  <TextInput
                    label="Estimate Time"
                    placeholder="Enter Estimate time"
                    {...formData.getInputProps("estimate_Time")}
                  />
                  <Textarea
                    label="Desciption"
                    placeholder="Enter description"
                    {...formData.getInputProps("description")}
                  />
                  <Box className="col-span-2  flex justify-center items-center">
                    <Button type="submit" className="bg-blue-500">
                      Save
                    </Button>
                    <Button
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
