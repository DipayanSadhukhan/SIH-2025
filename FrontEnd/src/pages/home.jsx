import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-[#f0f4f3]'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-[#f0f4f3]'>
      <h1 className='home text-2xl font-bold mb-4'>Hello {user.username}!</h1>
      <div className='bg-white p-6 rounded-lg shadow-md text-center'>
        <h2 className='text-xl font-semibold mb-2'>User Details</h2>
        <p className='mb-2'><strong>Username:</strong> {user.username}</p>
        <p className='mb-4'><strong>Email:</strong> {user.email}</p>
      </div>
      <br /><br />
      <button 
        className='bg-[#458364] p-3 px-6 tracking-wider mt-3 text-white rounded-xl akshar text-lg cursor-pointer hover:scale-105 focus:bg-[#396e53] transition-transform'
        onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Home;