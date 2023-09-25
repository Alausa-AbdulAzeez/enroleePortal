import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Topbar = ({ title }) => {
  return (
    <div className="h-[55px] bg-white w-[100%] px-12 flex items-center justify-between max-sm:justify-center sticky top-0">
      <h3 className="font-bold text-lwPurple text-[18px]">{title}</h3>
      <Link to={"/profile"} className="max-sm:hidden ">
        <BsPersonFill
          className="text-slate-400 text-2xl cursor-pointer"
          style={{ color: "#0D205F" }}
        />
      </Link>
    </div>
  );
};

export default Topbar;
