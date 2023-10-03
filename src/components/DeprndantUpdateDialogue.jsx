import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { feedbackRatings } from '../assets/data/Relationship.'

export default function FormDialog({ open, handleClose }) {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem('user'))

  // DATE SELECTION AND CHANGE
  const [startDate, setStartDate] = useState(null)

  //   STATE OF MUI INPUTS
  const [inputState, setInputState] = useState(false)

  //   TOAST ID
  const toastId = React.useRef(null)

  //   DEPENDANT'S INFO
  const [dependantInfo, setDependantInfo] = useState({
    idEmployee: userDetails?.id,
    surname: '',
    name: '',
    birthDate: '',
    relationType: '',
    employeeNo: userDetails?.employeeNo,
    imageFileName: '',
    sex: '',
    address: '',
  })

  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate)
    setDependantInfo((prev) => {
      return { ...prev, birthDate: selectedDate?.toISOString() }
    })
  }
  // end of function for handling date chande

  //   FUNCTION TO HANDLE INPUT CHANGE
  const handledependantInfo = (e, dataName, data) => {
    if (dataName === 'relationType') {
      setDependantInfo((prev) => {
        return {
          ...prev,
          relationType: data?.description,
        }
      })
    } else if (dataName === 'sex') {
      setDependantInfo((prev) => {
        return { ...prev, sex: data?.sexDescription }
      })
    } else {
      setDependantInfo((prev) => {
        return { ...prev, [dataName]: e.target.value }
      })
    }
  }
  //   END OF FUNCTION TO HANDLE INPUT CHANGE

  return <div className=''></div>
}
