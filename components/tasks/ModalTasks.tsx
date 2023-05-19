import React, { useState } from "react";
import { Manrope, Roboto } from "next/font/google";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Box,
  Button,
  Textarea,
  Grid,
  Center,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMutation } from "@apollo/client";
import { addTask, getTask } from "../../services";
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
  const [errMessage, setErrMessage] = useState("");
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
      start_date: new Date(),
      end_date: new Date(),
      mileStone: "",
      estimate_Time: "",
      description: " ",
    },
  });

  const formSubmitHandler = (value: any) => {
    if (
      !(
        value?.task &&
        value?.description &&
        value?.estimate_Time &&
        value?.project &&
        value?.priority &&
        value?.status &&
        value?.mileStone &&
        value?.end_date &&
        value?.start_date &&
        value?.task_type
      )
    ) {
      setErrMessage("Fill all the Field , Required");
      return;
    } else {
      setErrMessage("New Task is Created");
    }
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
          endDate: value?.end_date?.toISOString(),
          startDate: value?.start_date?.toISOString(),
          taskType: value?.task_type,
        },
      },
      refetchQueries: [{ query: getTask }],
    });
    handleCloseModal();
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
                  // className="grid grid-cols-2 place-content-center gap-x-6 gap-y-3  "
                  onSubmit={formData.onSubmit(formSubmitHandler)}
                >
                  <Grid columns={24}>
                    <Grid.Col span={24}>
                      <TextInput
                        label="Task"
                        placeholder="Enter your task name"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        radius="md"
                        size="lg"
                        {...formData.getInputProps("task")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Select
                        label="Project"
                        placeholder="select Project "
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        radius="md"
                        size="lg"
                        data={ProjectArr}
                        {...formData.getInputProps("project")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Select
                        label="Priority"
                        placeholder="priority"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        radius="md"
                        size="lg"
                        data={[
                          { label: "Urgent", value: "Urgent" },

                          { label: "High", value: "High" },

                          { label: "Medium", value: "Medium" },

                          { label: "No priority", value: "No priority" },

                          { label: "Backlog", value: "Backlog" },
                        ]}
                        {...formData.getInputProps("priority")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {" "}
                      <Select
                        label="Status"
                        placeholder="select status"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        radius="md"
                        size="lg"
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
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {" "}
                      <Select
                        label="Task type"
                        placeholder="select task type"
                        radius="md"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        size="lg"
                        data={[
                          { value: "Frontend", label: "Frontend" },
                          { value: "Backend", label: "Backend" },
                          { value: "Bug", label: "Bug" },
                        ]}
                        {...formData.getInputProps("task_type")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {" "}
                      <DatePickerInput
                        mx="auto"
                        maw={400}
                        radius="md"
                        size="lg"
                        label="Start date"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        placeholder="Start date"
                        {...formData.getInputProps("start_date")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {" "}
                      <DatePickerInput
                        mx="auto"
                        label="End date"
                        radius="md"
                        size="lg"
                        placeholder="End date"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        {...formData.getInputProps("end_date")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {" "}
                      <Select
                        label="MileStone"
                        placeholder="select MileStone "
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        data={mileStoneArr}
                        {...formData.getInputProps("mileStone")}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <TextInput
                        label="Estimate Time"
                        placeholder="Enter Estimate time"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        {...formData.getInputProps("estimate_Time")}
                      />
                    </Grid.Col>
                    <Grid.Col span={24}>
                      <Textarea
                        label="Desciption"
                        placeholder="Enter description"
                        radius="md"
                        size="lg"
                        labelProps={{
                          style: {
                            marginBottom: "0.5rem", // add margin bottom to create space between label and input
                            fontSize: "1.2rem", // increase label font size
                          },
                        }}
                        styles={(theme) => ({
                          input: {
                            border: "1px solid black",
                            borderRadius: "12px !important",
                          },
                        })}
                        {...formData.getInputProps("description")}
                      />
                    </Grid.Col>
                    <Grid.Col span={24}>
                      <Center>
                        {errMessage && (
                          <div className="col-span-2 flex justify-center items-center">
                            <h1 className="text-red-500">{errMessage}</h1>
                          </div>
                        )}
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={24}>
                      <Center>
                        <Button
                          type="submit"
                          radius="md"
                          size="lg"
                          className="bg-blue-500"
                        >
                          {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          radius="md"
                          size="lg"
                          className="px-4 py-2 mx-4 bg-blue-500 "
                          onClick={() => {
                            formData.reset();
                            setErrMessage("");
                          }}
                        >
                          Reset
                        </Button>
                      </Center>
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

export default ModalTasks;
