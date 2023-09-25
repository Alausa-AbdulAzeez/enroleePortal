import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Benefits = () => {
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100">
        <Topbar title={"My Benefits"} />
        <div className="mt-5"></div>
      </div>
    </div>
  );
};

export default Benefits;
