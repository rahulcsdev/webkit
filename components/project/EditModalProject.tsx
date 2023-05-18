import React, { useState, useEffect } from "react";
import { Manrope, Roboto } from "next/font/google";

import client from "@/apolloClient";
import { GET_USERS, getProjectDetail, getProjectList } from "@/services";

import { MultiSelect, Input, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { gql, useMutation } from "@apollo/client";
interface typeModal {
  showModal: Boolean;
  handleCloseModal: () => void;
  id: string;
  type:string |null;

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
const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const EditModalProject: React.FC<typeModal> = ({
 
  handleCloseModal,
  id,
  showModal,
  type
}) => {
 
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
 

  const managerOptions = (users: any) => {
 
    const managerOp = [{ value: "", label: "Choose One", disabled: true }];
    for (let i = 0; i < users?.length; i++) {
      managerOp.push({
        value: users[i]?.id,
        label: users[i].name,
        disabled: false,
      });
    }
    setUsers(managerOp);
  };
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
    },
  });

  // Fetch user details
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
      form.setFieldValue("projectName", data.project.name);
      form.setFieldValue("startDate", new Date(data.project.startDate));
      form.setFieldValue("endDate", new Date(data.project.endDate));
      form.setFieldValue("status", data.project.status);
      form.setFieldValue("type", data.project.projectType);
      form.setFieldValue("desc", data.project.projectDiscription);
      form.setFieldValue("code", data.project.code);
      data.project.projectManager &&
        form.setFieldValue("projectManager", data.project.projectManager.id);
      form.setFieldValue(
        "members",
        data.project.member.map((item: { id: any; }) => item.id)
      );
     
      // setDetails(data?.project);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
 
    }
  };
  // Get all employee info for options

  useEffect(() => {
    const getEmployeeInfo = async () => {
      const info: string[] = [];
      const { data } = await client.query({
        query: GET_USERS,
      });
 

      managerOptions(data.users);
      for (let i = 0; i < data?.users?.length; i++) {
        info.push(data?.users[i]?.name);
      }

      // setOptions(info);
    };

    getEmployeeInfo();
  }, []);
  // Calling use Effect
  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Use Mutation
  const UPDATE_PROJECT = gql`
    mutation Mutation(
      $where: ProjectWhereUniqueInput!
      $data: ProjectUpdateInput!
    ) {
      updateProject(where: $where, data: $data) {
        id
        code
      }
    }
  `;
  const [updateProject, { data, error, loading }] = useMutation(UPDATE_PROJECT);

  const updatedProject =  (formData: formTypes) => {
 
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
      projectManager: {
        disconnect: true,
      },
      member: {
        connect: membersObj,
      },
    };

    updateProject({
      variables: {
        where: {
          id: id,
        },
        data: formData.projectManager === "" ? withOutManager : withManager,
      },
      refetchQueries:[{query:getProjectList}],
    }).then(()=>
    handleCloseModal())
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
            {isLoading ? (
              "Loadding..."
            ) : (
              <div className="bg-white max-h-[700px] overflow-y-scroll rounded-lg w-[600px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
                <div className="py-5 border-b-2 border-gray-200">
                  <h2
                    className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}
                  >
                 {type=='view'?'VIEW ONLY':"EDIT PROJECT"}
                  </h2>
                </div>
                <div className="p-4">
                <form
                  action=""
                  onSubmit={form.onSubmit((values) => updatedProject(values))}
                >
                  <div className="relative w-full">
                    <Input.Wrapper
                      styles={() => ({
                        label: {
                          color: "#01041b",
                          fontSize: "1.2em",
                          fontWeight: 500,
                          lineHeight: 1.2,
                          marginBottom: 10,
                        },
                      })}
                      label="Project Name"
                      required
                      mx="auto"
                    >
                      <Input
                        required
                        placeholder="Enter yout Project name"
                        readOnly={type==='view'}
                         
                        {...form.getInputProps("projectName")}
                        styles={(theme) => ({
                          input: {
                            height: 50,

                            fontSize: 16,
                            lineHeight: 50,
                          },
                        })}
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
                        readOnly={type==='view'}
                         
                        styles={(theme) => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                          input: {
                            height: 50,

                            fontSize: 16,
                            lineHeight: 50,
                          },
                        })}
                      />
                    </div>
                    <div className="basis-1/2">
                      <DateInput
                        mx="auto"
                        label="End Date"
                        placeholder="End date"
                        readOnly={type==='view'}
                         
                        styles={(theme) => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                          input: {
                            height: 50,

                            fontSize: 16,
                            lineHeight: 50,
                          },
                        })}
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
                        readOnly={type==='view'}
                         
                        styles={(theme) => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                          input: {
                            height: 50,

                            fontSize: 16,
                          },
                        })}
                      />
                    </div>
                    <div className="basis-1/2">
                      <Select
                        label="Project Type"
                        placeholder="Pick one"
                        readOnly={type==='view'}
                         
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
                        styles={(theme) => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                          input: {
                            height: 50,

                            fontSize: 16,
                          },
                        })}
                      />
                    </div>
                  </div>
                  {form.getInputProps("type").value !== "Internal project" && (
                    <div className="relative mt-4 w-full">
                      <Select
                        label="Project Manager"
                        placeholder="Pick one"
                        data={users}
                        {...form.getInputProps("projectManager")}
                        readOnly={type==='view'}
                         
                        styles={(theme) => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                          input: {
                            height: 50,

                            fontSize: 16,
                          },
                        })}
                      />
                    </div>
                  )}
                  <div className="w-full mt-4 relative">
                    <Textarea
                      required
                      placeholder="Enter your Project description"
                      label="Project description"
                      autosize
                      minRows={2}
                      {...form.getInputProps("desc")}
                      readOnly={type==='view'}
                       
                      styles={(theme) => ({
                        label: {
                          color: "#01041b",
                          fontSize: "1.2em",
                          fontWeight: 500,
                          lineHeight: 1.2,
                          marginBottom: 10,
                        },
                        input: {
                          fontSize: 16,
                          outline: "none",
                        },
                      })}
                    />
                  </div>

                  <div className="mt-4">
                    <MultiSelect
                      data={users}
                      label="Members"
                      searchable
                      placeholder="Pick all members you like"
                      {...form.getInputProps("members")}
                      classNames={{
                        searchInput: "bg-transparent outline-none w-full ",
                      }}
                      readOnly={type==='view'}
                       
                      styles={(theme) => ({
                        label: {
                          color: "#01041b",
                          fontSize: "1.2em",
                          fontWeight: 500,
                          lineHeight: 1.2,
                          marginBottom: 10,
                        },
                        input: {
                          "&:focus-within": {
                            borderColor: theme.colors.gray[6],
                            backgroundColor: theme.white,
                          },
                          width: "100%",

                          fontSize: 16,
                          lineHeight: 50,

                          height: 50,
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "start",
                        },
                      })}
                    />
                  </div>

 {
  type!=='view' && ( <div className="flex items-center justify-center mt-4 gap-4 ">
  <button
    type="submit"
    className={`text-md font-normal ${roboto.className} text-white px-4 bg-[#5773FF] rounded-md py-2 border-none`}
  >
    {loading ? "Updating..." : "Save"}
  </button>
  <button
    onClick={() => form.reset()}
    className={`text-md font-normal ${roboto.className} text-white px-4 bg-[#5773FF] rounded-md py-2 border-none`}
  >
    Reset
  </button>
</div>)
 }
                 
                </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditModalProject;
