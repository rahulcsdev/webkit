"use client";
import { getProjectList } from "@/services";
import { gql, useQuery } from "@apollo/client";
import client from "../../apolloClient/index";
import { useEffect, useState } from "react";
 
import { Pagination } from "@mantine/core";
import dynamic from "next/dynamic";
 
const ModalProject = dynamic(() => import("./ModalProject"))
const ProjectCard = dynamic(() => import("./ProjectCard"))
const ProjectCardCol = dynamic(() => import("./ProjectCardCol"))
interface props {
  viewMode: Boolean;
  openDetails: any;
  
  status: string;
  showModal:any;
  handleCloseModal:any;
}

const ContentPart: React.FC<props> = ({
  viewMode,
  openDetails,
 
  status,
  showModal,
  handleCloseModal
  
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const { data, loading, error, refetch } = useQuery(getProjectList, {
    client,
    variables:
      status === "all"
        ? {
            skip: (currentPage - 1) * 9,
            take: 9,
          }
        : {
            skip: (currentPage - 1) * 9,
            take: 9,
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
  const getProjects = gql`
    query Projects {
      projects {
        id
      }
    }
  `;

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
        // console.log(data);
        setTotal(data?.projects?.length);
      });
  };

  useEffect(() => {
    fetchData();
    // refetch()
  }, [status, currentPage]);
  useEffect(() => {
    // console.log(data)
    setProjects(data?.projects);
  }, [data, loading]);
  const totalPages = Math.ceil(total / 9);
  return (
    <div className="mt-5">
      {loading ? (
        <h1 className="">Loading...</h1>
      ) : projects?.length == 0 ? (
        <h1 className="">No Data found</h1>
      ) : viewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {projects?.map((data, index) => (
            <ProjectCard
              openDetais={openDetails}
             
              key={index}
              data={data}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
          {projects?.map((data, index) => (
            <ProjectCardCol openDetais={openDetails} key={index} data={data} />
          ))}
        </div>
      )}
      <div className="my-5 flex items-center justify-center">
        <Pagination
          total={totalPages}
          onChange={handlePageChange}
          value={currentPage}
        />
      </div>
      <ModalProject refetch={refetch}   showModal={showModal} handleCloseModal={handleCloseModal}  />
    </div>
  );
};

export default ContentPart;
