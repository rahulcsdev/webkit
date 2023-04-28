import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
const CardTask = (props: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-6">
      <div className="border rounded-3xl p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="border-2 border-[#b4b4b4] w-4 h-4 rounded-full mr-4" />
          <h1 className="text-[1.3rem] font-semibold capitalize">
            {props.heading}
          </h1>
        </div>
        <div className="flex items-center   ">
          <button className="px-4 py-2 text-orange-800 bg-orange-400 rounded-3xl mx-4  ">
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
        <div className="bg-[#eee] mt-4 rounded-3xl p-4">
          <div className="flex justify-between items-center border-b-2  py-4 ">
            <div className="flex items-center ">
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
          <div></div>
          <div>
            <h1>Desciption</h1>
            <p>
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
