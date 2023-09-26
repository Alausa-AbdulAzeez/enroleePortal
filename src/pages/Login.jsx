import { useEffect, useRef, useState } from 'react'
import Logo from '../assets/images/LWlogo.png'
import { BsLock, BsLockFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'
import { publicRequest } from '../functions/requestMethods'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  // MISCELLANEOUS
  const navigate = useNavigate()

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    employeeNo: '',
    phoneNo: '',
  })

  // LOGGED IN USER DATA
  let userData

  // BUTTON STATE
  const [btnDisabled, setBtnDisabled] = useState(true)

  // TOAST ID
  const toastId = useRef(null)

  // FUNCTION TO HNDLE LOGIN INPUT CHANGE
  const handleSetUser = (event, inputType) => {
    console.log(event.target.value)
    setUser({ ...user, [inputType]: event.target.value })
  }
  // END OF FUNCTION TO HNDLE LOGIN INPUT CHANGE

  // FUNCTION TO HANDLE BUTTON STATE CHANGE
  const setBtnState = () => {
    if (user.employeeNo && user.phoneNo) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }
  // END OF FUNCTION TO HANDLE BUTTON STATE CHANGE

  // FUNCTION TO HANDLE USER LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()

    toastId.current = toast('Please wait...', {
      autoClose: false,
      isLoading: true,
    })
    setBtnDisabled(true)
    try {
      await publicRequest.post('/Login', user).then((res) => {
        userData = res?.data
        sessionStorage.setItem('user', userData)
        toast.update(toastId.current, {
          render: 'Login succesful! Please wait while we redirect you.',
          type: 'success',
          autoClose: 2000,
          isLoading: false,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
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
  // END OF FUNCTION TO HANDLE USER LOGIN

  //

  // USEEFFECT TO HANDLE BUTTON STATE AS INPUT CHANGES
  useEffect(() => {
    setBtnState()
    console.log('aa')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  // END OF USEEFFECT TO HANDLE BUTTON STATE AS INPUT CHANGES

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <ToastContainer />
      <div className='h-[85%] w-[350px] max-w-[400px] max-sm:w-[90%] shadow-lg rounded-md relative overflow-hidden'>
        <div className='bg-lwPurple w-[100%] h-[100%] rounded-full absolute left-0 right-0 top-[-70%]'>
          <img
            src={Logo}
            alt='logo'
            className='absolute w-[75px] h-[75px] bottom-[6%] left-[50%] translate-x-[-50%] '
          />
        </div>
        <h3 className='absolute top-[40%] text-center w-[100%] font-nunito text-2xl font-bold text-lwPurple'>
          Sign in Now
        </h3>
        <form
          className='w-[100%] h-auto  top-[50%] absolute'
          onSubmit={handleLogin}
        >
          <div className='w-[80%] h-[45px] border rounded-full mx-auto flex px-5 items-center'>
            <BsPersonFill className='mr-2 w-6 h-6' />
            <input
              type='text'
              placeholder='LWH/LWH/***/***'
              onChange={(e) => handleSetUser(e, 'employeeNo')}
              className='border-none w-[100%] outline-none text-lwPurple pl-2 font-semibold'
              required
            />
          </div>
          <div className='w-[80%] h-[45px] border rounded-full mx-auto flex px-5 items-center mt-3'>
            <BsLockFill className='mr-2 w-5 h-5' />
            <input
              type='text'
              placeholder='Phone Number'
              onChange={(e) => handleSetUser(e, 'phoneNo')}
              className='border-none w-[100%] outline-none text-lwPurple pl-2 font-semibold'
              required
            />
          </div>
          <button
            disabled={btnDisabled}
            className={`disabled:bg-lwPurpleDisabled disabled:cursor-not-allowed w-[80%] h-[45px] border rounded-full mx-auto flex px-5 items-center mt-14 justify-center bg-lwPurple font-bold text-white `}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
