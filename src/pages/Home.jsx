import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserDetails from "../components/UserDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="w-full h-screen flex ">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-[100%] max-h-[100vh] bg-slate-100 overflow-hidden ">
        <Topbar title={"Dashboard"} />
        <UserDetails page="Home" />
      </div>
    </div>
  );
};

export default Home;
