import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { DataGrid } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material'

const Benefits = () => {
  // PAGE SIZE
  const [pageSize, setPageSize] = useState(100)

  //   COLUMN DATA
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 600,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 500,
      editable: false,
      headerClassName: 'super-app-theme--header',
    },

    {
      field: 'state',
      headerName: 'State',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
  ]

  const tableData = [
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },

    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },

    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },

    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },

    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
    { name: 'a HOSPITAL', address: 'Lagos', state: 'Lagos' },
  ]

  return (
    <div className='w-full h-screen flex '>
      <Sidebar />
      <div className='flex-1 h-[100%] bg-slate-100 overflow-y-auto'>
        <Topbar title={'My Benefits'} />
        <div className='mx-12 my-6 max-sm:mx-0 flex justify-center items-center overflow-y-auto flex-col'>
          <div className='my-4 w-auto'>
            <TextField
              id='outlined-search'
              label='Search'
              type='search'
              className='my-4'
              size='small'
            />
          </div>
          <div className=' h-[400px] w-[90%]  max-sm:m-3 bg-white max-sm:w-[95%]'>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                '& .super-app-theme--header': {
                  backgroundColor: 'rgba(29, 55, 136, 0.2)',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: '600 !important',
                },
              }}
            >
              <DataGrid
                rows={tableData}
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
  )
}

export default Benefits
