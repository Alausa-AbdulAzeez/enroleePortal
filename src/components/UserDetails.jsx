import React from "react";

const UserDetails = ({ page }) => {
  return (
    <div className="m-12 max-sm:mx-2 h-[100%] max-h-[500px] bg-white flex rounded-tl-[100px] max-sm:flex-col">
      <div className=" w-[200px] h-[200px] bg-slate-100 flex items-center justify-center   rounded-full ">
        <div className="w-[180px] h-[180px] bg-white rounded-full">
          <img
            src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-full bg-center hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-500"
          />
        </div>
      </div>
      <div className="flex flex-1 w-[70%] h-fit p-5 gap-4 flex-wrap justify-start  overflow-x-auto max-sm:w-[100%] md:flex-col lg:flex-row">
        <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-100 rounded-xl p-3 flex flex-col">
          <h3 className="font-bold text-gray-700">Enrolee Name</h3>
          <p className="text-gray-500 font-semibold">Alausa Abdulazeez Tayo</p>
        </div>
        <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
          <h3 className="font-bold text-gray-700">Plan Info</h3>
          <p className="text-gray-500 font-semibold">
            Red Beryl Individual Plan
          </p>
        </div>
        <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
          <h3 className="font-bold text-gray-700">HMO ID</h3>
          <p className="text-gray-500 font-semibold">LWH/LWH/BLU/123</p>
        </div>
        {page === "Profile" && (
          <>
            <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
              <h3 className="font-bold text-gray-700">Date of Birth</h3>
              <p className="text-gray-500 font-semibold">1900/01/13</p>
            </div>
            <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
              <h3 className="font-bold text-gray-700">Phone Number</h3>
              <p className="text-gray-500 font-semibold">+234567890</p>
            </div>
            <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
              <h3 className="font-bold text-gray-700">Address</h3>
              <p className="text-gray-500 font-semibold">
                175 Ikorodu-Ososun Rd, Palmgrove 102215, Lagos
              </p>
            </div>
            <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
              <h3 className="font-bold text-gray-700">Company Address</h3>
              <p className="text-gray-500 font-semibold">
                175 Ikorodu-Ososun Rd, Palmgrove 102215, Lagos
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
