"use client";
import React, { useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";
import client from "../../apolloClient/index";
import { gql, useMutation } from "@apollo/client";
 
import { MultiSelect, Input, Select, FileInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { addProject, getProjectList, getUser } from "@/services";
import {FaUpload} from 'react-icons/fa'
interface typeModal {
  showModal: Boolean;
  handleCloseModal: () => void;
  refetch:any
}
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const ModalProject = (props: typeModal) => {
  const { showModal, handleCloseModal,refetch } = props;
  const [options, setOptions] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [showManager, setShowManager] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const managerOp = [{ value: "", label: "Choose One", disabled: true }];

  const managerOptions = (users: any) => {
    // console.log(users);
    for (let i = 0; i < users?.length; i++) {
      managerOp.push({
        value: users[i]?.id,
        label: users[i].name,
        disabled: false,
      });
    }
    setUsers(managerOp);
  };

  useEffect(() => {
    const getEmployeeInfo = async () => {
      const info: string[] = [];
      const { data } = await client.query({
        query: getUser,
      });
      // console.log(data)

      managerOptions(data.users);
      for (let i = 0; i < data?.users?.length; i++) {
        info.push(data?.users[i]?.name);
      }

      setOptions(info);
    };

    getEmployeeInfo();
  }, []);
  const form = useForm({
    initialValues: {
      projectName: "",
      projectManager: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      type: "",
      members: [],
      desc: "",
      code: "",
      file:""
    },
  });
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
    file:string,
  }

const UPLOAD_QUERY=gql`mutation Mutation($data: FileCreateInput!) {
  createFile(data: $data) {
    id
    documents {
      url
      filesize
      filename
    }
  }
}`;
 
const [file, setFile] = useState<File | null>(null);
const [uploadFile] = useMutation(UPLOAD_QUERY);

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
  }
};

// const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);

//         fileReader.onload = () => {
//             resolve(fileReader.result);
//         };

//         fileReader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };


// const upload=async()=>{
//   console.log(file)
//   const base64=await convertBase64(file);
//   console.log(base64)
//   if (file) {
//     try {
//       await uploadFile({ variables: {
//         "data": {
//           "documents": {
//             "upload": file
//           }
//         }
//       } });
//       // Handle successful upload
//       console.log("Completed")
//     } catch (error) {
//       // Handle upload error
//       console.log(error)
//     }
//   }
// }


  const [createProject, { loading, data, error }] = useMutation(addProject);

  const handleSubmit = (formData: formTypes) => {
    console.log(formData);

    let membersObj = [{ id: formData.members[0] }];

    for (let i = 1; i < formData.members.length; i++) {
      membersObj.push({ id: formData.members[i] });
    }

    const withManager = {
      name: formData.projectName,
      projectManager: {
        connect: {
          id: formData.projectManager,
        },
      },
      startDate: formData.startDate.toISOString(),
      projectType: formData.type,
      status: formData.status,
      endDate: formData.endDate.toISOString(),
      projectDiscription: formData.desc,

      member: {
        connect: membersObj,
      },
    };
    const withOutManager = {
      name: formData.projectName,
      startDate: formData.startDate.toISOString(),
      projectType: formData.type,
      status: formData.status,
      endDate: formData.endDate.toISOString(),
      projectDiscription: formData.desc,
      
      member: {
        connect: membersObj,
      },
    };

    createProject({
      variables: {
        data: formData.projectManager === "" ? withOutManager : withManager,
      },
      refetchQueries: [{ query: getProjectList }],
      onCompleted:()=>{
        refetch();
      }
    })
      .then(() => handleCloseModal())
      .catch((error) => console.log(error));
  };
  //  console.log(form.getInputProps('type').value)


 
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
                <form
                  action=""
                  onSubmit={form.onSubmit((values) => handleSubmit(values))}
                >
                  <div className="relative w-full">
                    <Input.Wrapper label="Project Name" required mx="auto">
                      <Input
                        required
                        placeholder="Enter yout Project name"
                        {...form.getInputProps("projectName")}
                        // sx={{padding:'2px 1px',backgroundColor:'green'}}
                      />
                    </Input.Wrapper>
                  </div>

                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <DateInput
                        mx="auto"
                        maw={400}
                        label="Start Date"
                        placeholder="Start date"
                        {...form.getInputProps("startDate")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DateInput
                        mx="auto"
                        label="End Date"
                        placeholder="End date"
                        {...form.getInputProps("endDate")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <div className="basis-1/2">
                      <Select
                        label="Status"
                        placeholder="Pick one"
                        data={[
                          { label: "New", value: "New" },

                          {
                            label: "Design Developement",
                            value: "Design Developement",
                          },

                          { label: "In Progress", value: "In Progress" },

                          { label: "Testing", value: "Testing" },

                          { label: "Completed", value: "Completed" },
                        ]}
                        {...form.getInputProps("status")}
                      />
                    </div>
                    <div className="basis-1/2">
                      <Select
                        label="Project Type"
                        placeholder="Pick one"
                        data={[
                          {
                            label: "Internal project",
                            value: "Internal project",
                          },

                          {
                            label: "Hourly cost project",
                            value: "Hourly cost project",
                          },

                          {
                            label: "Fixed cost project",
                            value: "Fixed cost project",
                          },
                        ]}
                        {...form.getInputProps("type")}
                      />
                    </div>
                  </div>
                  {form.getInputProps("type").value !== "Internal project" && (
                    <div className="relative w-full">
                      <Select
                        label="Project Manager"
                        placeholder="Pick one"
                        data={users}
                        {...form.getInputProps("projectManager")}
                      />
                    </div>
                  )}
                  <Input.Wrapper label="Project Description" required mx="auto">
                    <Input
                      required
                      placeholder="Enter your Project description"
                      {...form.getInputProps("desc")}
                      // sx={{padding:'2px 1px',backgroundColor:'green'}}
                    />
                  </Input.Wrapper>
                  <MultiSelect
                    data={users}
                    label="Members"
                    mx="auto"
                    searchable
                    placeholder="Pick all members you like"
                    {...form.getInputProps("members")}
                  />
                  {/* <div className="flex gap-2 items-end w-full">
                 <FileInput className="w-full" label="Your resume" onChange={(e)=>setSelectedFile(e)} placeholder="Choose file" icon={<FaUpload size={rem(14)} />} />
                 <input type="file"  onChange={handleFileChange} />
                 <button type="button" className="px-2 py-1 rounded-md bg-[#5773FF] text-white" onClick={upload} >Upload</button>

                  </div> */}
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
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProject;