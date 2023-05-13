import React, { useState, useMemo, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { TextInput, Select, Box, Button, Textarea } from "@mantine/core";
import { useMutation } from "@apollo/client";
import { updateTask, getTask } from "../services";
const CardTask = (props: any) => {
  const [show, setShow] = useState(false);
  const [Taskupdate, { data, error, loading }] = useMutation(updateTask);
  const { item, projects, milestones } = props;

  const mileStoneArr = milestones?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });
  const ProjectArr = projects?.map((item: any) => {
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
      mileStone: " ",
      description: " ",
    },
  });

  useEffect(() => {
    formData.setValues({
      task: item?.name,
      project: item?.project?.id,
      priority: item?.priority,
      status: item?.status,
      mileStone: item?.milestone?.id,
      description: item?.discription,
    });
  }, [Taskupdate]);

  const updateTaskHandler = (value: any) => {
    console.log("value", value);
    Taskupdate({
      variables: {
        where: {
          id: item?.id,
        },
        data: {
          name: value?.task,
          discription: value?.description,
          estimateTime: item?.estimateTime,
          milestone: {
            connect: {
              id: value?.mileStone,
            },
          },
          priority: value?.priority,
          project: {
            connect: {
              id: value?.project,
            },
          },
          startDate: item?.startDate,
          endDate: item?.endDate,
          status: value?.status,
          taskType: item?.task,
        },
      },
      refetchQueries: [{ query: getTask }],
    });
    setShow(!show);
  };

  return (
    <div className="mb-6 ">
      <div className="border rounded-3xl p-4 flex justify-between items-center cursor-pointer hover:bg-[#eee]">
        <div className="flex items-center">
          <div className="border-2 border-[#b4b4b4] w-4 h-4 rounded-full mr-4" />
          <h1 className="text-[1.3rem] font-semibold capitalize">
            {item.name}
          </h1>
        </div>
        <div className="flex items-center   ">
          <button className="px-4 py-2 text-orange-800 bg-orange-200 rounded-3xl mx-4  ">
            {item.status}
          </button>
          <button
            className="px-2 py-2 text-orange-800 bg-orange-400 rounded-xl cursor-pointer "
            onClick={() => setShow(!show)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      {show && item && (
        <form onSubmit={formData.onSubmit(updateTaskHandler)}>
          <div className="bg-[#ededed] mt-4 rounded-3xl p-4">
            <div className="flex justify-between items-center border-b-2  py-4 ">
              <div className="flex items-center border-b ">
                <div className="border-2 border-[#a5a4a4] w-4 h-4 rounded-full mr-4" />
                <h1 className="text-[1rem] font-semibold capitalize">
                  Mark as Done
                </h1>
              </div>

              <div>
                <button
                  className="px-4 py-2 text-orange-800 bg-orange-400 rounded-3xl mx-4"
                  type="submit"
                >
                  save
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="my-2 rounded-2xl border p-4 bg-white">
                <TextInput
                  label="Task"
                  placeholder="Enter your task name"
                  radius="md"
                  {...formData.getInputProps("task")}
                />
              </div>
              <div className="grid place-content-center grid-cols-2 bg-white p-4 rounded-3xl gap-4 items-center">
                <div className=" w-full ">
                  <Select
                    label="Project"
                    placeholder={item?.project?.name}
                    radius="md"
                    data={ProjectArr}
                    {...formData.getInputProps("project")}
                  />
                </div>
                <div className=" w-full">
                  <Select
                    label="MileStone"
                    placeholder={item?.milestone?.name}
                    radius="md"
                    data={mileStoneArr}
                    {...formData.getInputProps("mileStone")}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <Select
                    label="Status"
                    placeholder={item?.status}
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
                </div>
                <div className="my-2 flex flex-col">
                  <Select
                    label="Priority"
                    placeholder={item?.priority}
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
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-2xl p-4">
              <Textarea
                label="Desciption"
                placeholder="Enter description"
                radius="md"
                {...formData.getInputProps("description")}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CardTask;
