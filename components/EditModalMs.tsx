import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
 
import { Input, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Manrope, Roboto } from 'next/font/google';


interface typeModal {
  showModal: Boolean;
  handleCloseModal: any,
  selectedFeild:any
}

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const EditModalMs = (props: typeModal) => {
  const { showModal, handleCloseModal,selectedFeild } = props;
 
  console.log(selectedFeild)
 
  const form = useForm({
    initialValues: {
      msName: "",
      project: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      type: "",
      
    },
  });
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
         <div className="">
         <div className="py-5 border-b-2 border-gray-200">
                <h2
                  className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                >
                  Edit Milestone
                </h2>
              </div>
              <div className="p-4">
                <form
                  action=""
                  onSubmit={form.onSubmit((values) => console.log(values))}
                >
                  <div className="relative w-full">
                    <Input.Wrapper label="Milestone Name" required mx="auto">
                      <Input
                        required
                        placeholder="Enter yout Milestone name"
                        {...form.getInputProps("msName")}
                        // sx={{padding:'2px 1px',backgroundColor:'green'}}
                      />
                    </Input.Wrapper>
                  </div>
                  <div className="relative w-full">
                    <Input.Wrapper label="Project Name/Id" required mx="auto">
                      <Input
                        required
                        placeholder="Enter Project name/Id"
                        {...form.getInputProps("project")}
                        // sx={{padding:'2px 1px',backgroundColor:'green'}}
                      />
                    </Input.Wrapper>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        maw={400}
                        label="Start date"
                        placeholder="Start date"
                        {...form.getInputProps("startDate")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DatePickerInput
                        mx="auto"
                        label="End date"
                        placeholder="End date"
                        {...form.getInputProps("endDate")}
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                   
                    <Select
                        label="Status"
                        placeholder="Pick one"
                        data={[
                          { value: "new", label: "New" },
                          { value: "design development", label: "Design Development" },
                          { value: "in progress'", label: "In Progress" },
                          { value: "testing", label: "Testing" },
                          { value: "completed", label: "Completed" },
                        ]}
                        {...form.getInputProps("status")}
                      />
                     
          
                  </div>
               
                  <div className="flex items-center justify-center mt-4 gap-4 ">
                    <button
                      type="submit"
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => form.reset()}
                      className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
         </div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default EditModalMs