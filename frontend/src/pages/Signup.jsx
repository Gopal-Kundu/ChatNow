import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../../address/address.js";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/authSlice.js";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
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
      const response = await axios.post(`${baseurl}/register`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Registered Successfully! Please Login.", {
          position: "top-center",
          duration: 1000,
        });
      }
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message , {
        position: "top-center",
        duration: 1000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='select-none h-screen bg-[url("https://png.pngtree.com/background/20250104/original/pngtree-free-hd-wallpaper-4k-new-background-picture-image_15546678.jpg")] bg-cover bg-center'>
       
      <div className="inter py-4 flex justify-center items-center gap-4">
        <div className="bg-white p-2 px-5 cursor-pointer inline-block  rounded-3xl hover:bg-white/80 transition-colors duration-400">
          Sign Up
        </div>
        <Link to="/login">
        <div className="bg-white/50 p-2 px-5 cursor-pointer inline-block  rounded-3xl hover:bg-white/90 transition-colors duration-400">
          Sign In
        </div>
        </Link>
      </div>

      <div className="fade-in-bottom">
      <div className="mt-2 flex text-white justify-center items-center gap-1">
        <div className="montserrat">Have an account?</div>
        <span className="underline cursor-pointer hover:text-blue-950">
          <Link to="/login">Login</Link>
        </span>
      </div>

      <div className="flex justify-center items-center mt-6">
        <div className="inter inline-block text-3xl font-bold text-white">
          Sign Up
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-center gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter name"
            className="px-5 bg-white/40 p-3 rounded-3xl outline-none focus:bg-white/90 block w-90 transition-colors duration-400 inter"
            required
          />
          <input
            type="number"
            name="phoneNumber"
            value={formData.email}
            onChange={handleChange}
            placeholder="Phone Number"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      </div>
      </div>
  );
}

export default Signup;
