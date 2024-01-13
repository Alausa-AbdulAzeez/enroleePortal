import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../assets/images/LWlogo.png";
import { Autocomplete, TextField } from "@mui/material";
import { relationship } from "../assets/data/Relationship.";
import Step1 from "../components/steps/Step1";
import Step4 from "../components/steps/Step4";
import { AnimatePresence, motion } from "framer-motion";

import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";

const RegisterEnrolee = () => {
  // STEP
  const [step, setStep] = useState("enroleesDetails");

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null);

  // function for handling date chande
  const handleDateChange = (selectedDate, actionType) => {
    setStartDate(selectedDate);
  };
  // end of function for handling date chande

  //   FUNCTION TO HANDLE ADVANCEMENT TO THE NEXT STEP
  const handleNext = (step) => {
    setStep(step);
  };

  //   END OF FUNCTION TO HANDLE ADVANCEMENT TO THE NEXT STEP

  //   FUNCTION TO HANDLE GOING BACK TO THE PREVIOUS STEP

  const handlePrev = (step) => {
    setStep(step);
  };

  //   END OF FUNCTION TO HANDLE GOING BACK TO THE PREVIOUS STEP

  //   FUNCTION TO HANDLE RENDERING OF A DIFFERENT UI BASED ON THE CURRENT STEP
  const renderStepContent = () => {
    switch (step) {
      case "enroleesDetails":
        return (
          <Step1
            handleNext={handleNext}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        );

      case "spouse":
        return (
          <Step2
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        );
      case "dependant":
        return (
          <Step3
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        );
      // Additional cases for recovery options, confirmation, and verification steps

      default:
        return null;
    }
  };
  //   END OF FUNCTION TO HANDLE RENDERING OF A DIFFERENT UI BASED ON THE CURRENT STEP

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
      <div className="bg-white text-gray-700 mx-32 mt-5 rounded-md p-5 mb-[15px]">
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
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: "0" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderStepContent()}
      </motion.div>
    </div>
  );
};

export default RegisterEnrolee;
