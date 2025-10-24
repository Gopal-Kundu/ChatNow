import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../../address/address.js";
import { setLoading } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${baseurl}/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        if (response.data.success) {
          toast.success("Login Successful!", {
            position: "top-center",
            duration: 2000,
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Login Failed. Please try again.",
        {
          position: "top-center",
          duration: 1000,
        }
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    // Background Image
    <div className='h-screen bg-[url("./src/assets/Background_SignUp_Login_Page.jpg")] bg-cover bg-center'>
      {/* Navbar */}
      <div className="inter py-4 flex justify-center items-center gap-4">
        <Link to="/">
          <div className="bg-white/50 p-2 px-5 cursor-pointer inline-block  rounded-3xl hover:bg-white/90 transition-colors duration-400">
            Sign Up
          </div>
        </Link>
        <div className="bg-white p-2 px-5 cursor-pointer inline-block  rounded-3xl hover:bg-white/80 transition-colors duration-400">
          Sign In
        </div>
      </div>

    <div className="fade-in-bottom">
      {/* Have a account div  */}
      <div className="mt-2 flex text-white justify-center items-center gap-1">
        <div className="montserrat">Have no account?</div>
        <span className="underline cursor-pointer hover:text-blue-950">
          <Link to="/">Sign Up</Link>
        </span>
      </div>

      {/* big signup div */}
      <div className="flex justify-center items-center mt-6">
        <div className="inter inline-block text-3xl font-bold text-white">
          Login
        </div>
      </div>

      {/* form  */}
      <div className="mt-6 flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-center gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-5 bg-white/40 p-3 rounded-3xl outline-none focus:bg-white/90 block w-90 transition-colors duration-400 inter"
            required
          />
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-5 bg-white/40 p-3 rounded-3xl outline-none focus:bg-white/90 block w-90 transition-colors duration-400 inter"
            required
          />
          <button
            type="submit"
            className="px-5 bg-white/90 p-3 rounded-3xl outline-none block w-90 active:scale-95 transition-transform duration-200"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
