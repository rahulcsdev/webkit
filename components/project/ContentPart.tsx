"use client";
 
 
import dynamic from "next/dynamic";
 

const ProjectCard = dynamic(() => import("./ProjectCard"))
const ProjectCardCol = dynamic(() => import("./ProjectCardCol"))
interface props {
  viewMode: Boolean;
  openDetails: any;
  loading:Boolean;
  projects:any;
}

const ContentPart: React.FC<props> = ({
  viewMode,
  openDetails,
  loading,
  projects
  
}) => {

  return (
    <div className="mt-5">
      {loading ? (
        <h1 className="">Loading...</h1>
      ) : projects?.length == 0 ? (
        <h1 className="">No Data found</h1>
      ) : viewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {projects?.map((data:any, index:any) => (
            <ProjectCard
              openDetais={openDetails}
             
              key={index}
              data={data}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
          {projects?.map((data:any, index:any) => (
            <ProjectCardCol openDetais={openDetails} key={index} data={data} />
          ))}
        </div>
      )}
   
    </div>
  );
};

export default ContentPart;
