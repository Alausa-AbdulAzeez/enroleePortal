import { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/LWlogo.png";
import { BsLock, BsLockFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { healthInsurance } from "../assets/images";

const Login = () => {
  // MISCELLANEOUS
  const navigate = useNavigate();

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    employeeNo: "",
    phoneNo: "",
  });

  // LOGGED IN USER DATA
  let userData;

  // BUTTON STATE
  const [btnDisabled, setBtnDisabled] = useState(true);

  // TOAST ID
  const toastId = useRef(null);

  // FUNCTION TO HNDLE LOGIN INPUT CHANGE
  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value });
  };
  // END OF FUNCTION TO HNDLE LOGIN INPUT CHANGE

  // FUNCTION TO HANDLE BUTTON STATE CHANGE
  const setBtnState = () => {
    if (user.employeeNo && user.phoneNo) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  // END OF FUNCTION TO HANDLE BUTTON STATE CHANGE

  // FUNCTION TO HANDLE USER LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });
    setBtnDisabled(true);
    try {
      await publicRequest.post("/Login", user).then((res) => {
        userData = res?.data;

        sessionStorage.setItem("user", JSON.stringify(userData));
        toast.update(toastId.current, {
          render: "Login succesful! Please wait while we redirect you.",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setBtnDisabled(false);
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
  // END OF FUNCTION TO HANDLE USER LOGIN

  //

  // USEEFFECT TO HANDLE BUTTON STATE AS INPUT CHANGES
  useEffect(() => {
    setBtnState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // END OF USEEFFECT TO HANDLE BUTTON STATE AS INPUT CHANGES

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 relative">
      <div className="absolute w-full h-full top-0 left-0 ">
        <img
          src={healthInsurance}
          // src='https://images.pexels.com/photos/5996641/pexels-photo-5996641.jpeg?auto=compress&cs=tinysrgb&w=600'
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <ToastContainer />
      <div className="w-full h-full overflow-auto bg-[#0000009a] backdrop-blur-lg absolute top-[0] left-[0]">
        <div className="h-[55px] bg-transparent w-[100%] px-12 max-md:px-2 flex items-center justify-between sticky top-0">
          <div className=" h-[55px] flex items-center justify-center ">
            <h3 className="font-bold text-lg text-lwOrange mr-2 max-md:text-[14px] max-lg:text-[16px]">
              LifeWORTH
            </h3>
            <img src={Logo} alt="logo" className=" w-[30px] h-[30px] " />
          </div>
          <h3 className="font-medium text-white text-[18px] max-md:text-[14px] max-lg:text-[16px]">
            Enrolee Portal
          </h3>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-[calc(100vh-60px)] overflow-auto"
          >
            <div className="w-[65%] max-lg:w-[90%] overflow-auto  gap-0 h-[75vh] max-lg:h-[85vh] flex items-center justify-center shadow-2xl">
              <div className="bg-white h-full overflow-auto w-[40%] max-md:w-full   max-lg:w-[45%]  text-gray-700 flex flex-col gap-[20px]  rounded-tl-lg max-md:rounded-lg rounded-bl-lg p-5">
                <div className="flex justify-between">
                  <div className="border-b border-[#f2f2f2] pb-2 font-extrabold text-[18px] max-md:text-[14px] max-lg:text-[16px]">
                    Login
                  </div>
                  <img
                    src={Logo}
                    alt="logo"
                    className=" w-[30px] h-[30px]  max-lg:w-[25px] max-lg:h-[25px]"
                  />
                </div>
                <div className="max-md:text-[12px] max-lg:text-[14px] ">
                  <div className="pt-2 pb-3">Dear enrolee,</div>
                  <div className="mb-[20px]">
                    Welcome to Lifeworth's online enrolee portal. To login,
                    kindly input your enrolee ID, and your phone number.
                  </div>
                  <div className="flex gap-[20px] mt-[10px] flex-col justify-start">
                    <div className="w-[100%] h-[45px] border-b rounded-full mx-auto flex px-5 items-center">
                      <BsPersonFill className="mr-2 w-6 h-6" />
                      <input
                        type="text"
                        placeholder={"LWH/LWH/***'/'***"}
                        onChange={(e) => handleSetUser(e, "employeeNo")}
                        className="border-none text-[14px] w-[100%] outline-none text-lwPurple pl-2 font-semibold"
                        required
                      />
                    </div>
                    <div className="w-[100%] h-[45px] border-b rounded-full mx-auto flex px-5 items-center">
                      <BsLockFill className="mr-2 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) => handleSetUser(e, "phoneNo")}
                        className="border-none w-[100%] outline-none text-lwPurple pl-2 font-semibold"
                        required
                      />
                    </div>
                    {/* <TextField
                  id="staffId"
                  label="Staff ID"
                  type="text"
                  autoComplete="staffId"
                  size={"small"}
                  onChange={(e) =>
                    handleCompanyIdAndEnroleeIdChange(e, "staffId")
                  }
                />
                <TextField
                  id="companyId"
                  label="Company ID"
                  type="text"
                  autoComplete="companyId"
                  size={"small"}
                  onChange={(e) =>
                    handleCompanyIdAndEnroleeIdChange(e, "companyId")
                  }
                /> */}
                  </div>
                </div>
                <div className=" pt-2 font-bold flex justify-end flex-col max-md:text-[12px] max-lg:text-[14px]">
                  <div className=" w-full text-left mt-[20px] mb-[10px]">
                    Click{" "}
                    <span className="underline text-blue-600">
                      {" "}
                      <Link to="/registerEnrolee">here</Link>{" "}
                    </span>{" "}
                    to complete your registration
                  </div>
                  <button
                    disabled={btnDisabled}
                    type="submit"
                    onClick={handleLogin}
                    className="hover:bg-lwPurple mt-2  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px] disabled:cursor-not-allowed disabled:bg-lwPurpleDisabled"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className=" flex-1  h-full max-lg:h-full  max-md:hidden">
                <img
                  src={healthInsurance}
                  // src="https://images.pexels.com/photos/5996641/pexels-photo-5996641.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                  className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
