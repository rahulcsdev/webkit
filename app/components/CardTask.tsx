import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
const CardTask = (props: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-6 ">
      <div className="border rounded-3xl p-4 flex justify-between items-center cursor-pointer hover:bg-[#eee]">
        <div className="flex items-center">
          <div className="border-2 border-[#b4b4b4] w-4 h-4 rounded-full mr-4" />
          <h1 className="text-[1.3rem] font-semibold capitalize">
            {props.heading}
          </h1>
        </div>
        <div className="flex items-center   ">
          <button className="px-4 py-2 text-orange-800 bg-orange-200 rounded-3xl mx-4  ">
            Design
          </button>
          <button
            className="px-2 py-2 text-orange-800 bg-orange-400 rounded-xl cursor-pointer  "
            onClick={() => setShow(!show)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      {show && (
        <div className="bg-[#ededed] mt-4 rounded-3xl p-4">
          <div className="flex justify-between items-center border-b-2  py-4 ">
            <div className="flex items-center border-b ">
              <div className="border-2 border-[#a5a4a4] w-4 h-4 rounded-full mr-4" />
              <h1 className="text-[1rem] font-semibold capitalize">
                Mark as Done
              </h1>
            </div>
            <div>
              <button className="px-4 py-2 text-orange-800 bg-orange-400 rounded-3xl mx-4  ">
                Design
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <input
                type="text"
                className="w-full rounded-2xl p-4 mb-3 shadow-md outline-none"
                placeholder="Design landing page of webkit"
              />
            </div>
            <div className="grid place-content-center grid-cols-2 bg-white p-4 rounded-3xl gap-4 items-center">
              <div className=" w-full ">
                <label
                  htmlFor="members"
                  className="my-2 font-semibold capitalize text-[1.3rem]"
                >
                  members
                </label>
                <select
                  defaultValue=""
                  className={`outline-none bg-[#F8F7F7] border-[1px] px-2 w-full py-3 mt-3 rounded-2xl border-[#E0E2DB]`}
                >
                  {["member-1", "member-2", "member-3", "member-4"].map(
                    (item: any, index) => (
                      <option
                        disabled={item.value === ""}
                        key={index}
                        className={`text-sm text-[#605C8D] py-3 p-3 my-4 border`}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className=" w-full">
                <label
                  htmlFor="date"
                  className="my-2 font-semibold capitalize text-[1.3rem]"
                >
                  date
                </label>

                <input
                  type="date"
                  className="w-full border outline-none py-3 px-4 rounded-2xl mt-3"
                />
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="status" className="my-2 font-semibold">
                  Status
                </label>
                <input
                  type="text"
                  placeholder="status"
                  className="rounded-2xl p-3  bg-[#eee] focus:bg-white"
                />
              </div>
              <div className="my-2 flex flex-col">
                <label htmlFor="estimate-time" className="my-2 font-semibold">
                  Estimate Time
                </label>
                <input
                  type="text"
                  placeholder="Enter Estimate Time"
                  className="mr-6 rounded-2xl p-3 w-full bg-[#eee] focus:bg-white"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-2xl p-4">
            <label
              htmlFor="description"
              className=" text-[1.3rem] font-semibold"
            >
              Desciption
            </label>
            <p className="mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              maiores, dolorum aliquid ipsum fuga, corrupti sint illum amet
              doloribus aut excepturi deleniti expedita voluptate provident
              ratione nisi! Vitae, facilis voluptatibus?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTask;
