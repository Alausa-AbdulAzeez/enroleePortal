import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserDetails = ({ page }) => {
  // LOGGED IN USER DETAILS
  const userDetails = JSON.parse(sessionStorage.getItem('user'))
  console.log(userDetails)

  // BAND TYPES
  const [bands, setBands] = useState([])

  // USEEFFECT TO SAVE BAND TYPE
  useEffect(() => {
    const cachedData = sessionStorage.getItem('bands')
    if (cachedData) {
      setBands(JSON.parse(cachedData))
    } else {
      const cancelToken = axios.CancelToken.source()
      axios
        .get(`https://lifeworthhmoenrolleeapp.com/api/Product/ListProducts`, {
          cancelToken: cancelToken.token,
        })
        .then((response) => {
          sessionStorage.setItem('bands', JSON.stringify(response?.data))
        })
        .catch((err) => {
          console.log(err)
        })

      // .catch((error) => console.error(error))
      return () => {
        cancelToken.cancel()
      }
    }
  }, [])

  return (
    <div className='m-12 max-sm:mx-2 h-[100%] max-h-[500px] bg-white flex rounded-tl-[100px] max-sm:flex-col overflow-y-auto relative'>
      <div className=' w-[200px] h-[200px] bg-slate-100 flex items-center justify-center   rounded-full '>
        <div className='w-[180px] h-[180px] bg-white rounded-full'>
          <img
            src={
              `https://lifeworthhmoenrolleeapp.com/image/${
                userDetails?.image?.split('\\')[3]
              }` ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EMPbKxWDxjLwlcB9ctrJv8JNvlguwjrXXn-KbUc4yg&s'
            }
            alt=''
            className='w-[100%] h-[100%] object-cover rounded-full bg-center hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-500'
          />
        </div>
      </div>
      <div className='flex flex-1 w-[70%] h-fit p-5 gap-4 flex-wrap justify-start  overflow-x-auto max-sm:w-[100%] md:flex-col lg:flex-row'>
        <div className=' max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
          <h3 className='font-bold text-gray-700'>Enrolee Name</h3>
          <p className='text-gray-500 font-semibold'>
            {userDetails?.name} {userDetails?.fullName}
          </p>
        </div>
        <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
          <h3 className='font-bold text-gray-700'>Gender</h3>
          <p className='text-gray-500 font-semibold'>{userDetails?.gender}</p>
        </div>
        <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
          <h3 className='font-bold text-gray-700'>Plan Info</h3>
          <p className='text-gray-500 font-semibold'>
            {bands?.map((band) => {
              if (band?.idProduct === userDetails?.iD_Product) {
                return band?.name
              }
            })}
          </p>
        </div>
        <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
          <h3 className='font-bold text-gray-700'>HMO ID</h3>
          <p className='text-gray-500 font-semibold'>
            {userDetails?.employeeNo}
          </p>
        </div>
        {page === 'Profile' && (
          <>
            {/* <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
              <h3 className='font-bold text-gray-700'>Date of Birth</h3>
              <p className='text-gray-500 font-semibold'>1900/01/13</p>
            </div> */}
            {/* <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
              <h3 className='font-bold text-gray-700'>Phone Number</h3>
              <p className='text-gray-500 font-semibold'>+234567890</p>
            </div> */}
            {/* <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
              <h3 className='font-bold text-gray-700'>Address</h3>
              <p className='text-gray-500 font-semibold'>
                175 Ikorodu-Ososun Rd, Palmgrove 102215, Lagos
              </p>
            </div> */}
            {/* <div className='flex-1 max-md:min-w-[250px] min-w-[200px]  bg-slate-100 rounded-xl p-3 flex flex-col'>
              <h3 className='font-bold text-gray-700'>Company Address</h3>
              <p className='text-gray-500 font-semibold'>
                175 Ikorodu-Ososun Rd, Palmgrove 102215, Lagos
              </p>
            </div> */}
          </>
        )}
      </div>
      <div className='w-[100%] h-[80px] bg-slate-100 absolute bottom-0 flex items-end'>
        <h3 className='w-[100%] h-[60px] bg-white align-bottom font-bold text-gray-700 flex items-center justify-center '>
          To share your feedback about any hospital you've visited, please click
          <Link
            className='ml-[4px] underline hover:text-blue-900'
            to={'/hospitals'}
          >
            {' '}
            Here
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default UserDetails
