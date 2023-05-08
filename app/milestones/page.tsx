"use client";
import LayoutNav from "@/components/LayoutNav";
import React, { useState } from "react";
import { dropDown, milestones } from "../../utils/data";
import { Manrope } from "next/font/google";
import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import TlCardCol from "../../components/MsCardCol";
import TlCardGrid from "../../components/MsCardGrid";
import ModalMs from "../../components/ModalMs";
import MsCardGrid from "../../components/MsCardGrid";
import MsCardCol from "../../components/MsCardCol";
import EditModalMs from "../../components/EditModalMs";

const manrope = Manrope({ subsets: ["latin"] });
const MildStone = () => {
  const [isExpand, setIsExpand] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [viewMode, setViewMode] = useState(true);
 
  const [selectedFeild, setSelectedFeild] = useState<string>();
  const openDetails = (title: string) => {
    setSelectedFeild(title);
    setShowModalEdit(true);
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setShowModalEdit(false);
  }

  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
        <div className="px-5 py-3 bg-white drop-shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h1
              className={`text-[#140F49] text-[1.3em] font-bold ${manrope.className} `}
            >
              Your Milestones
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative">
                <div
                  className={`bg-gray-100 px-3   rounded-xl flex items-center gap-1 cursor-pointer`}
                  onClick={() => setIsExpand((prev) => !prev)}
                >
                  <p className="font-semibold text-base text-[#605C8D]">
                    Status :
                  </p>
                  <select
                    className={`capitalize bg-transparent  outline-none border-none`}
                  >
                    {dropDown.map((item, index) => (
                      <option
                        key={index}
                        defaultValue="progress"
                        value={item.value}
                        className={`px-2 py-1`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 border-r-2 border-gray-200 pr-6">
                <div
                  onClick={() => setViewMode(true)}
                  className={`p-2 rounded-full cursor-pointer  text-xl ${
                    viewMode ? clickS : notClickS
                  } `}
                >
                  <RxDashboard />
                </div>
                <div
                  onClick={() => setViewMode(false)}
                  className={`p-2 text-xl  cursor-pointer rounded-full ${
                    !viewMode ? clickS : notClickS
                  } `}
                >
                  <HiBars3 />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowModal(true)}
                  className={`${clickS} px-3 py-2 rounded-lg capitalize`}
                >
                  new Milestones
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Parts */}
        <div className="mt-5">
          {viewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
             {
              milestones.map((item,index)=>(
                <MsCardGrid key={index} openDetails={openDetails} data={item} />

              ))
             }
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
                {
              milestones.map((item,index)=>(
                <MsCardCol key={index} data={item} />

              ))
             }
            </div>
          )}
        </div>

        
      </div>
      <ModalMs  showModal={showModal} handleCloseModal={handleCloseModal} />
      <EditModalMs selectedFeild={selectedFeild} showModal={showModalEdit} handleCloseModal={handleCloseModalEdit}/>
    </LayoutNav>
  );
};

export default MildStone;
