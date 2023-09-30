import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { publicRequest } from "../functions/requestMethods";

const Hospitals = () => {
  // BAND TYPE
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const bandType = userDetails?.bandType;

  // PAGE SIZE
  const [pageSize, setPageSize] = useState(100);

  // TOAST ID
  const toastId = useRef(null);

  // API HOSPITALS LIST
  const [hospitalsList, setHospitalsList] = useState([]);

  // API HOSPITALS LIST
  const [filteredHospitalsList, setfilteredHospitalsList] = useState([]);

  // FUNCTION TO GET HOSPITALS
  const getHospitals = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });

    try {
      await publicRequest.get(`/Provider?BandType=${bandType}`).then((res) => {
        setHospitalsList(res?.data);
        setfilteredHospitalsList(res?.data);
        toast.update(toastId.current, {
          render: "Providers Fetched Sucessfully!",
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
  // END OF FUNCTION TO GET BENEFITS

  // FUNCTION TO FILTER HOSPITALS
  const handleFilterHospitals = (e) => {
    const filteredHospitals = hospitalsList?.filter((hospital) =>
      hospital?.providerName
        ?.toLowerCase()
        ?.includes(e.target.value?.toLowerCase()?.trim())
    );

    setfilteredHospitalsList(filteredHospitals);
  };
  // END OF FUNCTION TO FILTER HOSPITALS

  // TABLE COLUMNS
  const columns = [
    {
      field: "providerName",
      headerName: "Provider Name ",
      width: 600,
      headerClassName: "super-app-theme--header",
    },
  ];

  // USE EFFECT TO CALL FUNCTION THAT FETCHES HOSPITALS LIST AS PAGE LOADS
  useEffect(() => {
    getHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100 overflow-y-auto">
        <Topbar title={"My Hospitals"} />
        <div className="mx-12 my-6 max-sm:mx-0 flex justify-center items-center overflow-y-auto flex-col">
          <div className="my-4 w-auto">
            <TextField
              id="outlined-search"
              label="Search"
              type="search"
              className="my-4"
              size="small"
              onChange={handleFilterHospitals}
            />
          </div>
          <div className=" h-[400px] w-[90%]  max-sm:m-3 bg-white max-sm:w-[95%]">
            <Box
              sx={{
                width: "100%",
                height: "100%",

                "& .super-app-theme--header": {
                  backgroundColor: "rgba(29, 55, 136, 0.2)",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "600 !important",
                },
              }}
            >
              <DataGrid
                rows={filteredHospitalsList}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[100, 200, 300]}
                pagination
                rowSelection={false}
                getRowId={(row) =>
                  row?.candidateId ||
                  `${Math.random()}` +
                    Date.now() +
                    `${Math.random()}` +
                    Date.now()
                }
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
