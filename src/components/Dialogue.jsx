import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useNavigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
  const { open, handleClose, message, title, link, action } = props
  // const isLoggedIn = localStorage.getItem('isLoggedIn')
  const navigate = useNavigate()
  //   const [open, setOpen] = React.useState(false)

  //   const handleClickOpen = () => {
  //     setOpen(true)
  //   }

  //   const handleClose = () => {
  //     setOpen(false)
  //   }

  // HANDLE CANCEL CLICK
  const handleCancelClick = () => {
    sessionStorage.clear()
    navigate('/login')
  }
  // END OF HANDLE CANCEL CLICK

  // useEffect(() => {}, [isLoggedIn]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Confirm {title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
