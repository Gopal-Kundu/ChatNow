import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Edit } from "lucide-react";
import logo from "../assets/defaultUser.png";
import ProfileForm from "../components/ProfileForm";

const styles = {
  container:
    "bg-black h-screen w-screen grid grid-cols-1 grid-rows-4 md:grid-cols-[60vw_40vw] md:grid-rows-[33vh_33vh_1fr]",
  profilePage:
    "bg-red-400 row-start-1 row-end-2 md:row-start-1 md:row-end-4 grid items-center justify-center",
  profileWrapper: "flex flex-col items-center px-4 py-6 md:p-0",
  profileImage:
    "rounded-full h-[13vh] w-[13vh] md:h-[60vh] md:w-[60vh] object-cover",
  editWrapper: "flex gap-2 items-center mt-4",
  editIcon: "size-[6vh] md:size-[10vh] cursor-pointer",
  editText: "text-lg md:text-2xl font-bold text-blue-100 cursor-pointer",

  boxBase:
    "border-2 border-amber-900 grid items-center justify-center text-center p-4",
  boxContent: "flex flex-col items-center justify-center overflow-hidden",
  boxTitle: "text-[5vh] md:text-[10vh] font-bold text-amber-50",
  boxText: "text-[3.5vh] md:text-[8vh] text-amber-300",
};

function UpdateProfilePage() {
  const user = useSelector((store) => store.auth.user);
  const defaultImg = logo;
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      {open && <ProfileForm open={open} setOpen={setOpen} />}

      {/* Profile Section */}
      <div className={styles.profilePage}>
        <div className={styles.profileWrapper}>
          <img
            src={user?.profilePhoto || defaultImg}
            className={styles.profileImage}
            alt="Profile"
          />
          <div
            className={styles.editWrapper}
            onClick={() => setOpen(true)}
          >
            <Edit className={styles.editIcon} />
            <div className={styles.editText}>Edit Profile</div>
          </div>
        </div>
      </div>

      {/* Name Section */}
      <div
        className={`${styles.boxBase} row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-3`}
      >
        <div className={styles.boxContent}>
          <div className={styles.boxTitle}>Name</div>
          <div className={styles.boxText}>{user?.username || "Anonymous"}</div>
        </div>
      </div>

      {/* About Section */}
      <div
        className={`${styles.boxBase} row-start-3 row-end-4 md:row-start-2 md:row-end-3 md:col-start-2 md:col-end-3`}
      >
        <div className={styles.boxContent}>
          <div className={styles.boxTitle}>About</div>
          <div className={styles.boxText}>{user?.about || "about"}</div>
        </div>
      </div>

      {/* Email Section */}
      <div
        className={`${styles.boxBase} row-start-4 row-end-5 md:row-start-3 md:row-end-4 md:col-start-2 md:col-end-3`}
      >
        <div className={styles.boxContent}>
          <div className={styles.boxTitle}>Email</div>
          <div className={styles.boxText}>{user?.email || "email"}</div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
export { styles };
