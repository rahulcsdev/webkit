import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";

import { Input, Select } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { Manrope, Roboto } from "next/font/google";
import client from "@/apolloClient";
import { UPDATE_MILESTONE, getMilestone, getMilestoneDetails } from "@/services";
import { gql, useMutation } from "@apollo/client";

interface typeModal {
  showModal: Boolean;
  handleCloseModal: any;
  selectedFeild: any;
}

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const EditModalMs = (props: typeModal) => {
  const { showModal, handleCloseModal, selectedFeild } = props;
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const GET_PROJECT = gql`
    query Query {
      projects {
        id
        name
      }
    }
  `;
  const form = useForm({
    initialValues: {
      msName: "",
      project: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      code: "",
    },
  });

  const fetchProjects = async () => {
    const projectOp = [{ value: "", label: "Choose One", disabled: true }];
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_PROJECT,
      });
      for (let i = 0; i < data?.projects?.length; i++) {
        projectOp.push({
          value: data?.projects[i]?.id,
          label: data.projects[i].name,
          disabled: false,
        });
      }
      setProjects(projectOp);
 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: getMilestoneDetails,
        variables: {
          where: {
            id: selectedFeild,
          },
        },
      });
      form.setFieldValue("msName", data.milestone.name);
      form.setFieldValue("startDate", new Date(data.milestone.startDate));
      form.setFieldValue("endDate", new Date(data.milestone.endDate));
      form.setFieldValue("status", data.milestone.status);
      form.setFieldValue("project", data.milestone.project.id);
      form.setFieldValue("code", data.milestone.code);
      // console.log(data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [selectedFeild]);
  interface formTypes{
    msName: string,
    project: string,
    startDate: Date,
    endDate:  Date,
    status: string,
    code:string
  }

  const [updateMilestone,{}]=useMutation(UPDATE_MILESTONE)


const handleEdit=async(formData:formTypes)=>{
 

  updateMilestone({
    variables:{
      "where": {
        "id": selectedFeild
      },
      "data": {
        "status": formData.status,
        "startDate": formData.startDate.toISOString(),
        "project": {
          "connect": {
            "id": formData.project
          }
        },
        "name": formData.msName,
        "endDate": formData.endDate.toISOString(),
        "code": formData.code
      },
     
    },
    refetchQueries:[{query:getMilestone}]
  }).then(()=>handleCloseModal());
 
}





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
            {loading ? (
              <h1 className="">Loading...</h1>
            ) : (
              <div className="bg-white max-h-[700px] overflow-y-scroll rounded-lg w-[600px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
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
                    onSubmit={form.onSubmit((values) => handleEdit(values))}
                  >
                    <div className="relative w-full">
                      <Input.Wrapper
                        label="Milestone Name"
                        required
                        mx="auto"
                        styles={() => ({
                          label: {
                            color: "#01041b",
                            fontSize: "1.2em",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: 10,
                          },
                        })}
                      >
                        <Input
                          required
                          placeholder="Enter yout Milestone name"
                          {...form.getInputProps("msName")}
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
                    <div className="relative w-full">
                      <Select
                        label="Choose Project"
                        placeholder="Pick one"
                        data={projects}
                        {...form.getInputProps("project")}
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
                    <div className="flex flex-row gap-2 mt-4">
                      <div className="basis-1/2">
                        <DateInput
                          mx="auto"
                          maw={400}
                          label="Start Date"
                          placeholder="Start date"
                          {...form.getInputProps("startDate")}
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
                    <div className="relative w-full">
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

                    <div className="flex items-center justify-center mt-4 gap-4 ">
                      <button
                        type="submit"
                        className={`text-base font-normal ${roboto.className} text-white px-4 bg-[#5773FF] rounded-md py-2 border-none`}
                      >
                        {loading ? "Loading..." : "Save"}
                      </button>
                      <button
                        onClick={() => form.reset()}
                        className={`text-base font-normal ${roboto.className} text-white px-4 bg-[#5773FF] rounded-md py-2 border-none`}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditModalMs;
