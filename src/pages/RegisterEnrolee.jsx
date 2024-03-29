import React, { useRef, useState } from "react";
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
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";
import Step0 from "../components/steps/Step0";
import axios from "axios";

const RegisterEnrolee = () => {
  // STEP
  // const [step, setStep] = useState("enroleesDetails");
  const [step, setStep] = useState("enroleesDetailsCheck");

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null);

  // BUTTON STATE
  const [btnDisabled, setBtnDisabled] = useState(true);

  // API HOSPITALS LIST
  const [hospitalsList, setHospitalsList] = useState([]);

  // BUTTON STATE
  const [submitFormDisabledBtn, setSubmitFormDisabledBtn] = useState(true);

  // FILE SELECTION AND CHANGE
  const [selectedFile, setSelectedFile] = useState(null);

  // TOAST ID
  const toastId = useRef(null);

  // ENROLEE FOUND STATE
  const [foundEnrole, setFoundEnrolee] = useState(false);

  // BAND TYPE STATE
  const [bandType, setBandType] = useState(null);

  // ENROLEE FETCHED
  const [fetchedEnrolee, setFetchedEnrolee] = useState(null);

  // ENROLEE FETCHED
  const [enroleesDetails, setEnroleesDetails] = useState({
    address01: "",
    dateOfBrith: "",
    phoneNo: "",
    sex: "",
    imageFileName: "",
    file: "",
    genotype: "",
    bloodGroup: "",
    email: "",
    martialStatus: "",
    idProvider: "",
  });

  // STAFF ID STATE
  const [staffId, setStaffId] = useState(null);

  // COMPANY ID STATE
  const [companyId, setCompanyId] = useState(null);

  // COMPANY STATE
  const [company, setCompany] = useState(null);

  // EMPLOYEE ID STATE
  const [employeeId, setEmployeeId] = useState(null);

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

  // FUNCTION TO HANDLE ENROLEE STAFFID AND COMPANYID CHANGE
  const handleCompanyIdAndEnroleeIdChange = (e, type) => {
    if (type === "companyId") {
      setCompanyId(e.target.value?.trim());
    }
    if (type === "staffId") {
      setStaffId(e.target.value?.trim());
    }
  };
  // END OF FUNCTION TO HANDLE ENROLEE STAFFID AND COMPANYID CHANGE

  // FUNCTION TO HANDLE UPDATE OF ENROLEE'S DETAILS
  const handleUpdateEnroleeDetails = async (e) => {
    e.preventDefault();

    // Validation: Check if any field in enroleesDetails (except imageFileName, bloodGroup, and genotype) is empty
    const isAnyFieldEmpty = Object.keys(enroleesDetails).some(
      (key) =>
        key !== "imageFileName" &&
        key !== "bloodGroup" &&
        key !== "genotype" &&
        enroleesDetails[key] === ""
    );

    // Validation: Check if any field in enroleesDetails is empty
    // const isAnyFieldEmpty = Object.values(enroleesDetails).some(
    //   (value) => value === ""
    // );

    if (isAnyFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });

    const formData = {
      Surname: fetchedEnrolee?.[0]?.surname,
      Body: "",
      EmployeeNo: fetchedEnrolee?.[0]?.employeeNo,
      Email: enroleesDetails?.email,
      Company: company?.[0]?.companyName,
    };

    setBtnDisabled(true);
    try {
      await axios
        .put(
          `https://lifeworthhmoenrolleeapp.com/api/Login/UserUpdateonline?IdEmployee=${employeeId}`,
          enroleesDetails,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(
          async () =>
            await axios.post(
              "https://lifeworthhmoenrolleeapp.com/api/Mail/Sendonline",
              formData,
              {
                headers: {
                  accept: "*/*",
                  "Content-Type": "multipart/form-data",
                },
              }
            )
        )
        .then((res) => {
          toast.update(toastId.current, {
            render: "Details updated successfully",
            type: "success",
            autoClose: 2000,
            isLoading: false,
          });
          window.location.reload();
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
  // END OF FUNCTION TO HANDLE UPDATE OF ENROLEE'S DETAILS

  // FUNCTION TO HANDLE CONFIRMATION OF ENROLEE'S DETAILS
  const handleConfirmEnroleeDetails = async (e) => {
    e.preventDefault();

    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });
    setBtnDisabled(true);
    try {
      await publicRequest
        .get(`/companyid?idcompany=${companyId}`)
        .then((res) => {
          return setCompany(res?.data);
        })
        .then(async () => {
          await publicRequest
            .get(`/Login/StaffID?staffid=${staffId}&companyid=${companyId}`)
            .then((res) => {
              if (res?.data.length > 0) {
                toast.update(toastId.current, {
                  render: "Details fetched successfully",
                  type: "success",
                  autoClose: 2000,
                  isLoading: false,
                });
                setBtnDisabled(false);
                setFoundEnrolee(true);
                setFetchedEnrolee(res?.data);
                setStep("enroleesDetails");
                setEmployeeId(res?.data?.[0]?.idEmployee);
              } else {
                toast.update(toastId.current, {
                  render:
                    "Could not find user. Please input the correct details",
                  type: "error",
                  autoClose: 2000,
                  isLoading: false,
                });
                setBtnDisabled(false);
                setFoundEnrolee(false);
                setFetchedEnrolee(null);
              }
            });
        });
    } catch (error) {
      console.log(error);
      setBtnDisabled(false);
      setFoundEnrolee(false);
      setFetchedEnrolee(null);
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
  // END OF FUNCTION TO HANDLE CONFIRMATION OF ENROLEE'S DETAILS

  //   FUNCTION TO HANDLE RENDERING OF A DIFFERENT UI BASED ON THE CURRENT STEP
  const renderStepContent = () => {
    switch (step) {
      case "enroleesDetailsCheck":
        return (
          <Step0
            handleNext={handleNext}
            startDate={startDate}
            fetchedEnrolee={fetchedEnrolee}
            setEnroleesDetails={setEnroleesDetails}
            enroleesDetails={enroleesDetails}
            setStartDate={setStartDate}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            handleUpdateEnroleeDetails={handleUpdateEnroleeDetails}
            staffId={staffId}
            setStaffId={setStaffId}
            btnDisabled={btnDisabled}
            setBtnDisabled={setBtnDisabled}
            handleConfirmEnroleeDetails={handleConfirmEnroleeDetails}
            handleCompanyIdAndEnroleeIdChange={
              handleCompanyIdAndEnroleeIdChange
            }
          />
        );
      case "enroleesDetails":
        return (
          <Step1
            handleNext={handleNext}
            startDate={startDate}
            fetchedEnrolee={fetchedEnrolee}
            setEnroleesDetails={setEnroleesDetails}
            enroleesDetails={enroleesDetails}
            setStartDate={setStartDate}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            handleUpdateEnroleeDetails={handleUpdateEnroleeDetails}
            staffId={staffId}
            setStaffId={setStaffId}
            btnDisabled={btnDisabled}
            setBtnDisabled={setBtnDisabled}
            hospitalsList={hospitalsList}
            handleConfirmEnroleeDetails={handleConfirmEnroleeDetails}
            handleCompanyIdAndEnroleeIdChange={
              handleCompanyIdAndEnroleeIdChange
            }
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

  // FUNCTION TO GET BAND TYPE
  const getBandType = async () => {
    const idProduct = fetchedEnrolee?.[0]?.idProduct;
    try {
      const response = await publicRequest.get(
        `/Product?ID_Product=${idProduct}`
      );
      return setBandType(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // END OF FUNCTION TO GET BAND TYPE

  // FUNCTION TO GET HOSPITALS
  const getHospitals = async () => {
    const idProduct = fetchedEnrolee?.[0]?.idProduct;

    try {
      await publicRequest
        // GET BANDTYPE FIRST
        .get(`/Product?ID_Product=${idProduct}`)
        .then(async (res) => {
          // Extract band type
          const fetchedBandType = res?.data?.[0]?.bandType;
          await publicRequest
            // GET HOSPITALS
            .get(`/Provider?BandType=${fetchedBandType || "Band C"}`)
            .then((res) => {
              setHospitalsList(res?.data);
            });
        });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again",
        {
          autoClose: 1500,
        }
      );
    }
  };
  // END OF FUNCTION TO GET HOSPITALS

  // USEEFFECT TO CHECK WHEN TO MODIFY THE SUBMIT BUTTON BASED ON THE AVAILABILITY OF THE COMPANY AND STAFF ID
  useEffect(() => {
    const checkStaffAndCompanyId = () => {
      if (staffId && companyId) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    };

    checkStaffAndCompanyId();
  }, [companyId, staffId]);

  // END OF USEEFFECT TO CHECK WHEN TO MODIFY THE SUBMIT BUTTON BASED ON THE AVAILABILITY OF THE COMPANY AND STAFF ID

  // USE EFFECT TO CALL FUNCTION THAT FETCHES HOSPITALS LIST AS PAGE LOADS
  useEffect(() => {
    getHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedEnrolee]);

  return (
    <div className="bg-slate-100 h-[100vh] overflow-y-auto">
      <ToastContainer />
      <div className="h-[55px] bg-white w-[100%] px-12 max-md:px-2 flex items-center justify-between sticky top-0 z-10">
        <div className=" h-[55px] flex items-center justify-center ">
          <h3 className="font-bold text-lg text-lwOrange mr-2 ">LifeWORTH</h3>
          <img src={Logo} alt="logo" className=" w-[30px] h-[30px] " />
        </div>
        <h3 className="font-medium text-lwPurple text-[18px] max-lg:text-[16px]">
          Enrolee Registration
        </h3>
      </div>
      <div
        className={`absolute top-[60px]  max-lg:top-[75px]  w-full text-center text-[18px] ${
          step === "enroleesDetailsCheck" ? "z-10" : ""
        }`}
      >
        Already registered? Click{" "}
        <span className="underline text-blue-600">
          {" "}
          <Link to="/login">here</Link>{" "}
        </span>{" "}
        to login
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
