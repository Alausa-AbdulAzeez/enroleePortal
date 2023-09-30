import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";

const Dependants = () => {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  //   DEPENDANTS
  const [dependantsList, setDependantsList] = useState([]);

  // TOAST ID
  const toastId = useRef(null);

  // FUNCTION TO GET HOSPITALS
  const getDependants = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });

    try {
      await publicRequest
        .get(
          `https://lifeworthhmoenrolleeapp.com/api/userid/dependant?IdEmployee=${userDetails?.id}`
        )
        .then((res) => {
          setDependantsList(res?.data);
          toast.update(toastId.current, {
            render: "Dependants Fetched Sucessfully!",
            type: "success",
            autoClose: 2000,
            isLoading: false,
          });
        });
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
    }
  };
  // END OF FUNCTION TO GET DEPENDANTS

  // USE EFFECT TO CALL FUNCTION THAT FETCHES DEPENDANTS LIST AS PAGE LOADS
  useEffect(() => {
    getDependants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100 overflow-y-auto">
        <Topbar title={"My Dependants"} />
        <div className="m-12 max-sm:mx-2 h-auto max-h-[500px] bg-white flex rounded-[10px] max-sm:flex-col overflow-y-auto gap-[30px] p-6 flex-wrap ">
          {dependantsList.length === 0 ? (
            <div className="font-semibold">User has no Dependant</div>
          ) : (
            <div className="max-md:min-w-[250px] min-w-[350px] max-w-[400px] h-[100px]  flex-1 max-lg:min-w-[550px]  bg-slate-100 rounded-xl py-3 flex items-center">
              <div className="w-[100px] h-[100px] bg-white  relative ">
                <div className="absolute w-[100px] h-[100px] blackGradient rounded-l-xl" />
                <img
                  src={
                    `https://lifeworthhmoenrolleeapp.com/image/${
                      userDetails?.image?.split("\\")[3]
                    }` ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EMPbKxWDxjLwlcB9ctrJv8JNvlguwjrXXn-KbUc4yg&s"
                  }
                  alt=""
                  className="w-[100%] h-[100%] object-cover bg-center hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-500 rounded-l-xl"
                />
              </div>
              <div className="ml-3 h-[100%]">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-700 text-[14px]">
                    Enrolee Name:
                  </h3>
                  <p className="text-gray-500 font-semibold ml-[8px] text-[14px]">
                    Alausa Abdulazeez
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-700 text-[14px]">
                    Enrolee Name:
                  </h3>
                  <p className="text-gray-500 font-semibold ml-[8px] text-[14px]">
                    Alausa Abdulazeez
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dependants;
