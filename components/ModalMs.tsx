"use client"
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import client from '../apolloClient/index'
import { Input, MultiSelect, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Manrope, Roboto } from 'next/font/google';
import { gql, useMutation } from '@apollo/client';
import { addMilestone, getMilestone } from '@/services';


interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
}

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const ModalMs = (props: typeModal) => {
  const { showModal, handleCloseModal } = props;
  const [projects,setProjects]=useState<any>([]);
  const [isLoading, setIsLoading] = useState(false)
 
  const form = useForm({
    initialValues: {
      msName: "",
      project: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      
   
    },
  });

const GET_PROJECT=gql`query Query {
  projects {
    id
    name
  }
}`

const fetchProjects=async()=>{
  const projectOp=[
    { value: "", label: "Choose One",disabled: true  },
  ];
  try {
    setIsLoading(true);
    const {data}=await client.query({
      query:GET_PROJECT
    });
    for (let i = 0; i < data?.projects?.length; i++) {
      projectOp.push({value: data?.projects[i]?.id,label:data.projects[i].name,disabled:false});
    }
    setProjects(projectOp);
    console.log(data);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
}

useEffect(()=>{
  fetchProjects();
},[])

interface formTypes{
  msName: string,
  project: string,
  startDate: Date,
  endDate:  Date,
  status: string
}

const [createMileStones,{data,loading,error}]=useMutation(addMilestone)
 const handleCreate=(formData:formTypes)=>{
  createMileStones({
    variables:{
            "data": {
              "status": formData.status,
              "startDate": formData.startDate.toISOString(),
              "project": {
                "connect": {
                  "id": formData.project
                }
              },
              "name": formData.msName,
              "endDate":formData.endDate.toISOString(), 
            }
          },
    refetchQueries: [{ query: getMilestone }],
  })
    .then(() => handleCloseModal())
    .catch((error) => console.log(error));
};
 

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
          {
            isLoading?<h1>isLoading...</h1>:( <div className="bg-white max-h-[550px] overflow-y-scroll rounded-lg w-[500px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
            <div className="">
            <div className="py-5 border-b-2 border-gray-200">
                   <h2
                     className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                   >
                     New Milestone
                   </h2>
                 </div>
                 <div className="p-4">
                   <form
                     action=""
                     onSubmit={form.onSubmit((values) => handleCreate(values))}
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
                     <Select
                           label="Choose Project"
                           placeholder="Pick one"
                           data={projects}
                           {...form.getInputProps("project")}
                           
                           
                         />
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
                            { label: 'New', value: 'New' },
    
                            { label: 'Design Developement', value: 'Design Developement' },
                            
                            { label: 'In Progress', value: 'In Progress' },
                            
                            { label: 'Testing', value: 'Testing' },
                            
                            { label: 'Completed', value: 'Completed' },
                           ]}
                           {...form.getInputProps("status")}
                         />
                        
             
                     </div>
                  
                     <div className="flex items-center justify-center mt-4 gap-4 ">
                       <button
                         type="submit"
                         className={`text-base font-normal ${roboto.className} text-white px-2 bg-[#5773FF] rounded-md py-1 border-none`}
                       >
                         {loading?'Creating...':'Create'}
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
             </div>)
          }
         
        </div>
      </div>
    )}
  </>
  )
}

export default ModalMs