
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login  from './pages/Login'
import  Home  from './pages/Home'
import  SignUp  from './pages/SignUp'
import { useState } from 'react'
import RefreashHandle from './RefreashHandle'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
 
  return (
  <>
      <RefreashHandle setIsAuthenticated={setIsAuthenticated}/>

  <Routes>
  <Route path="/" element={<Navigate to="/login" />} />

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />

</Routes>;

  </>
  )
}

export default App


