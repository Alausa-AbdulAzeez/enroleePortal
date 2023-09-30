import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";
import { Box, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Dependants = () => {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  //   DEPENDANTS
  const [dependantsList, setDependantsList] = useState([]);

  //   DEFAULT TAB VALUE
  const [value, setValue] = React.useState("1");

  // TOAST ID
  const toastId = useRef(null);

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null);

  // FILE SELECTION AND CHANGE
  const [selectedFile, setSelectedFile] = useState(null);

  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    // setScheduleInfo((prev) => {
    //   return {
    //     ...prev,
    //     appointmentdate: selectedDate?.toISOString(),
    //   };
    // });
  };
  // end of function for handling date chande

  //   FUNCTION FOR HANDLING FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  //   END OF FUNCTION FOR HANDLING FILE CHANGE

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

  // FUNCTION TO HANDLE TAB CHANGE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // END OF FUNCTION TO HANDLE TAB CHANGE

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
        <div className="m-12 max-sm:mx-2 h-auto max-h-[500px] bg-white flex rounded-[10px] max-sm:m-0 overflow-y-auto p-6 flex-wrap ">
          <TabContext value={value}>
            <Box sx={{ width: "100%" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Dependants List" value="1" />
                <Tab label="Add Dependant" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ width: "100%" }}>
              {dependantsList.length === 0 ? (
                <div className="font-semibold text-left">
                  User has no Dependant
                </div>
              ) : (
                <div className="w-[100%]  flex flex-wrap gap-[20px]">
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
                </div>
              )}
            </TabPanel>
            <TabPanel value="2" sx={{ width: "100%" }}>
              <form action="" className="w-[100%] flex flex-wrap gap-5">
                <TextField
                  id="outlined-password-input"
                  label="Surname"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                />
                <TextField
                  id="outlined-password-input"
                  label="Other Names"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                />

                <TextField
                  id="outlined-password-input"
                  label="Relationship"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                />
                <TextField
                  id="outlined-password-input"
                  label="Gender"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                />
                <TextField
                  id="outlined-password-input"
                  label="Address"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                />
                <DatePicker
                  selected={startDate}
                  onChange={(selectedDate) => handleDateChange(selectedDate)}
                  dateFormat="MMMM d, yyyy"
                  className="datePicker w-[100%] bg-slate-100 p-2 rounded-md cursor-pointer"
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="Date of Birth"
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Image:
                  </label>
                  <div className="relative border border-gray-300 rounded-md p-2  min-w-[222px] w-auto">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      id="fileInput"
                    />
                    <span className="text-gray-500">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </span>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("fileInput").click();
                        }}
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="hover:bg-lwPurple  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
                >
                  Submit
                </button>
              </form>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default Dependants;
