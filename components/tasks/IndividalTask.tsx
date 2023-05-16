import React from "react";
import { Text, Box, Grid, Flex, Center } from "@mantine/core";

const IndividalTask = (props: props) => {
  const { data, showModal, handleCloseModal } = props;

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
            <div className="bg-white rounded-2xl w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <Grid columns={24} className="p-8">
                <Grid.Col
                  span={24}
                  className="flex items-center capitalize border rounded-2xl p-4 "
                >
                  <Text className=" text-3xl font-semibold mx-4" size="lg">
                    Task Name
                  </Text>
                  <Text className="text-2xl text-blue-700 font-semibold">
                    {data?.name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="  border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">
                      Project Name
                    </Text>
                    <Text>{data?.project?.name}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">
                      milestoneName
                    </Text>
                    <Text>{data?.milestone?.name}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">Status</Text>
                    <Text>{data?.status}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">priority</Text>
                    <Text>{data?.priority}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">taskType</Text>
                    <Text>{data?.taskType}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">
                      estimateTime
                    </Text>
                    <Text>{data?.estimateTime}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">
                      start Date
                    </Text>
                    <Text>{data?.startDate}</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Box className="border rounded-2xl p-4  capitalize">
                    <Text className="text-5 font-semibold mr-4">End Date</Text>
                    <Text>{data?.endDate}</Text>
                  </Box>
                </Grid.Col>

                <Grid.Col span={24}>
                  <Box className="border rounded-2xl p-4 capitalize">
                    <Text className="text-5 font-semibold mr-4 ">
                      discription
                    </Text>
                    <Text>{data?.discription}</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividalTask;

interface props {
  data: {
    __typename: String;
    taskType: String;
    status: String;
    startDate: String;
    name: String;
    priority: String;
    project: {
      id: String;
      name: String;
    };
    milestone: {
      id: String;
      name: String;
    };
    id: String;
    estimateTime: String;
    endDate: String;
    discription: String;
    code: String;
  };
  showModal: Boolean;
  handleCloseModal: any;
}
