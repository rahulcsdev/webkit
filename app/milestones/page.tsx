"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
 
const EditModalMs = dynamic(
  () => import("../../components/milestone/EditModalMs")
);
const SecondNav = dynamic(() => import("@/components/SecondNav"));
const ContentPart = dynamic(() => import("@/components/milestone/ContentPart"));

const MildStone = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [viewMode, setViewMode] = useState(true);
  const [status, setStatus] = useState("all");
  const [selectedFeild, setSelectedFeild] = useState<string | null>();

  const openDetails = (id: string) => {
    // console.log(id)
    setSelectedFeild(id);
    setShowModalEdit(true);
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setSelectedFeild(null);
    setShowModalEdit(false);
  }

  const clickS = "bg-[#5773FF] text-white";
  const notClickS = "bg-gray-100 text-black";
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
        {/* <div className="px-5 py-3 bg-white drop-shadow-md rounded-xl">
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
                  
                >
                  <p className="font-semibold text-base text-[#605C8D]">
                    Status :
                  </p>
                  <select
                  value={status}
                  onChange={(e)=>setStatus(e.target.value)}
                    className={`capitalize bg-transparent  outline-none border-none`}
                  >
                    {dropDown.map((item, index) => (
                      <option
                        key={index}
                        defaultValue="progress"
                        value={item.value}
                        className={`px-2 py-1`}
                      >
                        {item.label}
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
        </div> */}
        <SecondNav
          setShowModal={setShowModal}
          setStatus={setStatus}
          setViewMode={setViewMode}
          status={status}
          viewMode={viewMode}
          title="Milestone"
        />
        {/* View Parts */}
        <ContentPart
          handleCloseModal={handleCloseModal}
          openDetails={openDetails}
          openViewMode={() => {}}
          showModal={showModal}
          status={status}
          viewMode={viewMode}
        />
      </div>

      {selectedFeild && (
        <EditModalMs
          selectedFeild={selectedFeild}
          showModal={showModalEdit}
          handleCloseModal={handleCloseModalEdit}
        />
      )}
    </LayoutNav>
  );
};

export default MildStone;
