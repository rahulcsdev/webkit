"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Box } from "@mantine/core";
import Navbar from "../../components/Navbar";
import ModalTasks from "../../components/tasks/ModalTasks";
import CardTask from "../../components/tasks/CardTask";
import { getTask } from "../../services";
import { gql, useQuery } from "@apollo/client";
import client from "@/apolloClient";
import { Pagination } from "@mantine/core";

const Tasks = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [milestoneList, setMileStoneList] = useState([]);
  const [tasklist, setTaskList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { current: myDiv } = myDivRef;
      if (myDiv.scrollTop > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    const { current: myDiv } = myDivRef;
    myDiv.addEventListener("scroll", handleScroll);

    return () => {
      myDiv.removeEventListener("scroll", handleScroll);
    };
  }, [myDivRef]);

  const { data, loading, error, refetch } = useQuery(getTask, {
    client,
    variables: {
      take: 9,
      skip: (page - 1) * 9,
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
    <div className="h-full overflow-y-scroll" id="my-div" ref={myDivRef}>
      <Navbar isScrolling={isScrolling} />
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
          total={Math.ceil(totalPageNumber / 9)}
        />
      </Box>
    </div>
  );
};

export default Tasks;
