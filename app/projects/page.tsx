"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";

const EditModalProject = dynamic(
  () => import("@/components/project/EditModalProject")
);
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));

const SecondNav = dynamic(() => import("@/components/SecondNav"));
const ContentPart = dynamic(() => import("@/components/project/ContentPart"));

const Projects = () => {
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState(true);

 const [type, setType] = useState<string | null>(null)
  const [selectedFeild, setSelectedFeild] = useState<string | null>();
  const openDetails = (title: string,type:string) => {
    setSelectedFeild(title);
    setShowModalEdit(true);
    setType(type);
  };
 

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setShowModalEdit(false);
    setSelectedFeild(null);
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
          title="Project"
        />

        <ContentPart
          handleCloseModal={handleCloseModal}
          openDetails={openDetails}
          
          showModal={showModal}
          status={status}
          viewMode={viewMode}
        />
      </div>

      {selectedFeild && (
        <EditModalProject
          id={selectedFeild}
          showModal={showModalEdit}
          handleCloseModal={handleCloseModalEdit}
          type={type}
        />
      )}
      {/* {selectedId && (
        <ProjectViewModal
          id={selectedId}
          showModal={showModalView}
          handleCloseModal={handleCloseModalView}
        />
      )} */}
    </LayoutNav>
  );
};

export default Projects;
