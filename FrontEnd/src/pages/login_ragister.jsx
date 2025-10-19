import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'
import { MoveRight } from 'lucide-react';
import { successToast, errorToast } from '../components/toast';
import {useAuth} from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL ='http://localhost:3000';


const Login_Ragister = (p) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

  const [isLoginForm, setIsLoginForm] = useState(location.pathname === '/login');

  useEffect(() => {
    setIsLoginForm(location.pathname === '/login');
  }, [location.pathname]);

  const toggleFormAndNavigate = () => {
    if (isLoginForm) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const [ragistarInfo, setRagistarInfo] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleRagistarChange = (e) => {
    setRagistarInfo({ ...ragistarInfo, [e.target.name]: e.target.value });
  }
  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = () => async (e) => {
    e.preventDefault();
    if (isLoginForm) {
      try {
        const url = `${API_BASE_URL}/api/auth/login`;
        const response = await axios.post(url, loginInfo);
        if (response.status === 200) {
          successToast('Login successful !');
          login(response.data.token, response.data.user);
          navigate('/home');
        }
        else {
          errorToast(error.response?.data?.message);
        }
      } catch (error) {
        errorToast(error.response?.data?.message);
      }
    }
    else {
      if (ragistarInfo.password !== ragistarInfo.password2) {
        errorToast("Passwords do not match !");
        return;
      }
      try {
        const url = `${API_BASE_URL}/api/auth/ragister`;
        const response = await axios.post(url, ragistarInfo);
        if (response.status === 201) {
          successToast('Registration successful !');
          navigate('/login', { loginInfo });
        }
        else {
          errorToast(error.response?.data?.message);
        }
      } catch (error) {
        errorToast(error.response?.data?.message);
      }
    }
  }

  return (
    <div className='w-screen min-h-screen overflow-hidden bg-white flex content-center items-center'>
      <div className='bg-black w-[99%] min-h-[98vh] mx-auto flex items-center rounded-lg'>
        <div className='bg-[#DAD9D1] w-[99%] min-h-[96vh] py-3 m-auto rounded-lg flex flex-col gap-3 justify-center items-center'>
          <Header />

          <div className='bg-[url(login-bg-pc.jpg)] bg-no-repeat bg-center bg-cover w-[99%] rounded-lg grow'>
            <div onClick={() => {
              setIsLoginForm(prev => !prev);
              toggleFormAndNavigate();
            }
            } className='bg-[#dddddd] mt-10 ml-auto mr-[1%] flex items-center justify-center cursor-pointer gap-2 rounded-xl p-3 w-fit'>
              <span className='jersey-20-regular text-2xl'>{isLoginForm ? 'NEW USER' : 'ALREADY HAVE AN ACCOUNT'} </span>
              <div className='p-2 rounded-full bg-[#ffe051]'>
                <MoveRight />
              </div>
            </div>

            <div className='w-full'>
              <div className='mx-auto madimi-one-regular tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-sm sm:w-md md:w-xl lg:w-3xl fade-left'>WORLDS’ FIRST</div>
              <div className='mx-auto madimi-one-regular tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-sm sm:w-md md:w-xl lg:w-3xl fade-right text-end text-[#948F8F]'>CARRER TRACKER !</div>
            </div>

            <div className='w-sm sm:w-md md:w-lg lg:w-xl min-h-96 py-5 bg-white/50 mx-auto fade-in rounded-xl shadow-2xl mt-6 mb-10 flex gap-3 flex-col items-center '>
              <h1 className='madimi-one-regular text-3xl m-5  relative after:absolute after:left-0 after:bottom-[4px] after:h-[2px] after:w-full after:bg-[#ff4949] w-fit'>
                <span className='text-[#ff4949]'>{isLoginForm ? 'LOGIN' : 'SIGN UP'} </span>
                <span>SYSTEM</span>
              </h1>

              <form className='flex flex-col w-full items-center justify-center' onSubmit={handleFormSubmit()} >
                <div className='space-y-3 flex flex-col w-full items-center justify-center'>
                  {
                    !isLoginForm &&
                    <input className='p-3 bg-[#999393] w-[75%] rounded-xl placeholder:text-white/70 placeholder:text-2xl text-white shadow-sm shadow-black/60'
                      type="text"
                      name='username'
                      placeholder='Enter Username'
                      required
                      onChange={handleRagistarChange}
                      value={ragistarInfo.username}
                    />
                  }
                  <input className='p-3 bg-[#999393] w-[75%] rounded-xl placeholder:text-white/70 placeholder:text-2xl text-white shadow-sm shadow-black/60'
                    type="text"
                    name='email'
                    placeholder='Enter Email'
                    required
                    onChange={isLoginForm ? handleLoginChange : handleRagistarChange}
                    value={isLoginForm ? loginInfo.email : ragistarInfo.email}
                  />
                  <input className='p-3 bg-[#999393] w-[75%] rounded-xl placeholder:text-white/70 placeholder:text-2xl text-white shadow-sm shadow-black/60'
                    type="password"
                    name='password'
                    placeholder='Enter Password'
                    minLength={4}
                    required
                    onChange={isLoginForm ? handleLoginChange : handleRagistarChange}
                    value={isLoginForm ? loginInfo.password : ragistarInfo.password}
                  />
                  {
                    !isLoginForm &&
                    <input className='p-3 bg-[#999393] w-[75%] rounded-xl placeholder:text-white/70 placeholder:text-2xl text-white shadow-sm shadow-black/60'
                      type="password"
                      name='password2'
                      placeholder='Confirm Your Password'
                      required
                      minLength={4}
                      onChange={handleRagistarChange}
                      value={ragistarInfo.password2}
                    />
                  }
                </div>
                {isLoginForm &&
                  <a href="#" className='hover:underline w-[72%]'>Forget Password?</a>
                }

                <button className='bg-[#458364] p-3 px-6 tracking-wider mt-3 text-white rounded-xl akshar text-lg cursor-pointer hover:scale-103 focus:bg-[#396e53]' type='submit'>
                  {isLoginForm ? 'LOGIN' : 'SIGN UP'}
                </button>
              </form>
              <button className='bg-[#458364] p-3 px-6 tracking-wider text-white rounded-xl akshar text-lg cursor-pointer hover:scale-103 focus:bg-[#396e53]'>{isLoginForm ? 'Login' : 'Sign up'} as ADMIN</button>
              <div className='w-[75%] flex gap-2 items-center justify-center'>
                <hr className='grow' />
                <span>or</span>
                <hr className='grow' />
              </div>
              <button
                aria-label="Sign in with Google"
                className="flex items-center bg-white hover:scale-102 cursor-pointer border border-button-border-light rounded-md p-0.5 pr-3"
              >
                <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <title>Sign in with Google</title>
                    <desc>Google G Logo</desc>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      className="fill-[#4285f4]"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      className="fill-[#34a853]"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      className="fill-[#fbbc05]"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      className="fill-[#ea4335]"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm text-google-text-gray tracking-wider">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login_Ragister
