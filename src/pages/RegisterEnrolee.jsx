import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../assets/images/LWlogo.png";
import { Autocomplete, TextField } from "@mui/material";
import { relationship } from "../assets/data/Relationship.";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const RegisterEnrolee = () => {
  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null);

  // function for handling date chande
  const handleDateChange = (selectedDate, actionType) => {
    setStartDate(selectedDate);
  };
  // end of function for handling date chande

  return (
    <div className="bg-slate-100 h-[100vh] overflow-y-auto">
      <div className="h-[55px] bg-white w-[100%] px-12 flex items-center justify-between max-sm:justify-center sticky top-0 z-10">
        <div className=" h-[55px] flex items-center justify-center ">
          <h3 className="font-bold text-lg text-lwOrange mr-2">LifeWORTH</h3>
          <img src={Logo} alt="logo" className=" w-[30px] h-[30px] " />
        </div>
        <h3 className="font-medium text-lwPurple text-[18px]">
          Enrolee Registration
        </h3>
      </div>
      <div className="bg-white text-gray-700 mx-32 mt-5 rounded-md p-5">
        <div className="">Dear enrolee,</div>
        <div className="mb-[20px]">
          Welcome to Lifeworth's online registration portal. To complete your
          registration, kindly select you company, and input your name
        </div>
        <div className="flex gap-[20px] mt-[10px]">
          <TextField
            id="outlined-password-input"
            label="Fullname"
            type="text"
            autoComplete="current-password"
            size={"small"}
            // onChange={(e) => handledependantInfo(e, "surname")}
            // key={inputState}
          />
          <div className="w-[223px]">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              onChange={(e, option) =>
                handledependantInfo(e, "relationType", option)
              }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Select your company" />
              )}
            />
          </div>
          <button
            type="submit"
            className="hover:bg-lwPurple ml-[60px]  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
          >
            Submit
          </button>
        </div>
      </div>
      <form
        className=" flex flex-col mt-[15px] bg-white mx-32 p-5 rounded-sm overflow-y-auto mb-[50px] gap-[20px]"
        // onSubmit={handleCreateDependant}
      >
        <h1 className="font-bold">Enrolee's details</h1>
        <div className="flex flex-wrap gap-5 items-center">
          <TextField
            id="outlined-password-input"
            label="Surname"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "surname")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Middle name"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "surname")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Other Name"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "name")}
            // key={inputState}
          />
          <div className="relative flex-1">
            <label className="text-xs font-medium text-sky-800 absolute -bottom-[15px]">
              Select enrolee's passport photograph:
            </label>
            <div className="relative border border-gray-300 rounded-md h-[40px]  min-w-[222px] w-auto">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                placeholder="Kindly attach enrolee's image"
                // onChange={handleFileChange}
                id="fileInput"
              />
              <span className="text-gray-500">
                {/* {selectedFile ? selectedFile.name : "No file chosen"} */}
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
        </div>
        <div className="w-full">
          <TextField
            id="outlined-password-input"
            label="Address"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ width: "100%" }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
        </div>
        <div className="w-full flex gap-[20px]">
          <TextField
            id="outlined-password-input"
            label="Occupation"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Designation"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
        </div>
        <div className="w-full">
          <TextField
            id="outlined-password-input"
            label="Address of employer"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ width: "100%" }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
        </div>
        <div className="w-full flex gap-[20px]">
          <TextField
            id="outlined-password-input"
            label="Phone number"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handledependantInfo(e, "address")}
            // key={inputState}
          />
        </div>
        <div className="w-full flex gap-[20px]">
          <div className="flex-[2]">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handledependantInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Hospital of choice" />
              )}
            />
          </div>
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handledependantInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Plan type" />
              )}
            />
          </div>
        </div>
        <div className="w-full flex gap-[20px]">
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handledependantInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => <TextField {...params} label="Sex" />}
            />
          </div>
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handledependantInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Genotype" />
              )}
            />
          </div>
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handledependantInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Blood group" />
              )}
            />
          </div>
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
        </div>

        {/* <button
          type="submit"
          className="hover:bg-lwPurple  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default RegisterEnrolee;
