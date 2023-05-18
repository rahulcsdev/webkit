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
 
  return (
    <LayoutNav>
      <div className="px-5 py-6">
        {/* Second Navbar */}
      
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