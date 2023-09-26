import Logo from '../assets/images/LWlogo.png'
import { BsLock, BsLockFill, BsPerson, BsPersonFill } from 'react-icons/bs'

const Login = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
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
        <form className='w-[100%] h-auto  top-[50%] absolute'>
          <div className='w-[80%] h-[45px] border rounded-full mx-auto flex px-5 items-center'>
            <BsPersonFill className='mr-2 w-6 h-6' />
            <input
              type='email'
              placeholder='johndoe@gmail.com'
              className='border-none w-[100%] outline-none text-lwPurple pl-2 font-semibold'
            />
          </div>
          <div className='w-[80%] h-[45px] border rounded-full mx-auto flex px-5 items-center mt-3'>
            <BsLockFill className='mr-2 w-5 h-5' />
            <input
              type='email'
              placeholder='*********'
              className='border-none w-[100%] outline-none text-lwPurple pl-2 font-semibold'
            />
          </div>
          <button
            disabled
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
