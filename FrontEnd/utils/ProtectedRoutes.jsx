import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  const isAuthenticated = !!(token && user);
return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}