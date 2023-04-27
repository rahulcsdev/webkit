import React from "react";
import { Manrope, Roboto } from "next/font/google";
import { catergory } from "../utils/data";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight: "400", subsets: ["latin"] });
const ModalTasks = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
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
            <div className="bg-white rounded-lg w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200 flex justify-between px-3">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  New Task
                </h2>
                <button
                  className="px-4 py-2 bg-blue-500 rounded-lg"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
              <div className="p-4 ">
                <form className="grid grid-cols-2 place-content-center  ">
                  <div className="my-4 flex flex-col">
                    <label htmlFor="task" className="my-2">
                      Task
                    </label>
                    <input
                      type="text"
                      id="task"
                      placeholder="Enter your task name"
                      className="mr-4"
                    />
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="project" className="my-2">
                      Project
                    </label>
                    <input
                      type="text"
                      name=""
                      id="project"
                      placeholder="project name"
                      className="mr-4"
                    />
                  </div>
                  <div className="my-4 flex flex-col mr-4">
                    <label htmlFor="priority">Priority</label>
                    <select
                      defaultValue=""
                      className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`}
                    >
                      {[
                        "urgent",
                        "High",
                        "medium",
                        "No priority",
                        "Backlog",
                      ].map((item: any, index) => (
                        <option
                          disabled={item.value === ""}
                          key={index}
                          className={`text-sm text-[#605C8D] py-3 p-2`}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="status" className="my-2">
                      Status
                    </label>
                    <input type="text" placeholder="status" />
                  </div>

                  <div className="my-4 flex flex-col">
                    <label htmlFor="task-type" className="my-2">
                      Task type
                    </label>
                    <select
                      defaultValue=""
                      className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB] mr-4`}
                    >
                      {["Frontend", "Backend", "Bug"].map(
                        (item: any, index) => (
                          <option
                            disabled={item.value === ""}
                            key={index}
                            className={`text-sm text-[#605C8D] py-3 p-2`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="mileStone" className="my-2">
                      mileStone
                    </label>
                    <input type="text" placeholder="mileStone" />
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="start-date" className="my-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name=""
                      id="start date"
                      placeholder="state date"
                      className="mr-6"
                    />
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="end-date" className="my-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      placeholder="End date"
                      className="mr-6"
                    />
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="estimate-time">Estimate Time</label>
                    <input
                      type="text"
                      placeholder="Enter Estimate Time"
                      className="mr-6"
                    />
                  </div>
                  <div className="my-4 flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea placeholder="Enter Description " />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 my-4 bg-blue-500 rounded-lg"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTasks;
