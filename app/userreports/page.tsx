import LayoutNav from "@/components/LayoutNav";
import DetailsView from "@/components/report/DetailsView";
import HeaderCard from "@/components/report/HeaderCard";
import React from "react";

const ProjectReoprts = () => {
  return (
    <LayoutNav>
      <div className="px-5 py-6 h-full">
        <HeaderCard />
        <DetailsView />
      </div>
    </LayoutNav>
  );
};

export default ProjectReoprts;
