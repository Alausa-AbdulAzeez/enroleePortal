import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Autocomplete, TextField } from "@mui/material";
import {
  bloodGroup,
  gender,
  genotype,
  martialStatus,
  relationship,
} from "../../assets/data/Relationship.";

const Step1 = ({
  startDate,
  handleNext,
  fetchedEnrolee,
  setEnroleesDetails,
  enroleesDetails,
  setStartDate,
  setSelectedFile,
  selectedFile,
  handleUpdateEnroleeDetails,
  btnDisabled,
  setBtnDisabled,
  handleConfirmEnroleeDetails,
  handleCompanyIdAndEnroleeIdChange,
}) => {
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    setEnroleesDetails((prev) => {
      return { ...prev, dateOfBrith: selectedDate?.toISOString() };
    });
  };
  // end of function for handling date chande

  //   FUNCTION FOR HANDLING FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setEnroleesDetails((prev) => {
      return { ...prev, imageFileName: file?.name };
    });
  };
  //   END OF FUNCTION FOR HANDLING FILE CHANGE

  //   FUNCTION TO HANDLE INPUT CHANGE
  const handleEnroleeInfo = (e, dataName, data) => {
    if (dataName === "genotype") {
      setEnroleesDetails((prev) => {
        return {
          ...prev,
          genotype: data?.code,
        };
      });
    } else if (dataName === "bloodGroup") {
      setEnroleesDetails((prev) => {
        return {
          ...prev,
          bloodGroup: data?.code,
        };
      });
    } else if (dataName === "sex") {
      setEnroleesDetails((prev) => {
        return { ...prev, sex: data?.sexCode };
      });
    } else if (dataName === "martialStatus") {
      setEnroleesDetails((prev) => {
        return { ...prev, martialStatus: data?.code };
      });
    } else {
      setEnroleesDetails((prev) => {
        return { ...prev, [dataName]: e.target.value };
      });
    }
  };
  //   END OF FUNCTION TO HANDLE INPUT CHANGE

  return (
    <AnimatePresence>
      <div className="bg-white text-gray-700 mx-32 max-md:mx-2 mt-5 rounded-md p-5 mb-[15px]">
        <div className="">Dear enrolee,</div>
        <div className="mb-[20px]">
          Welcome to Lifeworth's online registration portal. To complete your
          registration, kindly input your staff ID, and your company ID.
        </div>
        <div className="flex gap-[20px] mt-[10px] max-md:flex-col">
          <TextField
            id="staffId"
            label="Staff ID"
            type="text"
            autoComplete="staffId"
            size={"small"}
            onChange={(e) => handleCompanyIdAndEnroleeIdChange(e, "staffId")}
            // key={inputState}
          />
          <TextField
            id="companyId"
            label="Company ID"
            type="text"
            autoComplete="companyId"
            size={"small"}
            onChange={(e) => handleCompanyIdAndEnroleeIdChange(e, "companyId")}
            // key={inputState}
          />
          <button
            disabled={btnDisabled}
            type="submit"
            onClick={handleConfirmEnroleeDetails}
            className="hover:bg-lwPurple ml-[60px]  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px] disabled:cursor-not-allowed disabled:bg-lwPurpleDisabled"
          >
            Submit
          </button>
        </div>
      </div>
      <motion.form
        className=" flex flex-col bg-white mx-32 max-md:mx-2 p-5 rounded-sm overflow-y-auto mb-[50px] gap-[20px]"
        // onSubmit={handleCreateDependant}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">Enrolee's details</h1>
          {/* <h1 className="font-extrabold text-blue-500">Step 1/3</h1> */}
        </div>

        <div className="flex flex-wrap gap-5 items-center max-md:flex-col max-md:items-stretch">
          <TextField
            id="outlined-password-input"
            label={`${
              fetchedEnrolee?.[0]?.surname
                ? fetchedEnrolee?.[0]?.surname
                : " Surname"
            }`}
            disabled
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handleEnroleeInfo(e, "surname")}
            // key={inputState}
          />
          {/* <TextField
            id="outlined-password-input"
            label="Middle name"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ flex: 1 }}
            onChange={(e) => handleEnroleeInfo(e, "surname")}
          /> */}
          <TextField
            id="fullName"
            label={`${
              fetchedEnrolee?.[0]?.fullName
                ? fetchedEnrolee?.[0]?.fullName
                : " Fullname"
            }`}
            disabled
            type="text"
            autoComplete="Fullname"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handleEnroleeInfo(e, "name")}
            // key={inputState}
          />
          <div className="relative flex-1">
            <label className="text-xs font-medium text-sky-800 absolute -bottom-[15px]">
              Select enrolee's passport photograph:
            </label>
            <div className="relative border border-gray-300 rounded-md h-[40px]  min-w-[222px] w-auto items-center flex px-[30px]">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                placeholder="Kindly attach enrolee's image"
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
        </div>
        <div className="w-full">
          <TextField
            id="outlined-password-input"
            label="Address"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ width: "100%" }}
            onChange={(e) => handleEnroleeInfo(e, "address01")}
            // key={inputState}
          />
        </div>
        {/* <div className="w-full flex gap-[20px] max-md:flex-col">
          <TextField
            id="outlined-password-input"
            label="Occupation"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handleEnroleeInfo(e, "address")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Designation"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            // onChange={(e) => handleEnroleeInfo(e, "address")}
            // key={inputState}
          />
        </div> */}
        {/* <div className="w-full max-md:flex-col">
          <TextField
            id="outlined-password-input"
            label="Address of employer"
            type="text"
            autoComplete="current-password"
            size={"small"}
            style={{ width: "100%" }}
            // onChange={(e) => handleEnroleeInfo(e, "address")}
            // key={inputState}
          />
        </div> */}
        <div className="w-full flex gap-[20px] max-md:flex-col">
          <TextField
            id="outlined-password-input"
            label="Phone number"
            type="text"
            size={"small"}
            style={{ flex: 1 }}
            onChange={(e) => handleEnroleeInfo(e, "phoneNo")}
            // key={inputState}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            size={"small"}
            style={{ flex: 1 }}
            onChange={(e) => handleEnroleeInfo(e, "email")}
            // key={inputState}
          />
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="martialStatus"
              options={martialStatus}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              onChange={(e, option) =>
                handleEnroleeInfo(e, "martialStatus", option)
              }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Marital Status" />
              )}
            />
          </div>
        </div>
        {/* <div className="w-full flex gap-[20px] max-md:flex-col">
          <div className="flex-[2]">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={relationship}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              // onChange={(e, option) =>
              //   handleEnroleeInfo(e, "relationType", option)
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
              //   handleEnroleeInfo(e, "relationType", option)
              // }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Plan type" />
              )}
            />
          </div>
        </div> */}
        <div className="w-full flex gap-[20px] max-md:flex-col">
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="sex"
              options={gender}
              // key={inputState}
              getOptionLabel={(option) => `${option.sexDescription}`}
              onChange={(e, option) => handleEnroleeInfo(e, "sex", option)}
              size={"small"}
              renderInput={(params) => <TextField {...params} label="Sex" />}
            />
          </div>
          <div className="flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={genotype}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              onChange={(e, option) => handleEnroleeInfo(e, "genotype", option)}
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
              options={bloodGroup}
              // key={inputState}
              getOptionLabel={(option) => `${option.description}`}
              onChange={(e, option) =>
                handleEnroleeInfo(e, "bloodGroup", option)
              }
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Blood group" />
              )}
            />
          </div>
          <div className="flex-1 ">
            <DatePicker
              selected={startDate}
              onChange={(selectedDate) => handleDateChange(selectedDate)}
              dateFormat="MMMM d, yyyy"
              className="datePicker w-[100%] bg-slate-100 p-2 rounded-md cursor-pointer"
              showMonthDropdown
              showYearDropdown
              placeholderText="Date of Birth"
            />
          </div>
        </div>
        <div className="flex justify-end gap-[20px] mt-[20px]">
          <button
            type="submit"
            className="hover:bg-gray-600   bg-gray-400 text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
            onClick={(e) => handleUpdateEnroleeDetails(e)}
          >
            Submit
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Step1;
