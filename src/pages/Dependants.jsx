import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { publicRequest } from "../functions/requestMethods";
import { Autocomplete, Box, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DatePicker from "react-datepicker";

import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { gender, relationship } from "../assets/data/Relationship.";
import FormDialog from "../components/DeprndantUpdateDialogue";

const Dependants = () => {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  // UPDATE TAB ACTIVE
  const [updateTabActive, setUpdateTabActive] = useState(false);

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null);

  //   TOAST ID
  const toastId = React.useRef(null);

  //  THE STATE OF THE SUBMIT BUTTONS
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  //   STATE OF MUI INPUTS
  const [inputState, setInputState] = useState(false);

  // FILE SELECTION AND CHANGE
  const [selectedFile, setSelectedFile] = useState(null);

  //   DEPENDANT'S INFO
  const [dependantInfo, setDependantInfo] = useState({
    idEmployee: userDetails?.id,
    surname: "",
    name: "",
    birthDate: "",
    relationType: "",
    employeeNo: userDetails?.employeeNo,
    imageFileName: "",
    sex: "",
    address: "",
  });

  //   DEPENDANT TO BE UPDATED'S INFO
  const [dependantToBeUpdatedInfo, setDependantToBeUpdatedInfo] = useState({});

  //   DEPENDANT TO BE UPDATED'S INFO
  const [dependantToBeEditedInfo, setDependantToBeEditedInfo] = useState({
    name: "",
    birthDate: "",
    address: "",
  });

  //   DEPENDANTS
  const [dependantsList, setDependantsList] = useState([]);

  //   DEFAULT TAB VALUE
  const [value, setValue] = React.useState("1");

  // DIALOGUE STATE
  const [open, setOpen] = React.useState(false);

  // FUNCTIONALITY FOR OPENING AND CLOSING OF DIALOGUE
  const handleClickOpen = (dependant) => {
    // setOpen(true);
    setUpdateTabActive(true);
    setValue("3");
    setDependantToBeUpdatedInfo(dependant);
    setDependantToBeEditedInfo((prev) => {
      return { ...prev, name: dependant?.name };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  // END OF FUNCTIONALITY FOR OPENING AND CLOSING OF DIALOGUE

  // function for handling date chande
  const handleDateChange = (selectedDate, actionType) => {
    setStartDate(selectedDate);

    if (actionType === "update") {
      setDependantToBeEditedInfo((prev) => {
        return { ...prev, birthDate: selectedDate?.toISOString() };
      });
    } else {
      setDependantInfo((prev) => {
        return { ...prev, birthDate: selectedDate?.toISOString() };
      });
    }
  };
  // end of function for handling date chande

  //   FUNCTION FOR HANDLING FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setDependantInfo((prev) => {
      return { ...prev, imageFileName: file?.name };
    });
  };
  //   END OF FUNCTION FOR HANDLING FILE CHANGE

  //   FUNCTION TO HANDLE INPUT CHANGE
  const handledependantInfo = (e, dataName, data) => {
    if (dataName === "relationType") {
      setDependantInfo((prev) => {
        return {
          ...prev,
          relationType: data?.description,
        };
      });
    } else if (dataName === "sex") {
      setDependantInfo((prev) => {
        return { ...prev, sex: data?.sexDescription };
      });
    } else {
      setDependantInfo((prev) => {
        return { ...prev, [dataName]: e.target.value };
      });
    }
  };
  //   END OF FUNCTION TO HANDLE INPUT CHANGE

  //   FUNCTION TO HANDLE INPUT CHANGE
  const handledependantToBeUpdatedInfo = (e, dataName, data) => {
    setDependantToBeEditedInfo((prev) => {
      return { ...prev, [dataName]: e.target.value };
    });
  };
  //   END OF FUNCTION TO HANDLE DEPENDANT TO BE UPDATED INPUT CHANGE

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
    setUpdateTabActive(false);
  };
  // END OF FUNCTION TO HANDLE TAB CHANGE

  //   FUNCTION TO HANDLE DEPENDANT CREATION
  const handleCreateDependant = async (e) => {
    e.preventDefault();

    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableSubmitBtn(true);

    try {
      await publicRequest
        .post("/userid/NewDependant", dependantInfo)
        .then(() => {
          toast.update(toastId.current, {
            render: "Dependant added succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableSubmitBtn(false);
          setInputState((prev) => !prev);
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
      setDisableSubmitBtn(false);
    }
  };
  //   END OF FUNCTION TO HANDLE DEPENDANT CREATION

  //   FUNCTION TO HANDLE DEPENDANT CREATION
  const handleDependantUpdate = async (e) => {
    e.preventDefault();

    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableSubmitBtn(true);

    try {
      await publicRequest
        .put(
          `Id/UpdateDependant/?IdDependant=${dependantToBeUpdatedInfo?.idDependant}`,
          dependantToBeEditedInfo
        )
        .then(() => {
          toast.update(toastId.current, {
            render:
              "Dependant updated succesfully! Please wait while the pae reloads.",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableSubmitBtn(false);
          setInputState((prev) => !prev);

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
      setDisableSubmitBtn(false);
    }
  };
  //   END OF FUNCTION TO HANDLE DEPENDANT CREATION

  // USE EFFECT TO CALL FUNCTION THAT FETCHES DEPENDANTS LIST AS PAGE LOADS
  useEffect(() => {
    getDependants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <ToastContainer />
      <FormDialog open={open} handleClose={handleClose} />
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
                {updateTabActive && <Tab label="Update Dependant" value="3" />}
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ width: "100%" }}>
              {dependantsList.length === 0 ? (
                <div className="font-semibold text-left">
                  User has no Dependant
                </div>
              ) : (
                <div className="w-[100%]  flex flex-wrap gap-[20px] ">
                  {dependantsList?.map((dependant, index) => {
                    return (
                      <div
                        key={index}
                        className="max-md:min-w-[250px] min-w-[350px] max-w-[400px] h-[100px]  flex-1 max-lg:min-w-[550px]  bg-slate-100 rounded-xl py-3 flex items-center relative"
                      >
                        <button
                          className="absolute  bg-lwPurple bottom-2 text-xs right-4 rounded-md px-2 py-1 text-white flex items-center justify-center"
                          onClick={() => handleClickOpen(dependant)}
                        >
                          Update
                        </button>
                        <div className="w-[100px] h-[100px] bg-white  relative ">
                          <div className="absolute w-[100px] h-[100px] blackGradient rounded-l-xl" />
                          <img
                            src={
                              `https://lifeworthhmoenrolleeapp.com/image/${
                                dependant?.image?.split("\\")[3]
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
                              {dependant?.name} {dependant?.fullName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-gray-700 text-[14px]">
                              Enrolee Number:
                            </h3>
                            <p className="text-gray-500 font-semibold ml-[8px] text-[14px]">
                              {dependant?.employeeNo}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabPanel>
            <TabPanel value="2" sx={{ width: "100%" }}>
              <form
                className="w-[100%] flex flex-wrap gap-5"
                onSubmit={handleCreateDependant}
              >
                <TextField
                  id="outlined-password-input"
                  label="Surname"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                  onChange={(e) => handledependantInfo(e, "surname")}
                  key={inputState}
                />
                <TextField
                  id="outlined-password-input"
                  label="Other Names"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                  onChange={(e) => handledependantInfo(e, "name")}
                  key={inputState}
                />
                <div className="w-[223px]">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={relationship}
                    key={inputState}
                    getOptionLabel={(option) => `${option.description}`}
                    onChange={(e, option) =>
                      handledependantInfo(e, "relationType", option)
                    }
                    size={"small"}
                    renderInput={(params) => (
                      <TextField {...params} label="Relationship Type" />
                    )}
                  />
                </div>

                <div className="w-[223px]">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gender}
                    key={inputState}
                    getOptionLabel={(option) => `${option.sexDescription}`}
                    onChange={(e, option) =>
                      handledependantInfo(e, "sex", option)
                    }
                    size={"small"}
                    renderInput={(params) => (
                      <TextField {...params} label="Gender" required />
                    )}
                  />
                </div>

                <TextField
                  id="outlined-password-input"
                  label="Address"
                  type="text"
                  autoComplete="current-password"
                  size={"small"}
                  onChange={(e) => handledependantInfo(e, "address")}
                  key={inputState}
                />
                <DatePicker
                  selected={startDate}
                  onChange={(selectedDate) =>
                    handleDateChange(selectedDate, "creation")
                  }
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
            <TabPanel value="3" sx={{ width: "100%" }}>
              <form
                className="w-[100%] flex flex-wrap gap-5"
                onSubmit={handleCreateDependant}
              >
                <>
                  <TextField
                    id="outlined-password-input"
                    type="text"
                    autoComplete="current-password"
                    size={"small"}
                    key={inputState}
                    disabled
                    value={dependantToBeUpdatedInfo?.surname}
                  />
                </>
                <>
                  <TextField
                    id="outlined-password-input"
                    label="Other Names"
                    type="text"
                    autoComplete="current-password"
                    size={"small"}
                    onChange={(e) => handledependantToBeUpdatedInfo(e, "name")}
                    key={inputState}
                    value={dependantToBeEditedInfo?.name}
                    inputLabelProps={{ shrink: true }}
                  />
                </>
                <>
                  <TextField
                    id="outlined-password-input"
                    label="Address"
                    type="text"
                    autoComplete="current-password"
                    size={"small"}
                    onChange={(e) =>
                      handledependantToBeUpdatedInfo(e, "address")
                    }
                    key={inputState}
                  />
                </>
                <DatePicker
                  selected={startDate}
                  onChange={(selectedDate) =>
                    handleDateChange(selectedDate, "update")
                  }
                  dateFormat="MMMM d, yyyy"
                  className="datePicker w-[100%] bg-slate-100 p-2 rounded-md cursor-pointer"
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="Date of Birth"
                />

                <button
                  onClick={handleDependantUpdate}
                  className="hover:bg-lwPurple  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
                >
                  Update
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
