import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/defaultUser.png";
import axios from "axios";
import { baseurl } from "../../address/address";
import { setLoading, setUser } from "../../redux/authSlice";
import { Camera, User, Info, X, Loader2 } from "lucide-react";

function ProfileForm({ open, setOpen }) {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  
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

    const image = new FormData();
    if (photo && photo !== logo) {
      image.append("profilePhoto", photo);
    }

    try {
      dispatch(setLoading(true));

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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    open && (
      <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-md px-4 py-6 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-neutral-800 rounded-[2rem] shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden my-auto"
        >
          <div className="h-24 bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-400 opacity-90 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-8 pb-8 flex flex-col items-center -mt-12">
            <div className="relative group cursor-pointer mb-6">
              <label htmlFor="profilePhoto" className="cursor-pointer block relative rounded-full">
                <img
                  src={
                    typeof photo === "string" ? photo : URL.createObjectURL(photo)
                  }
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full object-cover border-[6px] border-[#111111] bg-neutral-900 shadow-xl"
                />
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </label>
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
            </div>

            <div className="w-full space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-500 font-bold tracking-wider ml-1">NAME</label>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl flex items-center px-4 py-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <User className="text-blue-500 w-5 h-5 mr-3 shrink-0" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white placeholder:text-neutral-600 py-2.5 focus:outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-neutral-500 font-bold tracking-wider ml-1">ABOUT</label>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl flex items-start px-4 py-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                  <Info className="text-purple-500 w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white placeholder:text-neutral-600 focus:outline-none resize-none"
                    rows="3"
                    placeholder="Tell something about yourself"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 transition-all duration-200 py-3.5 rounded-xl font-bold text-base active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] bg-white text-black hover:bg-neutral-200 transition-all duration-200 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
}

export default ProfileForm;