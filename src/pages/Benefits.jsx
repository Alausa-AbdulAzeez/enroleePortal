import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { DataGrid } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { publicRequest } from '../functions/requestMethods'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const Benefits = () => {
  // PAGE SIZE
  const [pageSize, setPageSize] = useState(100)

  // TOAST ID
  const toastId = useRef(null)

  // API BENEFITS LIST
  const [benefitsList, setBenefitsList] = useState([])

  // API BENEFITS LIST
  const [filteredBenefitsList, setfilteredBenefitsList] = useState([])

  // PRODUCT ID
  const userDetails = JSON.parse(sessionStorage.getItem('user'))
  const productId = userDetails?.iD_Product
  console.log(productId)

  // FUNCTION TO GET BENEFITS
  const getBenefits = async () => {
    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })

    try {
      await publicRequest
        .get(`/Product/Benefit?ID_Product=${productId}`)
        .then((res) => {
          console.log(res?.data[0])
          const values = res?.data[0]?.benefits?.split(',')

          const benefitsArray = values.map((value) => ({
            benefit: value.trim(),
          }))

          console.log(benefitsArray)

          setBenefitsList(benefitsArray)
          setfilteredBenefitsList(benefitsArray)
          toast.update(toastId.current, {
            render: 'Fetched user benefits sucessfully!',
            type: 'success',
            autoClose: 2000,
            isLoading: false,
          })
        })
    } catch (error) {
      console.log(error)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
    }
  }
  // END OF FUNCTION TO GET BENEFITS

  // FUNCTION TO FILTER BENEFITS
  const handleFilterBenefits = (e) => {
    const filteredBenefits = benefitsList?.filter((benefit) =>
      benefit?.benefit
        ?.toLowerCase()
        ?.includes(e.target.value?.toLowerCase()?.trim())
    )

    console.log(filteredBenefits)

    setfilteredBenefitsList(filteredBenefits)
  }
  // END OF FUNCTION TO FILTER BENEFITS

  //   COLUMN DATA
  const columns = [
    {
      field: 'benefit',
      headerName: 'Benefit Name ',
      width: '1000',
      // headerClassName: 'super-app-theme--header',
    },
  ]

  //USE EFFECT TO CALL FUNCTION THAT FETCHES BENEFITS LIST AS PAGE LOADS
  useEffect(() => {
    getBenefits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-screen flex '>
      <ToastContainer />
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
              onChange={handleFilterBenefits}
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
                rows={filteredBenefitsList}
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
  )
}

export default Benefits
