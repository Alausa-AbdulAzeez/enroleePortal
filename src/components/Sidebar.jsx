import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'
import Logo from '../assets/images/LWlogo.png'

import { sidebarData } from '../assets/data/sidebarData'
import { IoLogOut } from 'react-icons/io5'
import AlertDialogSlide from './Dialogue'

const Sidebar = () => {
  // LOGOUT DIALOGUE
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  // LOGOUT MODAL
  const [open, setOpen] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }
  // END OF FUNCTIONALITY TO TOGGLE SIDEBAR

  // FUNCTION TO SHOW LOGOUT MODAL
  const handleClickOpen = () => {
    setOpen(true)
  }

  // END OF FUNCTION TO SHOW LOGOUT MODAL

  // FUNCTION TO CLOSE LOGOUT MODAL
  const handleClose = () => {
    setOpen(false)
  }
  // END OF FUNCTION TO CLOSE LOGOUT MODAL

  return (
    <div
      className={`h-[100%]  ${
        sidebarOpen
          ? 'max-sm:w-[45%] max-md:w-[30%] max-lg:w-[25%] w-[20%] max-w-[400px]'
          : 'w-0'
      } transition-all duration-500 bg-lwPurple relative`}
    >
      <AlertDialogSlide
        open={open}
        handleClose={handleClose}
        message=' Are you sure you want to logout?'
        link='/login'
        title='Logout'
      />
      <div
        className={`absolute top-[50%] flex justify-center items-center w-10 h-[60px] rounded-full cursor-pointer bg-gray-400 z-10 ${
          sidebarOpen
            ? 'right-[-20px]'
            : 'right-[-30px] transition-all ease-in-out duration-1000'
        }`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? (
          <BiChevronLeft className='text-3xl' />
        ) : (
          <BiChevronRight className='text-3xl' />
        )}
      </div>
      <div className='w-[100%] h-full flex flex-col overflow-x-hidden'>
        <div className=' h-[55px] flex items-center justify-center '>
          <h3 className='font-bold text-lg text-lwOrange mr-2'>LifeWORTH</h3>
          <img src={Logo} alt='logo' className=' w-[30px] h-[30px] ' />
        </div>
        <ul
          className={`list-none ${
            sidebarOpen ? '' : 'transition-all ease-in-out  opacity-0'
          }`}
        >
          {sidebarData?.map((listItem, index) => {
            return (
              <NavLink
                to={listItem.link}
                style={{ textDecoration: 'none' }}
                key={index}
              >
                {({ isActive }) => (
                  <li
                    className={` flex h-[50px] items-center pl-3 hover:bg-lwLightPurple hover:border-l-2 border-slate-400 ${
                      isActive
                        ? 'bg-lwLightPurple border-l-2 border-slate-400'
                        : 'sidebarListItem'
                    }`}
                  >
                    {listItem.icon}
                    <span className='ml-3 font-semibold text-slate-400 '>
                      {listItem.title}
                    </span>
                  </li>
                )}
              </NavLink>
            )
            // return (
            //   <ul className="ulTitle" key={index}>

            //     {singleItem?.listItems?.map((listItem, index) => {

            //     })}
            //   </ul>
            // );
          })}
          <li
            className={` flex h-[50px] items-center pl-3 hover:bg-lwLightPurple hover:border-l-2 border-slate-400 sidebarListItem cursor-pointer`}
            onClick={handleClickOpen}
          >
            <IoLogOut className='text-slate-400  rotate-180' />
            <span className='ml-3 font-semibold text-slate-400 '>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
