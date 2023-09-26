import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Benefits from './pages/Benefits'
import Hospitals from './pages/Hospitals'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/benefits' element={<Benefits />} />
          <Route path='/hospitals' element={<Hospitals />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
