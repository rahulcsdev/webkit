"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import client from "@/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { getProjectList, getProjects } from "@/services";
import { Pagination } from "@mantine/core";
 

const EditModalProject = dynamic(
  () => import("@/components/project/EditModalProject")
);
const LayoutNav = dynamic(() => import("@/components/LayoutNav"));
const ModalProject = dynamic(() => import("@/components/project/ModalProject"))
const SecondNav = dynamic(() => import("@/components/SecondNav"));
const ContentPart = dynamic(() => import("@/components/project/ContentPart"));

const Projects = () => {
 
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState(true);
  const ITEMS_PER_PAGE = 9;
  const INITIAL_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
 const [type, setType] = useState<string | null>(null)
  const [selectedFeild, setSelectedFeild] = useState<string | null>();
  const openDetails = (title: string,type:string) => {
    setSelectedFeild(title);
    setShowModalEdit(true);
    setType(type);
  };

  const { data, loading, error, refetch } = useQuery(getProjectList, {
    client,
    variables:
      status === "all"
        ? {
          skip: (currentPage - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
          }
        : {
          skip: (currentPage - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
            where: {
              status: {
                equals: status,
              },
            },
          },
  });

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
 
  const fetchData = async () => {
    client
      .query({
        query: getProjects,

        variables:
          status === "all"
            ? {}
            : {
                where: {
                  status: {
                    equals: status,
                  },
                },
              },
      })
      .then(({ data }) => {
        
        setTotal(data?.projects?.length);
      });
  };

  useEffect(() => {
    fetchData();
    refetch()
  }, [status, currentPage]);
  useEffect(() => {
 
    setProjects(data?.projects);
  }, [data, loading]);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  // const visibleTotal = currentPage === totalPages ? total % ITEMS_PER_PAGE : ITEMS_PER_PAGE;

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
          setCurrentPage={setCurrentPage}
          setViewMode={setViewMode}
          status={status}
          viewMode={viewMode}
          title="Project"
        />

        <ContentPart
          
          openDetails={openDetails}
          projects={projects}
          loading={loading}
          viewMode={viewMode}
        />
           <div className="my-5 flex items-center justify-center">
        <Pagination
          total={totalPages}
          onChange={handlePageChange}
          value={currentPage}
        />
      </div>
     {showModal && <ModalProject refetch={refetch}   showModal={showModal} handleCloseModal={handleCloseModal}  />} 
      </div>

      {selectedFeild && (
        <EditModalProject
          id={selectedFeild}
          showModal={showModalEdit}
          handleCloseModal={handleCloseModalEdit}
          type={type}
        />
      )}

    </LayoutNav>
  );
};

export default Projects;
