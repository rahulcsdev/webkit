"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";

const EditModalProject = dynamic(
  () => import("@/components/project/EditModalProject")
);
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
const ProjectViewModal = dynamic(
  () => import("@/components/project/ProjectViewModal")
);
const SecondNav = dynamic(() => import("@/components/SecondNav"));
const ContentPart = dynamic(() => import("@/components/project/ContentPart"));

const Projects = () => {
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState(true);

  const [selectedId, setSelectedId] = useState<string | null>();
  const [selectedFeild, setSelectedFeild] = useState<string | null>();
  const openDetails = (title: string) => {
    setSelectedFeild(title);
    setShowModalEdit(true);
  };
  const openViewMode = (title: string) => {
    setSelectedId(title);
    setShowModalView(true);
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModalEdit() {
    setShowModalEdit(false);
    setSelectedFeild(null);
  }
  function handleCloseModalView() {
    setShowModalView(false);
    setSelectedId(null);
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
          openViewMode={openViewMode}
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
        />
      )}
      {selectedId && (
        <ProjectViewModal
          id={selectedId}
          showModal={showModalView}
          handleCloseModal={handleCloseModalView}
        />
      )}
    </LayoutNav>
  );
};

export default Projects;
