"use client";
import LayoutNav from "@/components/LayoutNav";
import DetailsView from "@/components/report/DetailsView";
import HeaderCard from "@/components/report/HeaderCard";
import React, { useState } from "react";

const ProjectReoprts = () => {
  const initalValue = {
    userId: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  const [formData, setFormData] = useState(initalValue);
  const [timeEntries, setTimeEntries] = useState([]);
  return (
    <LayoutNav>
      <div className="px-5 py-6 h-full">
        <HeaderCard
          formData={formData}
          setFormData={setFormData}
          setTimeEntries={setTimeEntries}
        />
        {timeEntries.length > 0 ? (
          <DetailsView timeEntries={timeEntries} />
        ) : (
          <h1>No data available</h1>
        )}
      </div>
    </LayoutNav>
  );
};

export default ProjectReoprts;
