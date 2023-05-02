"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { dropDown, projectsData } from "../../utils/data";
import { FiChevronDown, FiChevronRight, FiTrash } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import ModalProject from "../../components/ModalProject";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardCol from "@/components/ProjectCardCol";
import Footer from "@/components/Footer";
import LayoutNav from "@/components/LayoutNav";
import { useRouter } from "next/navigation";
const manrope = Manrope({ subsets: ["latin"] });
const Projects = () => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [isExpand, setIsExpand] = useState(false);
  const [value, setValue] = useState("progress");
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [entry, setEntries] = useState<Array<object>>([]);
  const [selectValue, setSelectValue] = useState<Array<string>>([]);
  const router = useRouter();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const deleteEntry = (Id: string) => {
    console.log("delete", Id);

    const FilteredArray = entry.filter((item: any) => item.id !== Id);

    setEntries(FilteredArray);
  };

  const addEntry = () => {
    const name: any = {
      id: "id" + new Date().getTime(),
    };

    setEntries([...entry, name]);
  };

  function handleCloseModal() {
    setShowModal(false);
  }
  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="p-5 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
            >
              Add Time Entry
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative"></div>

              <div className="relative">
                <button
                  className={`${clickS} px-3 py-2 rounded-lg capitalize mr-6`}
                  onClick={() => router.push("/timeline")}
                >
                  Go Back
                </button>
                <button className={`${clickS} px-3 py-2 rounded-lg capitalize`}>
                  Save Time Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


<div className="px-5 py-6">

<div className="p-5 bg-white drop-shadow-md rounded-xl">

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
    Date
  </label>

  <DatePicker
    selected={startDate}
    onChange={(date: any) => setStartDate(date)}
    className="block w-1/2 ... ml-6 mb-6 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark"
  />

  <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Project
          </th>
          <th scope="col" className="px-6 py-3">
            Task
          </th>
          <th scope="col" className="px-6 py-3">
            Duration
          </th>
          <th scope="col" className="px-6 py-3">
            Activities
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Project </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </th>
          <td className="px-6 py-4">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Task</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </td>
          <td className="px-6 py-4">
            <input
              type="number"
              className="px-4 py-3"
              placeholder="enter duration"
            />
          </td>
          <td className="px-6 py-4">
            <textarea
              id="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Activities"
            ></textarea>
          </td>
        </tr>

        {entry &&
          entry.map((item: any) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a Project</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </th>
                <td className="px-6 py-4">
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a Task</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="px-4 py-3"
                    placeholder="enter duration"
                  />
                </td>
                <td className="px-6 py-4">
                  <textarea
                    id="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Activities"
                  ></textarea>
                </td>
                <td>
                  <button
                    className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6`}
                    onClick={(e) => deleteEntry(item.id)}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>

    <button
      className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6 mt-2`}
      onClick={() => addEntry()}
    >
      Add Time Entry
    </button>
  </div>
</div>

</div>

</div>

  
    
      <ModalProject showModal={showModal} handleCloseModal={handleCloseModal} />
      <Footer />
    </LayoutNav>
  );
};

export default Projects;
