import client from "@/apolloClient";
import { getProjectDetail } from "@/services";
import { useEffect, useState } from "react";

interface typeModal {
    showModal: Boolean;
    handleCloseModal: () => void;
    id: string;
  
  }
  interface formTypes {
    projectName: string;
    projectManager: string;
    startDate: Date;
    endDate: Date;
    status: string;
    type: string;
    members: Array<string>;
    desc: string;
    code: string;
  }

const ProjectViewModal: React.FC<typeModal> = ({
 
    handleCloseModal,
    id,
    showModal,
  }) => {

    const [details, setDetails] = useState<object>([]);
 
    const [isLoading, setIsLoading] = useState(false);
    const fetchDetails = async () => {
        try {
          setIsLoading(true);
          const { data } = await client.query({
            query: getProjectDetail,
            variables: {
              where: {
                id: id,
              },
            },
          });
          
          console.log(data);
          setDetails(data?.project);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      };
      useEffect(() => {
        fetchDetails();
      }, [id]);
  return (
    showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {isLoading ? (
              "Loadding..."
            ) : (
              <div className="bg-white max-h-[700px] overflow-y-scroll rounded-lg w-[600px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
                <h1 className="">Hello</h1>
              </div>
            )}
          </div>
        </div>
    )
  )
  
            }
 

export default ProjectViewModal