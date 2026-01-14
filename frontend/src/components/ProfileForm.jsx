import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/defaultUser.png";
import axios from "axios";
import { baseurl } from "../../address/address";
import { setUser } from "../../redux/authSlice";
import LoadingPage from "../pages/LoadingPage";

function ProfileForm({ open, setOpen }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    about: user?.about || "",
  });
  const [photo, setPhoto] = useState(user?.profilePhoto || logo);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    const image = new FormData();
    if (photo && photo !== logo) {
      image.append("profilePhoto", photo);
    }

    try {
      setLoading(true);
      const res1 = await axios.post(`${baseurl}/update`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res1.data.success) {
        dispatch(setUser(res1.data.updatedUser));
      }

      if (photo && photo !== logo) {
        const res2 = await axios.post(`${baseurl}/update/photo`, image, {
          withCredentials: true,
        });

        if (res2.data.success) {
          dispatch(setUser(res2.data.user));
        }
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };


  if(loading) return <LoadingPage/>
  return (
    open && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md flex flex-col gap-5 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Update Profile
          </h2>

          <div className="flex flex-col items-center">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              <img
                src={
                  typeof photo === "string" ? photo : URL.createObjectURL(photo)
                }
                alt="Profile Preview"
                className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border-2 border-gray-500"
              />
            </label>
            <input
              type="file"
              id="profilePhoto"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
            <p className="text-sm text-gray-400 mt-2">
              Tap image to upload new photo
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Tell something about yourself"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded font-semibold text-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 transition-all py-2 rounded font-semibold text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default ProfileForm;
