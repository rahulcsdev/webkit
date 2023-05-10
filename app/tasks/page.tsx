"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import ModalTasks from "../../components/ModalTasks";
import CardTask from "../../components/CardTask";
import { getTask } from "../../services";
import { gql } from "@apollo/client";
import client from "@/apolloClient";
const Tasks = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [milestoneList, setMileStoneList] = useState([]);
  const [tasklist, setTaskList] = useState([]);
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

  function handleCloseModal() {
    setShowModal(false);
  }
  const Taskquery = async () => {
    const { data } = await client.query({
      query: getTask,
    });

    setTaskList(data?.tasks);
  };

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
    Taskquery();
    lists();
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
        {tasklist.map((item: any, index: number) => (
          <CardTask data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
