import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Benefits = () => {
  // PAGE SIZE
  const [pageSize, setPageSize] = useState(200);

  //   COLUMN DATA
  const defaultColumns = [
    { field: "name", headerName: "Name", width: 600 },
    {
      field: "address",
      headerName: "Address",
      width: 500,
      editable: false,
    },

    {
      field: "state",
      headerName: "State",
      width: 150,
    },
  ];

  const tableData = [
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },

    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },

    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },

    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },

    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
    { name: "a HOSPITAL", address: "Lagos", state: "Lagos" },
  ];

  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 h-[100%] bg-slate-100 overflow-y-auto">
        <Topbar title={"My Benefits"} />
        <div className="flex justify-center items-center overflow-y-auto ">
          <div className="m-12 h-[400px] w-[90%]  max-sm:m-3 bg-white">
            <Box sx={{ width: "100%", height: "100%" }}>
              <DataGrid
                rows={tableData}
                columns={defaultColumns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[200, 300, 400]}
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
        {/* <div className="m-12 bg-white max-h-[400px] overflow-y-auto max-sm:w-[90%]">
          <DataGrid
            rows={tableData}
            columns={defaultColumns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[200, 300, 400]}
            pagination
            rowSelection={false}
            getRowId={(row) =>
              row?.candidateId ||
              `${Math.random()}` + Date.now() + `${Math.random()}` + Date.now()
            }
          />
        </div> */}
      </div>
    </div>
  );
};

export default Benefits;
