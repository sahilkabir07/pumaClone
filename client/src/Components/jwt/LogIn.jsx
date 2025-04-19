import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";

export const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}api/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;

      login(token, email);
      toast.success("Login successful!");
      console.log("✅ JWT login success for:", email);

      navigate("/");
    } catch (error) {
      console.error("❌ JWT Login Error:", error.response?.data?.message || error.message);
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-4"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
