import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://sih-2025-22r8.onrender.com";

const Home = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }

      if (token) {
        try {
          const url = `${API_BASE_URL}/api/auth/data`;
          const response = await axios.get(url, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.user) {
            setIsLoading(false);
            return;
          }else{
            navigate('/login');
          }
        } catch (error) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    };

    verifyUser();
  }, [user, token, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f0f4f3]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f0f4f3]">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f0f4f3]">
        <h1 className="home text-2xl font-bold mb-4">Hello {user.username}!</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p className="mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <br />
        <br />
        <button
          className="bg-[#458364] p-3 px-6 tracking-wider mt-3 text-white rounded-xl akshar text-lg cursor-pointer hover:scale-105 focus:bg-[#396e53] transition-transform"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Home;
