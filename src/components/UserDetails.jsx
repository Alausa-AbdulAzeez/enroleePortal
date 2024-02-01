import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";
import { format } from "date-fns";
import SwiperComponent from "./SwiperComponent";

const UserDetails = ({ page }) => {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  // TOAST ID
  const toastId = useRef(null);

  // BAND TYPE
  const bandType = userDetails?.bandType;

  // ENROLEE NUMBER
  const enroleeNumber = userDetails?.employeeNo;

  // BAND TYPES
  const [bands, setBands] = useState([]);

  // PAGE SIZE
  const [pageSize, setPageSize] = useState(100);

  // API HOSPITALS LIST
  const [hospitalsList, setHospitalsList] = useState([]);

  // AUJTH CODES
  const [authCodes, setAuthCodes] = useState([]);

  // API HOSPITALS LIST
  const [filteredHospitalsList, setfilteredHospitalsList] = useState([]);

  // SELECTED PROVIDER
  const [selectedProvider, setSelectedProvider] = useState(null);

  // FUNCTION TO GET HOSPITALS
  const getHospitals = async () => {
    try {
      await publicRequest.get(`/Provider?BandType=${bandType}`).then((res) => {
        setHospitalsList(res?.data);
      });
    } catch (error) {
      console.log(error);
      toast.error(
        `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`
      );
    }
  };
  // END OF FUNCTION TO GET HOSPITALS

  // FUNCTION TO GET AUTH CODE REQUESTS
  const getAuthCodeRequests = async () => {
    // toastId.current = toast("Please wait...", {
    //   autoClose: false,
    //   isLoading: true,
    // });

    try {
      await axios
        .get(
          `https://api.lifeworthhmo.com/api/AuthCode/EnrolleNo?EmployeeNo=${enroleeNumber}`
        )
        .then((res) => {
          setAuthCodes(res?.data?.reverse());
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
  // END OF FUNCTION TO GET AUTH CODE REQUESTS

  // TABLE COLUMNS
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueGetter: (params) => {
        return params.row;
      },
      valueFormatter: (params) => {
        const refinedDate = new Date(params?.value?.date);
        const dateWithRightFormat = format(refinedDate, "dd-MMM-yyyy");
        return dateWithRightFormat;
      },
      // headerClassName: 'super-app-theme--header',
    },
    {
      field: "providerName3",
      headerName: "Hospital visited",
      width: 600,
      // headerClassName: 'super-app-theme--header',
      valueGetter: (params) => {
        return params.row;
      },
      valueFormatter: (params) => {
        const foundProvider = hospitalsList?.find(
          (singleHospital) =>
            singleHospital?.iD_Provider === params?.value?.idProvider
        );
        return foundProvider?.providerName;
      },
    },
    {
      field: "userId",
      headerName: "Authorized by",
      width: 600,
      // headerClassName: 'super-app-theme--header',
    },
    {
      field: "diagnosis",
      headerName: "Diagnosis",
      width: 600,
      // headerClassName: 'super-app-theme--header',
    },
  ];

  // USE EFFECT TO CALL FUNCTION THAT FETCHES HOSPITALS LIST AND AUTH REQUESTS AS PAGE LOADS
  useEffect(() => {
    getHospitals();
    getAuthCodeRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USEEFFECT TO SAVE BAND TYPE
  useEffect(() => {
    const cachedData = sessionStorage.getItem("bands");
    if (cachedData) {
      setBands(JSON.parse(cachedData));
    } else {
      const cancelToken = axios.CancelToken.source();
      axios
        .get(`https://lifeworthhmoenrolleeapp.com/api/Product/ListProducts`, {
          cancelToken: cancelToken.token,
        })
        .then((response) => {
          sessionStorage.setItem("bands", JSON.stringify(response?.data));
        })
        .catch((err) => {
          console.log(err);
        });

      // .catch((error) => console.error(error))
      return () => {
        cancelToken.cancel();
      };
    }
  }, []);

  return (
    <div
      className={`p-12 max-md:p-2   ${
        page === "Profile" ? "gap-[40px] " : "gap-[0px] max-sm:gap-[20px]"
      } max-sm:mx-2 h-[calc(100%-60px)] flex flex-col overflow-auto`}
    >
      {page === "Home" && (
        <>
          <div className="bg-white p-4 shadow-lg mt-3 max-sm:shadow-none">
            <div className="">
              Dear <span className="font-bold">{userDetails?.fullName}</span> ,
            </div>
            <div className="">Welcome to Lifeworth's enrolee portal.</div>
          </div>
          <div className=" min-h-[350px] flex justify-center max-sm:flex-col overflow-y-auto max-sm:min-h-[200px]">
            <SwiperComponent
              userDetails={userDetails}
              authCodes={authCodes}
              hospitalsList={hospitalsList}
            />
          </div>
        </>
      )}

      {page === "Profile" && (
        <div className="min-h-[350px]  flex max-sm:flex-col overflow-y-auto justify-center gap-[20px]">
          <div className="flex flex-col backdrop-blur-sm bg-[#ffffff50] rounded-lg min-w-[300px] items-center py-5">
            <div className="w-[150px] h-[150px]  mb-5">
              <img
                src={
                  `https://lifeworthhmoenrolleeapp.com/image/${
                    userDetails?.image?.split("\\")[3]
                  }` ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EMPbKxWDxjLwlcB9ctrJv8JNvlguwjrXXn-KbUc4yg&s"
                }
                alt=""
                className="w-[100%] h-[100%] object-cover rounded-full bg-center hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-500"
              />
            </div>
            <div className="flex flex-col gap-[5px] items-center">
              <p className=" font-bold text-gray-700 text-[12px]">
                {userDetails?.name} {userDetails?.fullName}
              </p>
              <p className="text-gray-500 font-semibold text-[12px]">
                {userDetails?.employeeNo}{" "}
              </p>
              <p className="text-gray-500 font-semibold text-[12px]">
                {userDetails?.idCompany}{" "}
              </p>
              <div className="rounded-lg bg-lwPurple text-white px-10 py-2">
                {userDetails?.gender === "M" && "Male"}
                {userDetails?.gender === "F" && "Female"}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg min-w-[300px] w-[350px] backdrop-blur-sm bg-[#ffffff50] items-center py-5">
            <div className="flex flex-col gap-[15px] w-full items-center px-5">
              <div className="flex w-full justify-between border-b border-[#99910] text-[12px] ">
                <h3 className="font-bold text-gray-700 mb-1">Full name</h3>
                <p className="text-gray-500 font-semibold">
                  {userDetails?.name} {userDetails?.fullName}
                </p>
              </div>
              <div className="flex w-full justify-between border-b border-[#99910] text-[12px] ">
                <h3 className="font-bold text-gray-700 mb-1">Enrolee ID</h3>
                <p className="text-gray-500 font-semibold">
                  {userDetails?.employeeNo}
                </p>
              </div>
              <div className="flex w-full justify-between border-b border-[#99910] text-[12px] ">
                <h3 className="font-bold text-gray-700 mb-1">Company name</h3>
                <p className="text-gray-500 font-semibold">
                  {userDetails?.idCompany}
                </p>
              </div>
              <div className="flex w-full justify-between border-b border-[#99910] text-[12px] ">
                <h3 className="font-bold text-gray-700 mb-1">Phone</h3>
                <p className="text-gray-500 font-semibold">
                  {userDetails?.phoneNo}
                </p>
              </div>
              <div className="flex w-full justify-between border-b border-[#99910] text-[12px] ">
                <h3 className="font-bold text-gray-700 mb-1">Phone</h3>
                <p className="text-gray-500 font-semibold">
                  {userDetails?.phoneNo}
                </p>
              </div>
            </div>
          </div>
        </div>
        // <div className=" min-h-[350px] bg-white flex max-sm:flex-col overflow-y-auto">
        //   <div className=" w-[200px] h-[200px] bg-slate-100 flex items-center justify-center   rounded-full ">
        // <div className="w-[180px] h-[180px] bg-white ">
        //   <img
        //     src={
        //       `https://lifeworthhmoenrolleeapp.com/image/${
        //         userDetails?.image?.split("\\")[3]
        //       }` ||
        //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EMPbKxWDxjLwlcB9ctrJv8JNvlguwjrXXn-KbUc4yg&s"
        //     }
        //     alt=""
        //     className="w-[100%] h-[100%] object-cover  bg-center hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-500"
        //   />
        // </div>
        //   </div>
        //   <div className="flex flex-1 w-[70%] h-fit p-5 gap-4 flex-wrap justify-start  overflow-x-auto max-sm:w-[100%] md:flex-col lg:flex-row">
        //     <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        //       <h3 className="font-bold text-gray-700">Enrolee Name</h3>
        //       <p className="text-gray-500 font-semibold">
        //         {userDetails?.name} {userDetails?.fullName}
        //       </p>
        //     </div>
        //     <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        //       <h3 className="font-bold text-gray-700">Gender</h3>
        //       <p className="text-gray-500 font-semibold">
        //         {userDetails?.gender}
        //       </p>
        //     </div>
        //     <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        //       <h3 className="font-bold text-gray-700">Plan Info</h3>
        //       <p className="text-gray-500 font-semibold">
        //         {bands?.map((band) => {
        //           if (band?.idProduct === userDetails?.iD_Product) {
        //             return band?.name;
        //           }
        //         })}
        //       </p>
        //     </div>
        //     <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        //       <h3 className="font-bold text-gray-700">HMO ID</h3>
        //       <p className="text-gray-500 font-semibold">
        //         {userDetails?.employeeNo}
        //       </p>
        //     </div>

        //     <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        //       <h3 className="font-bold text-gray-700">Company</h3>
        //       <p className="text-gray-500 font-semibold">
        //         {userDetails?.idCompany}
        //       </p>
        //     </div>
        //     <div className="flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col">
        // <h3 className="font-bold text-gray-700">Phone</h3>
        // <p className="text-gray-500 font-semibold">
        //   {userDetails?.phoneNo}
        // </p>
        //     </div>
        //   </div>
        // </div>
      )}

      <div className=" h-[400px] w-[100%]  max-sm:m-0  max-sm:w-[95%] min-h-[300px]">
        <h1 className="font-bold mb-1 text-[16px]">
          Record of hospitals visited
        </h1>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#fff",

            "& .super-app-theme--header": {
              backgroundColor: "rgba(29, 55, 136, 0.2)",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "600 !important",
            },
          }}
        >
          <DataGrid
            rows={authCodes}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[100, 200, 300]}
            pagination
            rowSelection={false}
            getRowId={(row) =>
              row?.candidateId ||
              `${Math.random()}` + Date.now() + `${Math.random()}` + Date.now()
            }
          />
        </Box>
      </div>

      {page === "Profile" && (
        <div className="w-[100%] h-[80px] bg-white  flex items-end ">
          <h3 className="w-[100%] h-[60px] bg-white align-bottom font-bold text-[#424242] flex items-center justify-center ">
            To share your feedback about any hospital you've visited, please
            click
            <Link
              className="ml-[4px] underline hover:text-blue-900"
              to={"/hospitals"}
            >
              {" "}
              Here
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
