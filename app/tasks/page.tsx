"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { Button, Box } from "@mantine/core";
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
const ModalTasks = dynamic(() => import("../../components/tasks/ModalTasks"));
const CardTask = dynamic(() => import("../../components/tasks/CardTask"));
import { getTask } from "../../services";
import { gql, useQuery } from "@apollo/client";
import client from "@/apolloClient";
import { Pagination } from "@mantine/core";
import { getAuthData } from "../helper";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [milestoneList, setMileStoneList] = useState([]);
  const [tasklist, setTaskList] = useState([]);
  const INITIAL_PAGE = 1;
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(INITIAL_PAGE);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  const { refetch:refetchAuth} = getAuthData()

  const { data, loading, error, refetch } = useQuery(getTask, {
    client,
    variables: {
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    },
  });
  function handleCloseModal() {
    setShowModal(false);
    refetch({
      skip: (page - 1) * 9,
    });
  }
  const lists = async () => {
    const { data } = await client.query({
      query: gql`
        query Query {
          milestones {
            id
            name
          }
          projects {
            id
            name
          }
        }
      `,
    });
    setMileStoneList(data?.milestones);
    setProjectList(data?.projects);
  };
  useEffect(() => {
    refetchAuth()
    if (data) {
      setTaskList(data?.tasks);
    }
    lists();
  }, [data, showModal]);

  const TotolPageNumberHandler = async () => {
    const { data } = await client.query({
      query: getTask,
    });
    setTotalPageNumber(data?.tasks?.length);
  };

  useEffect(() => {
    TotolPageNumberHandler();
  }, []);

  return (
    <LayoutNav>
      <div className="px-5 py-6">
        <div className="rounded-3xl flex items-center w-[95%] mx-auto p-4   justify-between shadow-xl  ">
          <h1 className="font-semibold">Your Task</h1>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-2xl"
              onClick={() => setShowModal(true)}
            >
              New task
            </button>
          </div>
        </div>
        <ModalTasks
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          project={projectList}
          milestones={milestoneList}
        />

        <div className="bg-white p-4 mt-4 shadow-md w-[95%] mx-auto rounded-3xl">
          {tasklist.length == 0 && (
            <h1 className="text-2xl font-semibold text-center">No Task</h1>
          )}
          {tasklist &&
            tasklist.map((item: any, index: number) => (
              <CardTask
                item={item}
                key={index}
                projects={projectList}
                milestones={milestoneList}
              />
            ))}
        </div>
        <Box className="col-span-2  flex justify-center items-center my-4">
          <Pagination
            value={page}
            onChange={setPage}
            total={Math.ceil(totalPageNumber / ITEMS_PER_PAGE)}
          />
        </Box>
      </div>
    </LayoutNav>
  );
};

export default Tasks;
