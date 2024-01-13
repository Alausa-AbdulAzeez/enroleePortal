import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Autocomplete, TextField } from "@mui/material";
import { relationship } from "../../assets/data/Relationship.";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Step2 = ({ handleDateChange, startDate, handleNext, handlePrev }) => {
  return (
    <AnimatePresence>
      <motion.form
        className=" flex flex-col bg-white mx-32 p-5 rounded-sm overflow-y-auto mb-[50px] gap-[20px]"
        // onSubmit={handleCreateDependant}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">Spouse</h1>
          <h1 className="font-extrabold text-blue-500">Step 2/3</h1>
        </div>
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
          <div className="flex-1 ">
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
        </div>

        <div className="flex justify-end gap-[20px] mt-[20px]">
          <button
            type="submit"
            onClick={() => handlePrev("enroleesDetails")}
            className="hover:bg-gray-300 border hover:text-white hover:border-none border-gray-500  text-gray-500 py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
          >
            Previous
          </button>

          <button
            type="submit"
            className="hover:bg-gray-600   bg-gray-400 text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px]"
            onClick={() => handleNext("pastMedicalHistory")}
          >
            Next
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Step2;
