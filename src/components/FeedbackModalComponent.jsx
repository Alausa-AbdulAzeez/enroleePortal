import { Autocomplete, TextField } from "@mui/material";
import { feedbackRatings } from "../assets/data/Relationship.";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { publicRequest } from "../functions/requestMethods";

const FeedbackModalComponent = ({ selectedProvider, handleClose }) => {
  // DATE
  const today = new Date();
  const formattedDate = today.toISOString();

  //  THE STATE OF THE SUBMIT BUTTONS
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  //   TOAST ID
  const toastId = React.useRef(null);

  // FEEDBACK DATA
  const [feedbackData, setFeedbackData] = useState({
    feedBack: "",
    feedBackDate: formattedDate,
    name: "",
    rate: "",
    idProvider: selectedProvider?.iD_Provider,
  });

  // FUNCTION TO HANDLE FEEDBACK DATA CHANGE
  const handleFeedbackInfo = (e, dataName, data) => {
    if (dataName === "rate") {
      setFeedbackData((prev) => {
        return { ...prev, ["rate"]: data?.ratingDescription };
      });
    } else {
      setFeedbackData((prev) => {
        return { ...prev, [dataName]: e.target.value };
      });
    }
  };
  // END OF FUNCTION TO HANDLE FEEDBACK DATA CHANGE

  // FUNCTION TO HANDLE FEEDBACK SUBMISSION
  const handleSendFeedback = async (e) => {
    e.preventDefault();

    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableSubmitBtn(true);

    try {
      await publicRequest.post("/Feedback", feedbackData).then(() => {
        toast.update(toastId.current, {
          render: "Feedback sent succesfully!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
        setDisableSubmitBtn(false);
        handleClose();
      });
    } catch (error) {
      console.log(error);
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
  // END OF FUNCTION TO HANDLE FEEDBACK SUBMISSION

  return (
    <div className="w-[500px] min-h-[200px] max-h-[300px] p-3 rounded-lg bg-white flex flex-col justify-between">
      <div className="h-[45px] font-medium ml-2 text-lwPurple flex justify-start items-center">
        Send Feedback
      </div>
      <div className="border-t border-b border-b-silver border-t-silver flex-1 flex flex-wrap gap-3 p-2">
        <TextField
          id="outlined-password-input"
          label="Enrolee Name"
          type="text"
          autoComplete="current-password"
          size={"small"}
          onChange={(e) => handleFeedbackInfo(e, "name")}
          // key={inputState}
        />
        <div className="w-[223px]">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={feedbackRatings}
            // key={inputState}
            getOptionLabel={(option) => `${option.ratingDescription}`}
            onChange={(e, option) => handleFeedbackInfo(e, "rate", option)}
            size={"small"}
            renderInput={(params) => <TextField {...params} label="Rating" />}
          />
        </div>
        <div className="w-[100%]">
          <TextField
            id="outlined-password-input"
            label="Feedback"
            type="text"
            autoComplete="current-password"
            multiline
            rows={4}
            fullWidth
            size="small"
            onChange={(e) => handleFeedbackInfo(e, "feedBack")}
            // key={inputState}
          />
        </div>
      </div>
      <div className=" h-[60px] flex justify-end">
        <button
          className="py-1 px-4 font-medium text-lwPurple rounded-md hover:bg-slate-50"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="py-1 px-4 font-medium text-lwPurple rounded-md hover:bg-slate-50 "
          onClick={handleSendFeedback}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FeedbackModalComponent;
