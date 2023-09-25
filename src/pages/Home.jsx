import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserDetails from "../components/UserDetails";

const Home = () => {
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100 overflow-y-auto ">
        <Topbar title={"Dashboard"} />
        <UserDetails page="Home" />
      </div>
    </div>
  );
};

export default Home;
