import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { Autocomplete, TextField } from '@mui/material'
import {
  bloodGroup,
  gender,
  genotype,
  martialStatus,
  relationship,
} from '../../assets/data/Relationship.'

const Step0 = ({
  startDate,
  handleNext,
  fetchedEnrolee,
  setEnroleesDetails,
  enroleesDetails,
  setStartDate,
  setSelectedFile,
  selectedFile,
  handleUpdateEnroleeDetails,
  btnDisabled,
  setBtnDisabled,
  handleConfirmEnroleeDetails,
  handleCompanyIdAndEnroleeIdChange,
}) => {
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate)
    setEnroleesDetails((prev) => {
      return { ...prev, dateOfBrith: selectedDate?.toISOString() }
    })
  }
  // end of function for handling date chande

  //   FUNCTION FOR HANDLING FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setEnroleesDetails((prev) => {
      return { ...prev, imageFileName: file?.name }
    })
  }
  //   END OF FUNCTION FOR HANDLING FILE CHANGE

  //   FUNCTION TO HANDLE INPUT CHANGE
  const handleEnroleeInfo = (e, dataName, data) => {
    if (dataName === 'genotype') {
      setEnroleesDetails((prev) => {
        return {
          ...prev,
          genotype: data?.code,
        }
      })
    } else if (dataName === 'bloodGroup') {
      setEnroleesDetails((prev) => {
        return {
          ...prev,
          bloodGroup: data?.code,
        }
      })
    } else if (dataName === 'sex') {
      setEnroleesDetails((prev) => {
        return { ...prev, sex: data?.sexCode }
      })
    } else if (dataName === 'martialStatus') {
      setEnroleesDetails((prev) => {
        return { ...prev, martialStatus: data?.code }
      })
    } else {
      setEnroleesDetails((prev) => {
        return { ...prev, [dataName]: e.target.value }
      })
    }
  }
  //   END OF FUNCTION TO HANDLE INPUT CHANGE

  return (
    <AnimatePresence>
      <div className=' w-full h-[calc(100vh-60px)] flex items-center justify-center'>
        <div className='bg-white w-[600px] shadow-xl text-gray-700 mx-32 max-md:mx-2 mt-5 rounded-md p-5 mb-[15px]'>
          <div className='border-b border-[#f2f2f2] pb-2 font-bold'>
            Enrolee confirmation
          </div>
          <div className='pt-2 pb-3'>Dear enrolee,</div>
          <div className='mb-[20px]'>
            Welcome to Lifeworth's online registration portal. To complete your
            registration, kindly input your staff ID, and your company ID.
          </div>
          <div className='flex gap-[20px] mt-[10px] max-md:flex-col'>
            <TextField
              id='staffId'
              label='Staff ID'
              type='text'
              autoComplete='staffId'
              size={'small'}
              onChange={(e) => handleCompanyIdAndEnroleeIdChange(e, 'staffId')}
              // key={inputState}
            />
            <TextField
              id='companyId'
              label='Company ID'
              type='text'
              autoComplete='companyId'
              size={'small'}
              onChange={(e) =>
                handleCompanyIdAndEnroleeIdChange(e, 'companyId')
              }
              // key={inputState}
            />
          </div>
          <div className='border-t border-[#f2f2f2] pt-2 mt-4 font-bold flex justify-end'>
            <button
              disabled={btnDisabled}
              type='submit'
              onClick={handleConfirmEnroleeDetails}
              className='hover:bg-lwPurple mt-2  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px] disabled:cursor-not-allowed disabled:bg-lwPurpleDisabled'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Step0
