import React, { useRef, useState } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/LWlogo.png'
import { Autocomplete, TextField } from '@mui/material'
import { relationship } from '../assets/data/Relationship.'
import Step1 from '../components/steps/Step1'
import Step4 from '../components/steps/Step4'
import { AnimatePresence, motion } from 'framer-motion'

import Step2 from '../components/steps/Step2'
import Step3 from '../components/steps/Step3'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { publicRequest } from '../functions/requestMethods'

const RegisterEnrolee = () => {
  // STEP
  const [step, setStep] = useState('enroleesDetails')

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null)

  // BUTTON STATE
  const [btnDisabled, setBtnDisabled] = useState(true)

  // TOAST ID
  const toastId = useRef(null)

  // ENROLEE FOUND STATE
  const [foundEnrole, setFoundEnrolee] = useState(false)

  // STAFF ID STATE
  const [staffId, setStaffId] = useState(null)

  // COMPANY ID STATE
  const [companyId, setCompanyId] = useState(null)

  // function for handling date chande
  const handleDateChange = (selectedDate, actionType) => {
    setStartDate(selectedDate)
  }
  // end of function for handling date chande

  //   FUNCTION TO HANDLE ADVANCEMENT TO THE NEXT STEP
  const handleNext = (step) => {
    setStep(step)
  }

  //   END OF FUNCTION TO HANDLE ADVANCEMENT TO THE NEXT STEP

  //   FUNCTION TO HANDLE GOING BACK TO THE PREVIOUS STEP

  const handlePrev = (step) => {
    setStep(step)
  }

  //   END OF FUNCTION TO HANDLE GOING BACK TO THE PREVIOUS STEP

  // FUNCTION TO HANDLE ENROLEE STAFFID AND COMPANYID CHANGE
  const handleCompanyIdAndEnroleeIdChange = (e, type) => {
    if (type === 'companyId') {
      setCompanyId(e.target.value?.trim())
    }
    if (type === 'staffId') {
      setStaffId(e.target.value?.trim())
    }
  }
  // END OF FUNCTION TO HANDLE ENROLEE STAFFID AND COMPANYID CHANGE

  const handleConfirmEnroleeDetails = async (e) => {
    e.preventDefault()

    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })
    setBtnDisabled(true)
    try {
      await publicRequest
        .get(`/Login/StaffID?staffid=${staffId}&companyid=${companyId}`)
        .then((res) => {
          if (res?.data.length > 0) {
            toast.update(toastId.current, {
              render: 'Details fetched successfully',
              type: 'success',
              autoClose: 2000,
              isLoading: false,
            })
            setBtnDisabled(false)
          } else
            toast.update(toastId.current, {
              render: 'Could not find user. Please input the correct details',
              type: 'error',
              autoClose: 2000,
              isLoading: false,
            })
        })
    } catch (error) {
      console.log(error)
      setBtnDisabled(false)
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

  //   FUNCTION TO HANDLE RENDERING OF A DIFFERENT UI BASED ON THE CURRENT STEP
  const renderStepContent = () => {
    switch (step) {
      case 'enroleesDetails':
        return (
          <Step1
            handleNext={handleNext}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        )

      case 'spouse':
        return (
          <Step2
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        )
      case 'dependant':
        return (
          <Step3
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleDateChange={handleDateChange}
            startDate={startDate}
          />
        )
      // Additional cases for recovery options, confirmation, and verification steps

      default:
        return null
    }
  }
  //   END OF FUNCTION TO HANDLE RENDERING OF A DIFFERENT UI BASED ON THE CURRENT STEP

  // USEEFFECT TO CHECK WHEN TO MODIFY THE SUBMIT BUTTON BASED ON THE AVAILABILITY OF THE COMPANY AND STAFF ID
  useEffect(() => {
    const checkStaffAndCompanyId = () => {
      if (staffId && companyId) {
        setBtnDisabled(false)
      } else {
        setBtnDisabled(true)
      }
    }

    checkStaffAndCompanyId()
    console.log(staffId, companyId)
  }, [companyId, staffId])

  // END OF USEEFFECT TO CHECK WHEN TO MODIFY THE SUBMIT BUTTON BASED ON THE AVAILABILITY OF THE COMPANY AND STAFF ID

  return (
    <div className='bg-slate-100 h-[100vh] overflow-y-auto'>
      <ToastContainer />
      <div className='h-[55px] bg-white w-[100%] px-12 max-md:px-2 flex items-center justify-between sticky top-0 z-10'>
        <div className=' h-[55px] flex items-center justify-center '>
          <h3 className='font-bold text-lg text-lwOrange mr-2'>LifeWORTH</h3>
          <img src={Logo} alt='logo' className=' w-[30px] h-[30px] ' />
        </div>
        <h3 className='font-medium text-lwPurple text-[18px]'>
          Enrolee Registration
        </h3>
      </div>
      <div className='bg-white text-gray-700 mx-32 max-md:mx-2 mt-5 rounded-md p-5 mb-[15px]'>
        <div className=''>Dear enrolee,</div>
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
            onChange={(e) => handleCompanyIdAndEnroleeIdChange(e, 'companyId')}
            // key={inputState}
          />
          <button
            disabled={btnDisabled}
            type='submit'
            onClick={handleConfirmEnroleeDetails}
            className='hover:bg-lwPurple ml-[60px]  bg-lwLightPurple text-white py-2 px-4 rounded-md h-[40px] self-end w-[120px] disabled:cursor-not-allowed disabled:bg-lwPurpleDisabled'
          >
            Submit
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: '0' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {foundEnrole && renderStepContent()}
      </motion.div>
    </div>
  )
}

export default RegisterEnrolee
