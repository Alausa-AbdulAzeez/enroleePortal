import { BsHospitalFill, BsPersonFill, BsStars } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'

export const sidebarData = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <MdDashboard className='text-slate-400' />,
  },
  {
    title: 'My Profile',
    link: '/profile',
    icon: <BsPersonFill className='text-slate-400' />,
  },
  {
    title: 'My Benefits',
    link: '/benefits',
    icon: <BsStars className='text-slate-400' />,
  },
  {
    title: 'My Hospitals',
    link: '/hospitals',
    icon: <BsHospitalFill className='text-slate-400' />,
  },
]
