import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  //   USER DATA
  const userData = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {}, [userData])

  return userData ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
