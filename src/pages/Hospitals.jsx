import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Hospitals = () => {
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100 ">
        <Topbar title={"My Hospitals"} />
      </div>
    </div>
  );
};

export default Hospitals;
