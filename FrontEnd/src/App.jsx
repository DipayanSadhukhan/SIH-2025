import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login_Ragister from './pages/login_ragister'
import Home from './pages/home'
import './App.css'
import { PrivateRoutes } from '../utils/ProtectedRoutes.jsx';

const App = () => {
  return (
    <div className='App'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login_Ragister p={true} />} />
        <Route path='/register' element={<Login_Ragister p={false} />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
