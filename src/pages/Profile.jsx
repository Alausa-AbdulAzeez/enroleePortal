import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Profile = () => {
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100">
        <Topbar title={"Profile"} />
      </div>
    </div>
  );
};

export default Profile;
