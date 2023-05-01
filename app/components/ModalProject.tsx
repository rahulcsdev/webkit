import React, { useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";
import Multiselect from "multiselect-react-dropdown";
import { employeeData, projectsData } from "../utils/data";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
  
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });
const ModalProject = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
  const [options, setOptions] = useState<any>([]);
 
 

  useEffect(() => {
    const getEmployeeInfo = () => {
      const info:string[] = [];
      for (let i = 0; i < employeeData.length; i++) {
        info.push(employeeData[i].name);
      }
      setOptions(info);
    };
    
    getEmployeeInfo();
  }, []);
 
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white max-h-[550px] overflow-y-scroll rounded-lg w-[500px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  New Project
                </h2>
              </div>
              <div className="p-4">
                <form action="">
                  <div className="flex flex-col gap-2">
                    <label className={`text-[#01041b] font-medium text-[1em] `}>
                      Project Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter project name"
                      className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <label className={`text-[#01041b] font-medium text-[1em] `}>
                      Project Manager*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter project manager name"
                      className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`}
                    />
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[#01041b] font-medium text-[1em] `}
                        >
                          Start Date*
                        </label>
                        <input
                          type="date"
                          placeholder="Enter project name"
                          className={` placeholder-[#605C8D] outline-none bg-[#F8F7F7] border-[1px] text-sm  pl-1 py-3 rounded-lg border-[#E0E2DB]`}
                        />
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[#01041b] font-medium text-[1em] `}
                        >
                          End Date*
                        </label>
                        <input
                          type="date"
                          placeholder="Enter project name"
                          className={` placeholder-[#605C8D] outline-none bg-[#F8F7F7] border-[1px] text-sm  pl-1 py-3 rounded-lg border-[#E0E2DB]`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[#01041b] font-medium text-[1em] `}
                        >
                          Status*
                        </label>
                        <select
                          className={` placeholder-[#605C8D] outline-none bg-[#F8F7F7] border-[1px] text-sm  pl-1 py-3 rounded-lg border-[#E0E2DB]`}
                        >
                          <option>options</option>
                          <option>options</option>
                        </select>
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[#01041b] font-medium text-[1em] `}
                        >
                          Project Type*
                        </label>
                        <select
                          className={` placeholder-[#605C8D] outline-none bg-[#F8F7F7] border-[1px] text-sm  pl-1 py-3 rounded-lg border-[#E0E2DB]`}
                        >
                          <option>options</option>
                          <option>options</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={`text-[#01041b] font-medium text-[1em] `}>
                      Members
                    </label>
                    <Multiselect
                      options={options}
                      showCheckbox
                      isObject={false}
                      className="bg-[#F8F7F7] mt-4"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-4 gap-4 ">
                    <button
                      type="submit"
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Save
                    </button>
                    <button
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProject;
