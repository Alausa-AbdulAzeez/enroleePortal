import React from "react";
import { NavLink } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import Logo from "../assets/images/LWlogo.png";

import { sidebarData } from "../assets/data/sidebarData";

const Sidebar = () => {
  // LOGOUT DIALOGUE
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // FUNCTIONALITY TO TOGGLE SIDEBAR
  // const handleSidebarToggle = (action) => {
  //   if (action === "showSidebar") {
  //     setSidebarOpen(true);
  //   }
  //   if (action === "hideSidebar") {
  //     setSidebarOpen(false);
  //   }
  // };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  // END OF FUNCTIONALITY TO TOGGLE SIDEBAR

  return (
    <div
      className={`h-[100%]  ${
        sidebarOpen
          ? "max-sm:w-[45%] max-md:w-[30%] max-lg:w-[25%] w-[20%] max-w-[400px]"
          : "w-0"
      } transition-all duration-500 bg-lwPurple relative`}
    >
      <div
        className={`absolute top-[50%] flex justify-center items-center w-10 h-[60px] rounded-full cursor-pointer bg-gray-400 z-10 ${
          sidebarOpen
            ? "right-[-20px]"
            : "right-[-30px] transition-all ease-in-out duration-1000"
        }`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? (
          <BiChevronLeft className="text-3xl" />
        ) : (
          <BiChevronRight className="text-3xl" />
        )}
      </div>
      <div className="w-[100%] h-full flex flex-col overflow-x-hidden">
        <div className=" h-[55px] flex items-center justify-center ">
          <h3 className="font-bold text-lg text-lwOrange mr-2">LifeWORTH</h3>
          <img src={Logo} alt="logo" className=" w-[30px] h-[30px] " />
        </div>
        <ul
          className={`list-none ${
            sidebarOpen ? "" : "transition-all ease-in-out  opacity-0"
          }`}
        >
          {sidebarData?.map((listItem, index) => {
            return (
              <NavLink
                to={listItem.link}
                style={{ textDecoration: "none" }}
                key={index}
              >
                {({ isActive }) => (
                  <li
                    className={` flex h-[50px] items-center pl-3 hover:bg-lwLightPurple hover:border-l-2 border-slate-400 ${
                      isActive
                        ? "bg-lwLightPurple border-l-2 border-slate-400"
                        : "sidebarListItem"
                    }`}
                  >
                    {listItem.icon}
                    <span className="ml-3 font-semibold text-slate-400 ">
                      {listItem.title}
                    </span>
                  </li>
                )}
              </NavLink>
            );
            // return (
            //   <ul className="ulTitle" key={index}>

            //     {singleItem?.listItems?.map((listItem, index) => {

            //     })}
            //   </ul>
            // );
          })}
        </ul>
      </div>
    </div>
    // <>
    //   {!sidebarOpen && (
    //     <div
    //       className="menuIconWrapper"
    //       onClick={() => handleSidebarToggle("showSidebar")}
    //     >
    //       <IoIosMenu className="menuIcon" />
    //     </div>
    //   )}
    //   <div className={`sidebarWrapper ${sidebarOpen ? "open" : ""}`}>
    //     <div className="sidebarTop">
    //       <div className="sidebarTopImageWrapper">
    //         <img src={LogoImg} alt="Logo" /> <span>Biopath MedLab</span>
    //       </div>
    //       <div
    //         className="cancelIconWrapper"
    //         onClick={() => handleSidebarToggle("hideSidebar")}
    //       >
    //         <MdCancel className="cancelIcon" />
    //       </div>
    //     </div>
    //     <div className="sidebarBottom">
    //       <div className="sidebarBottomWrapper">
    //         <div className="sidebarBottomTop">
    //           {sidebarData?.map((singleItem, index) => {
    //             return (
    //               <ul className="ulTitle" key={index}>
    //                 {singleItem?.ulTitle}
    //                 {singleItem?.listItems?.map((listItem, index) => {
    //                   return (
    //                     <NavLink
    //                       to={listItem.link}
    //                       style={{ textDecoration: "none" }}
    //                       key={index}
    //                     >
    //                       {({ isActive }) => (
    //                         <li
    //                           className={
    //                             isActive
    //                               ? "activeLink sidebarListItem"
    //                               : "sidebarListItem"
    //                           }
    //                         >
    //                           {listItem.icon}
    //                           <span> {listItem.title}</span>
    //                         </li>
    //                       )}
    //                     </NavLink>
    //                   );
    //                 })}
    //               </ul>
    //             );
    //           })}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Sidebar;
