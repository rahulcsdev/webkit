import React from "react";
import { DataTable } from "mantine-datatable";
import { createStyles } from "@mantine/core";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
interface props {
  timeEntries: any;
}

const useStyles = createStyles((theme) => ({
  header: {
    fontStyle: "roboto",
    "&& th": {
      color: theme.white,
      backgroundColor: "#006180",
    },
  },
}));

function flattenObject(obj: any) {
  const flattened: Record<string, any> = {};

  function flatten(obj: any, prefix = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flatten(obj[key], `${prefix}${key}`);
      } else {
        flattened[`${prefix}${key}`] = obj[key];
      }
    }
  }
  flatten(obj);
  return flattened;
}

const DetailsView: React.FC<props> = ({ timeEntries }) => {
  const flattenedData = timeEntries.map((data: any) => flattenObject(data));
  // console.log(flattenedData);
  const { classes } = useStyles();
  return (
    <div className="mt-6 -z-10 bg-white p-5 rounded-md drop-shadow-md">
      <h1
        className={`text-lg my-2 font-medium text-gray-700 ${roboto.className}`}
      >
        Time entry details
      </h1>

      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        classNames={classes}
        columns={[
          { accessor: "userNamename", title: "Name" },
          { accessor: "projectname", title: "Project Name" },
          { accessor: "taskname", title: "Task Name" },
          { accessor: "duration", title: "Duration in (hr)" },
        ]}
        records={flattenedData}
      />
    </div>
  );
};

export default DetailsView;
